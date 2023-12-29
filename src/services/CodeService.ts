import axios from 'axios';
import { CodigoRequest } from '../interfaces/requests/CodigoRequest';
import { CodigoResponse } from '../interfaces/CodigoResponse';
import { encrypt, decrypt } from '../util/cryptoUtil';

const sendCode = async (data: CodigoRequest): Promise<CodigoResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/correoEnviarCodigo`;

  try {
    // Encrypt the data
    const encryptedData = encrypt(JSON.stringify(data));

    // Send the encrypted data
    const response = await axios.post<{ data: string }>(url, encryptedData);

    // Decrypt the response data
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as CodigoResponse;
  } catch (error) {
    

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as CodigoResponse;
    }

    throw error;
  }
};

export default sendCode;