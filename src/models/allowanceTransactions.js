import { createModel } from '@rematch/core';
import * as apiService from '../utility/allowanceTransactionsServices';

export const allowanceTransactions = createModel()({
  state: {
    isAddAllowanceTransactions: false,
    isEditAllowanceTransactions: false,
    isDelAllowanceTransactions: false,
    allowanceTransactionsData: null,
    allowanceTransactionsDataByUser: null,
  },
  reducers: {
    setAllowanceTransactions(state, isAddAllowanceTransactions) {
      return { ...state, isAddAllowanceTransactions };
    },

    saveEditAllowanceTransactions(state, isEditAllowanceTransactions) {
      return { ...state, isEditAllowanceTransactions };
    },

    setAllowanceTransactionsData(state, allowanceTransactionsData) {
      return { ...state, allowanceTransactionsData };
    },

    setAllowanceTransactionsDataByUser(state, allowanceTransactionsDataByUser) {
      return { ...state, allowanceTransactionsDataByUser };
    },

    saveDelAllowanceTransactions(state, isDelAllowanceTransactions) {
      return { ...state, isDelAllowanceTransactions };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addAllowanceTransactions = await apiService.add(
          data.token,
          data.data,
        );
        if (addAllowanceTransactions.status == 200) {
          dispatch.allowanceTransactions.setAllowanceTransactions(true);
          dispatch.allowanceTransactions.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addAllowanceTransactions.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add allowanceTransactions',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getLeaveType = await apiService.get(data.token, data.e);

        if (getLeaveType.status == 200) {
          dispatch.allowanceTransactions.setAllowanceTransactionsData(
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

    getAllownceByUser: async data => {
      try {
        const dataByUser = await apiService.allowanceTransactionsDataByUser(
          data.token,
          data.id,
        );

        if (dataByUser.status == 200) {
          dispatch.allowanceTransactions.setAllowanceTransactionsDataByUser(
            dataByUser.list,
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
          dispatch.allowanceTransactions.saveDelAllowanceTransactions(true);
          dispatch.allowanceTransactions.get(data);
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
          dispatch.allowanceTransactions.saveEditAllowanceTransactions(true);
          dispatch.allowanceTransactions.get(data);
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
