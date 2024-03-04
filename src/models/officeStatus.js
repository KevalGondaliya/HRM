import { createModel } from '@rematch/core';
import * as apiService from '../utility/officeStatusServices';

export const officeStatus = createModel()({
  state: {
    officeStatus: false,
  },
  reducers: {
    setOfficeStatus(state, officeStatus) {
      return { ...state, officeStatus };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const getOfficeStatus = await apiService.add(
          data.token,
          data.data,
          data.id,
        );
        if (getOfficeStatus.status == 200) {
          dispatch.officeStatus.setOfficeStatus(true);
          dispatch.employeeProfile.getPersonalInfo({
            token: data.token,
            id: data?.id,
          });
          dispatch.alerts.success({
            domain: 'addApprovalGroups',
            message: getOfficeStatus.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addApprovalGroups',
          message: e.response.message,
        });
      }
    },
  }),
});
