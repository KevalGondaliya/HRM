import axios from 'axios';
import {API_URL} from './constant';

export const authApi = () =>
  axios.create({
    baseURL: API_URL,
  });

//add employee
export const addEmployee = async (token, data) => {
  const response = await axios.post(API_URL + '/api/user', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
export const editAdmin = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/user/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const get = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/active-employees?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );
  console.log('response.data', response.data);
  return response.data;
};
export const allEmployee = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/employees?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getAdminUserData = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/admins?search${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getRms = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/rms?search${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const addPersonalInfo = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/personalinfo/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const addJobInfo = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/job/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const addOnboard = async (token, data, id) => {
  const response = await axios.put(
    API_URL + `/api/onboard-employee/${id}`,
    data,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

//delete user profile

export const deleteUserProfile = async (token, data, id) => {
  const response = await axios.patch(API_URL + `/api/delete-user/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });
  return response.data;
};

export const getJobPositions = async (token, id) => {
  const response = await axios.get(API_URL + `/api/job-position/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
