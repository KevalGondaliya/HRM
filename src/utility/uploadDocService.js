import axios from 'axios';
import {API_URL} from './constant';

export const uploadDocument = async (token, data) => {
  const response = await axios.post(API_URL + `/api/document-upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const uploadUserDocument = async (token, data, id) => {
  const response = await axios.post(
    API_URL + `/api/user-document-upload/${id}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(
    API_URL + `/api/document-delete/${id}`,

    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
