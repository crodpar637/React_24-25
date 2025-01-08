import BotonAceptar from "./BotonAceptar";
import MiEncabezado from "./MiEncabezado";
import MyButton from "./MyButton";
import Progreso from "./Progreso";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "./Card";


function App() {

  let numero = 3;
  let contenido;

  if (numero == 3) {
    contenido = <MyButton />;
  } else {
    contenido = <MiEncabezado />;
  }

  const products = [
    { title: 'Col', id: 1 },
    { title: 'Ajo', id: 2 },
    { title: 'Manzana', id: 3 },
  ];

  const listItems = products.map(product =>
    <li key={product.id}>
      {product.title}
    </li>
  );

  const datos = [
    {
      urlImagen: 'https://www.barcelo.com/guia-turismo/wp-content/uploads/ok-la-fontanilla.jpg',
      titulo: "Playas de Conil",
      texto: "Playa de la Fontanilla",
      textoBoton: "Aceptar"
    },
    {
      urlImagen: 'https://i.ytimg.com/vi/36hx74WBcvA/mqdefault.jpg',
      titulo: "Playas de Conil",
      texto: "Playa de la Fuente del Gallo",
      textoBoton: "Aceptar"
    },
    {
      urlImagen: 'https://www.apartamentosconil.es/wp-content/uploads/cala-aceite.jpg',
      titulo: "Playas de Conil",
      texto: "Cala del Aceite",
      textoBoton: "Aceptar"
    },
  ];

  const listaCards = datos.map(datosCard =>
    <div className="col" key={datosCard.urlImagen}>
      <Card 
        urlImagen={datosCard.urlImagen}
        titulo={datosCard.titulo}
        texto={datosCard.texto}
        textoBoton={datosCard.textoBoton} />
    </div>
  );

  return (
    <>
      <div className="row">
        {listaCards}
      </div>


      <ul>{listItems}</ul>

      <MyButton />
      <MiEncabezado />
      {contenido}
      {numero == 2 ?
        (<h6>Hola</h6>)
        :
        (<h6>Adiós</h6>)}

      {numero == 3 && <h4>Es 3</h4>}

      <BotonAceptar />
      <Progreso valor={75} color="bg-success" />
      <Progreso valor={50} color="bg-warning" />
      <Card urlImagen="https://www.barcelo.com/guia-turismo/wp-content/uploads/ok-la-fontanilla.jpg"
        titulo="Playas de Conil"
        texto="La fontanilla"
        textoBoton="Aceptar" />
      <Card urlImagen="https://i.ytimg.com/vi/36hx74WBcvA/mqdefault.jpg"
        titulo="Playas de Conil"
        texto="Fuente del Gallo"
        textoBoton="Aceptar" />
    </>
  );
}

export default App
