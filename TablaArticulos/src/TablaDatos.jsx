import GrupoProductos from "./GrupoProductos";

function TablaDatos({ datos }) {
  const categoriasSet = new Set();

  for (let producto of datos) {
    categoriasSet.add(producto.categoria);
  }
  // Convertir el conjunto a array
  const categorias = Array.from(categoriasSet);

  return (
    <>
      <div className="offset-3 col-4">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {
              // Recorro las categorías
              categorias.map((categoria) => {
                // Filtro los productos y me quedo con los de la categoria
                const prodCategoria = datos.filter(
                  (prod) => prod.categoria == categoria
                );
                // Para cada categoría se devuelve una parte de la tabla
                return (
                  <GrupoProductos key={categoria} articulos={prodCategoria} />
                );
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TablaDatos;
