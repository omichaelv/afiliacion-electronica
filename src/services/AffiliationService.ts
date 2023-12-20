import axios from 'axios';
import { AffiliationRequest } from '../interfaces/requests/AffiliationRequest';
import { AffiliationResponse } from '../interfaces/AffiliationResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const validateAffiliation = async (data: AffiliationRequest): Promise<AffiliationResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/validarAfiliacion`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(JSON.stringify(data));
    const response = await axios.post<{ data: string }>(url, { data: encryptedData });

    // Assuming the response data is encrypted
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as AffiliationResponse;
  } catch (error) {
    console.error("Error validating affiliation: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as AffiliationResponse;
    }

    throw error;
  }
};

export default validateAffiliation;