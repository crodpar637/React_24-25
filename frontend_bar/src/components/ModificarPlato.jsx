import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from '../config';

function ModificarPlato() {
  const params = useParams();
  const [datos, setDatos] = useState({
    idplato: params.idplato,
    nombre: "",
    descripcion: "",
    precio: "",
  });

  const navigate = useNavigate();
  

  useEffect(() => {
    async function getPlatoById() {
      let response = await fetch(
        apiUrl + "/platos/" + datos.idplato
      );
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getPlatoById();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
   
    // Enviamos los datos mediante fetch
    try {
      
      const response = await fetch(
        apiUrl + "/platos/" + datos.idplato,
        {
          method: "PUT", // "PATCH"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos), // JSON.stringify({blocked: true})
        }
      );

      if (response.ok) {
        // 204 No content
        alert("Actualización correcta");
        navigate(-1); // Volver a la ruta anterior
      } else { // 404 Not Found plato no modificado o no encontrado
        const data = await response.json();
        alert(data.mensaje);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
    }
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar plato
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              name="descripcion"
              value={datos.descripcion}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              name="precio"
              value={datos.precio}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarPlato;
