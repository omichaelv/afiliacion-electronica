const notificacionService = require('../services/notificacionService');

const notificacion = async (req, res) => {
    try {
        const response = await notificacionService.notificaPEP(req.body);
        res.json(response);
    } catch (error) {
        console.error("Error in Notificacion PEP Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};

const acuseAfiliacion = async (req, res) => {
    try {
        const response = await notificacionService.acuseAfiliacion(req.body);
        res.json(response);
    } catch (error) {
        console.error("Error in Notificacion acuse Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};

const correoBienvenida = async (req, res) => {
    try {
        const response = await notificacionService.correoBienvenida(req.body);
        res.json(response);
    } catch (error) {
        console.error("Error in Notificacion acuse Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    notificacion,
    acuseAfiliacion,
    correoBienvenida
};
