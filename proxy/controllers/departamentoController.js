const departamentoService = require('../services/departamentoService');

const consultaDepartamento = async (req, res) => {
    try {
        const response = await departamentoService.consultaDepartamento(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Departamento Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    consultaDepartamento,
};