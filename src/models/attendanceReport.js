import { createModel } from '@rematch/core';
import * as apiService from '../utility/appraisalReportServices';

export const attendanceReport = createModel()({
  state: {
    attendanceReportData: null,
    attendanceReportSheetData: null,
  },
  reducers: {
    setAttendanceReport(state, attendanceReportData) {
      return { ...state, attendanceReportData };
    },

    setAttendanceReportSheetReport(state, attendanceReportSheetData) {
      return { ...state, attendanceReportSheetData };
    },
  },

  effects: dispatch => ({
    get: async data => {

      try {
        const empReportTbData = await apiService.getAttendanceReport(
          data.token,
          data.data,
        );

        if (empReportTbData.status == 200) {
          dispatch.attendanceReport.setAttendanceReport(empReportTbData.data);
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
        const getSheetData = await apiService.getAttendanceSheetData(
          data.token,
          data.data,
        );

        dispatch.attendanceReport.setAttendanceReportSheetReport(getSheetData);
      } catch (e) {
        dispatch.alerts.error({
          domain: 'appraisalReportTbData',
          message: e.message,
        });
      }
    },
  }),
});
