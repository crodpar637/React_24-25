import { useParams } from "react-router";

function City(){
    let params = useParams();

    return <h1>Ciudad {params.city} Lugar {params.lugar} </h1>
}

export default City
