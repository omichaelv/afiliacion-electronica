import axios from 'axios';
import { BiometricVerificationRequest } from '../interfaces/requests/BiometricVerificationRequest';
import { BiometricVerificationResponse } from '../interfaces/BiometricVerificationResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const verifyBiometricData = async (data: BiometricVerificationRequest): Promise<BiometricVerificationResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/verficacionBiometrica`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(JSON.stringify(data));
    const response = await axios.post<{ data: string }>(url, { data: encryptedData });

    // Assuming the response data is encrypted
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as BiometricVerificationResponse;
  } catch (error) {
    console.error("Error in biometric verification: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as BiometricVerificationResponse;
    }

    throw error;
  }
};

export default verifyBiometricData;