import axios from 'axios';
import {API_URL} from './constant';

export const getOrgDepartment = async (token, id) => {
  const response = await axios.get(API_URL + `/api/getDepartment/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getDepartmentPosition = async (token, id) => {
  const response = await axios.get(API_URL + `/api/getPostion/${id}`, {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const getApprovalGroup = async (token, id) => {
  const response = await axios.get(
    API_URL + `/api/groups-on-organization/${id}`,
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};
