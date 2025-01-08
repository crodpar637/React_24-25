function Checkbox({ name, texto, value, manejador }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={value}
        id={name}
        name={name}
        onChange={manejador}
      />
      <label className="form-check-label" htmlFor={name}>
        {texto}
      </label>
    </div>
  );
}

export default Checkbox;
