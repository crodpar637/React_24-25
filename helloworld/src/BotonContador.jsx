import { useState } from "react";

function BotonContador({handler}){
    const [contador, setContador] = useState(0);
    function handleClick(){
        setContador(contador+1);
    }
    return ( 
        <>
            <input type="button" value="Suma +1" onClick={ () => { handler(); handleClick(); }} />
            <p>Contador: {contador}</p>
        </>
    )
}

export default BotonContador;