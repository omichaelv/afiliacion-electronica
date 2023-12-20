import axios from 'axios';
import { MunicipalitiesResponse } from '../interfaces/MunicipalitiesResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const fetchMunicipalities = async (codPais: string, codDepto: string): Promise<MunicipalitiesResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/consultaMunicipio`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(JSON.stringify({ codPais, codDepto }));
    const response = await axios.post<{ data: string }>(url, { data: encryptedData });

    // Assuming the response data is encrypted
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as MunicipalitiesResponse;
  } catch (error) {
    console.error("Error in fetching municipalities: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as MunicipalitiesResponse;
    }

    throw error;
  }
};

export default fetchMunicipalities;
