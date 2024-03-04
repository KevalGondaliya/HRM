import {createModel} from '@rematch/core';
import * as apiService from '../utility/applyNewDeductionsServices';

export const applyNewDeductions = createModel()({
  state: {
    isAddApplyNewDeductions: false,
    isEditApplyNewDeductions: false,
    isDelApplyNewDeductions: false,
    applyNewDeductionsData: null,
    deductionsDataByUser: null,
  },
  reducers: {
    setApplyNewDeductions(state, isAddApplyNewDeductions) {
      return {...state, isAddApplyNewDeductions};
    },

    saveEditApplyNewDeductions(state, isEditApplyNewDeductions) {
      return {...state, isEditApplyNewDeductions};
    },

    setApplyNewDeductionsData(state, applyNewDeductionsData) {
      return {...state, applyNewDeductionsData};
    },

    setDeductionsDataByUser(state, deductionsDataByUser) {
      return {...state, deductionsDataByUser};
    },

    saveDelApplyNewDeductions(state, isDelApplyNewDeductions) {
      return {...state, isDelApplyNewDeductions};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addApplyNewDeductions = await apiService.add(
          data.token,
          data.data,
        );

        if (addApplyNewDeductions.status == 200) {
          dispatch.applyNewDeductions.setApplyNewDeductions(true);
          dispatch.applyNewDeductions.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addApplyNewDeductions.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add applyNewDeductions',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getLeaveType = await apiService.get(data.token, data.e);
        if (getLeaveType.status == 200) {
          dispatch.applyNewDeductions.setApplyNewDeductionsData(
            getLeaveType.list,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.response.message,
        });
      }
    },

    getDeductionDataByUser: async data => {
      try {
        const getLeaveType = await apiService.getDeductionByUser(
          data.token,
          data.id,
        );

        if (getLeaveType.status == 200) {
          dispatch.applyNewDeductions.setDeductionsDataByUser(
            getLeaveType.list,
          );
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
          dispatch.applyNewDeductions.saveDelApplyNewDeductions(true);
          dispatch.applyNewDeductions.get(data);
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
          dispatch.applyNewDeductions.saveEditApplyNewDeductions(true);
          dispatch.applyNewDeductions.get(data);
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
