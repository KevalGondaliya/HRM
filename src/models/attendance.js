import { createModel } from '@rematch/core';
import * as apiService from '../utility/attendanceService';

export const attendance = createModel()({
  state: {
    checkIn: null,
    checkInTime: null,
    checkOutTime: null,
    attendanceHistory: null,
    checkInRes: null,
    faceMessage: '',
    faceError: '',
    isFaceLoading: false,
  },
  reducers: {
    saveCheckIn(state, checkIn) {
      return { ...state, checkIn };
    },

    setCheckInTime(state, checkInTime) {
      return { ...state, checkInTime };
    },

    setCheckOutTime(state, checkOutTime) {
      return { ...state, checkOutTime };
    },

    setAttendanceHistory(state, attendanceHistory) {
      return { ...state, attendanceHistory };
    },
    setCheckIn(state, checkInRes) {
      return { ...state, checkInRes };
    },
    setFaceMassage(state, faceMessage) {
      return { ...state, faceMessage };
    },
    setFaceError(state, faceError) {
      return { ...state, faceError };
    },
    setIsFaceLoading(state, isFaceLoading) {
      return { ...state, isFaceLoading };
    },
    setFaceNotMatch(state, faceNotMatch) {
      return { ...state, faceNotMatch };
    },
  },

  effects: dispatch => ({
    setCheckIn: async data => {
      try {
        const checkIn = await apiService.attendance(data.token, data.data);

        if (checkIn?.status == 200) {
          dispatch.attendance.saveCheckIn(checkIn);
          dispatch.attendance.getAttendanceHistory(data);
        }

        if (checkIn?.status == 401) {
          dispatch.alerts.error({
            domain: 'checkIn Error',
            message: checkIn.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'checkin',
          message: e.response.message,
        });
      }
    },

    getCheckInTime: async data => {
      try {
        const checkInTime = await apiService.getCheckIn(data.token, data.id);

        if (checkInTime?.status == 200) {
          dispatch.attendance.setCheckInTime(checkInTime);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get checkin Time',
          message: e.message,
        });
      }
    },

    setCheckOut: async data => {
      dispatch.attendance.setIsFaceLoading(true);
      dispatch.attendance.setFaceMassage('');
      try {
        const checkOutTime = await apiService.checkOut(
          data.token,
          data.body,
          data.id,
        );

        if (checkOutTime?.status == 200) {
          setTimeout(() => {
            dispatch.attendance.setIsFaceLoading(false);
          }, 3000);

          dispatch.attendance.setFaceMassage(checkOutTime.message);
          dispatch.alerts.success({
            domain: 'Same',
            message: checkOutTime.message,
          });
          dispatch.attendance.setCheckOutTime(checkOutTime);
          dispatch.attendance.getAttendanceHistory(data);
        } else {
          setTimeout(() => {
            dispatch.attendance.setIsFaceLoading(false);
          }, 3000);

          dispatch.attendance.setFaceError(checkOutTime);
          dispatch.attendance.setFaceMassage(checkOutTime.message);
          dispatch.alerts.error({
            domain: 'Same',
            message: checkOutTime.message,
          });
        }
      } catch (e) {
        setTimeout(() => {
          dispatch.attendance.setIsFaceLoading(false);
        }, 3000);

        dispatch.attendance.setFaceError(e);
        dispatch.attendance.setFaceMassage(e.message);
        dispatch.alerts.error({
          domain: 'get cheout Time',
          message: e.message,
        });
      }
    },

    getAttendanceHistory: async data => {
      try {
        const attendanceHistory = await apiService.attendanceHistory(
          data.token,
          data.id,
        );
        if (attendanceHistory?.status == 200) {
          dispatch.attendance.setAttendanceHistory(attendanceHistory);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get cheout Time',
          message: e.message,
        });
      }
    },

    checkIn: async data => {
      try {
        dispatch.attendance.setIsFaceLoading(true);
        dispatch.attendance.setFaceMassage('');

        const checkInData = await apiService.checkIn(data.token, data.body);
        if (
          checkInData?.status == 200 &&
          checkInData?.message !== 'Attendace not added!'
        ) {
          setTimeout(() => {
            dispatch.attendance.setIsFaceLoading(false);
          }, 3000);
          dispatch.alerts.success({
            domain: 'Same',
            message: checkInData.message,
          });
          dispatch.attendance.setFaceMassage(checkInData.message);
          dispatch.attendance.getAttendanceHistory(data.userData);
          dispatch.attendance.saveCheckIn(checkInData);
        } else {
          setTimeout(() => {
            dispatch.attendance.setIsFaceLoading(false);
          }, 3000);
          dispatch.alerts.error({
            domain: 'Same',
            message: checkInData.message,
          });
          dispatch.attendance.setFaceError(checkInData);

          dispatch.attendance.setFaceMassage(checkInData.message);
        }
      } catch (e) {
        setTimeout(() => {
          dispatch.attendance.setIsFaceLoading(false);
        }, 3000);
        dispatch.attendance.setFaceError(e);

        dispatch.attendance.setFaceMassage(e.message);

        dispatch.alerts.error({
          domain: 'check In',
          message: e.message,
        });
      }
    },
  }),
});
