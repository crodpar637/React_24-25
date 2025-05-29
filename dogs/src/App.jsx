import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setImageUrl(data.message);
        setIsLoading(false); // ⬅️ cambiamos el estado de isLoading a false
      } else {
        console.error("Error fetching data");
      }
    }

    if(isLoading) // Solo llamamos a la API si isLoading es true
      fetchData();

  }, [isLoading]);

  if (isLoading) { // ⬅️ si está cargando, mostramos un texto que lo indique
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="App">
     <button onClick={() => setIsLoading(true)}>{/* ⬅️ nuevo */}
        ¡Otro!
        <span role="img" aria-label="corazón">
          ❤️
        </span>
      </button>
      <img src={imageUrl} alt="Random Dog" />
    </div>
  );
}
