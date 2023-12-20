import axios from 'axios';
import { AfiliacionRequest } from '../interfaces/requests/AfiliacionRequest';
import { AfiliacionResponse } from '../interfaces/AfiliacionResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const guardarAfiliacion = async (data: AfiliacionRequest): Promise<AfiliacionResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/guardarAfiliacion`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(JSON.stringify(data));
    const response = await axios.post<{ data: string }>(url, { data: encryptedData });

    // Assuming the response data is encrypted
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as AfiliacionResponse;
  } catch (error) {
    console.error("Error in saving affiliation: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as AfiliacionResponse;
    }

    throw error;
  }
};

export default guardarAfiliacion;