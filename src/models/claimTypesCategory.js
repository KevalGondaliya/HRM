import { createModel } from '@rematch/core';
import * as apiService from '../utility/claimTypesCategoryServices';

export const claimTypesCategory = createModel()({
  state: {
    isAddClaimTypesCategory: false,
    claimTypesCategoryData: null,
    isDelClaimTypesCategory: false,
    isEditClaimTypesCategory: false,
  },
  reducers: {
    setClaimTypesCategory(state, isAddClaimTypesCategory) {
      return { ...state, isAddClaimTypesCategory };
    },

    setCategoryDataData(state, claimTypesCategoryData) {
      return { ...state, claimTypesCategoryData };
    },

    setDelClaimTypesCategory(state, isDelClaimTypesCategory) {
      return { ...state, isDelClaimTypesCategory };
    },

    setEditClaimTypesCategory(state, isEditClaimTypesCategory) {
      return { ...state, isEditClaimTypesCategory };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addClaimTypeCategory = await apiService.add(
          data.token,
          data.data,
        );

        if (addClaimTypeCategory.status == 200) {
          dispatch.claimTypesCategory.setClaimTypesCategory(true);
          dispatch.claimTypesCategory.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: claimTypesCategory.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add claimTypesCategory',
          message: e.response.message,
        });
      }
    },

    get: async data => {

      try {
        const categoryData = await apiService.get(data.token, data.e);
        if (categoryData.status == 200) {
          dispatch.claimTypesCategory.setCategoryDataData(categoryData?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },

    delete: async data => {

      try {
        const delCategoryData = await apiService.del(data.token, data.id);
        if (delCategoryData.status == 200) {
          dispatch.claimTypesCategory.setDelClaimTypesCategory(true);
          dispatch.claimTypesCategory.get(data);
          dispatch.alerts.success({
            domain: 'delete claimTypesCategory',
            message: delCategoryData.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete ApprovalGroups',
          message: e.response.message,
        });
      }
    },

    update: async data => {
      try {
        const editData = await apiService.edit(data.token, data.data, data.id);
        if (editData.status == 200) {
          dispatch.claimTypesCategory.setEditClaimTypesCategory(true);
          dispatch.claimTypesCategory.get(data);
          dispatch.alerts.success({
            domain: 'edit Deduction',
            message: editData.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'editRule',
          message: e.response.message,
        });
      }
    },
  }),
});
