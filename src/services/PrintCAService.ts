import axios from 'axios';
import { PrintCARequest } from '../interfaces/requests/PrintCARequest';
import { PrintCAResponse } from '../interfaces/PrintCAResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const printCA = async (data: PrintCARequest): Promise<PrintCAResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/imprimeCA`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(JSON.stringify(data));
    
    // Send the encrypted data
    const response = await axios.post<{ data: string }>(url, encryptedData);

    // Decrypt the response data
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as PrintCAResponse;
  } catch (error) {
    console.error("Error in printing CA: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as PrintCAResponse;
    }

    throw error;
  }
};

export default printCA;