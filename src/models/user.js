import {createModel} from '@rematch/core';
import * as apiService from '../utility/userService';

export const user = createModel()({
  state: {
    userDetails: null,
    isUpdate: null,
    changeStatus: null,
    userLocation: '',
    userLatLong: {},
  },
  reducers: {
    setProfile(state, userDetails) {
      return {...state, userDetails: userDetails};
    },
    setUpdate(state, isUpdate) {
      return {...state, isUpdate};
    },
    setChangeStatus(state, changeStatus) {
      return {...state, changeStatus};
    },
    setUserLocation(state, userLocation) {
      return {...state, userLocation};
    },
    setUserLatLong(state, userLatLong) {
      return {...state, userLatLong};
    },
  },

  effects: dispatch => ({
    getProfile: async data => {
      try {
        const userData = await apiService.userProfile(data.id, data.token);
        if (userData.status == 200) {
          dispatch.user.setProfile(userData?.user);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'usergetProfile',
          message: e.response.data.message,
        });
      }
    },

    updateProfile: async data => {
      try {
        const user = await apiService.updateUserProfile(data.token, data.data);
        if (user.status == 200) {
          dispatch.user.setProfile(user?.user);
          dispatch.user.setUpdate(true);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.response.message,
        });
      }
    },

    updateStatus: async data => {
      try {
        const changeStatus = await apiService.status(data.token, data.data);

        if (changeStatus.status == 200) {
          dispatch.user.setChangeStatus(changeStatus);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.response.message,
        });
      }
    },
  }),
});
