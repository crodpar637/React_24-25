import Contador from "./components/Contador";
import ContadorV2 from "./components/ContadorV2";
import ContadorV3 from "./components/ContadorV3";

function App() {
  return (
    <>
      <h5>Ejemplos de uso de Zustand</h5>
      <h6>Estado sincronizado entre componentes</h6>
      <Contador />
      <Contador />
      <h6>Estado sincronizado + almacenamiento en localStorage</h6>
      <ContadorV2 />
      <ContadorV2 />
      <h6>Estado sincronizado + almacenamiento en sessionStorage</h6>
      <ContadorV3 />
      <ContadorV3 />
    </>
  );
}

export default App;
