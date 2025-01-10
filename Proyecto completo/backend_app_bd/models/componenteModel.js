// Importamos la configuración de la base de datos y los utilitarios para loguear errores
const db = require("../config/dbConfig");
const { logErrorSQL, logMensaje } = require("../utils/logger");

class ComponenteModel {
  // Método para obtener todos los componentes
  async getAllComponente() {
    const query = "SELECT * FROM componente";
    try {
       // Usamos await para obtener los datos de la consulta
       const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
       return result; // Retornamos el resultado
    } catch (err) {
      // Si hay un error, lo registramos y lo lanzamos
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para obtener componentes con listado adicional (join con tipo)
  async getAllComponenteListado() {
    const query =
      "SELECT c.*, t.tipo, t.descripcion as tipo_descripcion FROM componente c JOIN tipo t ON c.idtipo = t.idtipo";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
      return result;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para obtener componentes para gráficos (agrupado por tipo)
  async getAllComponenteGrafica() {
    const query =
      "SELECT tipo,count(*) as stock FROM componente as c, tipo as t WHERE c.idtipo = t.idtipo group by tipo order by tipo;";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
      return result;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para crear un componente (insertar en la base de datos)
  async createComponente(componenteData) {
    const query =
      "INSERT INTO componente (idcomponente, nombre, descripcion, precio, idtipo) VALUES (?, ?, ?, ?, ?)";
    const values = [
      null,
      componenteData.nombre,
      componenteData.descripcion,
      componenteData.precio,
      componenteData.idtipo,
    ];

    try {
      // Ejecutamos la consulta con los valores proporcionados
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
      return result; // Retornamos el resultado de la inserción
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para obtener un componente por su ID
  async getComponenteById(componenteId) {
    const query = "SELECT * FROM componente WHERE idcomponente = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [componenteId]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para obtener un componente por ID y sus relaciones con tipo
  async getComponenteByIdRelations(componenteId) {
    const query =
      "SELECT c.*,t.tipo,t.descripcion as tipodesc FROM componente as c, tipo as t WHERE c.idtipo = t.idtipo AND idcomponente = ?";
    try {
      const [result] = await db.promise().query(query, [componenteId]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null;
      }
      return result[0]; // Devolvemos el primer componente con sus relaciones
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para eliminar un componente
  async deleteComponente(componenteId) {
    const query = "DELETE FROM componente WHERE idcomponente = ?";
    try {
      const [result] = await db.promise().query(query, [componenteId]); // Usamos promise() para que query sea compatible con promesas
      return result; // Devolvemos el resultado de la eliminación
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Otros métodos del modelo pueden ser añadidos aquí...
}

// Exportamos una instancia única de ComponenteModel
module.exports = new ComponenteModel();
