import axios from 'axios';
import {API_URL} from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/assign-employee', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const get = async token => {
  const response = await axios.get(API_URL + '/api/assign-employee', {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/assign-employee/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const edit = async (token, data, id) => {
  const response = await axios.put(
    API_URL + `/api/assign-employee/${id}`,
    data,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};
