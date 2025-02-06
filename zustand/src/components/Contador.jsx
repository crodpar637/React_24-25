import { useState } from "react";
import useContadorStore from "../stores/useContadorStore";

const Contador = () => {
  const { count, increase, decrease } = useContadorStore();
  const [contador, setContador] = useState(0);
  return (
    <>
      <div style={{ border: "1px black solid" }}>
        <div>
          <h5>{count}</h5>
          <button onClick={increase}>➕ Incrementar</button>
          <button onClick={decrease}>➖ Decrementar</button>
        </div>
        <div>
          <h5>Contador local: {contador}</h5>
          <button onClick={() => setContador(contador + 1)}>
            ➕ Incrementar
          </button>
          <button onClick={() => setContador(contador - 1)}>
            ➖ Decrementar
          </button>
        </div>
      </div>
    </>
  );
};

export default Contador;
