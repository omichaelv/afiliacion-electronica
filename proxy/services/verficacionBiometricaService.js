const axios = require('axios');
const { encrypt, decrypt } = require('../utils/cryptoUtil');

const verficacionBiometrica = async (encryptedData) => {
    // Decrypt the request data
    const decryptedRequest = decrypt(encryptedData);
    const requestData = JSON.parse(decryptedRequest);

    // Make the actual API call to the original endpoint
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const response = await axios.post(`${baseUrl}/verficacionBiometrica`, requestData);

    // Encrypt the response data
    return encrypt(JSON.stringify(response.data));
};


module.exports = {
    verficacionBiometrica,
};