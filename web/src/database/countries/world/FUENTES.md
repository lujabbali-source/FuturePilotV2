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
| Capital, moneda, idiomas, ciudades y coordenadas | [GeoNames](https://www.geonames.org/) | CC BY 4.0 |
| Nombre del país en español, miembros de la ONU, nombre de cada idioma, ubicación de las universidades | [Wikidata](https://www.wikidata.org/) | CC0 (dominio público) |
| Población | Banco Mundial, indicador `SP.POP.TOTL` | CC BY 4.0 |

Esta página es la atribución que piden GeoNames y el Banco Mundial. Wikidata es
CC0 y no exige nada.

**Ninguna fuente es ODbL, y es a propósito.** Hasta el 3 de septiembre de 2026
el nombre en español, la capital, la moneda y los idiomas venían de
[mledoze/countries](https://github.com/mledoze/countries), que es ODbL-1.0: esa
licencia exige atribución y además obliga a **compartir-igual las bases de
datos derivadas**. Esta carpeta es exactamente eso, una base derivada.

Mientras FuturePilot era un proyecto técnico, la duda era académica. Desde que
el objetivo es cobrar, deja de serlo: la cláusula alcanzaría al producto
entero. Se sustituyó por GeoNames (mismos campos, atribución, sin
compartir-igual) y Wikidata (CC0), y no se vuelve a meter una fuente ODbL aquí.

Esta misma página ya preveía la salida y resultó ser exacta:

> *"capital, moneda e idioma se pueden reemplazar por otra fuente sin tocar
> nada más, porque el importador ya los trata como campos sueltos."*

### El nombre de seis países está decidido a mano

La etiqueta de Wikidata en español es a veces el nombre *formal*, y para una
ficha que lee un estudiante de bachillerato eso es peor: nadie busca su futuro
en "República Popular China". Seis países llevan el nombre común, escrito
explícitamente en `NOMBRES_PROPIOS` dentro del importador: China, Taiwán,
Países Bajos, Esuatini, Myanmar y Micronesia.

En el caso de Esuatini no es solo estilo: el país se llama así desde 2018 y la
etiqueta de Wikidata en español sigue diciendo Suazilandia.

## Qué NO hay aquí, y por qué

- **Tipo de universidad (pública/privada).** La fuente no lo trae. Cero de
  6.768. Queda en `null` y la interfaz no pinta insignia.
- **Costo de vida, salarios, cultura, barrios.** Nada de esto se importa. Los
  números de dinero están licenciados (Numbeo) y lo editorial es criterio, no
  dato.

Todo eso está vacío a propósito. Un archivo que se ve completo y está lleno de
valores adivinados es peor que uno con huecos: sobre la pantalla un dato falso
se ve idéntico a uno cierto, y aquí hay estudiantes decidiendo dónde van a
vivir.

## Qué SÍ hay ahora: las ciudades

Antes esta sección decía que no había ciudades, porque la fuente de
universidades trae provincia en el 14% de los casos y provincia no es ciudad.

Eso se resolvió sin adivinar nada. `web/scripts/censo_ciudades.py` cruza las
ciudades de GeoNames (con lat/lng y población) contra las universidades de
Wikidata (con lat/lng) y asigna cada universidad a la ciudad más cercana
**midiendo la distancia**, que queda escrita en `cities/<pais>.js` junto a cada
una. Una distancia es comprobable; un parecido entre nombres no lo era. Lo que
queda a más de 30 km de cualquier ciudad conocida se queda sin asignar en vez
de forzarlo.

Son 2.668 ciudades y 11.269 universidades situadas. Solo entran las ciudades
con 2 o más universidades: `cities` se lee de forma síncrona al arrancar el
globo, y con todas eran 182 kB comprimidos en la carga inicial. Ver el
comentario de `MIN_UNIVERSIDADES` en el importador, que trae la tabla medida.

`tests/test_world_data.py` y `web/src/database/countries/world.test.js` impiden
que se rellenen a la brava.
