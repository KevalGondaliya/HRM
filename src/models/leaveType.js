import { createModel } from '@rematch/core';
import * as apiService from '../utility/leaveTypeServices';

export const leaveType = createModel()({
  state: {
    isAddLeaveType: false,
    isDelleaveType: false,
    isEditLeaveType: false,
    leaveTypeData: null,
    publicLeaveData: null,
  },
  reducers: {
    setLeaveType(state, isAddLeaveType) {
      return { ...state, isAddLeaveType };
    },
    setLeaveTypeData(state, leaveTypeData) {
      return { ...state, leaveTypeData };
    },
    setDelLeaveType(state, isDelleaveType) {
      return { ...state, isDelleaveType };
    },
    saveEditLeaveType(state, isEditLeaveType) {
      return { ...state, isEditLeaveType };
    },
    savePublicLeaveData(state, publicLeaveData) {
      return { ...state, publicLeaveData };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addLeaveType = await apiService.add(data.token, data.data);

        if (addLeaveType.status == 200) {
          dispatch.leaveType.setLeaveType(true);
          dispatch.leaveType.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addLeaveType.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getLeaveType = await apiService.get(data.token, data.e);

        if (getLeaveType.status == 200) {
          dispatch.leaveType.setLeaveTypeData(getLeaveType.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.response.message,
        });
      }
    },

    getLeaveType: async data => {
      try {
        const getLeaveType = await apiService.getPublicLeave();
        if (getLeaveType) {
          dispatch.leaveType.savePublicLeaveData(getLeaveType);
        }
      } catch (e) {
        console.log('e', e);
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.message,
        });
      }
    },

    delete: async data => {
      try {
        const delLeaveType = await apiService.del(data.token, data.id);

        if (delLeaveType.status == 200) {
          dispatch.leaveType.setDelLeaveType(true);
          dispatch.leaveType.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: delLeaveType.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
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
          dispatch.leaveType.saveEditLeaveType(true);
          dispatch.leaveType.get(data);
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
