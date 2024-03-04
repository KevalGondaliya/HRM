import {createModel} from '@rematch/core';
import * as apiService from '../utility/positionService';

export const position = createModel()({
  state: {
    isAddPosition: false,
    positionData: null,
    isEditPosition: false,
    isDeletePosition: false,
  },
  reducers: {
    savePosition(state, isAddPosition) {
      return {...state, isAddPosition};
    },
    saveGetPosition(state, positionData) {
      return {...state, positionData};
    },
    saveEditPosition(state, isEditPosition) {
      return {...state, isEditPosition};
    },
    saveDelPosition(state, isDeletePosition) {
      return {...state, isDeletePosition};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addPosition = await apiService.add(data.token, data.data);

        if (addPosition.status == 200) {
          dispatch.position.savePosition(true);
          dispatch.alerts.success({
            domain: 'save Position',
            message: addPosition.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'save Position',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getPosition = await apiService.get(data.token, data.e);

        if (getPosition?.status == 200) {
          dispatch.position.saveGetPosition(getPosition.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get Department',
          message: e.response.message,
        });
      }
    },

    update: async data => {
      try {
        const editPosition = await apiService.update(
          data.token,
          data.data,
          data.id,
        );
        if (editPosition.status == 200) {
          dispatch.position.saveEditPosition(true);
          dispatch.position.get(data);
          dispatch.alerts.success({
            domain: 'edit Position',
            message: editPosition.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'edit Organisations',
          message: e.response.message,
        });
      }
    },

    delete: async data => {
      try {
        const delPosition = await apiService.del(data.token, data.id);
        if (delPosition?.status == 200) {
          dispatch.position.get(data);
          dispatch.position.saveDelPosition(true);
          dispatch.alerts.success({
            domain: 'del department',
            message: delPosition.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'del organisation',
          message: e.response.message,
        });
      }
    },
  }),
});
