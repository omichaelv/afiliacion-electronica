const paisService = require('../services/paisService');

const consultaPais = async (req, res) => {
    try {
        const response = await paisService.consultaPais();
        res.json(response);
    } catch (error) {
        console.error("Error in Pais Controller: ", error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    consultaPais,
};