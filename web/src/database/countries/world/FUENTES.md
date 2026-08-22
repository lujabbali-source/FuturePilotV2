# De dónde salen estos datos

Los 192 países de esta carpeta están **generados**, no curados. Se producen con
`web/scripts/import_world.py` y se sobrescriben enteros en cada ejecución: no
edites nada aquí a mano.

América es distinta y vive en `../americas/` — está escrita a mano, tiene
ciudades, tipo de universidad y los 28 campos. Cuando un país se cura de
verdad, sale de aquí.

## Fuentes y licencias

| Dato | Fuente | Licencia |
|---|---|---|
| Universidades, dominio y sitio oficial | [Hipo/university-domains-list](https://github.com/Hipo/university-domains-list) | MIT |
| Nombre en español, capital, moneda, idiomas | [mledoze/countries](https://github.com/mledoze/countries) | **ODbL-1.0** |
| Población | Banco Mundial, indicador `SP.POP.TOTL` | CC-BY 4.0 |

**Sobre la ODbL:** exige atribución y tiene cláusula de compartir-igual sobre
las *bases de datos derivadas*. Esta página es la atribución. Si algún día
FuturePilot se distribuye comercialmente, conviene que un abogado mire esa
cláusula — usar los datos para producir páginas web es un caso distinto de
redistribuir la base, y la diferencia importa.

Si eso resultara ser un problema, la salida es directa: capital, moneda e
idioma se pueden reemplazar por otra fuente sin tocar nada más, porque el
importador ya los trata como campos sueltos.

## Qué NO hay aquí, y por qué

- **Tipo de universidad (pública/privada).** La fuente no lo trae. Cero de
  6.768. Queda en `null` y la interfaz no pinta insignia.
- **Ciudades.** La fuente trae provincia en el 14% de los casos, y provincia no
  es ciudad.
- **Costo de vida, salarios, cultura, barrios.** Nada de esto se importa. Los
  números de dinero están licenciados (Numbeo) y lo editorial es criterio, no
  dato.

Todo eso está vacío a propósito. Un archivo que se ve completo y está lleno de
valores adivinados es peor que uno con huecos: sobre la pantalla un dato falso
se ve idéntico a uno cierto, y aquí hay estudiantes decidiendo dónde van a
vivir.

`tests/test_world_data.py` impide que se rellenen a la brava.
