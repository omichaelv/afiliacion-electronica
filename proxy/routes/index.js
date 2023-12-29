const express = require('express');
const router = express.Router();
const affiliationController = require('../controllers/affiliationController');
const agenteController = require('../controllers/agenteController');
const verficacionBiometricaController = require('../controllers/verificacionBiometricaController');
const firmarDocumentoController = require('../controllers/firmarDocumentoController');
const firmanteController = require('../controllers/firmanteController');
const notificacionController = require('../controllers/notificacionController');
const reporteAfiliacionController = require('../controllers/reporteAfiliacionController');
const departamentoController = require('../controllers/departamentoController');
const paisController = require('../controllers/paisController');
const municipioController = require('../controllers/municipioController');

router.post('/validarAfiliacion', affiliationController.validateAffiliation);
router.post('/guardarAfiliacion', affiliationController.guardarAfiliacion);
router.post('/consultaAgente', agenteController.consultaAgente);
router.post('/verficacionBiometrica', verficacionBiometricaController.verficacionBiometrica);
router.post('/firmarDocumento', firmarDocumentoController.firmarDocumento);
router.post('/consultaFirmante', firmanteController.firmante);
router.post('/notificaPEP', notificacionController.notificacion);
router.post('/acuseAfiliacion', notificacionController.acuseAfiliacion);
router.post('/correoEnviarCodigo', notificacionController.correoEnviar);
router.post('/correoVerificacion', notificacionController.correoVerificar);
router.post('/imprimeCA', reporteAfiliacionController.reporteAfiliacion);
router.post('/consultaPais', paisController.consultaPais);
router.post('/consultaDepartamento', departamentoController.consultaDepartamento);
router.post('/consultaMunicipio', municipioController.consultaMunicipio);


module.exports = router;