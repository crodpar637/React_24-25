// Importamos la configuración de la base de datos y el utilitario para loguear errores
const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class TipoModel {

    // Método para obtener todos los tipos
    async getAllTipo() {
        const query = 'SELECT * FROM tipo';
        try {
            // Usamos await para esperar la respuesta de la consulta
            const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
            return result; // Retornamos el resultado de la consulta
        } catch (err) {
            // Si ocurre un error, lo registramos y lo lanzamos
            logErrorSQL(err);
            throw err;
        }
    }

    // Otros métodos del modelo pueden ser añadidos aquí...
}

// Exportamos una instancia única de TipoModel
module.exports = new TipoModel();
