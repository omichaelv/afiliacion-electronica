import axios from 'axios';
import { CountriesResponse } from '../interfaces/CountriesResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const fetchCountries = async (): Promise<CountriesResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/consultaPais`;

  try {
    // Since there is no data to send, we don't need to encrypt anything for the request
    const response = await axios.post<{ data: string }>(url);

    // Assuming the response data is encrypted
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as CountriesResponse;
  } catch (error) {
    console.error("Error in fetching countries: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as CountriesResponse;
    }

    throw error;
  }
};

export default fetchCountries;