function GrupoProductos({ articulos }) {
  return (
    <>
      <tr>
        <th colSpan={2} className="text-center">{articulos[0].categoria}</th>
      </tr>
      {articulos.map((articulo) => (
        <tr key={articulo.nombre}>
          {articulo.disponible ? (
            <td>{articulo.nombre}</td>
          ) : (
            <td className="text-danger">{articulo.nombre}</td>
          )}
          <td>{articulo.precio}</td>
        </tr>
      ))}
    </>
  );
}

export default GrupoProductos;
