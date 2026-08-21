# -*- coding: utf-8 -*-
"""Material de estudio para las sub-tareas del roadmap.

El roadmap decia que aprender, y ahi se acababa. "Aprende estadistica"
supone que el estudiante ya sabe donde se aprende estadistica, que es
exactamente lo que no sabe quien todavia esta decidiendo que estudiar.

Este modulo pone el material al lado de la casilla. Empareja el texto de la
sub-tarea con un tema del catalogo (data/resources.json) y devuelve los
enlaces de ese tema. Los enlaces no se inventan: o son la pagina canonica de
algo conocido, o son la busqueda del propio sitio, que no caduca.

Y no todas las sub-tareas lo llevan. Ver `_es_estudiable`.
"""
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path
from typing import Any, Dict, List, Optional
from urllib.parse import quote_plus

_DATA = Path(__file__).resolve().parent / "data" / "resources.json"


def _sin_tildes(texto: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFD", texto.lower())
        if unicodedata.category(c) != "Mn"
    )

# Sub-tareas que mandan al estudiante al mundo. Esas no tienen material que
# ofrecer: ninguna pagina web te consigue una pasantia. Colgarles botones seria
# ruido, y de paso restaria valor a los botones de las que si sirven - si todo
# lleva material, el material deja de significar algo.
#
# Es una lista de exclusion, no de inclusion, y el motivo esta medido: las
# mejores sub-tareas del roadmap ni siquiera empiezan por verbo. "Estadistica
# descriptiva y distribuciones", "Anatomia y fisiologia humanas", "Calculo
# diferencial e integral" son nombres de materia, o sea justo lo estudiable, y
# una lista de verbos de estudio las dejaba a todas fuera.
_ACCIONES = {
    "es": ("visita", "consigue", "habla", "contacta", "pide", "ofrece",
           "apuntate", "inscribete", "unete", "asiste", "postulate",
           "presentate", "voluntariado", "pasantia", "acompana", "preguntale",
           "busca a", "encuentra a", "trabaja con", "trabaja en", "ve a",
           "sal a", "empieza a trabajar", "postula"),
    "en": ("visit", "get an internship", "shadow ", "volunteer", "join ",
           "attend", "apply ", "reach out", "talk to", "ask someone",
           "find someone", "work at", "work with", "go to", "intern "),
}

# Verbos de mando que se quitan del texto antes de usarlo como consulta:
# "aprende estadistica bayesiana" busca peor que "estadistica bayesiana".
_VERBOS = {
    "es": ("aprende", "estudia", "entiende", "domina", "practica", "repasa",
           "memoriza", "lee", "profundiza", "conoce", "maneja", "diseña",
           "escribe", "construye", "haz", "coge", "lleva", "sigue", "mide",
           "decide", "demuestra", "explica", "especializate"),
    "en": ("learn", "study", "understand", "master", "practise", "practice",
           "review", "read", "know", "design", "write", "build", "make",
           "take", "keep", "follow", "measure", "decide", "show", "explain"),
}

# Sustantivos que delatan una sub-tarea de salir al mundo aunque la frase no
# empiece por el verbo: "Una pasantia de verano o una monitoria".
_NOMBRES_ACCION = ("pasantia", "voluntariado", "monitoria", "internship",
                   "practicas profesionales")

# Palabras que, si abren la frase, no aportan a la busqueda: articulos y los
# verbos de mando de arriba.
_ARRANQUES = {
    "es": tuple(_sin_tildes(v) for v in _VERBOS["es"]) + ("un", "una", "el", "la", "los", "las"),
    "en": tuple(_sin_tildes(v) for v in _VERBOS["en"]) + ("a", "an", "the"),
}

# Donde se corta la frase: a partir del nexo empieza la explicacion, no el
# tema.
_NEXOS = {
    "es": ("que", "para", "con", "sin", "como", "antes", "cuando", "donde",
           "aunque", "pero", "hasta", "desde", "porque", "y", "o", "en", "de"),
    "en": ("that", "which", "to", "with", "without", "as", "before", "when",
           "where", "although", "but", "until", "because", "and", "or"),
}

# Tipos de recurso, en el orden en que se muestran.
ORDEN = ("video", "practice", "read")


