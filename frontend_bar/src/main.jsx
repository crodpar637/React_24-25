import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import AltaPlato from "./components/AltaPlato";
import ListadoPedidos from "./components/ListadoPedidos";
import ListadoPlatos from "./components/ListadoPlatos";
import Login from "./components/Login";
import ModificarPlato from "./components/ModificarPlato";
import PedidoMultiple from "./components/PedidoMultiple";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/Signup";
import Unauthorized from "./components/Unauthorized";
import GraficaPedidos from "./components/GraficaPedidos";

import Home from "./pages/Home";
import PaginaError from "./pages/PaginaError";


let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PaginaError />,
    children: [
      {
        path: "listadoplatos",
        element: <ListadoPlatos />,
      },
      {
        path: "listadopedidos",
        element: <ListadoPedidos />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },

      // 🔒 Rutas protegidas para usuarios con rol "admin"
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "altaplato",
            element: <AltaPlato />,
          },
          {
            path: "modificarplato/:idplato",
            element: <ModificarPlato />,
          },
        ],
      },

      // 🔒 Rutas protegidas para usuarios con rol "admin" o "user"
      {
        element: <ProtectedRoute allowedRoles={["admin", "user"]} />,
        children: [
          {
            path: "pedidomultiple",
            element: <PedidoMultiple />,
          },
          {
            path: "graficapedidos",
            element: <GraficaPedidos />,
          },
        ],
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
