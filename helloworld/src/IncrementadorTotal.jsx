import { useState } from "react";
import Incrementador from "./Incrementador";

function IncrementadorTotal(){

    const [total, setTotal] = useState(0);

    const incrementarTotal = () => {
        setTotal(total +1);
    }

    return (
        <>
            <Incrementador onIncremento={incrementarTotal}/>
            <Incrementador onIncremento={incrementarTotal}/>
            <Incrementador onIncremento={incrementarTotal}/>
            <p>Total incremento: {total}</p>
        </>
    );

}

export default IncrementadorTotal;