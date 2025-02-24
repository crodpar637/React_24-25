import { Box, Button, Typography } from "@mui/material";

/**
 * Componente que muestra un mensaje de no autorización.
 * @component
 * @returns {JSX.Element} JSX element del componente Unauthorized.
 */
function Unauthorized() {
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        No tiene autorización para acceder a esta página
      </Typography>
      <Box textAlign={"center"} sx={{ mt: 2 }}>
        <Button variant="contained" align="center" href="/" sx={{ mt: 2 }}>
          Ir a la página princial
        </Button>
      </Box>
    </>
  );
}

export default Unauthorized;
