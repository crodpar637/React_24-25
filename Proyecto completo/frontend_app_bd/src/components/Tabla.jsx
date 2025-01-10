import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Tabla({ rutaAPI }) {
    const [datos, setDatos] = useState([]);

    useEffect(() => {

        async function fetchDatos(ruta) {
            let response = await fetch(ruta);

            if (response.ok) {
                let arrayDatos = await response.json();

                setDatos(arrayDatos);
            }
        }

        fetchDatos(rutaAPI);

    }, [rutaAPI]);

    let celdasEncabezado = <></>;
    let filasDatos = <></>;
    if (datos.length > 0) {
        for (let propiedad in datos[0]) {
            celdasEncabezado.push(<TableCell sx={{fontWeight: 'bold'}} key={propiedad}>{propiedad.toUpperCase()}</TableCell>);
        }

        filasDatos = datos.map((fila, i) => {
            let filaCeldas = [];

            for (let propiedad in fila) {
                filaCeldas.push(<TableCell>{fila[propiedad]}</TableCell>);
            }

            return (
                <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {filaCeldas}
                </TableRow >
            );
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {celdasEncabezado}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filasDatos}
                </TableBody>
            </Table>
        </TableContainer>
    );
}