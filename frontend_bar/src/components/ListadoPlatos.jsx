import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";


function ListadoPlatos() {
    const [rows, setRows] = useState([]);

    useEffect(() => { 
        async function getPlatos() {
            let response = await fetch("http://localhost:3000/api/platos");
            
            if (response.ok) {
                let data = await response.json();
                setRows(data.datos);
            }
        }

        getPlatos();
    },[]); // Se ejecuta solo en el primer renderizado

  return (
    <>
      <Typography variant="h4">Listado de platos</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>IDPLATO</TableCell>
              <TableCell align="right">NOMBRE</TableCell>
              <TableCell align="right">DESCRIPCIÓN</TableCell>
              <TableCell align="right">PRECIO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.idplato}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.idplato}</TableCell>
                <TableCell >{row.nombre}</TableCell>
                <TableCell >{row.descripcion}</TableCell>
                <TableCell align="right">{row.precio}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListadoPlatos;
