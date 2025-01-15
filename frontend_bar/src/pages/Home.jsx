import { Outlet } from "react-router";
import Menu from "../components/Menu";  

function Home(){
    return (
        <>
            <Menu/>
            <Outlet />
        </>
    );
}
export default Home;