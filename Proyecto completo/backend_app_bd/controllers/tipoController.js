// Import the service layer for handling type-related operations
const tipoService = require("../services/tipoService");
const Respuesta = require("../utils/respuesta");

class TipoController {
  // Handles retrieval of all types
  async getAllTipo(req, res) {
    try {
      const data = await tipoService.getAllTipo(); // Fetch all types from the service
      res.json(Respuesta.exito(data, "Datos de tipos recuperados"));
    } catch (err) {
      // Handle errors during the service call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles retrieval of a single type by its ID (implementation pending)
  async getTipoById(req, res) {
    // Implementa la lógica para obtener un dato por ID (pendiente de implementar)
  }

  // Handles creation of a new type (implementation pending)
  async createTipo(req, res) {
    // Implementa la lógica para crear un nuevo dato (pendiente de implementar)
  }

  // Handles updating of a type by its ID (implementation pending)
  async updateTipo(req, res) {
    // Implementa la lógica para actualizar un dato por ID (pendiente de implementar)
  }

  // Handles deletion of a type by its ID (implementation pending)
  async deleteTipo(req, res) {
    // Implementa la lógica para eliminar un dato por ID (pendiente de implementar)
  }
}

module.exports = new TipoController();

// Structure of result (MySQL)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Number of rows affected by the query
//   insertId: 1,     // ID generated by the insertion operation
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0   // Number of rows changed by the query
// }
