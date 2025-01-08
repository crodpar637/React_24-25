/* eslint-disable react/prop-types */
import { useState } from "react";

function Incrementador({onIncremento}){
    const [incremento, setIncremento] = useState(0);

    const handleClick = () => {
        setIncremento(incremento+1);
        onIncremento(); // Actualizar el estado del padre
    }

    return (
        <>
            <input type="button" value="Sumar +1" onClick={handleClick}/>
            <p>Incremento: {incremento} </p>
        </>
    )
}

export default Incrementador;