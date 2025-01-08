import { useState } from "react";

function CuadroBusqueda({manejador}) {
  const [textoBusqueda, setTextoBusqueda] = useState('');

  const handleChange = (e) => {
    setTextoBusqueda(e.target.value);
    manejador(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon3">
        Filtrar productos
      </span>
      <input
        type="text"
        className="form-control"
        id="basic-url"
        aria-describedby="basic-addon3"
        value={textoBusqueda}
        onChange={handleChange}
      />
    </div>
  );
}

export default CuadroBusqueda;