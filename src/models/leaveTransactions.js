import {createModel} from '@rematch/core';
import * as apiService from '../utility/leaveTransactionsServices';

export const leaveTransactions = createModel()({
  state: {
    isAddLeaveTransactions: false,
    isEditLeaveTransactions: false,
    isDelLeaveTransactions: false,
    leaveTransactionsData: null,
    leaveDataById: null,
  },
  reducers: {
    setLeaveTransactions(state, isAddLeaveTransactions) {
      return {...state, isAddLeaveTransactions};
    },

    saveEditLeaveTransactions(state, isEditLeaveTransactions) {
      return {...state, isEditLeaveTransactions};
    },

    setLeaveTransactionsData(state, leaveTransactionsData) {
      return {...state, leaveTransactionsData};
    },

    saveDelLeaveTransactions(state, isDelLeaveTransactions) {
      return {...state, isDelLeaveTransactions};
    },

    setLeaveDataByUser(state, leaveDataById) {
      return {...state, leaveDataById};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addLeaveTransactions = await apiService.add(
          data.token,
          data.data,
        );

        if (addLeaveTransactions.status == 200) {
          dispatch.leaveTransactions.setLeaveTransactions(true);
          dispatch.leaveTransactions.get(data);
          dispatch.leaveTransactions.getLeavrByUser({
            token: data.token,
            id: data.data.userId,
          });
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addLeaveTransactions.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveTransactions',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getLeaveType = await apiService.get(data.token, data.e);

        if (getLeaveType.status == 200) {
          dispatch.leaveTransactions.setLeaveTransactionsData(
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

    getLeavrByUser: async data => {
      try {
        const getLeaveType = await apiService.getLeave(data.token, data.id);

        if (getLeaveType.status == 200) {
          dispatch.leaveTransactions.setLeaveDataByUser(getLeaveType.list);
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
          dispatch.leaveTransactions.saveDelLeaveTransactions(true);
          dispatch.leaveTransactions.get(data);
          dispatch.leaveTransactions.getLeavrByUser({
            token: data.token,
            id: data.userId,
          });
          dispatch.alerts.success({
            domain: 'delete leave',
            message: delApprovalGroups.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete leave',
          message: e.message,
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
        console.log('editLeaveType', editLeaveType);
        if (editLeaveType.status == 200) {
          dispatch.leaveTransactions.saveEditLeaveTransactions(true);
          dispatch.leaveTransactions.get(data);
          dispatch.leaveTransactions.getLeavrByUser({
            token: data.token,
            id: data.data.userId,
          });
          dispatch.alerts.success({
            domain: 'edit Deduction',
            message: editLeaveType.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.message,
        });
      }
    },
  }),
});
