import axios from 'axios';
import {API_URL} from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/appraisal-template', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const get = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/appraisal-template?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(
    API_URL + `/api/appraisal-template/${id}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const edit = async (token, data, id) => {
  const response = await axios.put(
    API_URL + `/api/appraisal-template/${id}`,
    data,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getRules = async (token, id) => {
  const response = await axios.get(
    API_URL + `/api/appraisal-template-quiz/${id}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getAppraisalByUser = async (token, id, e) => {
  const response = await axios.get(
    API_URL + `/api/appraisal-by-user/${id}?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getNominatedAppraisalByUser = async (token, id, e) => {
  const response = await axios.get(
    API_URL +
      `/api/peer-appraisal-by-user/${id}?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getPandingData = async token => {
  const response = await axios.get(API_URL + `/api/panding-appraisal`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const pandingAppraisalData = async (token, data, id) => {
  const response = await axios.put(
    API_URL + `/api/appraisal-template-status/${id}`,
    data,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};
