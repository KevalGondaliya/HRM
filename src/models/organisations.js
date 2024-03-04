import {createModel} from '@rematch/core';
import * as apiService from '../utility/organisationsService';

export const organisations = createModel()({
  state: {
    addOrg: null,
    viewOrg: null,
    editOrg: null,
  },
  reducers: {
    saveOrganisations(state, addOrg) {
      return {...state, addOrg};
    },

    getOrg(state, viewOrg) {
      return {...state, viewOrg};
    },

    saveEditOrg(state, editOrg) {
      return {...state, editOrg};
    },
  },

  effects: dispatch => ({
    setOrganisations: async data => {
      try {
        const org = await apiService.addOrganisations(data.token, data.data);
        if (org.status == 200) {
          dispatch.organisations.saveOrganisations(org);
          dispatch.alerts.success({
            domain: 'set organisation',
            message: org.message,
          });
          dispatch.organisations.getOrganisations(data);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'set Organisations',
          message: e.response.message,
        });
      }
    },

    getOrganisations: async data => {
      try {
        const getOrg = await apiService.getOrganisations(data.token, data.e);
        if (getOrg?.status == 200) {
          dispatch.organisations.getOrg(getOrg?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get organisation',
          message: e.response.message,
        });
      }
    },

    deleteOrg: async data => {
      try {
        const delOrg = await apiService.delOrganisations(data);
        if (delOrg?.status == 200) {
          dispatch.organisations.getOrganisations(data);
          dispatch.alerts.success({
            domain: 'organisation',
            message: delOrg.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'del organisation',
          message: e.response.message,
        });
      }
    },

    editOrganisations: async data => {
      try {
        const org = await apiService.editOrg(data.token, data.data, data.id);
        if (org.status == 200) {
          dispatch.organisations.saveEditOrg(org);
          dispatch.organisations.getOrganisations(data);
          dispatch.alerts.success({
            domain: 'edit organisation',
            message: org.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'edit Organisations',
          message: e.response.message,
        });
      }
    },
  }),
});
