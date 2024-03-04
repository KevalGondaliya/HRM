import { createModel } from '@rematch/core';
import * as apiService from '../utility/appraisalServices';

export const appraisal = createModel()({
  state: {
    isAddAppraisal: false,
    isEditAppraisal: false,
    isDelAppraisal: false,
    appraisalData: null,
    prreAppraisalData: null,
  },
  reducers: {
    setAppraisal(state, isAddAppraisal) {
      return { ...state, isAddAppraisal };
    },

    saveEditAppraisal(state, isEditAppraisal) {
      return { ...state, isEditAppraisal };
    },

    setAppraisalData(state, appraisalData) {
      return { ...state, appraisalData };
    },

    setPrreAppraisalData(state, prreAppraisalData) {
      return { ...state, prreAppraisalData };
    },

    saveDelAppraisal(state, isDelAppraisal) {
      return { ...state, isDelAppraisal };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const appraisal = await apiService.add(data.token, data.data);

        if (appraisal.status == 200) {
          dispatch.appraisal.setAppraisal(true);
          dispatch.appraisal.get(data);
          dispatch.appraisal.getPeerAppraisalData(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: appraisal.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add appraisal',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getLeaveType = await apiService.get(data.token, data.e);

        if (getLeaveType.status == 200) {
          dispatch.appraisal.setAppraisalData(getLeaveType.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.response.message,
        });
      }
    },

    getPeerAppraisalData: async data => {
      try {
        const getLeaveType = await apiService.getPrreAppraisal(data.token);

        if (getLeaveType.status == 200) {
          dispatch.appraisal.setPrreAppraisalData(getLeaveType.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.response.message,
        });
      }
    },

    delete: async data => {
      try {
        const delApprovalGroups = await apiService.del(data.token, data.id);

        if (delApprovalGroups.status == 200) {
          dispatch.appraisal.saveDelAppraisal(true);
          dispatch.appraisal.get(data);
          dispatch.appraisal.getPeerAppraisalData(data);
          dispatch.alerts.success({
            domain: 'delete ApprovalGroups',
            message: delApprovalGroups.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete ApprovalGroups',
          message: e.response.message,
        });
      }
    },

    update: async data => {
      try {
        const editLeaveType = await apiService.edit(
          data.token,
          data.data,
          data.id,
        );

        if (editLeaveType.status == 200) {
          dispatch.appraisal.saveEditAppraisal(true);
          dispatch.appraisal.get(data);
          dispatch.appraisal.getPeerAppraisalData(data);
          dispatch.alerts.success({
            domain: 'edit Deduction',
            message: editLeaveType.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.response.message,
        });
      }
    },
  }),
});
