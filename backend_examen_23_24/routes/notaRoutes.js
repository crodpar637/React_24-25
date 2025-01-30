const express = require('express');
const router = express.Router();
const notaController = require('../controllers/notaController');

// Rutas para las notas
router.get('/', notaController.getAllNota);
router.post('/', notaController.createNota);
router.get('/:id', notaController.getNotaById);
router.put('/:id', notaController.updateNota);
router.delete('/:id', notaController.deleteNota);

module.exports = router;