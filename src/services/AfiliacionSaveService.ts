import axios from 'axios';
import { AfiliacionRequest } from '../interfaces/requests/AfiliacionRequest';
import {AfiliacionResponse} from '../interfaces/AfiliacionResponse';

const guardarAfiliacion = async (data: AfiliacionRequest): Promise<AfiliacionResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/guardarAfiliacion`;

  try {
    const response = await axios.post<AfiliacionResponse>(url, data);
    return response.data;
  } catch (error) {
    console.error("Error in saving affiliation: ", error);

    if (axios.isAxiosError(error) && error.response) {
      const serverResponse: AfiliacionResponse = error.response.data;
      return serverResponse;
    }

    throw error;
  }
};

export default guardarAfiliacion;