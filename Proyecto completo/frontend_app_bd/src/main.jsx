import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AltaComponente from './components/AltaComponente';
import ListadoComponente from './components/ListadoComponente';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Grafica from './components/Grafica';
import FichaComponente from './components/FichaComponente';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "altacomponente",
        element: <AltaComponente />,
      },
      {
        path: "listadocomponente",
        element: <ListadoComponente />,
      },
      {
        path: "graficacomponente",
        element: <Grafica />,
      },
      {
        path: "fichacomponente/:idcomponente",
        element: <FichaComponente />,
      },
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
