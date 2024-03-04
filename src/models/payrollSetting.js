import {createModel} from '@rematch/core';
import * as apiService from '../utility/addPayrollSettingsServices';

export const payrollSetting = createModel()({
  state: {
    isAddPayrollSettings: false,
  },
  reducers: {
    setAddPayrollSettings(state, isAddPayrollSettings) {
      return {...state, isAddPayrollSettings};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addPayrollSettings = await apiService.add(data.token, data.data);
        console.log(addPayrollSettings);
        if (addPayrollSettings.status == 200) {
          dispatch.payrollSetting.setAddPayrollSettings(true);

          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addPayrollSettings.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add payrollSetting',
          message: e.response.message,
        });
      }
    },
  }),
});
