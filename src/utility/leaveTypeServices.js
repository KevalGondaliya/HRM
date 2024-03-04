import axios from 'axios';
import moment from 'moment';
import {API_URL} from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/leave-type', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const get = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/leave-type?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getPublicLeave = async token => {
  const response = await axios.get(
    `https://rjchow.github.io/singapore_public_holidays/api/${moment().format(
      'YYYY',
    )}/data.json`,
  );

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/leave-type/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const edit = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/leave-type/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
