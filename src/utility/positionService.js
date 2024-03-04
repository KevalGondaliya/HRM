import axios from 'axios';
import { API_URL } from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/position', data, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const get = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/position?search=${e === undefined ? '' : e}`,
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    },
  );

  return response.data;
};

export const update = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/position/${id}`, data, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/position/${id}`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};
