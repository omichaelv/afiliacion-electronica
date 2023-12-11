const express = require('express');
const router = express.Router();
const affiliationController = require('../controllers/affiliationController');
const agenteController = require('../controllers/agenteController');

router.post('/validarAfiliacion', affiliationController.validateAffiliation);
router.post('/guardarAfiliacion', affiliationController.guardarAfiliacion);
router.post('/consultaAgente', agenteController.consultaAgente);

module.exports = router;