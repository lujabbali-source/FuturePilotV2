from __future__ import annotations

import hashlib
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
"""

SESSION_LIFETIME = timedelta(days=30)
PBKDF2_ITERATIONS = 600_000
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
        connection = sqlite3.connect(self.database_path)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
        return connection

    def initialize(self) -> None:
        with self.connect() as connection:
            connection.executescript(SCHEMA)

    def register(self, email: str, password: str, name: str | None = None) -> dict:
        normalized_email = email.strip().lower()
        salt = secrets.token_bytes(16)
        password_hash = hash_password(password, salt)

        with self.connect() as connection:
            try:
                cursor = connection.execute(
                    """
                    INSERT INTO users (email, password_hash, password_salt, name)
                    VALUES (?, ?, ?, ?)
                    """,
                    (normalized_email, password_hash, salt.hex(), name),
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
        }
