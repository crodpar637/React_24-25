/* eslint-disable react/prop-types */

function Card({urlImagen, titulo,texto, textoBoton }){
    return (
<div className="card" style={{width: '18rem'}}>
  <img src={urlImagen} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{titulo}</h5>
    <p className="card-text">{texto}</p>
    <a href="#" className="btn btn-primary">{textoBoton}</a>
  </div>
</div>

    );
}

export default Card;