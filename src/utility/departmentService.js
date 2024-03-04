import axios from 'axios';
import {API_URL} from './constant';

export const addDepartment = async (token, data) => {
  const response = await axios.post(API_URL + '/api/department', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getDepartment = async token => {
  const response = await axios.get(API_URL + '/api/department', {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const editDepartment = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/department/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const delDepartment = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/department/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
