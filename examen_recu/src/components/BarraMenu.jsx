import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

function BarraMenu() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Notas
            </Typography>
             
            <Link to="/ejercicio2">
              <Typography variant="span" component="div" sx={{ flexGrow: 1, color: "white", marginRight: 2 }}>
                Acordeón de notas
              </Typography>
            </Link>
            <Link to="/ejercicio3">
              <Typography variant="span" component="div" sx={{ flexGrow: 1, color: "white"}}>
                Borrar nota
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default BarraMenu;
