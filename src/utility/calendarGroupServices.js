import axios from 'axios';
import { API_URL } from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/calendar-group', data, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const addDates = async (token, data) => {
  const response = await axios.post(API_URL + '/api/calendar-date', data, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const get = async (token, e) => {
  const response = await axios.get(API_URL + `/api/calendar-group?search=${e === undefined ? '' : e}`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  console.log("123", response.data);
  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/calendar-date/${id}`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const delCountry = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/calendar-group/${id}`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const edit = async (token, data, id) => {
  const response = await axios.put(
    API_URL + `/api/calendar-group/${id}`,
    data,
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    },
  );

  return response.data;
};
