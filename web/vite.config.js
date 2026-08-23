import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Frontend de FuturePilot. Empezo siendo solo el globo 3D y ahora es el
// build unico del sitio: cada pagina migrada se declara como una entrada
// mas en rollupOptions.input (ver docs/ y DOCUMENTACION_Y_PLAN.md, Fase 3).
//
// Las paginas que todavia no se han migrado siguen viviendo en Frontend/ y
// las sirve FastAPI tal cual. Las dos cosas conviven sin pisarse: aqui solo
// esta lo que ya se compila.
export default defineConfig({
  plugins: [react()],

  // Todo lo que emite el build (assets con hash y el contenido de public/)
  // cuelga de /app/, y FastAPI monta el dist ahi entero. Se eligio un
  // prefijo propio en vez de "/" porque la raiz del dominio ya la sirve el
  // backend: la landing, /Frontend/*, y las rutas de cada pagina. Las URLs
  // que ve el usuario no cambian - /globe y /assessment siguen igual, solo
  // sus assets viven bajo /app/.
  base: '/app/',

  build: {
    rollupOptions: {
      input: {
        globe: resolve(import.meta.dirname, 'globe.html'),
        assessment: resolve(import.meta.dirname, 'assessment.html'),
        login: resolve(import.meta.dirname, 'login.html'),
        'reset-password': resolve(import.meta.dirname, 'reset-password.html'),
        passport: resolve(import.meta.dirname, 'passport.html'),
        journey: resolve(import.meta.dirname, 'journey.html'),
        flightplan: resolve(import.meta.dirname, 'flightplan.html'),
        index: resolve(import.meta.dirname, 'index.html'),
        careers: resolve(import.meta.dirname, 'careers.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        parent: resolve(import.meta.dirname, 'parent.html'),
        parents: resolve(import.meta.dirname, 'parents.html'),
        'admin-dashboard': resolve(import.meta.dirname, 'admin-dashboard.html'),
        'admin-login': resolve(import.meta.dirname, 'admin-login.html'),
        'system-health': resolve(import.meta.dirname, 'system-health.html'),
      },
    },
  },

  // En produccion el sitio y la API comparten origen, asi que el codigo usa
  // rutas relativas "/api/v1/...". Con `npm run dev` esto corre en su propio
  // puerto, de modo que ese mismo path tiene que reenviarse al backend. Lo
  // mismo con /Frontend, del que las paginas migradas todavia toman CSS e
  // imagenes compartidas mientras dure la migracion.
  server: {
    proxy: {
      '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/Frontend': { target: 'http://127.0.0.1:8000', changeOrigin: true },
    },
  },
})
