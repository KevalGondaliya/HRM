import { createModel } from '@rematch/core';
import * as apiService from '../utility/applyClaimsServices';

export const applyClaims = createModel()({
  state: {
    isAddApplyClaims: false,
    isApproveClaims: false,
    applyClaimsData: null,
    pendingClaimsData: null,
    isDelApplyClaims: false,
    isEditApplyClaims: false,
  },
  reducers: {
    setAddApplyClaims(state, isAddApplyClaims) {
      return { ...state, isAddApplyClaims };
    },

    setApproveClaims(state, isApproveClaims) {
      return { ...state, isApproveClaims };
    },

    setApplyClaimsData(state, applyClaimsData) {
      return { ...state, applyClaimsData };
    },

    setPendingClaimsData(state, pendingClaimsData) {
      return { ...state, pendingClaimsData };
    },

    setDelApplyClaims(state, isDelApplyClaims) {
      return { ...state, isDelApplyClaims };
    },

    setEditApplyClaims(state, isEditApplyClaims) {
      return { ...state, isEditApplyClaims };
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addClaimType = await apiService.add(data.token, data.data);

        if (addClaimType.status == 200) {
          dispatch.applyClaims.setAddApplyClaims(true);
          dispatch.applyClaims.get({
            token: data.token,
            userId: data.data?.userId,
          });
          dispatch.alerts.success({
            domain: 'add Claim Types',
            message: applyClaims.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add claim Types Error',
          message: e.response.message,
        });
      }
    },

    addApproveClaim: async data => {

      try {
        const addApproveClaim = await apiService.claimStatus(
          data.token,
          data.data,
          data.id,
        );

        if (addApproveClaim.status == 200) {
          dispatch.applyClaims.setApproveClaims(true);
          dispatch.applyClaims.get({
            token: data.token,
            userId: data?.userId,
          });
          dispatch.alerts.success({
            domain: 'add Claim Types',
            message: addApproveClaim.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add claim Types Error',
          message: e.message,
        });
      }
    },

    get: async data => {
      console.log("asdasdasd", data);
      try {
        const ApplyClaimsData = await apiService.get(
          data.token,
          data.userId,
          data.e,
        );

        if (ApplyClaimsData.status == 200) {
          dispatch.applyClaims.setApplyClaimsData(ApplyClaimsData?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get ApplyClaimsData',
          message: e.response.message,
        });
      }
    },

    pendingData: async data => {
      try {
        const pending = await apiService.pendingClaimData(data.token);

        if (pending.status == 200) {
          dispatch.applyClaims.setPendingClaimsData(pending?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get ApplyClaimsData',
          message: e.message,
        });
      }
    },

    delete: async data => {
      try {
        const delApplyClaimsData = await apiService.del(data.token, data.id);
        if (delApplyClaimsData.status == 200) {
          dispatch.applyClaims.setDelApplyClaims(true);

          dispatch.applyClaims.get({
            token: data.token,
            userId: data.userId,
          });
          dispatch.alerts.success({
            domain: 'delete applyClaims suc',
            message: delApplyClaimsData.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete applyClaims error',
          message: e.response.message,
        });
      }
    },

    update: async data => {

      try {
        const editData = await apiService.edit(data.token, data.data, data.id);
        if (editData.status == 200) {
          dispatch.applyClaims.setEditApplyClaims(true);
          dispatch.applyClaims.get({
            token: data.token,
            userId: data.data?.userId,
          });
          dispatch.alerts.success({
            domain: 'edit applyClaims suc',
            message: editData.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'edit applyClaims error',
          message: e.response.message,
        });
      }
    },
  }),
});
