import { useState } from "react";

/* eslint-disable react/prop-types */
function Select(props) {
  const [formDatos, setFormDatos] = useState({
    [props.name]: props.options[0].value,
    texto: props.options[0].texto,
  });

  function handleChange(e) {
    const { name, value, options, selectedIndex } = e.target;
    setFormDatos({
      ...formDatos,
      [name]: value,
      texto: options[selectedIndex].textContent,
    });
  }

  return (
    <>
      <div className="form-floating">
        <select
          className="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          name={props.name}
          value={formDatos[props.name]}
          onChange={handleChange}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <label htmlFor="floatingSelect">{props.name}</label>
      </div>
      <p>Valor seleccionado:{formDatos[props.name]} </p>
      <p>Texto seleccionado:{formDatos.texto} </p>
    </>
  );
}

export default Select;
