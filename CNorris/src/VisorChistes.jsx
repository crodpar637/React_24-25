import Typography from "@mui/material/Typography";
import CategoriasChistes from "./CategoriasChistes";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import CircularProgress from '@mui/material/CircularProgress';

function VisorChistes() {
  const [textoChiste, setTextoChiste] = useState("");
  const [categoria, setCategoria] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (cat) => {
    setCategoria(cat);
    setIsLoading(true);
  };

  useEffect(() => {
    async function fetchChiste() {
      try {
        const response = await fetch(
          `https://api.chucknorris.io/jokes/random?category=${categoria}`
        );

        if (response.ok) {
          const datos = await response.json();
          setTextoChiste(datos.value);
        }
      } catch (error) {
        console.error("Error fetching el chiste:", error);
      }

      setIsLoading(false);
    }

    if (isLoading) 
      fetchChiste();

  }, [categoria, isLoading]); // ejecución en el primer renderizado y cuando cambie la categoria

  return (
    <>
      <Grid container spacing={2} sx={{ textAlign: "center" }}>
        <Grid size={12}>
          <Typography variant="h2">Hechos de Chuck Norris</Typography>
        </Grid>

        <Grid offset={3} size={6}>
          <CategoriasChistes manejador={handleChange} />
        </Grid>

        <Grid size={12}>
          <Button variant="contained" onClick={() => setIsLoading(true)}>
            Cargar otro hecho de Chuck Norris
          </Button>
        </Grid>

        {isLoading ? (
          <Grid offset={3} size={6} sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid offset={3} size={6} sx={{ textAlign: "left" }}>
            <Typography variant="h5">{textoChiste}</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default VisorChistes;
