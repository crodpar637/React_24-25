import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function ModificarPlato() {
  const [datos, setDatos] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getPlatoById() {
      let response = await fetch("http://localhost:3000/api/platos");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getPlatos();
  }, []); // Se ejecuta solo en el primer renderizado



  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try{
        const response = await fetch("http://localhost:3000/api/platos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          });

        if (response.ok) {
            const respuesta = await response.json();
            alert(respuesta.mensaje);
            if(respuesta.ok){
                navigate("/"); // Volver a la página principal
            }  
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
