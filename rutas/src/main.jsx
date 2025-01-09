import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Ejemplo from './Ejemplo.jsx'
import City from './City.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/ejemplo" element={<Ejemplo />} />
      <Route path="/concierto" >
        <Route path=":city/:lugar" element={<City />} />
      </Route>
      <Route path="/restaurante" element={<Restaurante />} >
      <Route index element={<Home />} />
      <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
