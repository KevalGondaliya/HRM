import { createModel } from '@rematch/core';
import * as apiService from '../utility/appraisalReportServices';

export const appraisalReport = createModel()({
  state: {
    appraisalReportData: false,
    appraisalReportSheetData: false,
  },
  reducers: {
    setAppraisalReport(state, appraisalReportData) {
      return { ...state, appraisalReportData };
    },

    setAppraisalSheetReport(state, appraisalReportSheetData) {
      return { ...state, appraisalReportSheetData };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const appraisalReportTbData = await apiService.add(
          data.token,
          data.data,
        );
        if (appraisalReportTbData.status == 200) {
          dispatch.appraisalReport.setAppraisalReport(
            appraisalReportTbData.list,
          );
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
        const appraisalReportSheetData = await apiService.get(
          data.token,
          data.data,
        );

        dispatch.appraisalReport.setAppraisalSheetReport(
          appraisalReportSheetData,
        );
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },
  }),
});
