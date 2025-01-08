import CalculadoraAreas from "./CalculadoraAreas";
import Contador from "./Contador";
import FormController from "./FormController";
import Imagenes from "./Imagenes";
import ListaDinamica from "./ListaDinamica";
import Select from "./Select";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App2() {
  return (
    <>
      <Select
        name={"Provincia"}
        options={[
          { value: "SE", text: "SEVILLA" },
          { value: "CA", text: "CÁDIZ" },
          { value: "CO", text: "CÓRDOBA" },
          { value: "H", text: "HUELVA" },
        ]}
      />
      <FormController />
      <br />
      <ListaDinamica />
      <br />
      <CalculadoraAreas />
      <Contador inicial={7} />
      <br />
      <Imagenes />
    </>
  );
}

export default App2;
