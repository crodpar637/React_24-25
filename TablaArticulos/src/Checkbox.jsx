import { useState } from "react";

function Checkbox({ manejador }) {
  const [valor, setValor] = useState(false);
  const handleChange = (e) => {
    setValor(e.target.checked);
    manejador(e.target.checked);
  }
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        defaultValue
        id="flexCheckChecked"
        checked={valor}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor="flexCheckChecked">
        Solo productos disponibles
      </label>
    </div>
  );
}

export default Checkbox;