class ResourceLibrary:
    """El catalogo, cargado una vez."""

    def __init__(self, path: Path | str = _DATA):
        datos = json.loads(Path(path).read_text(encoding="utf-8"))
        self.busquedas: Dict[str, str] = datos.get("search", {})
        self.temas: Dict[str, Dict[str, Any]] = {
            k: v for k, v in datos.get("topics", {}).items() if not k.startswith("_")
        }
        # Las claves de emparejamiento, sin tildes y ordenadas de mas larga a
        # mas corta: "base de datos" tiene que ganarle a "datos", o toda
        # mencion de una base de datos acabaria en el tema generico.
        self._claves: List[tuple[str, str]] = sorted(
            ((_sin_tildes(clave), tema)
             for tema, cuerpo in self.temas.items()
             for clave in cuerpo.get("match", [])),
            key=lambda par: len(par[0]),
            reverse=True,
        )

    # -- emparejamiento ---------------------------------------------------
    def topic_for(self, texto: str) -> Optional[str]:
        """El tema de esta sub-tarea, o None si ninguno encaja."""
        plano = _sin_tildes(texto)
        for clave, tema in self._claves:
            # Con limite de palabra: "web" no puede dispararse dentro de
            # "webinar", ni "agr" dentro de "agrada".
            if re.search(rf"(?<![a-z0-9]){re.escape(clave)}", plano):
                return tema
        return None

    @staticmethod
    def _es_estudiable(texto: str, lang: str) -> bool:
        plano = _sin_tildes(texto).lstrip()
        acciones = _ACCIONES.get(lang, _ACCIONES["en"])
        if any(plano.startswith(_sin_tildes(a)) for a in acciones):
            return False
        # Hay sub-tareas que no empiezan por el verbo pero siguen siendo de
        # salir al mundo: "Una pasantia de verano o una monitoria".
        return not any(n in plano for n in _NOMBRES_ACCION)

    @staticmethod
    def _consulta(texto: str, lang: str, career: str = "") -> str:
        """El texto convertido en algo buscable.

        Tres recortes, cada uno por un motivo distinto:

        - La primera palabra se quita solo si es articulo o verbo de mando.
          Quitarla siempre destrozaba las mejores: "Estadistica descriptiva"
          se quedaba en "descriptiva".

        - Se corta en el primer nexo. Una sub-tarea esta escrita como una
          frase completa, y buscar "README que le permita a un desconocido
          ejecutarla" no devuelve nada util; "README" si.

        - Se le pega la carrera, que es el contexto que la frase suelta no
          tiene: "README" a secas es ambiguo, "README ingenieria de software"
          no.
        """
        limpio = texto.split(".")[0].split(":")[0].strip()
        palabras = limpio.split()
        if palabras and _sin_tildes(palabras[0]) in _ARRANQUES.get(lang, ()):
            palabras = palabras[1:]

        nucleo: List[str] = []
        for palabra in palabras[:8]:
            if _sin_tildes(palabra.strip(",;")) in _NEXOS.get(lang, ()):
                break
            nucleo.append(palabra)
            if len(nucleo) == 5:
                break

        consulta = " ".join(nucleo).strip(" ,;-") or limpio
        return f"{consulta} {career}".strip() if career else consulta

    # -- construccion de enlaces -----------------------------------------
    def _url_busqueda(self, motor: str, consulta: str, lang: str) -> Optional[str]:
        # `wikipedia` elige idioma; los demas motores son uno solo.
        nombre = f"wikipedia_{lang}" if motor == "wikipedia" else motor
        plantilla = self.busquedas.get(nombre) or self.busquedas.get(motor)
        if not plantilla:
            return None
        return plantilla.replace("{q}", quote_plus(consulta))

    def _campo(self, cuerpo: Dict[str, Any], nombre: str, lang: str) -> str:
        return cuerpo.get(f"{nombre}_{lang}") or cuerpo.get(nombre) or ""

    def resources_for(self, texto: str, lang: str = "es", career: str = "") -> List[Dict[str, str]]:
        """Los enlaces para una sub-tarea. Lista vacia si no lleva."""
        lang = "es" if str(lang).lower().startswith("es") else "en"
        if not texto or not self._es_estudiable(texto, lang):
            return []

        tema = self.topic_for(texto)
        salida: List[Dict[str, str]] = []

        if tema:
            cuerpo = self.temas[tema]
            consulta = self._campo(cuerpo, "query", lang)
            video = self._url_busqueda("youtube", consulta, lang)
            if video:
                salida.append({"kind": "video", "label": consulta, "url": video})
            for recurso in cuerpo.get("resources", []):
                url = recurso.get("url")
                if not url and recurso.get("search"):
                    url = self._url_busqueda(
                        recurso["search"], self._campo(recurso, "query", lang), lang
                    )
                if url:
                    salida.append({
                        "kind": recurso.get("kind", "read"),
                        "label": self._campo(recurso, "label", lang),
                        "url": url,
                    })
        else:
            # Sin tema conocido, la propia sub-tarea es la consulta.
            consulta = self._consulta(texto, lang, career) or texto
            for motor, tipo, etiqueta in (
                ("youtube", "video", consulta),
                ("wikipedia", "read", "Wikipedia"),
                ("ocw", "practice", "MIT OpenCourseWare"),
            ):
                url = self._url_busqueda(motor, consulta, lang)
                if url:
                    salida.append({"kind": tipo, "label": etiqueta, "url": url})

        salida.sort(key=lambda r: ORDEN.index(r["kind"]) if r["kind"] in ORDEN else len(ORDEN))
        return salida


_library: Optional[ResourceLibrary] = None


def library() -> ResourceLibrary:
    global _library
    if _library is None:
        _library = ResourceLibrary()
    return _library


def for_item(texto: str, lang: str = "es", career: str = "") -> List[Dict[str, str]]:
    return library().resources_for(texto, lang, career)
