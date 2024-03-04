import axios from 'axios';
import {API_URL} from './constant';

export const addLeave = async (token, data) => {
  const response = await axios.post(API_URL + `/api/leave`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getLeave = async token => {
  const response = await axios.get(API_URL + `/api/leave`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const pendingLeave = async token => {
  const response = await axios.get(API_URL + `/api/pending-leaves`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const updateLeave = async (token, data) => {
  const response = await axios.patch(API_URL + `/api/leave`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const updateLeaveApprove = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/approve-leave/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const leaveSetting = async (token, data) => {
  const response = await axios.put(API_URL + `/api/leave-setting`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
