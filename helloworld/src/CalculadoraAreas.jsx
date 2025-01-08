import { useRef } from "react";

function CalculadoraAreas() {
    const anchoRef = useRef();
    const altoRef = useRef();
    const resultadoRef = useRef();

    function calcular(){
        const ancho = parseFloat(anchoRef.current.value.trim());
        const alto = parseFloat(altoRef.current.value.trim());

        resultadoRef.current.value = ancho * alto;
    }

    return (
        <>
            <label>Ancho del rectangulo</label>
            <input type="text" ref={anchoRef}></input>
            <br />
            <label>Alto del rectangulo</label>
            <input type="text" ref={altoRef}></input>
            <br />
            
            <input type="button" onClick={calcular} value="Calcular área"></input>
            <br />
            <input type="text" ref={resultadoRef} readOnly></input>
            <br />
        </>
    );
}

export default CalculadoraAreas;