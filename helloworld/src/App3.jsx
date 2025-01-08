import Checkbox from "./Checkbox";
import IncrementadorTotal from "./IncrementadorTotal";
import 'bootstrap/dist/css/bootstrap.min.css';
import Multicheck from "./Multicheck";

function App3() {
  return (
    <>
      <Multicheck maxcheck={3} checkboxes={[ 
        { name : "chkTostada", texto : "Tostada", value :"toast"}, 
        { name : "chkCroissant", texto : "Croissant", value :"croissant"}, 
        { name : "chkGalletas", texto : "Galletas", value :"galletas"}, 
        { name : "chkChurros", texto : "Churros", value :"churros"}, 
        { name : "chkCaracola", texto : "Caracola", value :"caracola"}, 
      ]} />

      <Checkbox name="chkTostada" texto="Tostada" value="toast" />
      <IncrementadorTotal />
    </>
  );
}

export default App3;
