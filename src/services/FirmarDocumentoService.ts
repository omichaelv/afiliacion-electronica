import axios from 'axios';
import { FirmarDocumentoRequest } from '../interfaces/requests/FirmarDocumentoRequest';
import {FirmarDocumentoResponse} from '../interfaces/FirmarDocumentoResponse'

const firmarDocumento = async (data: FirmarDocumentoRequest): Promise<FirmarDocumentoResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/firmarDocumento`;

  try {
    const response = await axios.post<FirmarDocumentoResponse>(url, data);
    return response.data;
  } catch (error) {
    console.error("Error in signing document: ", error);

    if (axios.isAxiosError(error) && error.response) {
      const serverResponse: FirmarDocumentoResponse = error.response.data;
      return serverResponse;
    }

    throw error;
  }
};

export default firmarDocumento;