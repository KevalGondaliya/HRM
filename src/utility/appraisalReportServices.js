import axios from 'axios';
import {API_URL} from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/appraisal-report', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const get = async (token, data) => {
  const response = await axios.post(
    API_URL + '/api/appraisal-report-sheet',
    data,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getEmpData = async (token, e) => {
  const response = await axios.get(API_URL + `/api/employment-data`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getEmpSheetData = async (token, e) => {
  const response = await axios.get(API_URL + `/api/employment-sheet`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getAttendanceReport = async (token, data, e) => {
  const response = await axios.post(API_URL + `/api/attendance-data`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getAttendanceSheetData = async (token, data, e) => {
  const response = await axios.post(API_URL + `/api/attendance-sheet`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getLeavesReport = async (token, data, e) => {
  const response = await axios.post(API_URL + `/api/leave-data`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getLeavesReportSheetData = async (token, data, e) => {
  const response = await axios.post(API_URL + `/api/leave-sheet`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getAllowncesReport = async (token, data, e) => {
  const response = await axios.post(API_URL + `/api/allowance-data`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getAllowncesReportSheetData = async (token, data, e) => {
  const response = await axios.post(API_URL + `/api/allowance-sheet`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
