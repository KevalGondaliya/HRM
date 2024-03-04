import {createModel} from '@rematch/core';
import * as apiService from '../utility/relationValueService';

export const relationValue = createModel()({
  state: {
    departmentValue: null,
    positionValue: null,
    approvalGroupValue: null,
  },
  reducers: {
    saveDepartmentValue(state, departmentValue) {
      return {...state, departmentValue};
    },

    savePostion(state, positionValue) {
      return {...state, positionValue};
    },

    saveApprovalGroup(state, approvalGroupValue) {
      return {...state, approvalGroupValue};
    },
  },

  effects: dispatch => ({
    getOrgDepartment: async data => {
      try {
        const getOrgDepartment = await apiService.getOrgDepartment(
          data.token,
          data.id,
        );

        if (getOrgDepartment?.status == 200) {
          dispatch.relationValue.saveDepartmentValue(getOrgDepartment.list);
        }
      } catch (e) {
        console.log(e);
        dispatch.alerts.error({
          domain: 'getOrgDepartment',
          message: e.response.message,
        });
      }
    },

    getDepartmentPosition: async data => {
      try {
        const getDepartmentPosition = await apiService.getDepartmentPosition(
          data.token,
          data.id,
        );

        if (getDepartmentPosition?.status == 200) {
          dispatch.relationValue.savePostion(getDepartmentPosition.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'getDepartmentPosition',
          message: e.response.message,
        });
      }
    },

    getApprovalGroup: async data => {
      try {
        const getApprovalGroup = await apiService.getApprovalGroup(
          data.token,
          data.id,
        );

        if (getApprovalGroup?.status == 200) {
          dispatch.relationValue.saveApprovalGroup(getApprovalGroup.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'saveApprovalGroup',
          message: e.response.message,
        });
      }
    },
  }),
});
