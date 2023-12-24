const reporteAfiliacionService = require('../services/reporteAfiliacionService');

const reporteAfiliacion = async (req, res) => {
    try {
        const response = await reporteAfiliacionService.reporteAfiliacion(req.body.data);
        res.json(response);
    } catch (error) {
        console.error("Error in Reporte Afiliacion Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    reporteAfiliacion,
};