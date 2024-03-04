import { createModel } from '@rematch/core';
import * as apiService from '../utility/appraisalReportServices';

export const allowncesReport = createModel()({
  state: {
    allowncesReportData: null,
    allowncesReportSheetData: null,
  },
  reducers: {
    setAllowncesReport(state, allowncesReportData) {
      return { ...state, allowncesReportData };
    },

    setAllowncesReportSheetReport(state, allowncesReportSheetData) {
      return { ...state, allowncesReportSheetData };
    },
  },

  effects: dispatch => ({
    get: async data => {

      try {
        const empReportTbData = await apiService.getAllowncesReport(
          data.token,
          data.data,
        );

        if (empReportTbData.status == 200) {
          dispatch.allowncesReport.setAllowncesReport(empReportTbData.data);
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
        const getSheetData = await apiService.getAllowncesReportSheetData(
          data.token,
          data.data,
        );

        dispatch.allowncesReport.setAllowncesReportSheetReport(getSheetData);
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },
  }),
});
