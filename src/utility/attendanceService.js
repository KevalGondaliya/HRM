import axios from 'axios';
import {API_URL} from './constant';

export const attendance = async (token, data) => {
  const response = await axios.post(API_URL + `/api/attendance`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getCheckIn = async (token, id) => {
  const response = await axios.get(API_URL + `/api/last-check-in/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const checkOut = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/check-out`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const attendanceHistory = async (token, id) => {
  const response = await axios.get(API_URL + `/api/attendance/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
export const checkIn = async (token, data) => {
  console.log(API_URL + `/api/check-in`);
  const response = await axios.post(API_URL + `/api/check-in`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });
  return response.data;
};
