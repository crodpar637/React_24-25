/* eslint-disable react/prop-types */
import { useState } from "react";

function Contador({inicial}) {
    let [numero, setNumero] = useState(inicial ?? 0);

    // inicial ?? 0 si no está definido pone un cero

    function handleClick(){
        setNumero(numero+1);
        numero = numero + 8;
    }

    function reset(){
        setNumero(inicial ?? 0);
    }
    return (
        <>
            <h4>{numero}</h4>
            <input type='button' value="Incrementar" onClick={ () => setNumero(numero+1)} />
            <input type='button' value="Resetear" onClick={ reset } />
        </>
    );

}

export default Contador;