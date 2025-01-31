import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {Box} from "@mui/material";
import { apiUrl } from '../config';

function ListadoPedidos() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getPedidos() {
      let response = await fetch(apiUrl + "/pedidos", {method: "GET" ,  credentials: "include"}); // include para enviar las cookies

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getPedidos();
  }, []); // Se ejecuta solo en el primer renderizado

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de pedidos
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">IDPEDIDO</TableCell>
                <TableCell>CLIENTE</TableCell>
                <TableCell>PLATO</TableCell>
                <TableCell align="right">UNIDADES</TableCell>
                <TableCell align="right">PRECIO</TableCell>
                <TableCell align="right">TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.idpedido}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.idpedido}</TableCell>
                  <TableCell>{row.cliente}</TableCell>
                  <TableCell>{row.idplato_plato.nombre}</TableCell>
                  <TableCell align="right">{row.unidades}</TableCell>
                  <TableCell align="right">{row.idplato_plato.precio + " €"}</TableCell>
                  <TableCell align="right">{(row.idplato_plato.precio * row.unidades).toFixed(2) + " €"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoPedidos;
