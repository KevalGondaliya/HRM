import axios from 'axios';
import {API_URL} from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/appraisal-cycle', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const get = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/appraisal-cycle?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/appraisal-cycle/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const edit = async (token, data, id) => {
  const response = await axios.put(
    API_URL + `/api/appraisal-cycle/${id}`,
    data,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getPeerPandingData = async token => {
  const response = await axios.get(API_URL + '/api/pending-peer-appraisal', {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
