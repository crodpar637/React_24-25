import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function BarraMenu() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Notas
            </Typography>
            <Link to="/ejercicio2">Acordeón de notas</Link>
            <Link to="/ejercicio3">Borrar nota</Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default BarraMenu;
