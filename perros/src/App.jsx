import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [imagenURL, setImagenURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPerro() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");

        if (response.ok) {
          const dog = await response.json();

          setImagenURL(dog.message);
          setError(null);
        } else {
          setError("Hubo un error al obtener el perrito");
        }
      } catch (error) {
        console.error("Error fetching the dog image:", error);
        setError("No pudimos hacer la solicitud para obtener el perrito");
      }
    }

    // Código de useEffect
    if (loading) {
      fetchPerro();
      setLoading(false); // Haya ido bien o mal, ya no estamos cargando
    }
  }, [loading]); // ejecución en el primer renderizado

  return (
    <>
      {loading ? (
        <h2>Cargando</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <input
            type="button"
            value="Otro perrillo"
            onClick={() => setLoading(true)}
          />
          <img src={imagenURL} />
        </>
      )}
    </>
  );
}

export default App;
