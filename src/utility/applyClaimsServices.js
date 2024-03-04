import axios from 'axios';
import {API_URL} from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/claim', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const claimStatus = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/claim-status/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const get = async (token, userId, e) => {
  console.log(token, userId, e);
  const response = await axios.get(
    API_URL + `/api/claim/${userId}?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const pendingClaimData = async token => {
  const response = await axios.get(API_URL + `/api/pending-claim`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/claim/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const edit = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/claim/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getClaimType = async (token, id) => {
  const response = await axios.get(API_URL + `/api/claim/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
