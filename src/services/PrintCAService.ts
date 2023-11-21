import axios from 'axios';
import { PrintCARequest } from '../interfaces/requests/PrintCARequest';
import {PrintCAResponse} from '../interfaces/PrintCAResponse';

const printCA = async (data: PrintCARequest): Promise<PrintCAResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/imprimeCA`;

  try {
    const response = await axios.post<PrintCAResponse>(url, data);
    return response.data;
  } catch (error) {
    console.error("Error in printing CA: ", error);

    if (axios.isAxiosError(error) && error.response) {
      const serverResponse: PrintCAResponse = error.response.data;
      return serverResponse;
    }

    throw error;
  }
};

export default printCA;