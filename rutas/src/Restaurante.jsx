import { Outlet } from "react-router";

function Restaurante() {
  return (
    <div>
      <h1>Restaurante de comidas caseras</h1>
      <Outlet />
    </div>
  );
}

export default Restaurante;
