import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

function Home() {
  return (
    <>
        <Menu />
        <div>
          <Outlet />
        </div>
    </>
  );
}

export default Home;
