import axios from 'axios';
import {API_URL} from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/elearn', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const get = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/elearn?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getElearningProgress = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/get-elearning-progress?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getElearningProgressById = async (token, id) => {
  const response = await axios.get(API_URL + `/api/elearn/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/elearn/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const edit = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/elearn/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
