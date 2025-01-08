import { useState } from "react";

function Imagenes() {
    const [imagen, setImagen] = useState('');
    
    return (
        <>
            <input type="button" value="Img1" 
            onClick={ () => setImagen('http://via.placeholder.com/111x111')} />
            <input type="button" value="Img2" 
            onClick={() => setImagen('http://via.placeholder.com/222x222')} />
            <input type="button" value="Img3" 
            onClick={() => setImagen('http://via.placeholder.com/333x333') } />
            <img src={imagen} />
        </>
    );
}

export default Imagenes;