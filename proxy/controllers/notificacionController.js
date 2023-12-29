const notificacionService = require('../services/notificacionService');

const notificacion = async (req, res) => {
    try {
        const response = await notificacionService.notificaPEP(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Notificacion PEP Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};

const acuseAfiliacion = async (req, res) => {
    try {
        const response = await notificacionService.acuseAfiliacion(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Notificacion acuse Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};

const correoEnviar = async (req, res) => {
    try {
        const response = await notificacionService.correoEnviar(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Notificacion acuse Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};

const correoVerificar = async (req, res) => {
    try {
        const response = await notificacionService.correoVerificar(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Notificacion acuse Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    notificacion,
    acuseAfiliacion,
    correoEnviar,
    correoVerificar
};
