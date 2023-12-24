const municipioService = require('../services/municipioService');

const consultaMunicipio = async (req, res) => {
    try {
        const response = await municipioService.consultaMunicipio(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Pais Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    consultaMunicipio,
};