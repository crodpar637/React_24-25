import { Outlet } from "react-router";
import Menu from "../components/Menu";

/**
 * Componente de la página principal.
 * Muestra el menú y el contenido de las rutas hijas.
 * @returns {JSX.Element} - Componente de la página principal.
 */
function Home() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}

export default Home;