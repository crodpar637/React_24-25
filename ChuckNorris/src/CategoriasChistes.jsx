import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CategoriasChistes({manejador}) {
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch(
          "https://api.chucknorris.io/jokes/categories"
        );

        if (response.ok) {
          const datos = await response.json();

          setCategorias(datos);
          setError(null);
        } else {
          setError("Hubo un error al obtener las categorías de chistes");
        }
      } catch (error) {
        console.error("Error fetching the dog image:", error);
        setError(
          "No pudimos hacer la solicitud para obtener las categorias de chistes"
        );
      }
    }

    // Código de useEffect
    fetchCategorias();
  }, []); // ejecución en el primer renderizado

  const handleChange = (event) => {
    console.log("Elevar estado:", event.target.value);
    setCategoria(event.target.value);
    manejador(event.target.value);
    
  };


  return (
    <>
      {error ? (
        <Typography variant="h3" color="error">
          {error}
        </Typography>
      ) : (
        <FormControl fullWidth>
          <InputLabel id="lblCategorias">Categorias de chistes</InputLabel>
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
