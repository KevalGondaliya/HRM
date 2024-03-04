import axios from 'axios';
import { SINGAPORE_GOV_URL } from './constant';

export const governmentApi = async (url, method, token, data) => {
  const response = await
    axios({
      method: method,
      url: `SINGAPORE_GOV_URL${url}`,
      headers: {
        Accept: 'application/json',
        'X-IBM-Client-Id': 'ec7b048bacf5d927037bb182347cbed6',
        'X-IBM-Client-Secret': '317de1b20db4365861861d8366a0b162',
        Authorization: `Bearer ${token}`
      },
      data: data
    })
  return response.data;
};

