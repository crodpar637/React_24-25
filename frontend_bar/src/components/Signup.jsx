import { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { apiUrl } from "../config";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio.";
    }
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(apiUrl + "/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        alert("Usuario registrado correctamente.");
        navigate("/login"); // Enviar al usuario a la página de login tras el registro
      } else {
        const data = await response.json();
        setErrors({
          apiError: data.mensaje || "Error al registrar el usuario.",
        });
      }
    } catch (error) {
      setErrors({ apiError: "Error de red. Inténtalo de nuevo más tarde." });
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
        Registro
      </Typography>

      {errors.apiError && <Alert severity="error">{errors.apiError}</Alert>}
      {/* {success && <Alert severity="success">Registro exitoso.</Alert>} */}

      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre de usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
        </Grid>

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
          <TextField
            fullWidth
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained">
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignUp;
