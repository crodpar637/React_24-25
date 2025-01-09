import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PersonCard from "./PersonCard";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PersonPage() {
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [datosPersonajes, setDatosPersonajes] = useState({ results: [], count: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPagina() {
      try {
        const response = await fetch(
          "https://swapi.py4e.com/api/people/?page=" + pagina
        );

        if (response.ok) {
          const datos = await response.json();

          setDatosPersonajes(datos);
          setError(null);
        } else {
          setError("Hubo un error al obtener los datos");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("No pudimos hacer la solicitud para obtener los datos");
      }
    }

    // Código de useEffect
    if (isLoading) {
      fetchPagina();
      setIsLoading(false); // Haya ido bien o mal, ya no estamos cargando
    }
  }, [isLoading, pagina]); // ejecución en el primer renderizado

  const handleChange = (event, value) => {
    setPagina(value);
    setIsLoading(true);
  };


  if (isLoading) {
    return (
      <>
        <Typography gutterBottom variant="h4" align="center">
          Personajes de Star Wars
        </Typography>
        <CircularProgress />
      </>
    );
  }

  if (error != null) {
    return (
      <>
        <Typography gutterBottom variant="h4" align="center">
          Personajes de Star Wars
        </Typography>
        <Typography gutterBottom variant="h6">
          {error}
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography gutterBottom variant="h4" align="center">
        Personajes de Star Wars
      </Typography>
      <Grid container>
        {datosPersonajes.results.map((person) => (
          <Grid key={person.name} size={{ xs: 6, md: 4, lg: 2.4 }}>
            <PersonCard person={person} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} alignItems="center" >
        <Pagination size='large' page={pagina} onChange={handleChange} count={Math.ceil(datosPersonajes.count / 10)} showFirstButton showLastButton />
      </Stack>
    </>
  );
}

export default PersonPage;
