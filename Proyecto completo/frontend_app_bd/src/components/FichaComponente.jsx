import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { peticionGET } from "../utils/ajax";

function FichaComponente() {
  // Recupero el valor del parámetro de la ruta
  // /fichacomponente/:idcomponente
  const { idcomponente } = useParams();
  const [datosComponente, setDatosComponente] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let parametros = new FormData();
      parametros.append("relations", "true");

      let respuesta = await peticionGET(
        "/componentes/" + idcomponente,
        parametros
      );

      if (respuesta.ok) {
        const datos = respuesta.datos;

        setDatosComponente(datos);
      }
    }

    fetchData();
  }, [idcomponente]); // Solo se ejecuta en el primer renderizado

  if (datosComponente == null) return <h1>Datos no cargados</h1>;

  return (
    <>
      <h1>Ficha del componente: {datosComponente.idcomponente}</h1>
      <h5>Nombre: {datosComponente.nombre}</h5>
      <h5>Descripcion: {datosComponente.descripcion}</h5>
      <h5>Precio: {datosComponente.precio}</h5>
      <h5>Tipo: {datosComponente.tipo}</h5>
    </>
  );
}

export default FichaComponente;
