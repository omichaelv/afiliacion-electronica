const express = require('express');
const router = express.Router();
const affiliationController = require('../controllers/affiliationController');
const agenteController = require('../controllers/agenteController');
const verficacionBiometricaController = require('../controllers/verificacionBiometricaController');
const firmarDocumentoController = require('../controllers/firmarDocumentoController');

router.post('/validarAfiliacion', affiliationController.validateAffiliation);
router.post('/guardarAfiliacion', affiliationController.guardarAfiliacion);
router.post('/consultaAgente', agenteController.consultaAgente);
router.post('/verficacionBiometrica', verficacionBiometricaController.verficacionBiometrica);
router.post('/firmarDocumento', firmarDocumentoController.firmarDocumento);

module.exports = router;