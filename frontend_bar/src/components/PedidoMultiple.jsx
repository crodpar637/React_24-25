import { useEffect, useState } from "react";
import { apiUrl } from "../config";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

/**
 * Componente para gestionar pedidos múltiples.
 * @component
 * @returns {JSX.Element} JSX element del componente PedidoMultiple.
 */
function PedidoMultiple() {
  const [platos, setPlatos] = useState([]);
  const [platosSeleccionados, setPlatosSeleccionados] = useState([]);
  const [platoSel, setPlatoSel] = useState('');

  /**
   * Maneja el cambio en el selector de platos.
   * @param {Object} event - Evento de cambio.
   */
  const handleChange = (event) => {
    setPlatoSel(event.target.value);
  };

  useEffect(() => {
    async function getPlatos() {
      let response = await fetch(apiUrl + "/platos");

      if (response.ok) {
        let data = await response.json();
        setPlatos(data.datos);
      }
    }

    getPlatos();
  }, []);

  /**
   * Agrega un plato a la lista de platos seleccionados.
   */
  function agregarPlato() {
    setPlatosSeleccionados([
      ...platosSeleccionados,
      platos.find((plato) => plato.idplato === platoSel),
    ]);
  }

  /**
   * Maneja la eliminación de un plato de la lista de platos seleccionados.
   * @param {number} idplato - ID del plato a eliminar.
   */
  function handleDelete(idplato) {
    setPlatosSeleccionados([
         ...platosSeleccionados.filter((plato) => plato.idplato !== idplato),
    ]);
  }

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Pedido múltiple
      </Typography>
      <Box sx={{ maxWidth: 500 }}>
        <FormControl fullWidth>
          <InputLabel id="lblPlatos">Platos</InputLabel>
          <Select
            labelId="lblPlatos"
            id="lstPlatos"
            value={platoSel}
            label="Plato a seleccionar"
            onChange={handleChange}
          >
            {platos.map((plato) => (
              <MenuItem key={plato.idplato} value={plato.idplato}>
                {plato.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ my: 3 }}
          onClick={() => agregarPlato()}
        >
          Agregar plato
        </Button>
        <Box sx={{ mx: 4 }}>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>NOMBRE</TableCell>
                  <TableCell align="right">PRECIO</TableCell>
                  <TableCell align="center">ELIMINAR</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {platosSeleccionados.map((row) => (
                  <TableRow
                    key={row.idplato}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.nombre}</TableCell>

                    <TableCell align="right">{row.precio + " €"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(row.idplato)}
                        color="error"
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default PedidoMultiple;