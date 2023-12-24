const axios = require('axios');
const getToken = require('../utils/tokenFetcher');

const { encrypt, decrypt } = require('../utils/cryptoUtil');

const validarAfiliacion = async (encryptedData) => {
    // Decrypt the request data
    const decryptedRequest = decrypt(encryptedData);
    const requestData = JSON.parse(decryptedRequest);
    const hostKey = `${process.env.CURRENT_ENV}_HOST`;

    // Make the actual API call to the original endpoint
    const token = await getToken();
    const baseUrlKey = `${process.env.CURRENT_ENV}_API_BASE_URL`;
    const baseUrl = process.env[baseUrlKey];
    const url = `${baseUrl}/validarAfiliacion`;

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Host': process.env[hostKey]
        },
      });
  
      // Encrypt response before sending back
      const encryptedResponse = encrypt(JSON.stringify(response.data));
      return encryptedResponse;
    } catch (error) {
      console.error('Error in validarAfiliacionService: ', error);
      throw error;
    }
};

const guardarAfiliacion = async (encryptedData) => {
  const decryptedData = decrypt(encryptedData);
  const parsedData = JSON.parse(decryptedData);

  const token = await getToken();
  const baseUrl = `${process.env.CURRENT_ENV}_REACT_APP_API_BASE_URL`;
  const url = `${baseUrl}/guardarAfiliacion`;

  try {
    const response = await axios.post(url, parsedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Encrypt response before sending back
    const encryptedResponse = encrypt(JSON.stringify(response.data));
    return encryptedResponse;
  } catch (error) {
    console.error('Error in guardarAfiliacionService: ', error);
    throw error;
  }
};

module.exports = {
    validarAfiliacion,
    guardarAfiliacion,
};