import axios from 'axios';
import {API_URL} from './constant';

export const addOrganisations = async (token, data) => {
  const response = await axios.post(API_URL + '/api/organisation', data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getOrganisations = async (token, e) => {
  const response = await axios.get(
    API_URL + `/api/organisation?search=${e === undefined ? '' : e}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const delOrganisations = async ({token, id}) => {
  const response = await axios.delete(API_URL + `/api/organisation/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const editOrg = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/organisation/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
