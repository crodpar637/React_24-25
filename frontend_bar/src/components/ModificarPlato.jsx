import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

/**
 * Componente para modificar un plato existente.
 * @component
 * @returns {JSX.Element} JSX element del componente ModificarPlato.
 */
function ModificarPlato() {
  const params = useParams();
  const [datos, setDatos] = useState({
    idplato: params.idplato,
    nombre: "",
    descripcion: "",
    precio: "",
  });
  const [validacion, setValidacion] = useState({
    nombre: false, // true si hay error
    descripcion: false,
    precio: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getPlatoById() {
      let response = await fetch(apiUrl + "/platos/" + datos.idplato);
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

  /**
   * Maneja el envío del formulario.
   * @param {Object} e - Evento de envío.
   */
  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    console.log("Vamos a validar");
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        console.log("Vamos a hacer fetch");
        const response = await fetch(apiUrl + "/platos/" + datos.idplato, {
          method: "PUT", // "PATCH"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos), // JSON.stringify({blocked: true})
        });

        if (response.ok) {
          // 204 No content
          alert("Actualización correcta");
          navigate(-1); // Volver a la ruta anterior
        } else {
          // 404 Not Found plato no modificado o no encontrado
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
      }
    }
  };

  /**
   * Valida los datos del formulario.
   * @returns {boolean} True si los datos son válidos, false en caso contrario.
   */
  function validarDatos() {
    // En principio, damos por bueno el formulario
    let validado = true;
    // Estado de la validación auxiliar
    let validacionAux = {
      nombre: false,
      descripcion: false,
      precio: false,
    };

    if (datos.nombre.length < 3) {
      // Error en el nombre
      validacionAux.nombre = true;
      // Formulario invalido
      validado = false;
    }

    if (datos.descripcion.length < 10) {
      validacionAux.descripcion = true;
      validado = false;
    }

    let expPrecio = /^\d{1,2}(\.\d{1,2})?$/;
    if (expPrecio.test(datos.precio)) {
      // Los datos al menos tienen el formato correcto
      if (parseFloat(datos.precio) < 0.5 || parseFloat(datos.precio) > 50) {
        validacionAux.precio = true;
        validado = false;
      }
    } else {
      validacionAux.precio = true;
      validado = false;
    }

    // Actualizo el estado de la validacion de los Textfields
    setValidacion(validacionAux);
    console.log("Formulario valido:", validado);
    return validado;
  }

  /**
   * Maneja el cambio en los campos del formulario.
   * @param {Object} e - Evento de cambio.
   */
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
              error={validacion.nombre}
              helperText={
                validacion.nombre && "Nombre incorrecto. Mínimo 3 caracteres"
              }
            />
            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              name="descripcion"
              value={datos.descripcion}
              onChange={handleChange}
              error={validacion.descripcion}
              helperText={
                validacion.descripcion &&
                "Descripción requerida. Minimo 10 caracteres"
              }
            />
            <TextField
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              name="precio"
              value={datos.precio}
              onChange={handleChange}
              error={validacion.precio}
              helperText={
                validacion.precio && "Importe incorrecto. [0.50€-50.00€]"
              }
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
