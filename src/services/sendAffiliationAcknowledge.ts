import axios from 'axios';
import { AffiliationAcknowledgeRequest } from '../interfaces/requests/AffiliationAcknowledgeRequest';
import { AffiliationAcknowledgeResponse } from '../interfaces/AffiliationAcknowledgeResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const sendAffiliationAcknowledge = async (data: AffiliationAcknowledgeRequest): Promise<AffiliationAcknowledgeResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/acuseAfiliacion`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(JSON.stringify(data));

    // Send the encrypted data
    const response = await axios.post<{ data: string }>(url, encryptedData);

    // Decrypt the response data
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as AffiliationAcknowledgeResponse;
  } catch (error) {
    console.error("Error in sending affiliation acknowledgment: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as AffiliationAcknowledgeResponse;
    }

    throw error;
  }
};

export default sendAffiliationAcknowledge;