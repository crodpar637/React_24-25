import { useState, useRef } from "react";

function ListaDinamica() {
    const [lista, setLista] = useState([]);
    const inputTexto = useRef();

    function handleClick() {
        let nuevoTexto = inputTexto.current.value.trim();
        // Actualizamos la variable de estado
        // Copiamos la anterior y agragamos un nuevo valor
        setLista([...lista, nuevoTexto]);
    }

    return (
        <>
            <input type="text" ref={inputTexto} />
            <input type="button" value="Agregar texto" onClick={handleClick} />
            <ol>
                {lista.map( (elem,i) => <li key={i}>{elem}</li>)}
            </ol>
        </>

    );

}

export default ListaDinamica;