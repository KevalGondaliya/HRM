import {createModel} from '@rematch/core';
import * as apiService from '../utility/deductionServices';

export const deduction = createModel()({
  state: {
    isAddDeductionType: false,
    deductionData: null,
    isDelDeductionType: false,
    isEditDeductionType: false,
  },
  reducers: {
    setDeductionType(state, isAddDeductionType) {
      return {...state, isAddDeductionType};
    },

    setDeductionData(state, deductionData) {
      return {...state, deductionData};
    },
    setDelDeductionType(state, isDelDeductionType) {
      return {...state, isDelDeductionType};
    },
    setEditElearning(state, isEditDeductionType) {
      return {...state, isEditDeductionType};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addDeductionType = await apiService.add(data.token, data.data);

        if (addDeductionType.status == 200) {
          dispatch.deduction.setDeductionType(true);
          dispatch.deduction.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addDeductionType.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add Deduction',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const deductionData = await apiService.get(data.token, data.e);

        if (deductionData.status == 200) {
          dispatch.deduction.setDeductionData(deductionData?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get Deduction',
          message: e.response.message,
        });
      }
    },

    delete: async data => {
      try {
        const delDeduction = await apiService.del(data.token, data.id);

        if (delDeduction.status == 200) {
          dispatch.deduction.setDelDeductionType(true);
          dispatch.deduction.get(data);
          dispatch.alerts.success({
            domain: 'delete deduction',
            message: delDeduction.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete deduction',
          message: e.response.message,
        });
      }
    },

    update: async data => {
      try {
        const editDeduction = await apiService.edit(
          data.token,
          data.data,
          data.id,
        );
        if (editDeduction.status == 200) {
          dispatch.deduction.setEditElearning(true);
          dispatch.deduction.get(data);
          dispatch.alerts.success({
            domain: 'edit Deduction',
            message: editDeduction.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'editDeduction',
          message: e.response.message,
        });
      }
    },
  }),
});
