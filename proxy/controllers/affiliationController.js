const affiliationService = require('../services/affiliationService');

const validateAffiliation = async (req, res) => {
    try {
        const response = await affiliationService.validarAfiliacion(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Affiliation Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};

const guardarAfiliacion = async (req, res) => {
    try {
      const encryptedResponse = await affiliationService.guardarAfiliacion(req.body.encryptedData);
      res.json({ encryptedData: encryptedResponse });
    } catch (error) {
      console.error('Error in guardarAfiliacion: ', error);
      res.status(500).send('Internal Server Error');
    }
  };



module.exports = {
    validateAffiliation,
    guardarAfiliacion
};