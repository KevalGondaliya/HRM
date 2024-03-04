import axios from 'axios';
import {API_URL} from './constant';

export const personalInfo = async (token, id) => {
  const response = await axios.get(API_URL + `/api/user/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
