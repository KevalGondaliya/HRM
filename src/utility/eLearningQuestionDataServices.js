import axios from 'axios';
import {API_URL} from './constant';

export const add = async (token, data) => {
  const response = await axios.post(API_URL + '/api/elearn-quiz', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const addAns = async (token, data) => {
  const response = await axios.post(API_URL + '/api/elearn-quiz-answer', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getQuizAns = async (token, id) => {
  const response = await axios.get(API_URL + `/api/elearn-quiz-answer/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const get = async token => {
  console.log(token);
  const response = await axios.get(API_URL + `/api/elearn-quiz`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getQuestionById = async (token, id) => {
  console.log(token);
  const response = await axios.get(API_URL + `/api/elearn-quiz/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const del = async (token, id) => {
  const response = await axios.delete(API_URL + `/api/elearn-quiz/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const edit = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/elearn-quiz/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
