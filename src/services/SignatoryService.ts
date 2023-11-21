import axios from 'axios';
import { SignatoryDetails } from '../interfaces/SignatoryDetails';

const getSignatoryDetails = async (): Promise<SignatoryDetails> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/consultaFirmante`;

  try {
    const response = await axios.get<SignatoryDetails>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching signatory details: ", error);

    if (axios.isAxiosError(error) && error.response) {
      const serverResponse: SignatoryDetails = error.response.data;
      return serverResponse;
    }

    throw error;
  }
};

export default getSignatoryDetails;