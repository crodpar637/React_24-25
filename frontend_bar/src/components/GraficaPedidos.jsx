import { useEffect, useState } from "react";
import { apiUrl } from "../config";
import { PieChart, Pie, Cell, Legend, Tooltip, Label , LabelList, Text} from "recharts";


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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
         
          <LabelList dataKey="nombre" offset={70} position="outside" />
        </Pie>
       
        <Tooltip />
      </PieChart>
    </>
  );
}

export default GraficaPedidos;
