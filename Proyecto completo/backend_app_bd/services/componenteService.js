// Import the model layer for handling database interactions related to components
const componenteModel = require('../models/componenteModel');
const { logMensaje } = require('../utils/logger');

class ComponenteService {

    // Retrieves all components from the database
    async getAllComponente() {
        try {
            const data = await componenteModel.getAllComponente();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Retrieves a list of components for display purposes
    async getAllComponenteListado() {
        try {
            const data = await componenteModel.getAllComponenteListado();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Retrieves data for components to generate a chart
    async getAllComponenteGrafica() {
        try {
            const data = await componenteModel.getAllComponenteGrafica();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Creates a new component and validates the data before saving it
    async createComponente(componenteData) {
        try {
            const result = await componenteModel.createComponente(componenteData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Retrieves a specific component by its ID
    async getComponenteById(componenteId) {
        try {
            const result = await componenteModel.getComponenteById(componenteId);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Retrieves a specific component along with its related data
    async getComponenteByIdRelations(componenteId) {
        try {
            const result = await componenteModel.getComponenteByIdRelations(componenteId);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Deletes a component from the database
    async deleteComponente(componenteId) {
        try {
            const result = await componenteModel.deleteComponente(componenteId);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new ComponenteService();
