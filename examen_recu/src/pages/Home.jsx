import { Outlet } from "react-router";
import BarraMenu from "../components/BarraMenu";

/**
 * Componente de la página principal.
 * Muestra el menú y el contenido de las rutas hijas.
 * @returns {JSX.Element} - Componente de la página principal.
 */
function Home() {
  return (
    <>
      <BarraMenu />
      <Outlet />
    </>
  );
}

export default Home;