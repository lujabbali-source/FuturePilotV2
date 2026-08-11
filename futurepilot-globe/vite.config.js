import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // El backend unificado (futurepilot-IA/app.py) monta el build de esta
  // app bajo /globe. Sin este base path, los assets de dist/ se piden
  // desde la raiz del dominio (/assets/...) en vez de /globe/assets/...
  // y la pagina carga en blanco.
  base: "/globe/",

  // En produccion el globo y la API comparten origen (ambos los sirve
  // futurepilot-IA/app.py), asi que los servicios usan rutas relativas
  // "/api/v1/...". Con `npm run dev` el globo corre en su propio puerto,
  // de modo que ese mismo path relativo tiene que reenviarse al backend -
  // esto es lo que evita tener un host absoluto hardcodeado en el codigo.
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
})
