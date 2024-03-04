import {createModel} from '@rematch/core';
import * as apiService from '../utility/userService';

export const session = createModel()({
  state: {
    user: null,
    token: null,
    password: null,
  },
  reducers: {
    saveUser(state, user) {
      return {...state, user: user};
    },
    setToken(state, token) {
      return {...state, token: token};
    },
    setPassword(state, password) {
      return {...state, password: password};
    },
  },

  effects: dispatch => ({
    authenticate: async data => {
      try {
        const user = await apiService.authenticate(data);
        if (user.data.status == 200) {
          if (user.data.data.user.user_type === 'SuperAdmin') {
            dispatch.alerts.error({
              domain: 'user not Exit',
              message: `Super admin does not access mobile application`,
            });
          } else {
            dispatch.alerts.success({
              domain: 'user',
              message: user.data.message,
            });
            dispatch.session.setToken(user.data.data.token);
            dispatch.session.saveUser(user.data.data.user);
          }
        } else {
          dispatch.alerts.error({
            domain: 'user not Exit',
            message: user.data.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.message,
        });
      }
    },

    forgotPassword: async data => {
      try {
        const password = await apiService.forgotPassword(data);
        if (password.data.status == 200) {
          dispatch.session.setPassword(password.data);
        } else {
          dispatch.alerts.error({
            domain: 'user not Exit',
            message: user.data.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.message,
        });
      }
    },
  }),
});
