import axios from 'axios';
import {API_URL} from './constant';

export const authApi = () =>
  axios.create({
    baseURL: API_URL,
  });

//login api
export const authenticate = async data => {
  return await authApi().post(`/api/login`, data);
};

/// forgot Pasword
export const forgotPassword = async data => {
  const response = await axios.post(`/api/forgot-passwrod`, data, {
    headers: {Accept: 'application/json'},
  });
  return response.data;
};

//set user profile

export const updateUserProfile = async (token, data) => {
  const response = await axios.put(API_URL + `/api/user`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

//get user profile

export const userProfile = async (id, token) => {
  const response = await axios.get(API_URL + `/api/user/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });
  return response.data;
};

//status

export const status = async (token, data) => {
  const response = await axios.post(API_URL + `/api/office_status`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });
  return response.data;
};
