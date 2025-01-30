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

function PedidoMultiple() {
  const [platos, setPlatos] = useState([]);
  const [platosSeleccionados, setPlatosSeleccionados] = useState([]);
  const [platoSel, setPlatoSel] = useState(-1);

  const handleChange = (event) => {
    setPlatoSel(event.target.value);
  };

  /* function aceptar(){
  fetch(apiUrl + "/pedidos", { method: "POST", headers: { "Content-Type": "application/json" }, 
  body: JSON.stringify({ cliente: , platosSeleccionados: platosSeleccionados }) })

  */
  useEffect(() => {
    async function getPlatos() {
      let response = await fetch(apiUrl + "/platos");

      if (response.ok) {
        let data = await response.json();
        setPlatos(data.datos);
      }
    }

    getPlatos();
  }, []); // Se ejecuta solo en el primer renderizado
  function agregarPlato() {
    setPlatosSeleccionados([
      ...platosSeleccionados,
      platos.find((plato) => plato.idplato === platoSel),
    ]);
  }

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

        {/* <FormControl fullWidth>
          <InputLabel id="lblPlatosSeleccionados">Platos seleccionados</InputLabel>
          <Select
            multiple
            labelId="lblPlatosSeleccionados"
            id="lstPlatosSeleccionados"
            value={platosSeleccionados}
            label="Platos seleccionados"
            // onChange={handleChange}
          >
            {platosSeleccionados.map((plato) => (
              <MenuItem key={plato.idplato} value={plato.idplato}>
                {plato.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </Box>
    </>
  );
}

export default PedidoMultiple;


/* 
async createPayment(req, res) {
    // Implementa la lógica para crear un pago y registrar asientos y tickets

    // Recuperar datos del pago a registrar
    const { user_id, total_amount, seats } = req.body;

    // Inicia la transacción
    const t = await sequelize.transaction();

    try {
      const paymentInsertado = await Payment.create(
        { user_id, total_amount, payment_date: new Date(), status: 'completed' },
        { transaction: t }
      );

      for (let seat of seats) {
        // Por cada asiento 1. Se inserta un asiento 2. Se inserta un ticket
        const seatInsertado = await Seat.create(
          {
            event_zone_id: seat.event_zone_id,
            row_number: seat.row_number,
            seat_number: seat.seat_number,
            status: 'occupied'
          },
          { transaction: t }
        );
        const ticketInsertado = await Ticket.create(
          {
            user_id,
            seat_id: seatInsertado.seat_id,
            payment_id: paymentInsertado.payment_id,
            purchase_date: new Date(),
            price: seat.price,
            status: 'purchased'
          },
          { transaction: t }
        );
      }

      // Confirmar la transacción si todo sale bien
      await t.commit();
      res.json(Respuesta.exito(paymentInsertado, "Payment created"));
    } catch (error) {
      // Revertir la transacción en caso de error
      await t.rollback();
      logMensaje(error);
      res
        .status(500)
        .json(Respuesta.error(error, "Error creating payment"));
    }
  }

} 
  */