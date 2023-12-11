const agenteService = require('../services/agenteService');

const consultaAgente = async (req, res) => {
    try {
        const response = await agenteService.consultaAgente(req.body);
        res.json(response);
    } catch (error) {
        console.error("Error in Affiliation Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    consultaAgente,
};