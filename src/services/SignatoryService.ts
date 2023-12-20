import axios from 'axios';
import { SignatoryDetails } from '../interfaces/SignatoryDetails';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const getSignatoryDetails = async (): Promise<SignatoryDetails> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/consultaFirmante`;

  try {
    // Encrypt an empty object as the data
    const encryptedData = encrypt(JSON.stringify({}));

    // Send the encrypted data
    const response = await axios.post<{ data: string }>(url, encryptedData);

    // Decrypt the response data
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as SignatoryDetails;
  } catch (error) {
    console.error("Error fetching signatory details: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as SignatoryDetails;
    }

    throw error;
  }
};

export default getSignatoryDetails;