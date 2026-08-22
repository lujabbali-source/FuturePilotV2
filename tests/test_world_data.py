# -*- coding: utf-8 -*-
"""Los 192 paises importados de fuentes abiertas.

America esta curada a mano: 515 universidades con su tipo, su sitio y su
ciudad. El resto del mundo viene de un volcado automatico que trae SOLO lo que
las fuentes pueden verificar.

La linea que estos tests defienden es esa frontera. Un dato importado que se
disfraza de curado es peor que no tenerlo: sobre la pantalla se ven igual, y
un estudiante no tiene forma de saber cual de los dos le esta mintiendo.
"""
import re
from pathlib import Path

import pytest

RAIZ = Path(__file__).resolve().parent.parent
MUNDO = RAIZ / "web" / "src" / "database" / "countries" / "world"
AMERICAS = RAIZ / "web" / "src" / "database" / "countries" / "americas"


def paises_mundo():
    return sorted(f for f in MUNDO.glob("*.js") if f.name != "index.js")


def listas_universidades():
    return sorted((MUNDO / "universities").glob("*.js"))


def test_the_import_actually_produced_a_world():
    """Si el importador falla a medias deja unos pocos archivos y nadie se
    entera hasta que el globo sale medio vacio."""
    paises = paises_mundo()
    assert len(paises) > 150, f"solo {len(paises)} paises importados"
    assert len(listas_universidades()) == len(paises), \
        "cada pais tiene que tener su archivo de universidades, aunque este vacio"


def test_no_imported_university_claims_to_be_public_or_private():
    """La regla central.

    La fuente abierta no dice si una universidad es publica o privada: cero de
    6.768. Tu interfaz ya muestra esa etiqueta porque las 515 de America si la
    tienen, y de ahi sale la tentacion de rellenarla adivinando para que las
    nuevas "se vean completas" - por defecto a publica, o con una regla del
    tipo "si el dominio es .edu es publica".

    Eso estaria mal en miles de casos y nadie lo notaria, porque una etiqueta
    equivocada se ve exactamente igual que una correcta.
    """
    culpables = []
    for archivo in listas_universidades():
        texto = archivo.read_text(encoding="utf-8")
        for m in re.finditer(r'type:\s*"(\w+)"', texto):
            culpables.append(f"{archivo.name}: type={m.group(1)}")
    assert not culpables, (
        "universidades importadas con un tipo inventado:\n  "
        + "\n  ".join(culpables[:10])
    )


def test_every_imported_country_says_it_is_imported():
    """Sin la marca no hay forma de distinguir un pais a medias de uno
    completo, ni de saber que queda por curar."""
    sin_marca = [
        f.name for f in paises_mundo()
        if 'dataStatus: "source-open-dataset"' not in f.read_text(encoding="utf-8")
    ]
    assert not sin_marca, f"paises importados sin marcar: {sin_marca[:10]}"


def test_every_imported_country_credits_its_sources():
    """Una de las fuentes es ODbL, que exige atribucion. Y aunque no la
    exigiera: quien lea el dato tiene derecho a saber de donde salio."""
    sin_fuente = [
        f.name for f in paises_mundo()
        if '"Hipo/university-domains-list (MIT)"' not in f.read_text(encoding="utf-8")
    ]
    assert not sin_fuente, f"paises sin atribucion: {sin_fuente[:10]}"


def test_imported_countries_invent_no_cities():
    """La fuente trae provincia en el 14% de los casos, y provincia no es
    ciudad. Repartir universidades entre ciudades adivinadas seria la peor
    clase de dato falso: el que parece preciso."""
    con_ciudades = [
        f.name for f in paises_mundo()
        if not re.search(r"cities:\s*\[\s*\]", f.read_text(encoding="utf-8"))
    ]
    assert not con_ciudades, f"paises importados con ciudades: {con_ciudades[:10]}"


def test_the_count_matches_the_list():
    """`universityCount` se lee sin cargar la lista, asi que si los dos se
    desincronizan la pantalla promete un numero que luego no aparece."""
    desajustes = []
    for pais in paises_mundo():
        texto = pais.read_text(encoding="utf-8")
        m = re.search(r"universityCount:\s*(\d+)", texto)
        assert m, f"{pais.name}: sin universityCount"
        lista = MUNDO / "universities" / pais.name
        real = lista.read_text(encoding="utf-8").count("defineUniversity(")
        if int(m.group(1)) != real:
            desajustes.append(f"{pais.name}: dice {m.group(1)}, tiene {real}")
    assert not desajustes, "\n  ".join(desajustes[:10])


def test_the_curated_countries_are_not_shadowed():
    """America es mejor dato que el importado - tiene ciudades, tipos y los 28
    campos. Si un pais apareciera en los dos sitios, el importado podria pisar
    el curado y se perderia el trabajo hecho a mano sin que nadie lo viera."""
    curados = {f.stem for f in AMERICAS.glob("*.js") if f.name != "index.js"}
    curados.add("colombia")
    importados = {f.stem for f in paises_mundo()}
    choque = curados & importados
    assert not choque, f"paises en world/ que ya estaban curados: {sorted(choque)}"


def test_every_imported_university_has_a_name():
    vacias = []
    for archivo in listas_universidades():
        texto = archivo.read_text(encoding="utf-8")
        if re.search(r'name:\s*(""|null)', texto):
            vacias.append(archivo.name)
    assert not vacias, f"universidades sin nombre: {vacias[:10]}"


def test_no_imported_university_carries_a_made_up_website():
    """Solo se acepta lo que la fuente traia: http o https. Un `website` que
    no sea una URL significa que alguien la construyo."""
    malas = []
    for archivo in listas_universidades():
        for m in re.finditer(r'website:\s*"([^"]*)"', archivo.read_text(encoding="utf-8")):
            if not m.group(1).startswith(("http://", "https://")):
                malas.append(f"{archivo.name}: {m.group(1)[:40]}")
    assert not malas, "sitios que no son URLs:\n  " + "\n  ".join(malas[:10])


def test_the_importer_can_be_run_again_without_hand_edits():
    """Los archivos son generados. Si alguien los edita a mano, la proxima
    ejecucion se lo lleva por delante sin avisar, asi que tienen que decirlo."""
    sin_aviso = [
        f.name for f in paises_mundo()
        if "No editar a mano" not in f.read_text(encoding="utf-8")
    ]
    assert not sin_aviso, f"archivos generados sin el aviso: {sin_aviso[:10]}"
