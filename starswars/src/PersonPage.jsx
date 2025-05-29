import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PersonCard from "./PersonCard";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

/**
 * Componente que muestra una página de personajes de Star Wars con paginación.
 * @component
 */
function PersonPage() {
  // Estado para la página actual
  const [pagina, setPagina] = useState(1);
  // Estado para indicar si se están cargando los datos
  const [isLoading, setIsLoading] = useState(true);
  // Estado para almacenar los datos de los personajes
  const [datosPersonajes, setDatosPersonajes] = useState({ results: [], count: 0 });
  // Estado para manejar errores
  const [error, setError] = useState(null);

  /**
   * Hook de efecto para obtener los datos de la API cuando se carga la página o cambia la página.
   */
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

    // Si estamos cargando, obtenemos los datos
    if (isLoading) {
      fetchPagina();
      setIsLoading(false); // Haya ido bien o mal, ya no estamos cargando
    }
  }, [isLoading, pagina]); // Dependencias del efecto

  /**
   * Maneja el cambio de página en la paginación.
   * @param {object} event - El evento de cambio.
   * @param {number} value - El número de la nueva página.
   */
  const handleChange = (event, value) => {
    setPagina(value);
    setIsLoading(true);
  };

  // Renderizado condicional basado en el estado de carga y errores
  if (isLoading) {
    return (
      <>
        <Typography gutterBottom={true} variant="h4" align="center">
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

  // Renderizado principal del componente
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
