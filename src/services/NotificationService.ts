import axios from 'axios';
import { NotificationRequest } from '../interfaces/requests/NotificationRequest';
import { NotificationResponse } from '../interfaces/NotificationResponse';
import { encrypt, decrypt } from '../../src/util/cryptoUtil';

const sendNotification = async (data: NotificationRequest): Promise<NotificationResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/notificaPEP`;

  try {
    // Encrypt the request data
    const encryptedData = encrypt(JSON.stringify(data));
    const response = await axios.post<{ data: string }>(url, { data: encryptedData });

    // Assuming the response data is encrypted
    const decryptedData = decrypt(response.data);
    return JSON.parse(decryptedData) as NotificationResponse;
  } catch (error) {
    console.error("Error sending notification: ", error);
    
    if (axios.isAxiosError(error) && error.response) {
      // Assuming the error response data is encrypted
      const decryptedData = decrypt(error.response.data);
      return JSON.parse(decryptedData) as NotificationResponse;
    }

    throw error;
  }
};

export default sendNotification;
