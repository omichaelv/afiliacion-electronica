import axios from 'axios';
import { AgenteDetails } from '../interfaces/AgenteDetails';

const getAgenteDetails = async (codigoAgente: string): Promise<AgenteDetails> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/consultaAgente/${codigoAgente}`;

  try {
    const response = await axios.get<AgenteDetails>(url);
    return response.data;
  } catch (error) {
    console.error("Fetching error: ", error);
    // You might want to handle or rethrow the error differently depending on your use case
    throw error;
  }
};

export default getAgenteDetails;