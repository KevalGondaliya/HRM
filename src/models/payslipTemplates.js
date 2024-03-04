import {createModel} from '@rematch/core';
import * as apiService from '../utility/payslipTemplatesServices';

export const payslipTemplates = createModel()({
  state: {
    isAddPayslipTemplates: false,
    payslipTemplatesData: null,
    ruleData: null,
    isDelPayslipTemplates: false,
    isEditPayslipTemplates: false,
  },
  reducers: {
    setPayslipTemplates(state, isAddPayslipTemplates) {
      return {...state, isAddPayslipTemplates};
    },

    setPayslipTemplatesData(state, payslipTemplatesData) {
      return {...state, payslipTemplatesData};
    },

    setRuleData(state, ruleData) {
      return {...state, ruleData};
    },

    saveDelPayslipTemplates(state, isDelPayslipTemplates) {
      return {...state, isDelPayslipTemplates};
    },

    saveEditPayslipTemplates(state, isEditPayslipTemplates) {
      return {...state, isEditPayslipTemplates};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addPayslipTemplates = await apiService.add(data.token, data.data);
        console.log(addPayslipTemplates);
        if (addPayslipTemplates.status == 200) {
          dispatch.payslipTemplates.setPayslipTemplates(true);
          dispatch.payslipTemplates.get(data);
          dispatch.alerts.success({
            domain: 'addPayslipTemplates',
            message: addPayslipTemplates.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addPayslipTemplates',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const PayslipTemplatesData = await apiService.get(data.token, data.e);

        if (PayslipTemplatesData.status == 200) {
          dispatch.payslipTemplates.setPayslipTemplatesData(
            PayslipTemplatesData?.list,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get payslipTemplates',
          message: e.response.message,
        });
      }
    },

    delete: async data => {
      try {
        const delPayslipTemplates = await apiService.del(data.token, data.id);

        if (delPayslipTemplates.status == 200) {
          dispatch.payslipTemplates.saveDelPayslipTemplates(true);
          dispatch.payslipTemplates.get(data);
          dispatch.alerts.success({
            domain: 'delete payslipTemplates',
            message: delPayslipTemplates.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete payslipTemplates',
          message: e.response.message,
        });
      }
    },

    getRule: async data => {
      try {
        const getRule = await apiService.getRules(data.token, data.id);
        if (getRule.status == 200) {
          dispatch.payslipTemplates.setRuleData(getRule?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get payslipTemplates',
          message: e.response.message,
        });
      }
    },

    update: async data => {
      try {
        const editRule = await apiService.edit(data.token, data.data, data.id);
        console.log('editRule', editRule);
        if (editRule.status == 200) {
          dispatch.payslipTemplates.saveEditPayslipTemplates(true);
          dispatch.payslipTemplates.get(data);
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
