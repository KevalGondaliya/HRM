import {createModel} from '@rematch/core';
import * as apiService from '../utility/leaveService';

export const leave = createModel()({
  state: {
    leaveMessage: null,
    leaveList: null,
    pendingLeaveList: null,
    updateList: null,
    leaveSettingData: false,
    isApproveLeave: false,
  },
  reducers: {
    addLeave(state, leaveMessage) {
      return {...state, leaveMessage};
    },

    setLeaveList(state, leaveList) {
      return {...state, leaveList};
    },

    setPendingLeaveList(state, pendingLeaveList) {
      return {...state, pendingLeaveList};
    },

    setUpdateLeaveList(state, updateList) {
      return {...state, updateList};
    },

    setLeaveSettings(state, leaveSettingData) {
      return {...state, leaveSettingData};
    },

    setApproveLeave(state, isApproveLeave) {
      return {...state, isApproveLeave};
    },
  },

  effects: dispatch => ({
    setAddLeaveType: async data => {
      try {
        const leave = await apiService.addLeave(data.token, data.data);
        console.log(leave);
        if (leave.status == 200) {
          dispatch.leave.addLeave(leave);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.message,
        });
      }
    },

    getLeave: async data => {
      try {
        const leave = await apiService.getLeave(data.token);
        if (leave.status == 200) {
          dispatch.leave.setLeaveList(leave.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.response.message,
        });
      }
    },

    getPendingLeave: async data => {
      try {
        const pendingLeave = await apiService.pendingLeave(data.token);
        if (pendingLeave.status == 200) {
          dispatch.leave.setPendingLeaveList(pendingLeave.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.response.message,
        });
      }
    },

    getUpdateLeave: async data => {
      try {
        const updateLeave = await apiService.updateLeave(data.token, data.data);
        if (updateLeave.status == 200) {
          dispatch.leave.setUpdateLeaveList(true);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.message,
        });
      }
    },

    leaveApprove: async data => {
      try {
        const updateApproveLeave = await apiService.updateLeaveApprove(
          data.token,
          data.data,
          data.id,
        );
        console.log(updateApproveLeave);
        if (updateApproveLeave.status == 200) {
          dispatch.leave.setApproveLeave(true);
          dispatch.leave.getPendingLeave(data);
        } else {
          dispatch.alerts.error({
            domain: 'user authenticate',
            message: updateApproveLeave.message,
          });
        }
      } catch (e) {}
    },

    setLeaveSetting: async data => {
      try {
        const leaveSetting = await apiService.leaveSetting(
          data.token,
          data.data,
        );
        console.log(leaveSetting);
        if (leaveSetting.status == 200) {
          dispatch.leave.setLeaveSettings(leaveSetting);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'leaveSetting',
          message: e.message,
        });
      }
    },
  }),
});
