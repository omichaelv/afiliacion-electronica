const agenteService = require('../services/agenteService');

const consultaAgente = async (req, res) => {
    try {
        const response = await agenteService.consultaAgente(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Agente Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    consultaAgente,
};