from __future__ import annotations

import hashlib
import json
import os
import re
import secrets
import sqlite3
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional


SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    name TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS users_updated_at
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

-- Expediente de autorizacion del acudiente.
--
-- Tabla aparte y no columnas en users porque una autorizacion es un HECHO
-- con fecha, no un atributo de la cuenta: se pide, se responde o caduca, y
-- puede revocarse despues. Guardarlo como un campo perderia el cuando.
--
-- Se guarda el hash del token, nunca el token: mismo criterio que sessions.
-- Quien tenga acceso a la base no puede autorizar en nombre de nadie.
--
-- NO se guarda la IP del acudiente. Da poca prueba adicional - la fecha, el
-- token usado y el correo ya identifican el acto - y seria un dato personal
-- mas sobre alguien que solo entro a responder una pregunta.
CREATE TABLE IF NOT EXISTS guardian_consents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    guardian_email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    token_hash TEXT NOT NULL UNIQUE,
    requested_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT NOT NULL,
    resolved_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_consents_user ON guardian_consents(user_id);

-- Mismo patron que sessions: se guarda el hash del token, nunca el token
-- crudo. De un solo uso (se borra al consumirse) y expira rapido (ver
-- PASSWORD_RESET_LIFETIME) porque a diferencia de una sesion, este token
-- por si solo permite cambiar la contraseña.
CREATE TABLE IF NOT EXISTS password_resets (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_password_resets_user ON password_resets(user_id);

CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    top_career_id TEXT,
    top_career_name TEXT,
    results_json TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_test_results_created ON test_results(created_at);

-- Pasaporte FuturePilot: informacion "estatica" editable por el usuario
-- (perfil + objetivos) separada de la identidad/auth en `users`, para no
-- mezclar dominios.
CREATE TABLE IF NOT EXISTS passport_profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    country TEXT,
    city TEXT,
    languages_json TEXT,
    photo_data_url TEXT,
    goals_json TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Event sourcing: cada accion rastreable del usuario queda como una fila
-- aca. "Progreso" (conteos) y "sellos" (logros) se derivan de este mismo
-- log en vez de mantenerse como estados separados que se puedan
-- desincronizar - agregar una nueva seccion rastreable en el futuro es
-- solo un event_type nuevo, sin tocar el esquema.
CREATE TABLE IF NOT EXISTS passport_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    subject_id TEXT,
    subject_label TEXT,
    metadata_json TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_passport_events_user ON passport_events(user_id, event_type);

-- Sellos: derivados de passport_events por reglas en app.py, pero
-- persistidos aparte (no recalculados en cada lectura) para que
-- "earned_at" sea estable y la UI pueda animar solo los sellos
-- genuinamente nuevos.
CREATE TABLE IF NOT EXISTS passport_stamps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stamp_key TEXT NOT NULL,
    stamp_label TEXT NOT NULL,
    -- Que CLASE de sello es (city, university, country, continent, roadmap,
    -- academic_goal, milestone...). El pasaporte dibuja un diseño distinto
    -- por tipo, asi que no basta con la etiqueta: "Bogotá" y "MIT" son dos
    -- sellos con forma, marco e iconografia diferentes.
    stamp_type TEXT NOT NULL DEFAULT 'milestone',
    -- A que se refiere: id de ciudad, de pais, de universidad. Permite
    -- volver al sujeto (enlazar al globo) y evita depender del texto.
    subject_id TEXT,
    subject_label TEXT,
    rarity TEXT NOT NULL DEFAULT 'common',
    metadata_json TEXT,
    earned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, stamp_key)
);

