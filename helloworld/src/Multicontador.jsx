import { useState } from "react";
import BotonContador from "./BotonContador";

function Multicontador(){
    const [total, setTotal] = useState(0);

    function handleEvent(){
        setTotal(total+1);
    }
    return (
        <>
        <BotonContador handler={handleEvent}/>
        <BotonContador handler={handleEvent}/>
        <BotonContador handler={handleEvent}/>
        <p>Total: {total}</p>
        </>
    );
}

export default Multicontador;