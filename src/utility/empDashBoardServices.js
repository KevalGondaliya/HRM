import axios from 'axios';
import {API_URL} from './constant';

export const getPendingData = async token => {
  const response = await axios.get(
    API_URL + '/api/employee-get-pending-application',
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getEntitlesLeaveData = async token => {
  const response = await axios.get(
    API_URL + '/api/employee-get-entitles-leave',
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const getEntitlesAllownceUserData = async token => {
  const response = await axios.get(
    API_URL + '/api/employee-get-entitles-allowance',
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const pendingReviewApplicationsData = async token => {
  const response = await axios.get(
    API_URL + '/api/dashboard-pending-review-applicaiton',
    {
      headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    },
  );

  return response.data;
};

export const adminDashboardOverviewData = async token => {
  const response = await axios.get(API_URL + '/api/admin-dashboard-overview', {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};

export const adminDashboardDepartmentData = async token => {
  const response = await axios.get(API_URL + '/api/department-brockdown', {
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
  });

  return response.data;
};
