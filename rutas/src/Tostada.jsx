import { Outlet } from "react-router";

function Tostada(){
    return (
        <div>
            <h2>Desayuna con tostada</h2>
            <Outlet />
        </div>
    )
}
export default Tostada;