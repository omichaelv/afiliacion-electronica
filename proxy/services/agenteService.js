const axios = require('axios');
const { encrypt, decrypt } = require('../utils/cryptoUtil');
const getToken = require('../utils/tokenFetcher');

const consultaAgente = async (encryptedData) => {
    // Decrypt the request data
    const decryptedRequest = decrypt(encryptedData);
    const requestData = decryptedRequest;
    const hostKey = `${process.env.CURRENT_ENV}_HOST`;

    // Make the actual API call to the original endpoint
    const token = await getToken();
    const baseUrlKey = `${process.env.CURRENT_ENV}_API_BASE_URL`;
    const baseUrl = process.env[baseUrlKey];
    console.log("AGENTE URL", baseUrl);
    const url = `${baseUrl}/catalogos/agentes`;

    try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Host': process.env[hostKey]
          },
          params: {
            codigoAgente: requestData,
          }
        });
    
        // Encrypt response before sending back
        console.log("RESPONSE", response);
        const encryptedResponse = encrypt(JSON.stringify(response.data));
        console.log("RESPONSEEE", encryptedResponse);
        return encryptedResponse;
      } catch (error) {
        console.error('Error in consultaAgente: ', error);
        throw error;
      }
};


module.exports = {
    consultaAgente,
};