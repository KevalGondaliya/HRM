import {createModel} from '@rematch/core';
import * as apiService from '../utility/branchService';

export const massDelete = createModel()({
  state: {
    massDeleteData: false,
  },
  reducers: {
    saveDelete(state, massDeleteData) {
      return {...state, massDeleteData};
    },
  },

  effects: dispatch => ({
    setMassDel: async data => {
      console.log(data);
      try {
        const deleteBranch = await apiService.massDel(data.token, data.data);

        if (deleteBranch.status == 200) {
          dispatch.massDelete.saveDelete(true);
          dispatch.alerts.success({
            domain: 'delete  Branch',
            message: deleteBranch.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'save Branch',
          message: e.message,
        });
      }
    },
  }),
});
