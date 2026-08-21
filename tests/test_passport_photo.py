# -*- coding: utf-8 -*-
"""La foto del pasaporte.

El campo guarda la cara de un estudiante que muchas veces es menor de edad, y
hasta ahora bastaba con que la cadena empezara por `data:image/` para acabar
en la base tal cual. Eso dejaba pasar tres cosas: EXIF con coordenadas GPS,
formatos que no son fotografias, y contenido que no era una imagen en
absoluto.
"""
import base64

import pytest


# Un JPEG minimo pero valido, con un segmento APP1/EXIF que lleva dentro una
# marca reconocible haciendo de coordenada. No hace falta un EXIF bien formado
# para la prueba: basta que el segmento este ahi y que despues no este.
GPS = b"GPSLatitude=4.7110;GPSLongitude=-74.0721"


def _segmento(marcador: bytes, carga: bytes) -> bytes:
    return marcador + (len(carga) + 2).to_bytes(2, "big") + carga


def _jpeg_con_exif() -> bytes:
    return (
        b"\xff\xd8"                                  # SOI
        + _segmento(b"\xff\xe0", b"JFIF\x00\x01\x02\x00\x00\x01\x00\x01\x00\x00")
        + _segmento(b"\xff\xe1", b"Exif\x00\x00" + GPS)   # APP1: lo que sobra
        + _segmento(b"\xff\xfe", b"tomada con el celular")  # comentario
        + _segmento(b"\xff\xdb", b"\x00" + b"\x10" * 64)  # tabla de cuantizacion
        + b"\xff\xda\x00\x08\x01\x01\x00\x00\x3f\x00"     # SOS
        + b"\x12\x34\x56\x78"                             # "datos" comprimidos
        + b"\xff\xd9"                                     # EOI
    )


def _data_url(crudo: bytes, tipo: str = "image/jpeg") -> str:
    return f"data:{tipo};base64," + base64.b64encode(crudo).decode("ascii")


def _guardar(client, headers, data_url):
    return client.put(
        "/api/v1/passport/profile",
        json={"photo_data_url": data_url},
        headers=headers,
    )


def test_the_gps_of_a_phone_photo_never_reaches_the_database(client, register_and_login):
    """La razon de todo este archivo.

    Una foto de celular trae EXIF pegado: modelo, fecha exacta y muy a menudo
    las coordenadas de donde se tomo - que en la foto de perfil de un
    estudiante suele ser su casa o su colegio. Quien sube su cara no esta
    aceptando publicar donde vive.
    """
    _, headers = register_and_login()
    crudo = _jpeg_con_exif()
    assert GPS in crudo, "el JPEG de prueba tiene que traer el GPS para que la prueba valga"

    respuesta = _guardar(client, headers, _data_url(crudo))
    assert respuesta.status_code == 200

    guardada = respuesta.json()["profile"]["photo_data_url"]
    devuelto = base64.b64decode(guardada.split(",", 1)[1])
    assert GPS not in devuelto
    assert b"tomada con el celular" not in devuelto
    # Y sigue siendo un JPEG que un navegador puede pintar.
    assert devuelto.startswith(b"\xff\xd8\xff")
    assert devuelto.endswith(b"\xff\xd9")
    assert b"\xff\xda" in devuelto, "los datos de la imagen se perdieron"


def test_an_svg_is_not_a_passport_photo(client, register_and_login):
    """`data:image/svg+xml` empezaba por `data:image/` y pasaba el filtro. Un
    SVG es un documento con marcado dentro, no una fotografia."""
    _, headers = register_and_login()
    svg = b'<svg xmlns="http://www.w3.org/2000/svg"><text>hola</text></svg>'
    respuesta = _guardar(client, headers, _data_url(svg, "image/svg+xml"))
    assert respuesta.status_code == 422


def test_the_field_is_not_free_storage(client, register_and_login):
    """`data:image/png;base64,` seguido de cualquier cosa tambien pasaba: el
    campo servia para aparcar 300 KB de lo que fuera por cuenta."""
    _, headers = register_and_login()
    basura = base64.b64encode(b"esto no es una imagen, es texto" * 20).decode()
    respuesta = _guardar(client, headers, f"data:image/png;base64,{basura}")
    assert respuesta.status_code == 422


def test_a_real_png_is_accepted(client, register_and_login):
    """La validacion estricta no puede cerrarle la puerta a una foto legitima."""
    _, headers = register_and_login()
    png = (
        b"\x89PNG\r\n\x1a\n"
        + _segmento(b"\x00\x00", b"")  # relleno cualquiera: solo miramos la firma
        + b"IHDR" + b"\x00" * 16
    )
    respuesta = _guardar(client, headers, _data_url(png, "image/png"))
    assert respuesta.status_code == 200
    assert respuesta.json()["profile"]["photo_data_url"].startswith("data:image/png;base64,")


def test_a_student_can_take_their_face_back_without_deleting_the_account(
    client, register_and_login
):
    """No habia forma de quitar la foto: para borrarse la cara del pasaporte
    tocaba borrar la cuenta entera. La politica de privacidad promete poder
    corregir lo que este mal, y esto es lo que lo cumple."""
    _, headers = register_and_login()
    _guardar(client, headers, _data_url(_jpeg_con_exif()))
    assert client.get("/api/v1/passport", headers=headers).json()["profile"]["photo_data_url"]

    respuesta = _guardar(client, headers, "")
    assert respuesta.status_code == 200
    assert respuesta.json()["profile"]["photo_data_url"] is None
    # Y sigue borrada al volver a leer el pasaporte, no solo en la respuesta.
    assert client.get("/api/v1/passport", headers=headers).json()["profile"]["photo_data_url"] is None


def test_leaving_the_photo_out_does_not_erase_it(client, register_and_login):
    """Guardar el pais no puede borrar la cara de paso: `None` es "no toques
    este campo" y la cadena vacia es "quitala". Confundirlos hace que editar
    la ciudad borre la foto."""
    _, headers = register_and_login()
    _guardar(client, headers, _data_url(_jpeg_con_exif()))

    respuesta = client.put(
        "/api/v1/passport/profile",
        json={"city": "Bogotá"},
        headers=headers,
    )
    assert respuesta.status_code == 200
    assert respuesta.json()["profile"]["photo_data_url"]
    assert respuesta.json()["profile"]["city"] == "Bogotá"
