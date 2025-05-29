import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

//   const handleClick = () => {
//     setContador(contador - 1);
//   };

  function handleClickMenos() {
    setContador(contador - 1);
  }
  return (
    <div>
      <h2>Contador</h2>
      <p>{contador}</p>
      <button onClick={ () => setContador(contador + 1)}>+</button>
      <button onClick={handleClickMenos}>-</button>
    </div>
  );
}

export default Contador;
