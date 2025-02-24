import Typography from "@mui/material/Typography";
import CategoriasChistes from "./CategoriasChistes";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Componente que muestra un visor de chistes de Chuck Norris.
 */
/**
 * Componente VisorChistes
 * 
 * Este componente muestra chistes de Chuck Norris basados en la categoría seleccionada.
 * Permite al usuario seleccionar una categoría y cargar un nuevo chiste.
 * 
 * @component
 * 
 * @example
 * return (
 *   <VisorChistes />
 * )
 * 
 * @returns {JSX.Element} El componente VisorChistes.
 * 
 * @typedef {Object} Props
 * @property {string} textoChiste - El texto del chiste actual.
 * @property {string} categoria - La categoría seleccionada para los chistes.
 * @property {boolean} isLoading - Estado de carga para indicar si se está obteniendo un chiste.
 * 
 * @function handleChange
 * @description Maneja el cambio de categoría y actualiza el estado.
 * @param {string} cat - La nueva categoría seleccionada.
 * 
 * @function fetchChiste
 * @description Función asíncrona para obtener un chiste de Chuck Norris desde la API.
 * 
 * @useEffect
 * @description Hook de efecto que obtiene un chiste cuando cambia la categoría o el estado de carga.
 * 
 * @returns {JSX.Element} El componente VisorChistes.
 */
function VisorChistes() {
  // Estado para almacenar el texto del chiste
  const [textoChiste, setTextoChiste] = useState("");
  // Estado para almacenar la categoría seleccionada
  const [categoria, setCategoria] = useState("");
  // Estado para manejar el estado de carga
  const [isLoading, setIsLoading] = useState(true);

  // Función para manejar el cambio de categoría
  const handleChange = (cat) => {
    setCategoria(cat);
    setIsLoading(true);
  };

  // useEffect para obtener un chiste de Chuck Norris cuando cambia la categoría o el estado de carga
  useEffect(() => {
    async function fetchChiste() {
      try {
        // Llamada a la API para obtener un chiste de Chuck Norris
        const response = await fetch(
          `https://api.chucknorris.io/jokes/random?category=${categoria}`
        );

        if (response.ok) {
          const datos = await response.json();
          // Actualizar el estado con el texto del chiste
          setTextoChiste(datos.value);
        }
      } catch (error) {
        console.error("Error fetching el chiste:", error);
      }

      // Cambiar el estado de carga a falso
      setIsLoading(false);
    }

    // Llamar a la función fetchChiste si el estado de carga es verdadero
    if (isLoading) 
      fetchChiste();

  }, [categoria, isLoading]); // Dependencias del useEffect

  return (
    <Grid container spacing={2} sx={{ textAlign: "center" }}>
      <Grid size={12}>
        <Typography variant="h2">Hechos de Chuck Norris</Typography>
      </Grid>

      <Grid offset={3} size={6}>
        {/* Componente para seleccionar la categoría de chistes */}
        <CategoriasChistes manejador={handleChange} />
      </Grid>

      <Grid size={12}>
        {/* Botón para cargar otro chiste */}
        <Button variant="contained" onClick={() => setIsLoading(true)}>
          Cargar otro hecho de Chuck Norris
        </Button>
      </Grid>

      {isLoading ? (
        <Grid offset={3} size={6} sx={{ textAlign: "center" }}>
          {/* Mostrar un spinner mientras se carga el chiste */}
          <CircularProgress />
        </Grid>
      ) : (
        <Grid offset={3} size={6} sx={{ textAlign: "left" }}>
          {/* Mostrar el texto del chiste */}
          <Typography variant="h5">{textoChiste}</Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default VisorChistes;



