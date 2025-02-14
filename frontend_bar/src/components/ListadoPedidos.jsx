import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";
import generatePDF from "../utils/generatePDF";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Estilos del PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "16%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: { width: "16%", borderStyle: "solid", borderWidth: 1, padding: 5 },
});

// Componente del documento PDF
const ListadoPedidosPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Listado de pedidos</Text>
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>IDPEDIDO</Text>
          <Text style={styles.tableColHeader}>CLIENTE</Text>
          <Text style={styles.tableColHeader}>PLATO</Text>
          <Text style={styles.tableColHeader}>UNIDADES</Text>
          <Text style={styles.tableColHeader}>PRECIO</Text>
          <Text style={styles.tableColHeader}>TOTAL</Text>
        </View>
        {/* Filas de datos */}
        {data.map((row) => (
          <View style={styles.tableRow} key={row.id}>
            <Text style={styles.tableCol}>{row.idpedido}</Text>
            <Text style={styles.tableCol}>{row.cliente}</Text>
            <Text style={styles.tableCol}>{row.idplato_plato.nombre}</Text>
            <Text style={styles.tableCol}>{row.unidades}</Text>
            <Text style={styles.tableCol}>
              {" "}
              {row.idplato_plato.precio + " €"}
            </Text>
            <Text style={styles.tableCol}>
              {(row.idplato_plato.precio * row.unidades).toFixed(2) + " €"}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

function ListadoPedidos() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getPedidos() {
      let response = await fetch(apiUrl + "/pedidos", {
        method: "GET",
        credentials: "include",
      }); // include para enviar las cookies

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getPedidos();
  }, []); // Se ejecuta solo en el primer renderizado

  return (
    <>
      <Box id="pdf-content">
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
                    <TableCell align="right">
                      {row.idplato_plato.precio + " €"}
                    </TableCell>
                    <TableCell align="right">
                      {(row.idplato_plato.precio * row.unidades).toFixed(2) +
                        " €"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" onClick={() => window.print()}>
          Imprimir listado (navegador)
        </Button>
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" onClick={generatePDF}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
      </Box>
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained">
          <PDFDownloadLink
            document={<ListadoPedidosPDF data={rows} />}
            fileName="tabla.pdf"
          >
            {({ loading }) =>
              loading ? "Generando PDF..." : "Imprimir listado (react-pdf)"
            }
          </PDFDownloadLink>
        </Button>
      </Box>
    </>
  );
}

export default ListadoPedidos;
