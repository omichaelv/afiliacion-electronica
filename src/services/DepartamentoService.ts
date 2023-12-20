import axios from 'axios';
import { DepartmentsResponse } from '../interfaces/DepartmentsResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const fetchDepartments = async (codPais: string): Promise<DepartmentsResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/consultaDepartamento`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(JSON.stringify({ codPais }));
    const response = await axios.post<{ data: string }>(url, { data: encryptedData });

    // Assuming the response data is encrypted
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as DepartmentsResponse;
  } catch (error) {
    console.error("Error in fetching departments: ", error);

    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as DepartmentsResponse;
    }

    throw error;
  }
};

export default fetchDepartments;