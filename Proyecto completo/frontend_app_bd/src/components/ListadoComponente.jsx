import { Grid, Typography } from "@mui/material";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { peticionGET } from "../utils/ajax";
import { Link } from "react-router-dom";

function ListadoComponente() {
  const [datosListado, setDatosListado] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let parametros = new FormData();
      parametros.append("listado", "true");

      let respuesta = await peticionGET("/componentes", parametros);

      if (respuesta.ok) {
        const datos = respuesta.datos;

        setDatosListado(datos);
      }
    }

    fetchData();
  }, []); // Solo se ejecuta en el primer renderizado

  return (
    <>
      <Grid container sx={{ px: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
          Listado de componentes
        </Typography>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope="col">IDCOMPONENTE</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">DESCRIPCIÓN</th>
              <th scope="col">PRECIO</th>
              <th scope="col">TIPO</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {datosListado.map((fila) => (
              <tr key={fila.idcomponente}>
                <Link to={"/fichacomponente/" + fila.idcomponente}><td>{fila.idcomponente}</td></Link>
                <td>{fila.nombre}</td>
                <td>{fila.descripcion}</td>
                <td>{fila.precio}</td>
                <td>{fila.tipo}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </Grid>
    </>
  );
}

export default ListadoComponente;
