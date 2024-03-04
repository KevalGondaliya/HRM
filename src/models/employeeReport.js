import {createModel} from '@rematch/core';
import * as apiService from '../utility/appraisalReportServices';

export const employeeReport = createModel()({
  state: {
    empReportData: false,
    empReportSheetData: null,
  },
  reducers: {
    setEmpReport(state, empReportData) {
      return {...state, empReportData};
    },

    setEmpSheetReport(state, empReportSheetData) {
      return {...state, empReportSheetData};
    },
  },

  effects: dispatch => ({
    get: async data => {
      try {
        const empReportTbData = await apiService.getEmpData(data.token);
        console.log(empReportTbData);
        if (empReportTbData.status == 200) {
          dispatch.employeeReport.setEmpReport(empReportTbData.data);
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
        const empReportTbData = await apiService.getEmpSheetData(data.token);

        dispatch.employeeReport.setEmpSheetReport(empReportTbData);
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },
  }),
});