-- Registro de que admin cambio que (tema, feature flags, reparaciones) y
-- cuando. ON DELETE SET NULL en vez de CASCADE a proposito: si la cuenta
-- admin se borra algun dia, el historial de lo que hizo debe seguir
-- existiendo (queda con admin_user_id=NULL) en vez de desaparecer con ella.
CREATE TABLE IF NOT EXISTS admin_audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    detail_json TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created ON admin_audit_log(created_at);
"""

SESSION_LIFETIME = timedelta(days=30)
PASSWORD_RESET_LIFETIME = timedelta(hours=1)

# Cuanto se espera al acudiente antes de borrar los datos del menor.
#
# La cuenta NO se bloquea durante ese tiempo: el estudiante usa todo desde el
# primer minuto. El plazo existe para que la espera no sea infinita - sin el,
# los datos de un menor cuyo padre nunca respondio se quedarian para siempre.
GUARDIAN_CONSENT_LIFETIME = timedelta(days=30)

# Los estados por los que pasa un expediente. PENDING no bloquea nada.
CONSENT_STATES = ("PENDING", "AUTHORIZED", "DENIED", "REVOKED", "EXPIRED")
# Configurable solo para que la suite de tests (ver tests/conftest.py) no
# tarde minutos reales en cada registro/login - en produccion esto NUNCA
# debe fijarse por env var, 600_000 es el minimo recomendado hoy para
# PBKDF2-SHA256 (OWASP). Bajarlo debilita directamente la resistencia a
# fuerza bruta offline si la base de datos se filtra.
PBKDF2_ITERATIONS = int(os.environ.get("PBKDF2_ITERATIONS_TEST_ONLY") or 600_000)
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class DuplicateEmailError(Exception):
    pass


class InvalidCredentialsError(Exception):
    pass


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def utc_now_iso() -> str:
    return utc_now().isoformat()


def hash_password(password: str, salt: bytes) -> str:
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS)
    return digest.hex()


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


class UsersStore:
    def __init__(self, database_path: str | Path):
        self.database_path = Path(database_path)
        self.database_path.parent.mkdir(parents=True, exist_ok=True)
        self.initialize()

    def connect(self) -> sqlite3.Connection:
        # timeout= es cuanto espera sqlite3 antes de lanzar "database is
        # locked" si otra conexion tiene un write en curso - sin esto el
        # default (5s) ya ayuda, pero WAL es el cambio real: permite
        # lectores concurrentes mientras hay un escritor activo (en modo
        # journal por defecto, un escritor bloquea a todos los lectores).
        connection = sqlite3.connect(self.database_path, timeout=10)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute("PRAGMA journal_mode = WAL")
        connection.execute("PRAGMA busy_timeout = 10000")
        return connection

    def initialize(self) -> None:
        with self.connect() as connection:
            connection.executescript(SCHEMA)
            self._ensure_admin_column(connection)
            self._ensure_results_json_column(connection)
            self._ensure_preferences_column(connection)
            self._ensure_stamp_columns(connection)
            self._ensure_guardian_columns(connection)

    @staticmethod
    def _ensure_admin_column(connection: sqlite3.Connection) -> None:
        # La tabla users pudo haberse creado antes de que existiera is_admin
        # (CREATE TABLE IF NOT EXISTS no agrega columnas nuevas), asi que se
        # migra explicitamente si hace falta.
        columns = {row["name"] for row in connection.execute("PRAGMA table_info(users)")}
        if "is_admin" not in columns:
            connection.execute("ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0")

    @staticmethod
    def _ensure_guardian_columns(connection: sqlite3.Connection) -> None:
        """Si quien se registra es menor, y a que acudiente avisar.

        La aplicacion no sabia la edad de nadie: no habia fecha de nacimiento
        ni nada parecido. Sin eso no se puede pedir permiso a un adulto,
        porque no se sabe a quien hace falta pedirselo.

        Se guarda un booleano, no una fecha de nacimiento. Basta para decidir
        y es un dato menos sobre un menor: importa QUE lo es, no cuando nacio.

        Es autodeclarado y un adolescente puede desmarcarlo. Eso es cierto y
        no tiene arreglo tecnico - lo que cambia es que ahora se pregunta y
        queda constancia de la respuesta.
        """
        columns = {row["name"] for row in connection.execute("PRAGMA table_info(users)")}
        if "is_minor" not in columns:
            connection.execute("ALTER TABLE users ADD COLUMN is_minor INTEGER NOT NULL DEFAULT 0")
        if "guardian_email" not in columns:
            connection.execute("ALTER TABLE users ADD COLUMN guardian_email TEXT")

    @staticmethod
    def _ensure_preferences_column(connection: sqlite3.Connection) -> None:
        """Preferencias de exploracion, aparte de `goals_json`.

        Las metas son aspiraciones que el estudiante escribio y ve impresas en
        su pasaporte. Las preferencias son entrada de maquina: le dicen al
        motor que destinos destacar. Mezclarlas haria que el pasaporte mostrara
        campos tecnicos que nadie escribio.
        """
        columns = {row["name"] for row in connection.execute("PRAGMA table_info(passport_profiles)")}
        if "preferences_json" not in columns:
            connection.execute("ALTER TABLE passport_profiles ADD COLUMN preferences_json TEXT")

    @staticmethod
    def _ensure_results_json_column(connection: sqlite3.Connection) -> None:
        columns = {row["name"] for row in connection.execute("PRAGMA table_info(test_results)")}
        if "results_json" not in columns:
            connection.execute("ALTER TABLE test_results ADD COLUMN results_json TEXT")

    @staticmethod
    def _ensure_stamp_columns(connection: sqlite3.Connection) -> None:
        """Los sellos empezaron siendo solo clave + etiqueta. El pasaporte
        necesita saber ademas de que tipo es cada uno, a que se refiere y
        que rareza tiene, para poder dibujarlos distintos. Se migra en vez
        de recrear la tabla: los sellos ya ganados no se pierden."""
        columns = {row["name"] for row in connection.execute("PRAGMA table_info(passport_stamps)")}
        nuevas = {
            "stamp_type": "TEXT NOT NULL DEFAULT 'milestone'",
            "subject_id": "TEXT",
            "subject_label": "TEXT",
            "rarity": "TEXT NOT NULL DEFAULT 'common'",
            "metadata_json": "TEXT",
        }
        for nombre, definicion in nuevas.items():
            if nombre not in columns:
                connection.execute(f"ALTER TABLE passport_stamps ADD COLUMN {nombre} {definicion}")

        # Los sellos anteriores a la migracion quedaron con el tipo por
        # defecto. Se deduce de la clave, que ya codificaba la intencion.
        if "stamp_type" not in columns:
            connection.execute("""
                UPDATE passport_stamps SET stamp_type = CASE
                    WHEN stamp_key LIKE 'country_%'   THEN 'country'
                    WHEN stamp_key LIKE 'city_%'      THEN 'city'
                    WHEN stamp_key LIKE 'univ_%'      THEN 'university'
                    WHEN stamp_key = 'roadmap_created' THEN 'roadmap'
                    ELSE 'milestone'
                END
            """)

    def register(self, email: str, password: str, name: str | None = None,
                 is_minor: bool = False, guardian_email: str | None = None) -> dict:
        """Crea la cuenta.

        `guardian_email` solo se guarda si `is_minor`: quien dice ser mayor de
        edad no deja el correo de nadie mas. Guardarlo "por si acaso" seria
        justo lo contrario de pedir lo minimo.
        """
        normalized_email = email.strip().lower()
        acudiente = (guardian_email or "").strip().lower() or None
        if not is_minor:
            acudiente = None
        salt = secrets.token_bytes(16)
        password_hash = hash_password(password, salt)

        with self.connect() as connection:
            try:
                cursor = connection.execute(
                    """
                    INSERT INTO users (email, password_hash, password_salt, name,
                                       is_minor, guardian_email)
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (normalized_email, password_hash, salt.hex(), name,
                     1 if is_minor else 0, acudiente),
                )
            except sqlite3.IntegrityError as error:
                raise DuplicateEmailError(normalized_email) from error

            user_id = cursor.lastrowid

        return self._get_user_by_id(user_id)

    def verify_login(self, email: str, password: str) -> dict:
        normalized_email = email.strip().lower()
        with self.connect() as connection:
            row = connection.execute(
                "SELECT * FROM users WHERE email = ?",
                (normalized_email,),
            ).fetchone()

        if row is None:
            raise InvalidCredentialsError(normalized_email)

        salt = bytes.fromhex(row["password_salt"])
        candidate_hash = hash_password(password, salt)
        if not secrets.compare_digest(candidate_hash, row["password_hash"]):
            raise InvalidCredentialsError(normalized_email)

        return self._row_to_user(row)

    def create_session(self, user_id: int) -> str:
        token = secrets.token_urlsafe(32)
        token_hash = hash_token(token)
        expires_at = (utc_now() + SESSION_LIFETIME).isoformat()

        with self.connect() as connection:
            connection.execute(
                "INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)",
                (token_hash, user_id, expires_at),
            )

        return token

    def get_user_by_token(self, token: str) -> Optional[dict]:
        if not token:
            return None

        token_hash = hash_token(token)
        now_iso = utc_now_iso()

        with self.connect() as connection:
            # Limpieza perezosa de sesiones vencidas - sin necesidad de un cron aparte.
            connection.execute("DELETE FROM sessions WHERE expires_at < ?", (now_iso,))

            row = connection.execute(
                """
                SELECT users.* FROM sessions
                JOIN users ON users.id = sessions.user_id
                WHERE sessions.token_hash = ? AND sessions.expires_at >= ?
                """,
                (token_hash, now_iso),
            ).fetchone()

        return self._row_to_user(row) if row else None

    def delete_session(self, token: str) -> None:
        token_hash = hash_token(token)
        with self.connect() as connection:
            connection.execute("DELETE FROM sessions WHERE token_hash = ?", (token_hash,))

    def get_user_by_id(self, user_id: int) -> dict:
        return self._get_user_by_id(user_id)

    def find_user_id_by_email(self, email: str) -> Optional[int]:
        normalized_email = email.strip().lower()
        with self.connect() as connection:
            row = connection.execute(
                "SELECT id FROM users WHERE email = ?", (normalized_email,)
            ).fetchone()
        return row["id"] if row else None

    def create_password_reset(self, user_id: int) -> str:
        # Un pedido nuevo invalida cualquier link viejo sin usar para esa
        # cuenta - evita que queden varios tokens validos "flotando".
        token = secrets.token_urlsafe(32)
        token_hash = hash_token(token)
        expires_at = (utc_now() + PASSWORD_RESET_LIFETIME).isoformat()
        with self.connect() as connection:
            connection.execute("DELETE FROM password_resets WHERE user_id = ?", (user_id,))
            connection.execute(
                "INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES (?, ?, ?)",
                (token_hash, user_id, expires_at),
            )
        return token

    def consume_password_reset(self, token: str) -> Optional[int]:
        """Valida el token, lo borra (de un solo uso) y devuelve el
        user_id si era valido - o None si no existe/ya vencio/ya se uso."""
        token_hash = hash_token(token)
        now_iso = utc_now_iso()
        with self.connect() as connection:
            connection.execute("DELETE FROM password_resets WHERE expires_at < ?", (now_iso,))
            row = connection.execute(
                "SELECT user_id FROM password_resets WHERE token_hash = ? AND expires_at >= ?",
                (token_hash, now_iso),
            ).fetchone()
            if row is None:
                return None
            connection.execute("DELETE FROM password_resets WHERE token_hash = ?", (token_hash,))
        return row["user_id"]

    def set_password(self, user_id: int, new_password: str) -> None:
        salt = secrets.token_bytes(16)
        password_hash = hash_password(new_password, salt)
        with self.connect() as connection:
            connection.execute(
                "UPDATE users SET password_hash = ?, password_salt = ? WHERE id = ?",
                (password_hash, salt.hex(), user_id),
            )
            # Restablecer la contraseña cierra todas las sesiones activas
            # de la cuenta - si alguien mas tenia acceso (token robado), se
            # invalida junto con el cambio de contraseña.
            connection.execute("DELETE FROM sessions WHERE user_id = ?", (user_id,))

    def _get_user_by_id(self, user_id: int) -> dict:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT * FROM users WHERE id = ?", (user_id,)
            ).fetchone()
        return self._row_to_user(row)

    @staticmethod
    def _row_to_user(row: sqlite3.Row) -> dict:
        return {
            "id": row["id"],
            "email": row["email"],
            "name": row["name"],
            "created_at": row["created_at"],
            "is_admin": bool(row["is_admin"]),
            # Los ve el propio estudiante, que fue quien los escribio: sin
            # esto no habria forma de corregir un correo mal tecleado.
            "is_minor": bool(row["is_minor"]),
            "guardian_email": row["guardian_email"],
        }

    # ----------------------------------------------------------------
    # Autorizacion del acudiente
    #
    # Nada de lo que hay aqui bloquea al estudiante. La cuenta funciona
    # entera desde el primer minuto, tenga el expediente el estado que
    # tenga. Esto registra si un adulto lo autorizo y cuando, y le pone
    # fecha limite a la espera.
    # ----------------------------------------------------------------

    def create_consent_request(self, user_id: int, guardian_email: str,
                               lifetime: timedelta = GUARDIAN_CONSENT_LIFETIME) -> str:
        """Abre el expediente y devuelve el token para el enlace del correo.

        El token se devuelve UNA vez y solo se guarda su hash. Si se pierde,
        se pide otro: no hay forma de recuperarlo desde la base, que es
        justamente lo que impide que alguien con acceso al SQLite autorice
        en nombre de un padre.

        Si ya habia un expediente pendiente para esta cuenta se marca como
        reemplazado (EXPIRED) antes de abrir el nuevo. Dos enlaces vivos a la
        vez para el mismo menor serian dos respuestas posibles y ninguna
        forma de saber cual manda.
        """
        token = secrets.token_urlsafe(32)
        expires_at = (utc_now() + lifetime).isoformat()

        with self.connect() as connection:
            connection.execute(
                "UPDATE guardian_consents SET status = 'EXPIRED', resolved_at = ? "
                "WHERE user_id = ? AND status = 'PENDING'",
                (utc_now_iso(), user_id),
            )
            connection.execute(
                "INSERT INTO guardian_consents (user_id, guardian_email, token_hash, expires_at) "
                "VALUES (?, ?, ?, ?)",
                (user_id, (guardian_email or "").strip().lower(), hash_token(token), expires_at),
            )
            connection.commit()
        return token

    def get_consent_by_token(self, token: str) -> Optional[dict]:
        """El expediente al que apunta un enlace, con el nombre del menor.

        Se busca por el hash, asi que un token invalido simplemente no
        encuentra nada - no hay comparacion que se pueda medir por tiempo.
        """
        if not token:
            return None
        with self.connect() as connection:
            fila = connection.execute(
                "SELECT c.*, u.name AS student_name, u.email AS student_email "
                "FROM guardian_consents c JOIN users u ON u.id = c.user_id "
                "WHERE c.token_hash = ?",
                (hash_token(token),),
            ).fetchone()
        if fila is None:
            return None
        expediente = dict(fila)
        # Caducado se calcula al leer y no por un proceso que quiza no corrio:
        # un expediente vencido no puede aceptar una respuesta solo porque
        # nadie paso a marcarlo.
        if expediente["status"] == "PENDING" and expediente["expires_at"] <= utc_now_iso():
            expediente["status"] = "EXPIRED"
        expediente.pop("token_hash", None)
        return expediente

    def resolve_consent(self, token: str, authorized: bool) -> Optional[dict]:
        """El acudiente responde. Devuelve el expediente ya resuelto, o None.

        Solo se responde a un expediente PENDIENTE y no vencido. Volver a
        pulsar el enlace despues no cambia nada: la primera respuesta es la
        que queda, y sobrescribirla en silencio borraria la prueba de lo que
        el acudiente dijo de verdad.
        """
        actual = self.get_consent_by_token(token)
        if actual is None or actual["status"] != "PENDING":
            return None
        nuevo = "AUTHORIZED" if authorized else "DENIED"
        with self.connect() as connection:
            connection.execute(
                "UPDATE guardian_consents SET status = ?, resolved_at = ? "
                "WHERE token_hash = ? AND status = 'PENDING'",
                (nuevo, utc_now_iso(), hash_token(token)),
            )
            connection.commit()
        return self.get_consent_by_token(token)

    def get_consent_for_user(self, user_id: int) -> Optional[dict]:
        """El expediente vigente de una cuenta: el mas reciente."""
        with self.connect() as connection:
            fila = connection.execute(
                "SELECT id, user_id, guardian_email, status, requested_at, expires_at, resolved_at "
                "FROM guardian_consents WHERE user_id = ? ORDER BY id DESC LIMIT 1",
                (user_id,),
            ).fetchone()
        if fila is None:
            return None
        expediente = dict(fila)
        if expediente["status"] == "PENDING" and expediente["expires_at"] <= utc_now_iso():
            expediente["status"] = "EXPIRED"
        return expediente

    def list_expired_consents(self) -> list[dict]:
        """Expedientes pendientes cuyo plazo ya paso.

        Se listan, no se borran: quien decide borrar cuentas es un proceso de
        mantenimiento explicito (backend/consent_expiry.py), no una consulta
        de lectura que alguien llamo sin saberlo.
        """
        with self.connect() as connection:
            filas = connection.execute(
                "SELECT c.id, c.user_id, c.guardian_email, c.requested_at, c.expires_at, "
                "       u.email AS student_email, u.name AS student_name "
                "FROM guardian_consents c JOIN users u ON u.id = c.user_id "
                "WHERE c.status = 'PENDING' AND c.expires_at <= ? ORDER BY c.expires_at",
                (utc_now_iso(),),
            ).fetchall()
        return [dict(f) for f in filas]

    # Los desenlaces que significan "esta cuenta no puede seguir existiendo".
    # DENIED y REVOKED son una respuesta explicita del acudiente; EXPIRED es
    # el plazo agotado. AUTHORIZED no esta, obviamente, y PENDING solo cuenta
    # cuando la fecha ya paso - eso se mira aparte porque necesita comparar.
    CONSENT_STATES_OWED_DELETION = ("DENIED", "REVOKED", "EXPIRED")

    def list_consents_awaiting_deletion(self) -> list[dict]:
        """Menores a los que se les debe un borrado, por el motivo que sea.

        No basta con los PENDING vencidos. Un acudiente que pulsa "No autorizo
        y quiero que borren sus datos" deja el expediente en DENIED, y la
        pagina le responde "sus datos se borraran": si el barrido solo mira
        los PENDING, esa frase es mentira y la cuenta vive para siempre. Lo
        mismo con los que ya estaban marcados EXPIRED por un --expirar
        anterior, que quedaban fuera del alcance de --borrar para siempre.

        Solo se mira el expediente MAS RECIENTE de cada cuenta. Abrir un
        permiso nuevo marca el anterior como EXPIRED (ver
        create_consent_request): sin esta condicion, pedir de nuevo la
        autorizacion borraria la cuenta por el expediente que acabamos de
        reemplazar - exactamente al reves de lo que se pretendia.
        """
        marcas = ",".join("?" * len(self.CONSENT_STATES_OWED_DELETION))
        with self.connect() as connection:
            filas = connection.execute(
                "SELECT c.id, c.user_id, c.status, c.guardian_email, c.requested_at, "
                "       c.expires_at, c.resolved_at, "
                "       u.email AS student_email, u.name AS student_name "
                "FROM guardian_consents c JOIN users u ON u.id = c.user_id "
                "WHERE c.id = (SELECT MAX(id) FROM guardian_consents "
                "              WHERE user_id = c.user_id) "
                f"  AND (c.status IN ({marcas}) "
                "       OR (c.status = 'PENDING' AND c.expires_at <= ?)) "
                "ORDER BY c.expires_at",
                [*self.CONSENT_STATES_OWED_DELETION, utc_now_iso()],
            ).fetchall()
        return [dict(f) for f in filas]

    def mark_consents_expired(self, consent_ids: list[int]) -> int:
        if not consent_ids:
            return 0
        marcas = ",".join("?" * len(consent_ids))
        with self.connect() as connection:
            cursor = connection.execute(
                f"UPDATE guardian_consents SET status = 'EXPIRED', resolved_at = ? "
                f"WHERE id IN ({marcas}) AND status = 'PENDING'",
                [utc_now_iso(), *consent_ids],
            )
            connection.commit()
        return cursor.rowcount

    def sync_admin_email(self, admin_email: str | None) -> None:
        """Unica fuente de verdad para quien es admin: la variable de entorno
        ADMIN_EMAIL. Se llama en el arranque y en cada login/registro para que
        un cambio de ADMIN_EMAIL tome efecto sin tocar la base de datos a
        mano. Si ADMIN_EMAIL esta vacio, nadie es admin."""
        normalized = admin_email.strip().lower() if admin_email else None
        with self.connect() as connection:
            if normalized:
                connection.execute("UPDATE users SET is_admin = 1 WHERE email = ?", (normalized,))
                connection.execute(
                    "UPDATE users SET is_admin = 0 WHERE email != ? AND is_admin = 1", (normalized,)
                )
            else:
                connection.execute("UPDATE users SET is_admin = 0 WHERE is_admin = 1")

    # --------------------------------------------------------------------
    # Resultados de test - metricas minimas para el dashboard de admin.
    # --------------------------------------------------------------------
    def record_test_result(
        self,
        user_id: int | None,
        top_career_id: str | None,
        top_career_name: str | None,
        results_json: str | None = None,
    ) -> int:
        with self.connect() as connection:
            cursor = connection.execute(
                """
                INSERT INTO test_results (user_id, top_career_id, top_career_name, results_json)
                VALUES (?, ?, ?, ?)
                """,
                (user_id, top_career_id, top_career_name, results_json),
            )
            return cursor.lastrowid

    def claim_test_result(self, result_id: int, user_id: int) -> str:
        """Asocia un resultado calculado antes del login/registro (todavia
        anonimo) a la cuenta recien autenticada. Solo reclama filas que
        sigan sin dueno - no permite adueñarse del resultado de otra cuenta
        adivinando su id.

        Devuelve cual de los cuatro casos ocurrio, en vez de un bool:

          "claimed"        - el resultado era anonimo y ahora es de user_id.
          "already_owned"  - ya era de user_id. Es EXITO, no error: pasa
                             cuando el UPDATE se confirmo pero la respuesta
                             HTTP se perdio (timeout, red caida) y el
                             cliente reintenta. Sin distinguir este caso, el
                             reintento recibiria 404 para siempre sobre un
                             resultado que si esta correctamente vinculado.
          "owned_by_other" - es de otra cuenta. No se toca.
          "not_found"      - no existe ninguna fila con ese id.

        El UPDATE y el SELECT comparten conexion y transaccion para que
        entre ambos no pueda colarse otro claim y devolver un caso que ya
        dejo de ser cierto.
        """
        with self.connect() as connection:
            cursor = connection.execute(
                "UPDATE test_results SET user_id = ? WHERE id = ? AND user_id IS NULL",
                (user_id, result_id),
            )
            if cursor.rowcount > 0:
                return "claimed"

            row = connection.execute(
                "SELECT user_id FROM test_results WHERE id = ?", (result_id,)
            ).fetchone()

        if row is None:
            return "not_found"
        if row["user_id"] == user_id:
            return "already_owned"
        return "owned_by_other"

    def latest_result_for_user(self, user_id: int) -> Optional[dict]:
        with self.connect() as connection:
            row = connection.execute(
                """
                SELECT results_json, created_at FROM test_results
                WHERE user_id = ? AND results_json IS NOT NULL
                ORDER BY created_at DESC
                LIMIT 1
                """,
                (user_id,),
            ).fetchone()
        if row is None:
            return None
        return {"results_json": row["results_json"], "created_at": row["created_at"]}

    def results_history_for_user(self, user_id: int, limit: int = 10) -> list[dict]:
        """Todos los tests de una cuenta, del mas reciente al mas antiguo.

        Repetir el test nunca borro el resultado anterior - cada intento es
        una fila propia - pero hasta ahora solo se leia el ultimo, asi que
        ese historial no se veia por ningun lado. Aqui se devuelve entero
        para poder mostrar como ha cambiado el perfil con el tiempo.

        Se devuelve el JSON completo porque quien llama tiene que traducirlo
        (ver _localize_results): un resumen hecho aqui vendria en el idioma
        equivocado.
        """
        with self.connect() as connection:
            rows = connection.execute(
                """
                SELECT id, results_json, created_at, top_career_id
                FROM test_results
                WHERE user_id = ? AND results_json IS NOT NULL
                ORDER BY created_at DESC, id DESC
                LIMIT ?
                """,
                (user_id, limit),
            ).fetchall()
        return [dict(row) for row in rows]

    def delete_account(self, user_id: int) -> None:
        """Borra la cuenta y todo lo que cuelga de ella.

        Los resultados de test NO se borran: se desligan. Son filas anonimas
        a partir de ese momento y sostienen las estadisticas agregadas del
        panel de administracion. Borrar la cuenta tiene que quitar los datos
        personales, no falsear el historico de la plataforma.

        Desligar es DOS cosas, no una. Poner la columna a NULL no bastaba: el
        identificador viaja tambien DENTRO de `results_json`, asi que la fila
        seguia siendo vinculable a la persona que pidio el borrado. Se
        limpian las dos, o el borrado es una promesa que no se cumple.
        """
        with self.connect() as connection:
            self._scrub_result_owner(connection, user_id)
            connection.execute("UPDATE test_results SET user_id = NULL WHERE user_id = ?", (user_id,))
            for tabla in ("sessions", "password_resets", "passport_profiles",
                          "passport_events", "passport_stamps"):
                connection.execute(f"DELETE FROM {tabla} WHERE user_id = ?", (user_id,))
            connection.execute("DELETE FROM users WHERE id = ?", (user_id,))
            connection.commit()

    @staticmethod
    def _scrub_result_owner(connection: sqlite3.Connection, user_id: int) -> None:
        """Quita el identificador de dentro del resultado guardado.

        El motor escribe `user_id` en el resultado que serializa, asi que el
        blob lo lleva ademas de la columna. Se pone a None en vez de quitar la
        clave: el resto del sistema la lee, y una clave ausente rompe lo que
        una clave vacia no."""
        filas = connection.execute(
            "SELECT id, results_json FROM test_results WHERE user_id = ? AND results_json IS NOT NULL",
            (user_id,),
        ).fetchall()
        for fila in filas:
            try:
                datos = json.loads(fila["results_json"])
            except (TypeError, ValueError):
                continue
            if datos.get("user_id") is None:
                continue
            datos["user_id"] = None
            connection.execute(
                "UPDATE test_results SET results_json = ? WHERE id = ?",
                (json.dumps(datos), fila["id"]),
            )

    def scrub_orphaned_result_owners(self) -> int:
        """Limpia las filas que quedaron desligadas ANTES de que el borrado
        limpiara el blob. Sin esto, las cuentas ya borradas siguen siendo
        vinculables y no hay forma de que su dueño lo sepa.

        Idempotente: se puede llamar en cada arranque sin coste apreciable."""
        limpiadas = 0
        with self.connect() as connection:
            filas = connection.execute(
                "SELECT id, results_json FROM test_results "
                "WHERE user_id IS NULL AND results_json IS NOT NULL"
            ).fetchall()
            for fila in filas:
                try:
                    datos = json.loads(fila["results_json"])
                except (TypeError, ValueError):
                    continue
                # Los ids anonimos (anon-...) no identifican a nadie: son de
                # quien hizo el test sin cuenta y se generan por dispositivo.
                dentro = datos.get("user_id")
                if dentro is None or not str(dentro).isdigit():
                    continue
                datos["user_id"] = None
                connection.execute(
                    "UPDATE test_results SET results_json = ? WHERE id = ?",
                    (json.dumps(datos), fila["id"]),
                )
                limpiadas += 1
            connection.commit()
        return limpiadas

    def count_users(self) -> int:
        with self.connect() as connection:
            return connection.execute("SELECT COUNT(*) FROM users").fetchone()[0]

    def count_users_since(self, since_iso: str) -> int:
        with self.connect() as connection:
            return connection.execute(
                "SELECT COUNT(*) FROM users WHERE created_at >= ?", (since_iso,)
            ).fetchone()[0]

    def count_active_sessions(self) -> int:
        with self.connect() as connection:
            return connection.execute(
                "SELECT COUNT(DISTINCT user_id) FROM sessions WHERE expires_at >= ?", (utc_now_iso(),)
            ).fetchone()[0]

    def count_test_results(self) -> int:
        with self.connect() as connection:
            return connection.execute("SELECT COUNT(*) FROM test_results").fetchone()[0]

    def count_test_results_since(self, since_iso: str) -> int:
        with self.connect() as connection:
            return connection.execute(
                "SELECT COUNT(*) FROM test_results WHERE created_at >= ?", (since_iso,)
            ).fetchone()[0]

    def top_careers(self, limit: int = 5) -> list[dict]:
        with self.connect() as connection:
            rows = connection.execute(
                """
                SELECT top_career_name AS name, COUNT(*) AS total
                FROM test_results
                WHERE top_career_name IS NOT NULL
                GROUP BY top_career_name
                ORDER BY total DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()
        return [{"name": row["name"], "total": row["total"]} for row in rows]

    def top_countries(self, limit: int = 5) -> list[dict]:
        # Cuenta usuarios distintos, no eventos crudos - un mismo estudiante
        # explorando el mismo pais varias veces no debe inflar el ranking.
        with self.connect() as connection:
            rows = connection.execute(
                """
                SELECT subject_label AS name, COUNT(DISTINCT user_id) AS total
                FROM passport_events
                WHERE event_type = 'country_explored' AND subject_label IS NOT NULL
                GROUP BY subject_label
                ORDER BY total DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()
        return [{"name": row["name"], "total": row["total"]} for row in rows]

    def recent_test_results(self, limit: int = 10) -> list[dict]:
        with self.connect() as connection:
            rows = connection.execute(
                """
                SELECT test_results.created_at AS created_at,
                       test_results.top_career_name AS top_career_name,
                       users.email AS email
                FROM test_results
                LEFT JOIN users ON users.id = test_results.user_id
                ORDER BY test_results.created_at DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()
        return [
            {
                "created_at": row["created_at"],
                "top_career_name": row["top_career_name"],
                "email": row["email"] or "Invitado",
            }
            for row in rows
        ]

    # --------------------------------------------------------------------
    # Pasaporte FuturePilot
    # --------------------------------------------------------------------
    def get_passport_profile(self, user_id: int) -> dict:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT * FROM passport_profiles WHERE user_id = ?", (user_id,)
            ).fetchone()
        if row is None:
            return {
                "country": None,
                "city": None,
                "languages": [],
                "photo_data_url": None,
                "goals": {},
                "preferences": {},
                "updated_at": None,
            }
        return {
            "country": row["country"],
            "city": row["city"],
            "languages": json.loads(row["languages_json"]) if row["languages_json"] else [],
            "photo_data_url": row["photo_data_url"],
            "goals": json.loads(row["goals_json"]) if row["goals_json"] else {},
            "preferences": (
                json.loads(row["preferences_json"])
                if "preferences_json" in row.keys() and row["preferences_json"] else {}
            ),
            "updated_at": row["updated_at"],
        }

    def _upsert_passport_profile(self, user_id: int, **fields) -> None:
        current = self.get_passport_profile(user_id)
        merged = {**current, **fields}
        with self.connect() as connection:
            connection.execute(
                """
                INSERT INTO passport_profiles (user_id, country, city, languages_json, photo_data_url, goals_json, preferences_json, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(user_id) DO UPDATE SET
                    country = excluded.country,
                    city = excluded.city,
                    languages_json = excluded.languages_json,
                    photo_data_url = excluded.photo_data_url,
                    goals_json = excluded.goals_json,
                    preferences_json = excluded.preferences_json,
                    updated_at = CURRENT_TIMESTAMP
                """,
                (
                    user_id,
                    merged["country"],
                    merged["city"],
                    json.dumps(merged["languages"]),
                    merged["photo_data_url"],
                    json.dumps(merged["goals"]),
                    json.dumps(merged.get("preferences") or {}),
                ),
            )

    def update_passport_profile(
        self,
        user_id: int,
        country: str | None = None,
        city: str | None = None,
        languages: list[str] | None = None,
        photo_data_url: str | None = None,
        clear_photo: bool = False,
    ) -> dict:
        fields = {}
        if country is not None:
            fields["country"] = country
        if city is not None:
            fields["city"] = city
        if languages is not None:
            fields["languages"] = languages
        # `None` significa "no toques la foto", asi que borrarla necesita
        # decirse aparte: sin esto, la unica forma de quitarse la cara de
        # encima era borrar la cuenta entera.
        if clear_photo:
            fields["photo_data_url"] = None
        elif photo_data_url is not None:
            fields["photo_data_url"] = photo_data_url
        self._upsert_passport_profile(user_id, **fields)
        return self.get_passport_profile(user_id)

    def update_passport_preferences(self, user_id: int, preferences: dict) -> dict:
        """Fusiona, no reemplaza.

        Las preferencias se van respondiendo de a poco - hoy la disposicion a
        salir del pais, mañana otra cosa - y cada pantalla manda solo lo suyo.
        Si esto sobrescribiera el objeto entero, contestar la segunda pregunta
        borraria la respuesta de la primera.
        """
        actuales = self.get_passport_profile(user_id).get("preferences") or {}
        self._upsert_passport_profile(user_id, preferences={**actuales, **preferences})
        return self.get_passport_profile(user_id)["preferences"]

    def update_passport_goals(self, user_id: int, goals: dict) -> dict:
        self._upsert_passport_profile(user_id, goals=goals)
        return self.get_passport_profile(user_id)

    def record_passport_event(
        self,
        user_id: int,
        event_type: str,
        subject_id: str | None = None,
        subject_label: str | None = None,
        metadata: dict | None = None,
    ) -> int:
        with self.connect() as connection:
            cursor = connection.execute(
                """
                INSERT INTO passport_events (user_id, event_type, subject_id, subject_label, metadata_json)
                VALUES (?, ?, ?, ?, ?)
                """,
                (user_id, event_type, subject_id, subject_label, json.dumps(metadata) if metadata else None),
            )
            return cursor.lastrowid

    def has_passport_event(self, user_id: int, event_type: str, subject_id: str | None = None) -> bool:
        query = "SELECT 1 FROM passport_events WHERE user_id = ? AND event_type = ?"
        params: list = [user_id, event_type]
        if subject_id is not None:
            query += " AND subject_id = ?"
            params.append(subject_id)
        with self.connect() as connection:
            return connection.execute(query + " LIMIT 1", params).fetchone() is not None

    def award_passport_stamp(
        self,
        user_id: int,
        stamp_key: str,
        stamp_label: str,
        *,
        stamp_type: str = "milestone",
        subject_id: str | None = None,
        subject_label: str | None = None,
        rarity: str = "common",
        metadata: dict | None = None,
    ) -> bool:
        """True solo si el sello se otorga por primera vez ahora - la UI usa
        esto para decidir si anima el "sello estampandose" o no.

        stamp_type y rarity determinan como se DIBUJA el sello en el
        pasaporte (forma, marco, iconografia), no solo que texto lleva.
        subject_id conserva a que ciudad/pais/universidad se refiere, para
        poder volver a ese sujeto sin adivinarlo desde la etiqueta.
        """
        with self.connect() as connection:
            try:
                connection.execute(
                    """
                    INSERT INTO passport_stamps
                        (user_id, stamp_key, stamp_label, stamp_type,
                         subject_id, subject_label, rarity, metadata_json)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        user_id, stamp_key, stamp_label, stamp_type,
                        subject_id, subject_label, rarity,
                        json.dumps(metadata) if metadata else None,
                    ),
                )
                return True
            except sqlite3.IntegrityError:
                return False

    def list_passport_stamps(self, user_id: int) -> list[dict]:
        """Del mas antiguo al mas reciente: un pasaporte se llena por orden
        de viaje, y las paginas se leen igual."""
        with self.connect() as connection:
            rows = connection.execute(
                """
                SELECT stamp_key, stamp_label, stamp_type, subject_id,
                       subject_label, rarity, metadata_json, earned_at
                FROM passport_stamps WHERE user_id = ? ORDER BY earned_at ASC, id ASC
                """,
                (user_id,),
            ).fetchall()
        return [
            {
                "key": row["stamp_key"],
                "label": row["stamp_label"],
                "type": row["stamp_type"] or "milestone",
                "subject_id": row["subject_id"],
                "subject_label": row["subject_label"],
                "rarity": row["rarity"] or "common",
                "metadata": json.loads(row["metadata_json"]) if row["metadata_json"] else {},
                "earned_at": row["earned_at"],
            }
            for row in rows
        ]

    def list_passport_events(self, user_id: int, limit: int = 20) -> list[dict]:
        with self.connect() as connection:
            rows = connection.execute(
                """
                SELECT event_type, subject_id, subject_label, metadata_json, created_at
                FROM passport_events WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
                """,
                (user_id, limit),
            ).fetchall()
        return [
            {
                "event_type": row["event_type"],
                "subject_id": row["subject_id"],
                "subject_label": row["subject_label"],
                "metadata": json.loads(row["metadata_json"]) if row["metadata_json"] else None,
                "created_at": row["created_at"],
            }
            for row in rows
        ]

    def passport_progress(self, user_id: int) -> dict:
        with self.connect() as connection:
            def count(event_type: str, distinct_subject: bool = False) -> int:
                if distinct_subject:
                    query = (
                        "SELECT COUNT(DISTINCT subject_id) FROM passport_events "
                        "WHERE user_id = ? AND event_type = ? AND subject_id IS NOT NULL"
                    )
                else:
                    query = "SELECT COUNT(*) FROM passport_events WHERE user_id = ? AND event_type = ?"
                return connection.execute(query, (user_id, event_type)).fetchone()[0]

            return {
                "tests_completed": count("test_completed"),
                "roadmaps_completed": count("roadmap_created"),
                "universities_explored": count("university_viewed", distinct_subject=True),
                "countries_explored": count("country_explored", distinct_subject=True),
                "cities_explored": count("city_explored", distinct_subject=True),
                "ai_conversations": count("ai_conversation"),
            }

    # --------------------------------------------------------------------
    # Auditoria de admin - quien cambio que (tema, flags, reparaciones).
    # --------------------------------------------------------------------
    def record_admin_action(self, admin_user_id: int, action: str, detail: dict | None = None) -> None:
        with self.connect() as connection:
            connection.execute(
                "INSERT INTO admin_audit_log (admin_user_id, action, detail_json) VALUES (?, ?, ?)",
                (admin_user_id, action, json.dumps(detail) if detail is not None else None),
            )

    def list_admin_audit_log(self, limit: int = 50) -> list[dict]:
        with self.connect() as connection:
            rows = connection.execute(
                """
                SELECT admin_audit_log.created_at AS created_at,
                       admin_audit_log.action AS action,
                       admin_audit_log.detail_json AS detail_json,
                       users.email AS admin_email
                FROM admin_audit_log
                LEFT JOIN users ON users.id = admin_audit_log.admin_user_id
                ORDER BY admin_audit_log.created_at DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()
        return [
            {
                "created_at": row["created_at"],
                "action": row["action"],
                "detail": json.loads(row["detail_json"]) if row["detail_json"] else None,
                "admin_email": row["admin_email"] or "(cuenta eliminada)",
            }
            for row in rows
        ]
