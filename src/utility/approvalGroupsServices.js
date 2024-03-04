import axios from 'axios';
import { API_URL } from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/approval-groups', data, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const get = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/approval-groups?search=${e === undefined ? '' : e}`,
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    },
  );

  return response.data;
};

export const getRules = async (token, id) => {
  const response = await axios.get(
    API_URL + `/api/approval-groups-update/${id}`,
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    },
  );

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/approval-groups/${id}`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};
export const deleteRules = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/approval-groups-rule/${id}`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const edit = async (token, data, id) => {
  const response = await axios.put(
    API_URL + `/api/approval-groups/${id}`,
    data,
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    },
  );

  return response.data;
};
