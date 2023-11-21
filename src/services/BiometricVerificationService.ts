import axios from 'axios';
import { BiometricVerificationRequest } from '../interfaces/requests/BiometricVerificationRequest';
import {BiometricVerificationResponse} from '../interfaces/BiometricVerificationResponse';

const verifyBiometricData = async (data: BiometricVerificationRequest): Promise<BiometricVerificationResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/verficacionBiometrica`;

  try {
    const response = await axios.post<BiometricVerificationResponse>(url, data);
    return response.data;
  } catch (error) {
    console.error("Error in biometric verification: ", error);

    if (axios.isAxiosError(error) && error.response) {
      const serverResponse: BiometricVerificationResponse = error.response.data;
      return serverResponse;
    }

    throw error;
  }
};

export default verifyBiometricData;