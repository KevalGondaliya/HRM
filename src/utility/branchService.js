import axios from 'axios';
import {API_URL} from './constant';

export const addBranch = async (token, data) => {
  const response = await axios.post(API_URL + '/api/branch', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getBranch = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/branch?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const editBranch = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/branch/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const delBranch = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/branch/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const massDel = async (token, data) => {
  var formData = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  let formBody = JSON.stringify(data);
  formData['body'] = formBody;

  const response = await fetch(`${API_URL}/api/mass-delete`, formData, 500);

  return response;
};
