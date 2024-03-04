import axios from 'axios';
import {API_URL} from './constant';

export const authApi = () =>
  axios.create({
    baseURL: API_URL,
  });

export const addPostitionReassign = async (token, data) => {
  const response = await axios.post(
    API_URL + `/api/position-reassignment`,
    data,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const addSalaryReassign = async (token, data) => {
  const response = await axios.post(API_URL + `/api/salary-adjustment`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
