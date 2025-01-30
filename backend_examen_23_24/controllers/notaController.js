// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require('../config/sequelize.js');
// Función de logging
const { logMensaje } = require("../utils/logger.js");
// Método de creación de objetos de respuesta
const Respuesta = require('../utils/respuesta');

// Cargar las definiciones del modelo en sequelize
logMensaje(initModels);
const models = initModels(sequelize);

// Recuperar el modelo nota
const Nota = models.nota;

// Controlador para obtener todas las notas
exports.getAllNota = async (req, res) => {
  try {
    const notas = await Nota.findAll();
    res.json(Respuesta.exito(notas, 'Datos de notas recuperadas'));
  } catch (error) {
    logMensaje(error);
    res.status(500).json(Respuesta.error(null, 'Error al recuperar los datos:' + req.originalUrl));
  }
};

// Controlador para crear una nueva nota
exports.createNota = async (req, res) => {
  const { titulo, texto, fcreacion, urlimagen } = req.body;
  try {
    const nuevaNota = await Nota.create({ titulo, texto, fcreacion, urlimagen });
    res.status(201).json(Respuesta.exito(nuevaNota, 'Nota creada'));
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al crear la nota'));
  }
};

// Controlador para obtener una nota por su ID
exports.getNotaById = async (req, res) => {
  const { id } = req.params;
  try {
    const nota = await Nota.findByPk(id);
    if (nota) {
      res.json(Respuesta.exito(nota, 'Nota recuperada'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Nota no encontrada'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al obtener la nota'));
  }
};

// Controlador para actualizar una nota por su ID
exports.updateNota = async (req, res) => {
  const { id } = req.params;
  const { titulo, texto, fcreacion, urlimagen } = req.body;
  try {
    const nota = await Nota.findByPk(id);
    if (nota) {
      nota.titulo = titulo;
      nota.texto = texto;
      nota.fcreacion = fcreacion;
      nota.urlimagen = urlimagen;
      await nota.save();
      res.json(Respuesta.exito(nota, 'Nota actualizada'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Nota no encontrada'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al actualizar la nota'));
  }
};

// Controlador para eliminar una nota por su ID
exports.deleteNota = async (req, res) => {
  const { id } = req.params;
  try {
    const nota = await Nota.findByPk(id);
    if (nota) {
      await nota.destroy();
      res.json(Respuesta.exito(nota, 'Nota eliminada'));
    } else {
      res.status(404).json(Respuesta.error(null, 'Nota no encontrada'));
    }
  } catch (error) {
    res.status(500).json(Respuesta.error(null, 'Error al eliminar la nota'));
  }
};
