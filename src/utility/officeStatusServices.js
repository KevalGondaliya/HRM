import axios from 'axios';
import {API_URL} from './constant';

export const add = async (token, data, id) => {
  const response = await axios.put(API_URL + `/api/change-status/${id}`, data, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
