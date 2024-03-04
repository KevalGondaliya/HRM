import {createModel} from '@rematch/core';
import * as apiService from '../utility/positionReassignmentervice';

export const positionReassignment = createModel()({
  state: {
    positionReassign: null,
    salaryReassign: null,
  },
  reducers: {
    savePositionReassign(state, positionReassign) {
      return {...state, positionReassign};
    },
    saveSalaryReassign(state, salaryReassign) {
      return {...state, salaryReassign};
    },
  },

  effects: dispatch => ({
    setPositionReassign: async data => {
      try {
        const addPostitionReassign = await apiService.addPostitionReassign(
          data.token,
          data.data,
        );

        if (addPostitionReassign.status == 200) {
          dispatch.positionReassignment.savePositionReassign(true);

          dispatch.alerts.success({
            domain: 'addPostitionReassign',
            message: addPostitionReassign.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addPostitionReassign',
          message: e.message,
        });
      }
    },

    setSalaryReassign: async data => {
      try {
        const addSalaryReassign = await apiService.addSalaryReassign(
          data.token,
          data.data,
        );

        if (addSalaryReassign.status == 200) {
          dispatch.positionReassignment.saveSalaryReassign(true);

          dispatch.alerts.success({
            domain: 'addPostitionReassign',
            message: addSalaryReassign.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addPostitionReassign',
          message: e.message,
        });
      }
    },
  }),
});
