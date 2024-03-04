import {createModel} from '@rematch/core';
import * as apiService from '../utility/elearningServices';

export const elearning = createModel()({
  state: {
    isAddElearning: false,
    elearnData: null,
    elearnProgressData: null,
    elearnProgressDataById: null,
    isDelElearning: false,
    isEditElearning: false,
  },
  reducers: {
    saveElearning(state, isAddElearning) {
      return {...state, isAddElearning};
    },
    saveGetElearning(state, elearnData) {
      return {...state, elearnData};
    },
    saveDelElearning(state, isDelElearning) {
      return {...state, isDelElearning};
    },
    saveEditElearning(state, isEditElearning) {
      return {...state, isEditElearning};
    },
    saveElearningProgress(state, elearnProgressData) {
      return {...state, elearnProgressData};
    },
    saveElearningProgressById(state, elearnProgressDataById) {
      return {...state, elearnProgressDataById};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addElearn = await apiService.add(data.token, data.data);

        if (addElearn.status == 200) {
          dispatch.elearning.saveElearning(true);
          dispatch.elearning.get(data);
          dispatch.alerts.success({
            domain: 'add Elearn',
            message: addElearn.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addElearn',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getElearn = await apiService.get(data.token, data.e);

        if (getElearn.status == 200) {
          dispatch.elearning.saveGetElearning(getElearn.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'getElearn',
          message: e.response.message,
        });
      }
    },

    delete: async data => {
      try {
        const delElearn = await apiService.del(data.token, data.id);

        if (delElearn.status == 200) {
          dispatch.elearning.saveDelElearning(true);
          dispatch.elearning.get(data);
          dispatch.alerts.success({
            domain: 'delete Elearn',
            message: delElearn.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete Elearn',
          message: e.response.message,
        });
      }
    },

    update: async data => {
      try {
        const elearn = await apiService.edit(data.token, data.data, data.id);
        if (elearn.status == 200) {
          dispatch.elearning.saveEditElearning(true);
          dispatch.elearning.get(data);
          dispatch.alerts.success({
            domain: 'edit elearn',
            message: elearn.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'edit elearn',
          message: e.response.message,
        });
      }
    },

    getProgressData: async data => {
      try {
        const getElearn = await apiService.getElearningProgress(
          data.token,
          data.e,
        );

        if (getElearn.status == 200) {
          dispatch.elearning.saveElearningProgress(getElearn.data);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'getElearn',
          message: e.response.message,
        });
      }
    },

    getProgressDataById: async data => {
      try {
        const getElearn = await apiService.getElearningProgressById(
          data.token,
          data.id,
        );
        console.log(getElearn);
        if (getElearn.status == 200) {
          dispatch.elearning.saveElearningProgressById(getElearn.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'getElearn',
          message: e.response.message,
        });
      }
    },
  }),
});
