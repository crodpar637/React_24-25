import { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { apiUrl } from "../config";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router";
import useUserStore from "../stores/useUserStore";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { setUser } = useUserStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(apiUrl + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Para aceptar cookies en la respuesta y enviarlas si las hay
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.mensaje);
        setUser(data.datos); // Se guarda en el userStore los datos del usuario logueado
        navigate("/"); // Redirige tras el login exitoso
      } else {
        setErrors({ apiError: data.mensaje || "Credenciales incorrectas." });
      }
    } catch (error) {
      setErrors({ apiError: "Error de red. Inténtalo de nuevo más tarde." + error });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 2,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Iniciar sesión
      </Typography>

      {errors.apiError && <Alert severity="error">{errors.apiError}</Alert>}

      <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained">
            Iniciar sesión
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;