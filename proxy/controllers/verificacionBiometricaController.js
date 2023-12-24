const verficacionBiometricaService = require('../services/verficacionBiometricaService');

const verficacionBiometrica = async (req, res) => {
    try {
        const response = await verficacionBiometricaService.verficacionBiometrica(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in verificacion Biometrica Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    verficacionBiometrica,
};