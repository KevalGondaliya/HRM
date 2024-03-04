import { createModel } from '@rematch/core';
import * as apiService from '../utility/addAppraisalCyclesServices';

export const addAppraisalCycles = createModel()({
  state: {
    isAddAddAppraisalCycles: false,
    isEditAddAppraisalCycles: false,
    isDelAddAppraisalCycles: false,
    addAppraisalCyclesData: null,
    pandingPeerAppraisalData: null,
  },
  reducers: {
    setAddAppraisalCycles(state, isAddAddAppraisalCycles) {
      return { ...state, isAddAddAppraisalCycles };
    },

    saveEditAddAppraisalCycles(state, isEditAddAppraisalCycles) {
      return { ...state, isEditAddAppraisalCycles };
    },

    setAddAppraisalCyclesData(state, addAppraisalCyclesData) {
      return { ...state, addAppraisalCyclesData };
    },

    saveDelAddAppraisalCycles(state, isDelAddAppraisalCycles) {
      return { ...state, isDelAddAppraisalCycles };
    },

    setPeerPandingAppraisalData(state, pandingPeerAppraisalData) {
      return { ...state, pandingPeerAppraisalData };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addAddAppraisalCycles = await apiService.add(
          data.token,
          data.data,
        );
        if (addAddAppraisalCycles.status == 200) {
          dispatch.addAppraisalCycles.setAddAppraisalCycles(true);
          dispatch.addAppraisalCycles.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addAddAppraisalCycles.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add addAppraisalCycles',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getLeaveType = await apiService.get(data.token, data.e);

        if (getLeaveType.status == 200) {
          dispatch.addAppraisalCycles.setAddAppraisalCyclesData(
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
          dispatch.addAppraisalCycles.saveDelAddAppraisalCycles(true);
          dispatch.addAppraisalCycles.get(data);
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
          dispatch.addAppraisalCycles.saveEditAddAppraisalCycles(true);
          dispatch.addAppraisalCycles.get(data);
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

    getPeerPandingAppraisal: async data => {
      try {
        const peerPandingData = await apiService.getPeerPandingData(data.token);

        if (peerPandingData.status == 200) {
          dispatch.addAppraisalCycles.setPeerPandingAppraisalData(
            peerPandingData.list,
          );
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
