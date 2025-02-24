import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


/**
 * Component that fetches and displays joke categories in a dropdown menu.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.manejador - The handler function to be called when a category is selected.
 *
 * @example
 * <CategoriasChistes manejador={handleCategoryChange} />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * This component fetches joke categories from the Chuck Norris API and displays them in a dropdown menu.
 * When a category is selected, the provided handler function is called with the selected category.
 *
 * @throws Will display an error message if the API request fails.
 */
function CategoriasChistes({manejador}) {
  // Estado para almacenar las categorías de chistes
  const [categorias, setCategorias] = useState([]);
  // Estado para almacenar la categoría seleccionada
  const [categoria, setCategoria] = useState('');
  // Estado para almacenar cualquier error que ocurra durante la solicitud de la API
  const [error, setError] = useState(null);

  // useEffect para obtener las categorías de chistes al montar el componente
  useEffect(() => {
    async function fetchCategorias() {
      try {
        // Realiza una solicitud a la API de Chuck Norris para obtener las categorías de chistes
        const response = await fetch(
          "https://api.chucknorris.io/jokes/categories"
        );

        // Si la solicitud es exitosa, almacena las categorías en el estado
        if (response.ok) {
          const datos = await response.json();
          setCategorias(datos);
          setError(null);
        } else {
          // Si la solicitud falla, establece un mensaje de error en el estado
          setError("Hubo un error al obtener las categorías de chistes");
        }
      } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error("Error fetching the dog image:", error);
        setError(
          "No pudimos hacer la solicitud para obtener las categorias de chistes"
        );
      }
    }

    // Llama a la función para obtener las categorías de chistes
    fetchCategorias();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Maneja el cambio de selección en el menú desplegable
  const handleChange = (event) => {
    setCategoria(event.target.value);
    manejador(event.target.value);
  };

  return (
    <>
      {error ? (
        // Muestra un mensaje de error si ocurre un problema al obtener las categorías
        <Typography variant="h3" color="error">
          {error}
        </Typography>
      ) : (
        // Muestra el menú desplegable con las categorías de chistes
        <FormControl fullWidth>
          <InputLabel id="lblCategorias">Categorias</InputLabel>
          <Select
            labelId="lblCategorias"
            id="lstCategorias"
            value={categoria}
            label="Categorias"
            onChange={handleChange}
          >
            {categorias.map( cat => 
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            )}
          </Select>
        </FormControl>
      )}
    </>
  );
}

export default CategoriasChistes;
