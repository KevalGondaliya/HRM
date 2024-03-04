import {createModel} from '@rematch/core';
import * as apiService from '../utility/empDashBoardServices';

export const empDashboard = createModel()({
  state: {
    leavesReportData: null,
    entitlesLeaveData: null,
    pendingReviewApplicationsData: null,
    adminDashboardOverviewData: null,
    entitlesAllowncesData: null,
    entitlesAllowncesData: null,
    adminDashboardDashboardData: null,
  },
  reducers: {
    setPendingApplication(state, leavesReportData) {
      return {...state, leavesReportData};
    },
    setEntitlesLeaveData(state, entitlesLeaveData) {
      return {...state, entitlesLeaveData};
    },
    setPendingReviewApplicationsData(state, pendingReviewApplicationsData) {
      return {...state, pendingReviewApplicationsData};
    },
    setAdminDashboardOverviewData(state, adminDashboardOverviewData) {
      return {...state, adminDashboardOverviewData};
    },
    setEntitlesAllowncesData(state, entitlesAllowncesData) {
      return {...state, entitlesAllowncesData};
    },
    setAdminDashboardDepartmentData(state, adminDashboardDashboardData) {
      return {...state, adminDashboardDashboardData};
    },
  },

  effects: dispatch => ({
    getPendingApplicationData: async data => {
      try {
        const pendingData = await apiService.getPendingData(data.token);

        if (pendingData.status == 200) {
          dispatch.empDashboard.setPendingApplication(pendingData.data);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },

    getEntitlesLeaveData: async data => {
      try {
        const pendingData = await apiService.getEntitlesLeaveData(data.token);
        console.log(pendingData);
        if (pendingData.status == 200) {
          dispatch.empDashboard.setEntitlesLeaveData(pendingData.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },

    getEntitlesAllownceData: async data => {
      try {
        const pendingData = await apiService.getEntitlesAllownceUserData(
          data.token,
        );
        console.log(pendingData);
        if (pendingData.status == 200) {
          dispatch.empDashboard.setEntitlesAllowncesData(pendingData.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },

    getPendingReviewApplicationsData: async data => {
      try {
        const pendingData = await apiService.pendingReviewApplicationsData(
          data.token,
        );

        if (pendingData.status == 200) {
          dispatch.empDashboard.setPendingReviewApplicationsData(
            pendingData.data,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },

    getAdminDashboardOverviewData: async data => {
      try {
        const pendingData = await apiService.adminDashboardOverviewData(
          data.token,
        );

        if (pendingData.status == 200) {
          dispatch.empDashboard.setAdminDashboardOverviewData(pendingData.data);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },

    getAdminDashboardDepartmentData: async data => {
      try {
        const pendingData = await apiService.adminDashboardDepartmentData(
          data.token,
        );
        console.log('pendingData', pendingData);
        if (pendingData.status == 200) {
          dispatch.empDashboard.setAdminDashboardDepartmentData(
            pendingData.list,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },
  }),
});
