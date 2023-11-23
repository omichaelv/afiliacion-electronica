import axios from 'axios';
import { NotificationRequest } from '../interfaces/requests/NotificationRequest';
import {NotificationResponse } from '../interfaces/NotificationResponse';

const sendNotification = async (data: NotificationRequest): Promise<NotificationResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const url = `${baseUrl}/notificaciones/notificaPEP`;

  try {
    const response = await axios.post<NotificationResponse>(url, data);
    return response.data;
  } catch (error) {
    console.error("Error sending notification: ", error);
    
    // Handle or rethrow the error as needed
    if (axios.isAxiosError(error) && error.response) {
      // You can handle Axios specific errors here
      const serverResponse: NotificationResponse = error.response.data;
      return serverResponse;
    }

    throw error;
  }
};

export default sendNotification; 