import { createModel } from '@rematch/core';
import * as apiService from '../utility/claimTypesServices';

export const claimTypes = createModel()({
  state: {
    isAddClaimTypes: false,
    claimTypesData: null,
    categoryData: null,
    isDelClaimTypes: false,
    isEditClaimTypes: false,
    claimTypeCategoryData: false,
    isDelCatClaimTypes: false,
  },
  reducers: {
    setAddClaimTypes(state, isAddClaimTypes) {
      return { ...state, isAddClaimTypes };
    },

    setClaimTypesData(state, claimTypesData) {
      return { ...state, claimTypesData };
    },

    setCategoryData(state, categoryData) {
      return { ...state, categoryData };
    },

    setDelClaimTypes(state, isDelClaimTypes) {
      return { ...state, isDelClaimTypes };
    },
    setDelCatClaimTypes(state, isDelCatClaimTypes) {
      return { ...state, isDelCatClaimTypes };
    },


    setEditClaimTypes(state, isEditClaimTypes) {
      return { ...state, isEditClaimTypes };
    },

    setEditClaimTypes(state, isEditClaimTypes) {
      return { ...state, isEditClaimTypes };
    },

    setClaimTypeCategoryData(state, claimTypeCategoryData) {
      return { ...state, claimTypeCategoryData };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addClaimType = await apiService.add(data.token, data.data);
        if (addClaimType.status == 200) {
          dispatch.claimTypes.setAddClaimTypes(true);
          dispatch.claimTypes.get(data);
          dispatch.alerts.success({
            domain: 'add Claim Types',
            message: claimTypes.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add claim Types Error',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const claimTypesData = await apiService.get(data.token, data.e);
        if (claimTypesData.status == 200) {
          dispatch.claimTypes.setClaimTypesData(claimTypesData?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get claimTypesData',
          message: e.response.message,
        });
      }
    },

    delete: async data => {
      try {
        const delClaimTypesData = await apiService.del(data.token, data.id);
        if (delClaimTypesData.status == 200) {
          dispatch.claimTypes.setDelClaimTypes(true);
          dispatch.claimTypes.get(data);
          dispatch.alerts.success({
            domain: 'delete claimTypes suc',
            message: delClaimTypesData.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete claimTypes error',
          message: e.response.message,
        });
      }
    },


    deleteCategory: async data => {
      try {
        const delClaimTypesData = await apiService.deleteCategory(data.token, data.id);

        if (delClaimTypesData.status == 200) {
          dispatch.claimTypes.setDelCatClaimTypes(true);
          dispatch.claimTypes.get(data);
          dispatch.alerts.success({
            domain: 'delete claimTypes suc',
            message: delClaimTypesData.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete claimTypes error',
          message: e.response.message,
        });
      }
    },


    update: async data => {

      try {
        const editData = await apiService.edit(data.token, data.data, data.id);
        if (editData.status == 200) {
          dispatch.claimTypes.setEditClaimTypes(true);
          dispatch.claimTypes.get(data);
          dispatch.alerts.success({
            domain: 'edit claimTypes suc',
            message: editData.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'edit claimTypes error',
          message: e.response.message,
        });
      }
    },

    getCategory: async data => {
      try {
        const getCategory = await apiService.getCategorys(data.token, data.id);
        if (getCategory.status == 200) {
          dispatch.claimTypes.setCategoryData(getCategory?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },

    getClaimTypeCategory: async data => {
      try {
        const getRule = await apiService.getClaimType(data.token, data.id);
        if (getRule.status == 200) {
          dispatch.claimTypes.setClaimTypeCategoryData(getRule?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },
  }),
});
