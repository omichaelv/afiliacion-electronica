import axios from 'axios';
import { WelcomeEmailRequest } from '../interfaces/requests/WelcomeEmailRequest';
import { WelcomeEmailResponse } from '../interfaces/WelcomeEmailResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const sendWelcomeEmail = async (data: WelcomeEmailRequest): Promise<WelcomeEmailResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/correoBienvenida`;

  try {
    // Encrypt the data
    const encryptedData = encrypt(JSON.stringify(data));

    // Send the encrypted data
    const response = await axios.post<{ data: string }>(url, encryptedData);

    // Decrypt the response data
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as WelcomeEmailResponse;
  } catch (error) {
    console.error("Error in sending welcome email: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as WelcomeEmailResponse;
    }

    throw error;
  }
};

export default sendWelcomeEmail;