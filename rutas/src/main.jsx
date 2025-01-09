import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Ejemplo from './Ejemplo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/ejemplo" element={<Ejemplo />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
