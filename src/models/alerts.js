import {createModel} from '@rematch/core';

export const alerts = createModel()({
  state: {
    all: [],
  },
  reducers: {
    add(state, alert) {
      return {...state, all: state.all.concat([alert])};
    },
  },
  effects: dispatch => ({
    async error(payload) {
      dispatch.alerts.add({
        title: 'Error',
        ...payload,
        type: 'error',
      });
    },
    warning(payload) {
      dispatch.alerts.add({
        title: 'Problem',
        ...payload,
        type: 'warn',
      });
    },
    info(payload) {
      dispatch.alerts.add({
        title: 'Info',
        ...payload,
        type: 'info',
      });
    },
    success(payload) {
      dispatch.alerts.add({
        title: 'Success!',
        ...payload,
        type: 'success',
      });
    },
  }),
});
