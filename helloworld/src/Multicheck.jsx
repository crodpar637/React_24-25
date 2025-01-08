/* eslint-disable react/prop-types */
import { useState } from "react";
import Checkbox from "./Checkbox";

function Multicheck({ maxcheck, checkboxes }) {
  const [contador, setContador] = useState(0);

  const onCheck = (e) => {
    if (e.target.checked) {
      // Se ha marcado
      if (contador + 1 > maxcheck) {
        // Si se va a superar el máximo
        e.target.checked = false;
      } else {
        setContador(contador + 1);
      }
    } else {
      // Se ha desmarcado
      setContador(contador - 1);
    }
  };
  return (
    <>
      {checkboxes.map((elem) => (
        <Checkbox
          key={elem.name}
          name={elem.name}
          texto={elem.texto}
          value={elem.value}
          manejador={onCheck}
        />
      ))}
      <p>Checkbox marcados: {contador}</p>
    </>
  );
}

export default Multicheck;
