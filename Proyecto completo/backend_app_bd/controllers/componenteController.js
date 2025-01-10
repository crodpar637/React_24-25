// Import the service layer for handling component-related operations
const componenteService = require("../services/componenteService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class ComponenteController {
  // Handles retrieval of all components based on query parameters
  async getAllComponente(req, res) {
    try {
      const { listado, grafica } = req.query; // Extract query parameters to determine the type of response

      if (listado) {
        // Fetch a list of components if 'listado' is true
        const data = await componenteService.getAllComponenteListado();
        res.json(Respuesta.exito(data, "Listado de componentes recuperado"));
      } else if (grafica) {
        // Fetch data for graphical representation if 'grafica' is true
        const data = await componenteService.getAllComponenteGrafica();
        res.json(
          Respuesta.exito(data, "Datos para gráfica de componentes recuperado")
        );
      } else {
        // Fetch all components if no specific parameter is provided
        const data = await componenteService.getAllComponente();
        res.json(Respuesta.exito(data, "Datos de componentes recuperados"));
      }
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

  // Handles retrieval of a single component by its ID
  async getComponenteById(req, res) {
    try {
      const { relations } = req.query; // Determine if related data should be fetched
      const componenteId = req.params.id; // Extract component ID from the request URL

      if (relations) {
        // Fetch component with related data if 'relations' is true
        const componente = await componenteService.getComponenteByIdRelations(
          componenteId
        );
        if (!componente) {
          // Handle case where the component is not found
          res
            .status(404)
            .json(
              Respuesta.error(null, `Componente no encontrado: ${componenteId}`)
            );
        } else {
          res.json(Respuesta.exito(componente, "Componente recuperado"));
        }
      } else {
        // Fetch only the component without related data
        const componente = await componenteService.getComponenteById(
          componenteId
        );
        if (!componente) {
          // Handle case where the component is not found
          res
            .status(404)
            .json(
              Respuesta.error(null, `Componente no encontrado: ${componenteId}`)
            );
        } else {
          res.json(Respuesta.exito(componente, "Componente recuperado"));
        }
      }
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

  // Handles creation of a new component
  async createComponente(req, res) {
    try {
      const componenteData = req.body; // Extract the component data from the request body
      const result = await componenteService.createComponente(componenteData); // Call service to create the component
      res
        .status(201)
        .json(
          Respuesta.exito(
            { insertId: result.insertId },
            "Componente dado de alta"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el componente: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles updating of a component by its ID (implementation pending)
  async updateComponente(req, res) {
    // Implementa la lógica para actualizar un dato por ID (pendiente de implementar)
  }

  // Handles deletion of a component by its ID
  async deleteComponente(req, res) {
    try {
      const componenteId = req.params.id; // Extract component ID from the request URL
      await componenteService.deleteComponente(componenteId); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new ComponenteController();
