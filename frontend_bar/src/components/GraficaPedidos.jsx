import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  Cell,
  Label,
  LabelList,
  Legend,
  Pie,
  PieChart,
  Text,
  Tooltip,
} from "recharts";
import { apiUrl } from "../config";
import generatePDF from "../utils/generatePDF";
import Typography from "@mui/material/Typography";

/**
 * Componente React que muestra gráficos de pedidos utilizando gráficos de pastel (PieChart).
 * 
 * @component
 * @example
 * return (
 *   <GraficaPedidos />
 * )
 * 
 * @returns {JSX.Element} Un componente que renderiza dos gráficos de pastel y un botón para imprimir un PDF.
 * 
 * @description
 * Este componente obtiene datos de pedidos desde una API y los muestra en dos gráficos de pastel:
 * uno para las ventas y otro para los ingresos. También incluye un botón para generar un PDF del contenido.
 * 
 * @function
 * @name GraficaPedidos
 * 
 * @property {Array} datos - Estado que almacena los datos de los pedidos.
 * @property {Array} COLORS - Array de colores para los gráficos.
 * 
 * @requires useState - Hook de React para manejar el estado del componente.
 * @requires useEffect - Hook de React para manejar efectos secundarios en el componente.
 * @requires fetch - Función para realizar solicitudes HTTP.
 * @requires PieChart, Pie, Cell, Tooltip, Legend, Label, LabelList - Componentes de la librería 'recharts' para gráficos.
 * @requires Box, Typography, Button - Componentes de la librería '@mui/material' para la interfaz de usuario.
 * 
 * @function getDatosGraficaPedidos
 * @description Función asíncrona que obtiene los datos de la API y actualiza el estado 'datos'.
 * 
 * @function generatePDF
 * @description Función que genera un PDF del contenido utilizando jsPDF y html2canvas.
 */
/**
 * GraficaPedidos is a React functional component that fetches and displays sales and income data
 * in two pie charts using the Recharts library. The data is fetched from an API endpoint and 
 * processed to remove attributes containing a dot in their name.
 *
 * @component
 * @example
 * return (
 *   <GraficaPedidos />
 * )
 *
 * @returns {JSX.Element} A React component that renders two pie charts and a button to generate a PDF.
 *
 * @function
 * @name GraficaPedidos
 *
 * @description
 * - Fetches sales and income data from the API endpoint "/pedidos/grafica".
 * - Processes the data to remove attributes containing a dot in their name.
 * - Displays the sales data in a pie chart with a legend and tooltips.
 * - Displays the income data in another pie chart with a legend and tooltips.
 * - Provides a button to generate a PDF of the displayed data using jsPDF and html2canvas.
 *
 * @requires useState
 * @requires useEffect
 * @requires PieChart
 * @requires Pie
 * @requires Cell
 * @requires Tooltip
 * @requires Legend
 * @requires Label
 * @requires LabelList
 * @requires Box
 * @requires Typography
 * @requires Button
 */
function GraficaPedidos() {
  const [datos, setDatos] = useState([]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28BFE",
    "#FF4567",
    "#32CD32",
    "#8B008B",
    "#FF1493",
    "#00FFFF",
    "#7FFF00",
    "#D2691E",
    "#DC143C",
    "#FFD700",
    "#ADFF2F",
    "#8A2BE2",
    "#FF6347",
    "#40E0D0",
    "#DA70D6",
    "#FF4500",
    "#1E90FF",
    "#3CB371",
    "#9932CC",
    "#FF8C00",
    "#66CDAA",
    "#B22222",
    "#FF00FF",
    "#FFDEAD",
    "#4B0082",
    "#20B2AA",
    "#E6E6FA",
    "#8B4513",
    "#48D1CC",
    "#FF69B4",
    "#CD5C5C",
    "#4682B4",
    "#EE82EE",
    "#FF7F50",
    "#9ACD32",
    "#BA55D3",
    "#6495ED",
    "#2E8B57",
    "#FFB6C1",
    "#DB7093",
    "#5F9EA0",
    "#FFDAB9",
    "#FF0000",
    "#8FBC8F",
    "#7B68EE",
    "#FA8072",
  ];

  useEffect(() => {
    async function getDatosGraficaPedidos() {
      let response = await fetch(apiUrl + "/pedidos/grafica", {
        method: "GET",
        credentials: "include",
      }); // include para enviar las cookies

      if (response.ok) {
        let data = await response.json();
        // Hacer map para simplicar estructura de datos, eliminando atributos que contienen un punto en el nombre
        let datosGrafica = data.datos.map((fila) => {
          return {
            nombre: fila["idplato_plato.nombre"],
            ventas: parseFloat(fila.ventas),
            ingresos: parseFloat(fila.ingresos),
          };
        });
        setDatos(datosGrafica);
        // console.log(data.datos);
        // console.log(datosGrafica);
      }
    }

    getDatosGraficaPedidos();
  }, []); // Se ejecuta solo en el primer renderizado

  return (
    <>
      {/* Gráfico de pastel para las ventas */}
      <PieChart width={700} height={400}>
        <Pie
          data={datos}
          dataKey="ventas"
          nameKey="nombre"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={20}
          fill="#8884d8"
          label
        >
          {datos.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label value="Unidades vendidas" offset={70} position="outside" />
          <Tooltip />
        </Pie>
        <Legend verticalAlign="top" height={50} />
      </PieChart>

      {/* Contenedor para el contenido del PDF */}
      <Box id="pdf-content">
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Ingresos por producto
        </Typography>

        {/* Gráfico de pastel para los ingresos */}
        <PieChart width={700} height={400}>
          <Text value="Ingresos" offset={70} position="outside" />
          <Pie
            data={datos}
            dataKey="ingresos"
            nameKey="nombre"
            cx="50%"
            cy="50%"
            innerRadius={20}
            outerRadius={80}
            fill="#82ca9d"
            label
          >
            {datos.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <LabelList dataKey="nombre" offset={70} position="outside" />
          </Pie>
          <Tooltip />
        </PieChart>
      </Box>

      {/* Botón para generar el PDF */}
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" onClick={generatePDF}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
      </Box>
    </>
  );
}

export default GraficaPedidos;
