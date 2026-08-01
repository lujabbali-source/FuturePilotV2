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
})
