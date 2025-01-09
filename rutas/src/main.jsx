import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Ejemplo from "./Ejemplo.jsx";
import City from "./City.jsx";
import Restaurante from "./Restaurante.jsx";
import Postres from "./Postres.jsx";
import Menu from "./Menu.jsx";
import DesayunoHome from "./DesayunoHome.jsx";
import Tostada from "./Tostada.jsx";
import TipoTostada from "./TipoTostada.jsx";
import TostadayBebida from "./TostadaYBebida.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/ejemplo" element={<Ejemplo />} />
        <Route path="/concierto">
          <Route path=":city/:lugar" element={<City />} />
        </Route>
        <Route path="/restaurante" element={<Restaurante />}>
          <Route path="menu" element={<Menu />} />
          <Route path="postres" element={<Postres />} />
        </Route>
        <Route path="desayuno">
          <Route index element={<DesayunoHome />} />
          <Route element={<Tostada />}>
            <Route path=":tipo" element={<TipoTostada />} />
            <Route path=":tipo/:bebida" element={<TostadayBebida />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
