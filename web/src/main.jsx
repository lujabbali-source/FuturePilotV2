// Pide cuenta antes que nada. Primer import a proposito: ver exigirCuenta.js.
import "./shared/exigirCuenta.js";
import "./shared/passport-stamp-toast.js";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
