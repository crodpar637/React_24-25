import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from "./pages/Home";


function App() {
 
  let router = createBrowserRouter([
  {
    path: "/",
    Component: <Home />,
    children: [
      {
        path: "ejercicio2",
        element: <h2> Ejercicio 2</h2>
      },
      {
        path: "ejercicio3",
        element: <h2> Ejercicio 3</h2>
      },
    ],
  },
]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
