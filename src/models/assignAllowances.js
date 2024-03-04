import {createModel} from '@rematch/core';
import * as apiService from '../utility/assignAllowancesServices';

export const assignAllowances = createModel()({
  state: {
    isAddAssignAllowances: false,
    assignAllowancesData: null,
    ruleData: null,
    isDelAssignAllowances: false,
    isEditAssignAllowances: false,
  },
  reducers: {
    setAssignAllowances(state, isAddAssignAllowances) {
      return {...state, isAddAssignAllowances};
    },

    setAssignAllowancesData(state, assignAllowancesData) {
      return {...state, assignAllowancesData};
    },

    setRuleData(state, ruleData) {
      return {...state, ruleData};
    },

    saveDelAssignAllowances(state, isDelAssignAllowances) {
      return {...state, isDelAssignAllowances};
    },

    saveEditAssignAllowances(state, isEditAssignAllowances) {
      return {...state, isEditAssignAllowances};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addAssignAllowances = await apiService.add(data.token, data.data);

        if (addAssignAllowances.status == 200) {
          dispatch.assignAllowances.setAssignAllowances(true);
          dispatch.assignAllowances.get(data);
          dispatch.alerts.success({
            domain: 'addAssignAllowances',
            message: addAssignAllowances.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addAssignAllowances',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const AssignAllowancesData = await apiService.get(data.token);

        if (AssignAllowancesData.status == 200) {
          dispatch.assignAllowances.setAssignAllowancesData(
            AssignAllowancesData?.list,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get assignAllowances',
          message: e.response.message,
        });
      }
    },

    delete: async data => {
      try {
        const delAssignAllowances = await apiService.del(data.token, data.id);

        if (delAssignAllowances.status == 200) {
          dispatch.assignAllowances.saveDelAssignAllowances(true);
          dispatch.assignAllowances.get(data);
          dispatch.alerts.success({
            domain: 'delete assignAllowances',
            message: delAssignAllowances.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete assignAllowances',
          message: e.response.message,
        });
      }
    },

    getRule: async data => {
      try {
        const getRule = await apiService.getRules(data.token, data.id);
        if (getRule.status == 200) {
          dispatch.assignAllowances.setRuleData(getRule?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get assignAllowances',
          message: e.response.message,
        });
      }
    },

    update: async data => {
      try {
        const editRule = await apiService.edit(data.token, data.data, data.id);
        if (editRule.status == 200) {
          dispatch.assignAllowances.saveEditAssignAllowances(true);
          dispatch.assignAllowances.get(data);
          dispatch.alerts.success({
            domain: 'edit Deduction',
            message: editRule.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'editRule',
          message: e.response.message,
        });
      }
    },
  }),
});
