import axios from 'axios';
import { AffiliationRequest } from '../interfaces/requests/AffiliationRequest';
import { AffiliationResponse } from '../interfaces/AffiliationResponse';


const validateAffiliation = async (data: AffiliationRequest): Promise<AffiliationResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/validarAfiliacion`;

  try {
    const response = await axios.post<AffiliationResponse>(url, data);
    return response.data;
  } catch (error) {
    console.error("Error validating affiliation: ", error);

    if (axios.isAxiosError(error) && error.response) {
      const serverResponse: AffiliationResponse = error.response.data;
      return serverResponse;
    }

    throw error;
  }
};

export default validateAffiliation;