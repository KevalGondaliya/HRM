import { createModel } from '@rematch/core';
import * as apiService from '../utility/companyService';

export const company = createModel()({
  state: {
    addCompany: null,
    companyData: null,
    isEditCompanyData: null,
  },
  reducers: {
    saveComapny(state, addCompany) {
      return { ...state, addCompany };
    },

    setCompanyData(state, companyData) {
      return { ...state, companyData };
    },

    setEditCompanyData(state, isEditCompanyData) {
      return { ...state, isEditCompanyData };
    },
  },

  effects: dispatch => ({
    setCompany: async data => {
      try {
        const addCmp = await apiService.addCompany(data.token, data.data);

        if (addCmp.status == 200) {
          dispatch.company.saveComapny(addCmp);
          dispatch.company.get(data);
          dispatch.alerts.success({
            domain: 'user',
            message: addCmp.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'checkin',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const companyData = await apiService.get(data.token);

        if (companyData.status == 200) {
          dispatch.company.setCompanyData(companyData?.list);

        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get Deduction',
          message: e.message,
        });
      }
    },

    getById: async data => {
      try {
        const companyData = await apiService.getById(data.token, data.id);
        console.log(companyData);
        if (companyData.status == 200) {
          dispatch.company.setCompanyData(companyData?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get Deduction',
          message: e.message,
        });
      }
    },
    update: async data => {
      try {
        const companyData = await apiService.update(data.token, data.data, data.id);
        console.log("company", companyData);
        if (companyData.status == 200) {
          dispatch.company.setEditCompanyData(true);
          dispatch.company.get(data);
          dispatch.alerts.success({
            domain: 'companyData',
            message: companyData.message,
          });
        }
      } catch (e) {

        dispatch.alerts.error({
          domain: 'get Deduction',
          message: e.message,
        });
      }
    },
  }),
});
