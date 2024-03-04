import {createModel} from '@rematch/core';
import * as apiService from '../utility/appraisalReportServices';

export const leavesReport = createModel()({
  state: {
    leavesReportData: null,
    leavesReportSheetData: null,
  },
  reducers: {
    setLeavesReport(state, leavesReportData) {
      return {...state, leavesReportData};
    },

    setLeavesReportSheetReport(state, leavesReportSheetData) {
      return {...state, leavesReportSheetData};
    },
  },

  effects: dispatch => ({
    get: async data => {
      console.log(data);
      try {
        const empReportTbData = await apiService.getLeavesReport(
          data.token,
          data.data,
        );

        if (empReportTbData.status == 200) {
          dispatch.leavesReport.setLeavesReport(empReportTbData.data);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },

    getSheet: async data => {
      try {
        const getSheetData = await apiService.getLeavesReportSheetData(
          data.token,
          data.data,
        );
        console.log(getSheetData);
        dispatch.leavesReport.setLeavesReportSheetReport(getSheetData);
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },
  }),
});
