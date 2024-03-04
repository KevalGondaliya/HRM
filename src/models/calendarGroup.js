import { createModel } from '@rematch/core';
import * as apiService from '../utility/calendarGroupServices';

export const calendarGroup = createModel()({
  state: {
    isAddCalendarGroup: false,
    isEditCalendarGroup: false,
    isDelCalendarGroup: false,
    calendarGroupData: null,
    calendarDateData: null,
  },
  reducers: {
    setCalendarGroup(state, isAddCalendarGroup) {
      return { ...state, isAddCalendarGroup };
    },

    saveEditCalendarGroup(state, isEditCalendarGroup) {
      return { ...state, isEditCalendarGroup };
    },

    setCalendarGroupData(state, calendarGroupData) {
      return { ...state, calendarGroupData };
    },

    saveDelCalendarGroup(state, isDelCalendarGroup) {
      return { ...state, isDelCalendarGroup };
    },

    setCalenderDateData(state, calendarDateData) {
      return { ...state, calendarDateData };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addCalendarGroup = await apiService.add(data.token, data.data);

        if (addCalendarGroup.status == 200) {
          dispatch.calendarGroup.setCalendarGroup(true);
          dispatch.calendarGroup.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addCalendarGroup.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add calendarGroup',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getLeaveType = await apiService.get(data.token, data.e);

        if (getLeaveType.status == 200) {
          dispatch.calendarGroup.setCalendarGroupData(getLeaveType.list);
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
          dispatch.calendarGroup.saveDelCalendarGroup(true);
          dispatch.calendarGroup.get(data);
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

    deleteCountry: async data => {

      try {
        const delApprovalGroups = await apiService.delCountry(
          data.token,
          data.id,
        );

        if (delApprovalGroups.status == 200) {
          // dispatch.calendarGroup.saveDelCalendarGroup(true);
          dispatch.calendarGroup.get(data);
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

    addDate: async data => {
      try {
        const addCalendarGroup = await apiService.addDates(
          data.token,
          data.data,
        );

        if (addCalendarGroup.status == 200) {
          dispatch.calendarGroup.setCalenderDateData(true);
          dispatch.calendarGroup.get(data);
          dispatch.alerts.success({
            domain: 'add Calender Date ',
            message: addCalendarGroup.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add calendarGroup',
          message: e.response.message,
        });
      }
    },
  }),
});
