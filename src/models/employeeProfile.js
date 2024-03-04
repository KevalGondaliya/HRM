import { createModel } from '@rematch/core';
import * as apiService from '../utility/employeeProfileServices';

export const employeeProfile = createModel()({
  state: {
    personalInfo: null,
  },
  reducers: {
    setPersonalInfo(state, personalInfo) {
      return { ...state, personalInfo };
    },
  },

  effects: dispatch => ({
    getPersonalInfo: async data => {
      try {
        const personalInfo = await apiService.personalInfo(data.token, data.id);

        if (personalInfo.status == 200) {
          dispatch.employeeProfile.setPersonalInfo(personalInfo.user);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add employeeProfile',
          message: e.message,
        });
      }
    },
  }),
});
