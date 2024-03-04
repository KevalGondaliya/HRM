import { createModel } from '@rematch/core';
import * as apiService from '../utility/allowanceTypesServices';

export const allowanceTypes = createModel()({
  state: {
    isAddAllowanceTypes: false,
    isDelAllowanceTypes: false,
    isEditAllowanceTypes: false,
    ruleData: null,
    allowanceTypesData: null,
    allowanceData: null,
    isDelRuleAllowanceTypes: false,
  },
  reducers: {
    setAllowanceTypes(state, isAddAllowanceTypes) {
      return { ...state, isAddAllowanceTypes };
    },

    setRuleData(state, ruleData) {
      return { ...state, ruleData };
    },

    setAllowance(state, allowanceData) {
      return { ...state, allowanceData };
    },
    setDelRuleAllowanceTypes(state, isDelRuleAllowanceTypes) {
      return { ...state, isDelRuleAllowanceTypes };
    },
    setAllowanceTypesData(state, allowanceTypesData) {
      return { ...state, allowanceTypesData };
    },

    setDelAllowanceTypes(state, isDelAllowanceTypes) {
      return { ...state, isDelAllowanceTypes };
    },

    saveEditAllowanceTypes(state, isEditAllowanceTypes) {
      return { ...state, isEditAllowanceTypes };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addAllowanceTypes = await apiService.add(data.token, data.data);
        if (addAllowanceTypes.status == 200) {
          dispatch.allowanceTypes.setAllowanceTypes(true);
          dispatch.allowanceTypes.get(data);
          dispatch.alerts.success({
            domain: 'allowanceTypes Add',
            message: addAllowanceTypes.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addAllowanceTypes',
          message: e.response.message,
        });
      }
    },

    getRule: async data => {
      try {
        const getRule = await apiService.getRules(data.token, data.id);
        if (getRule.status == 200) {

          dispatch.allowanceTypes.setRuleData(getRule?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const allowanceTypesData = await apiService.get(data.token, data.e);

        if (allowanceTypesData.status == 200) {
          dispatch.allowanceTypes.setAllowanceTypesData(
            allowanceTypesData?.list,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },

    delete: async data => {
      try {
        const delAllowanceTypes = await apiService.del(data.token, data.id);

        if (delAllowanceTypes.status == 200) {
          dispatch.allowanceTypes.setDelAllowanceTypes(true);
          dispatch.allowanceTypes.get(data);
          dispatch.alerts.success({
            domain: 'delete ApprovalGroups',
            message: delAllowanceTypes.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete ApprovalGroups',
          message: e.response.message,
        });
      }
    },
    deleteRule: async data => {
      try {
        const delAllowanceTypes = await apiService.delRule(data.token, data.id);

        if (delAllowanceTypes.status == 200) {
          dispatch.allowanceTypes.setDelRuleAllowanceTypes(true);
          dispatch.alerts.success({
            domain: 'delete ApprovalGroups',
            message: delAllowanceTypes.message,
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
        const editRule = await apiService.edit(data.token, data.data, data.id);
        if (editRule.status == 200) {
          dispatch.allowanceTypes.saveEditAllowanceTypes(true);
          dispatch.allowanceTypes.get(data);
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

    addAllowanceData: async data => {
      try {
        const addAllowanceTypes = await apiService.addAllownce(
          data.token,
          data.data,
        );
        if (addAllowanceTypes.status == 200) {
          dispatch.allowanceTypes.setAllowance(true);
          dispatch.alerts.success({
            domain: 'allowance Add',
            message: addAllowanceTypes.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addAllowanceTypes',
          message: e.response.message,
        });
      }
    },
  }),
});
