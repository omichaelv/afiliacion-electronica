import axios from 'axios';
import { verificarCodigoRequest } from '../interfaces/requests/verificarCodigoRequest';
import { verificarCodigoResponse } from '../interfaces/verificarCodigoResponse';
import { encrypt, decrypt } from '../util/cryptoUtil';

const verifyCode = async (data: verificarCodigoRequest): Promise<verificarCodigoResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/correoVerificacion`;

  try {
    // Encrypt the data
    const encryptedData = encrypt(JSON.stringify(data));

    // Send the encrypted data
    const response = await axios.post<{ data: string }>(url, encryptedData);

    // Decrypt the response data
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as verificarCodigoResponse;
  } catch (error) {
    

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as verificarCodigoResponse;
    }

    throw error;
  }
};

export default verifyCode;