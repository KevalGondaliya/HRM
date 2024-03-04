import {createModel} from '@rematch/core';
import * as apiService from '../utility/uploadDocService';

export const uploadDocument = createModel()({
  state: {
    document: null,
    userDocument: null,
    delDocument: null,
  },
  reducers: {
    saveDocumet(state, document) {
      return {...state, document};
    },
    saveUserDocumet(state, userDocument) {
      return {...state, userDocument};
    },
    deleteDoc(state, delDocument) {
      return {...state, delDocument};
    },
  },

  effects: dispatch => ({
    setDocument: async data => {
      console.log(data);
      try {
        const uploadDocument = await apiService.uploadDocument(
          data.token,
          data.formData,
        );
        if (uploadDocument?.status == 200) {
          dispatch.uploadDocument.saveDocumet(uploadDocument);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'upload Document',
          message: e.response.message,
        });
      }
    },

    setUserDocument: async data => {
      try {
        const uploadDocument = await apiService.uploadUserDocument(
          data.token,
          data.formData,
          data.id,
        );
        if (uploadDocument?.status == 200) {
          dispatch.uploadDocument.saveUserDocumet(uploadDocument);
          dispatch.alerts.success({
            domain: 'upload Document',
            message: uploadDocument.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'upload Document',
          message: e.message,
        });
      }
    },

    delDocument: async data => {
      try {
        const uploadDocument = await apiService.del(data.token, data.id);
        if (uploadDocument?.status == 200) {
          dispatch.uploadDocument.deleteDoc(uploadDocument);
          dispatch.employeeProfile.getPersonalInfo({
            token: data.token,
            id: data.id,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'upload Document',
          message: e.message,
        });
      }
    },
  }),
});
