import articulos from "./articulos.js";
import TablaDatos from "./TablaDatos";
import CuadroBusqueda from "./CuadroBusqueda.jsx";
import { useState } from "react";
import Checkbox from "./Checkbox";

function TablaArticulos() {
  const [textoFiltro, setTextoFiltro] = useState("");
  const [filtrarDisponibles, setFiltrarDisponibles] = useState(false);

  function handleChange(textoBusqueda) {
    setTextoFiltro(textoBusqueda);
  }

  function handleCheck(checked) {
    setFiltrarDisponibles(checked);
  }

  // Filtro según valor de variables de estado
  let primerFiltrado = [...articulos]; // copia del array original
  if (filtrarDisponibles) {
    primerFiltrado = articulos.filter(
      (articulo) => articulo.disponible == true
    );
  }

  let segundoFiltrado = primerFiltrado.filter((producto) =>
    producto.nombre.toUpperCase().includes(textoFiltro.toUpperCase())
  );

  return (
    <>
      <CuadroBusqueda manejador={handleChange} />
      <Checkbox manejador={handleCheck} />
      <TablaDatos datos={segundoFiltrado} />
    </>
  );
}

export default TablaArticulos;
