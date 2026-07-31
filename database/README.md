# Base de datos de FuturePilot

La base usa SQLite persistente en `database/data/futurepilot.sqlite`. El directorio se crea automáticamente y el archivo no se versiona.

## Comandos

```powershell
npm run db:init
npm run db:seed
npm run db:test
```

`db:seed` es idempotente: puede ejecutarse varias veces sin duplicar países, ciudades, universidades ni sus datos relacionados. La aplicación solamente debe crear `DatabaseService`; no debe recrear ni borrar la base durante un refresco de página.

## Estructura

- `schema.sql`: tablas, restricciones, claves foráneas, índices y timestamps.
- `connection.js`: conexión SQLite, WAL, foreign keys y transacciones.
- `queries/`: SQL parametrizado por entidad.
- `repositories/`: operaciones CRUD y búsquedas por relación.
- `services/DatabaseService.js`: punto de entrada para las consultas de la aplicación.
- `seed/`: datos mínimos de ejemplo y ejecutor repetible.

Las tablas `living_costs` y `rankings` incluyen año para permitir históricos. `images.gallery` se almacena como JSON válido. Las eliminaciones son restrictivas para evitar borrar accidentalmente el árbol de información dependiente.

## Información que conviene recopilar después

Para importar un país nuevo, el conjunto mínimo es:

1. País: `iso2`, `iso3`, nombre oficial, continente, moneda ISO y uno o varios idiomas.
2. Ciudades: nombre, coordenadas, población, capitalidad y fuente de cada dato.
3. Universidades: nombre oficial, nombre corto, web oficial, tipo, año de fundación, ciudad y país.
4. Programas: nombre oficial, grado, duración, modalidad, URL y universidad.
5. Becas: nombre, descripción, URL oficial, elegibilidad, fechas y universidad.
6. Costos: alquiler, alimentación, transporte, servicios, internet, moneda, año y fuente.
7. Rankings: posiciones QS, THE y Shanghai, año, categoría y fuente.
8. Imágenes: URL de portada, galería, licencia/fuente y ciudad.

Siempre conviene entregar identificadores ISO, URLs oficiales y la fecha/fuente de cada registro. Así se podrán hacer importaciones parciales o actualizaciones sin volver a enviar el país completo.
