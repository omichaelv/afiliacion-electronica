const firmarDocumentoService = require('../services/firmarDocumento');

const firmarDocumento = async (req, res) => {
    try {
        const response = await firmarDocumentoService.firmarDocumento(req.body);
        res.json(response);
    } catch (error) {
        console.error("Error in firmarDocumento Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    firmarDocumento,
};