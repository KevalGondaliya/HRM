import { createModel } from '@rematch/core';
import * as apiService from '../utility/claimTransactionsServices';

export const claimTransactions = createModel()({
  state: {
    isAddClaimTransactions: false,
    isEditClaimTransactions: false,
    isDelClaimTransactions: false,
    claimTransactionsData: null,
  },
  reducers: {
    setClaimTransactions(state, isAddClaimTransactions) {
      return { ...state, isAddClaimTransactions };
    },

    saveEditClaimTransactions(state, isEditClaimTransactions) {
      return { ...state, isEditClaimTransactions };
    },

    setClaimTransactionsData(state, claimTransactionsData) {
      return { ...state, claimTransactionsData };
    },

    saveDelClaimTransactions(state, isDelClaimTransactions) {
      return { ...state, isDelClaimTransactions };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addClaimTransactions = await apiService.add(
          data.token,
          data.data,
        );
        if (addClaimTransactions.status == 200) {
          dispatch.claimTransactions.setClaimTransactions(true);
          dispatch.claimTransactions.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addClaimTransactions.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add claimTransactions',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getLeaveType = await apiService.get(data.token, data.e);

        if (getLeaveType.status == 200) {
          dispatch.claimTransactions.setClaimTransactionsData(
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
          dispatch.claimTransactions.saveDelClaimTransactions(true);
          dispatch.claimTransactions.get(data);
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
          dispatch.claimTransactions.saveEditClaimTransactions(true);
          dispatch.claimTransactions.get(data);
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
