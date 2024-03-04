import axios from 'axios';
import {API_URL} from './constant';

export const add = async (token, data, id) => {
  const response = await axios.put(
    API_URL + `/api/org-working-day/${id}`,
    data,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const get = async (token, id) => {
  const response = await axios.get(API_URL + `/api/org-working-day/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
