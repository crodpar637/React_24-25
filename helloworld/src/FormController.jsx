import { useState } from "react";

function FormController() {
  const [formDatos, setFormDatos] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormDatos({ ...formDatos, [name]: value });
  }

  return (
    <>
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        name="nombre"
        value={formDatos.nombre}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={formDatos.email}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        value={formDatos.password}
        onChange={handleChange}
      />
      <br />
      <h3>Datos del formulario</h3>
      <p>Nombre: {formDatos.nombre}</p>
      <p>Email: {formDatos.email}</p>
      <p>Password: {formDatos.password}</p>
    </>
  );
}

export default FormController;
