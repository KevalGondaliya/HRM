import {createModel} from '@rematch/core';
import * as apiService from '../utility/workHoursServices';

export const workHours = createModel()({
  state: {
    isWorkHours: false,
    workHourData: false,
  },
  reducers: {
    setWorkHours(state, isWorkHours) {
      return {...state, isWorkHours};
    },
    setgetWorkHourData(state, workHourData) {
      return {...state, workHourData};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addworkHours = await apiService.add(
          data.token,
          data.data,
          data.id,
        );

        if (addworkHours.status == 200) {
          dispatch.workHours.setWorkHours(true);
          // dispatch.approvalGroups.get(data);
          dispatch.alerts.success({
            domain: 'addApprovalGroups',
            message: addworkHours.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addApprovalGroups',
          message: e.response.message,
        });
      }
    },
    get: async data => {
      try {
        const getWorkHoursData = await apiService.get(
          data.token,
          // data.data,
          data.id,
        );

        if (getWorkHoursData.status == 200) {
          dispatch.workHours.setgetWorkHourData(getWorkHoursData?.list);
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
