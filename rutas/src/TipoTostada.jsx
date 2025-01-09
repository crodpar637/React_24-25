import { useParams } from 'react-router';

function TipoTostada(){
    let params = useParams();

    return ( 
        <ul>
            <li>Mollete de Antequera</li>
            <li>Bollo</li>
            <li>Chapata</li>
            <li>{params.tipo}</li>
        </ul>
    )
}
export default TipoTostada;