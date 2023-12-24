const firmanteService = require('../services/firmanteService');

const firmante = async (req, res) => {
    try {
        const response = await firmanteService.firmarDocumento(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Firmante Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    firmante,
};