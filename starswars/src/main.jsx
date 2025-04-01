import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/**
 * Punto de entrada principal de la aplicación React.
 * Renderiza el componente principal <App /> dentro del elemento con id 'root'.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
