import axios from 'axios';
import { AgenteDetails } from '../interfaces/AgenteDetails';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const getAgenteDetails = async (codigoAgente: string): Promise<AgenteDetails> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/consultaAgente`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(codigoAgente);
    const response = await axios.post<{ data: string }>(url, { data: encryptedData });
    // Assuming the response data is encrypted
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as AgenteDetails;
  } catch (error) {
    console.error("Fetching error: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as AgenteDetails;
    }

    throw error;
  }
};

export default getAgenteDetails;