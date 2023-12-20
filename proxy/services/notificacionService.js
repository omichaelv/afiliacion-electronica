const axios = require('axios');
const { encrypt, decrypt } = require('../utils/cryptoUtil');
const getToken = require('../utils/tokenFetcher');

const notificaPEP = async (encryptedData) => {
    // Decrypt the request data
    const decryptedRequest = decrypt(encryptedData);
    const requestData = JSON.parse(decryptedRequest);

    // Make the actual API call to the original endpoint
    const token = await getToken();
    const baseUrl = `${process.env.CURRENT_ENV}_REACT_APP_API_BASE_URL`;
    const url = `${baseUrl}/notificaciones/notificaPEP`;

    try {
        const response = await axios.post(url, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        // Encrypt response before sending back
        const encryptedResponse = encrypt(JSON.stringify(response.data));
        return encryptedResponse;
      } catch (error) {
        console.error('Error in notificaPEP: ', error);
        throw error;
      }

};

const acuseAfiliacion = async (encryptedData) => {
    // Decrypt the request data
    const decryptedRequest = decrypt(encryptedData);
    const requestData = JSON.parse(decryptedRequest);

    // Make the actual API call to the original endpoint
    const token = await getToken();
    const baseUrlKey = `${process.env.CURRENT_ENV}_API_BASE_URL`;
    const baseUrl = process.env[baseUrlKey];
    const url = `${baseUrl}/notificaciones/acuseAfiliacion`;

    try {
        const response = await axios.post(url, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        // Encrypt response before sending back
        const encryptedResponse = encrypt(JSON.stringify(response.data));
        return encryptedResponse;
      } catch (error) {
        console.error('Error in acuseAfiliacion: ', error);
        throw error;
      }
    
};

const correoBienvenida = async (encryptedData) => {
    // Decrypt the request data
    const decryptedRequest = decrypt(encryptedData);
    const requestData = JSON.parse(decryptedRequest);

    // Make the actual API call to the original endpoint
    const token = await getToken();
    const baseUrl = `${process.env.CURRENT_ENV}_REACT_APP_API_BASE_URL`;
    const url = `${baseUrl}/notificaciones/correoBienvenida`;
    
    try {
        const response = await axios.post(url, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        // Encrypt response before sending back
        const encryptedResponse = encrypt(JSON.stringify(response.data));
        return encryptedResponse;
      } catch (error) {
        console.error('Error in acuseAfiliacion: ', error);
        throw error;
      }
};


module.exports = {
    notificaPEP,
    acuseAfiliacion,
    correoBienvenida
};