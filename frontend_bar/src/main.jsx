import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";

let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />
    // children: [   // Los hijos se renderizan en el elemento <Outlet /> del padre
    //   {
    //     path: "platos",
    //     element: <Platos />,
    //   },
    // ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
