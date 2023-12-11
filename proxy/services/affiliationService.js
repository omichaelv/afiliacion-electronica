const axios = require('axios');
const { encrypt, decrypt } = require('../utils/cryptoUtil');

const validarAfiliacion = async (encryptedData) => {
    // Decrypt the request data
    const decryptedRequest = decrypt(encryptedData);
    const requestData = JSON.parse(decryptedRequest);

    // Make the actual API call to the original endpoint
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const response = await axios.post(`${baseUrl}/validarAfiliacion`, requestData);

    // Encrypt the response data
    return encrypt(JSON.stringify(response.data));
};

const guardarAfiliacion = async (encryptedData) => {
  const decryptedData = decrypt(encryptedData);
  const parsedData = JSON.parse(decryptedData);

  const baseUrl = process.env.API_BASE_URL; 
  const response = await axios.post(`${baseUrl}/guardarAfiliacion`, parsedData);

  return encrypt(JSON.stringify(response.data));
};

module.exports = {
    validarAfiliacion,
    guardarAfiliacion,
};