import axios from 'axios';
import { FirmarDocumentoRequest } from '../interfaces/requests/FirmarDocumentoRequest';
import { FirmarDocumentoResponse } from '../interfaces/FirmarDocumentoResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const firmarDocumento = async (data: FirmarDocumentoRequest): Promise<FirmarDocumentoResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/firmarDocumento`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(JSON.stringify(data));
    const response = await axios.post<{ data: string }>(url, { data: encryptedData });

    // Assuming the response data is encrypted
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as FirmarDocumentoResponse;
  } catch (error) {
    console.error("Error in signing document: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as FirmarDocumentoResponse;
    }

    throw error;
  }
};

export default firmarDocumento;