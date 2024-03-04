import {createModel} from '@rematch/core';
import * as apiService from '../utility/approvalGroupsServices';

export const approvalGroups = createModel()({
  state: {
    isAddApprovalGroups: false,
    approvalGroupsData: null,
    ruleData: null,
    isDelApprovalGroups: false,
    isEditApprovalGroups: false,
    isApprovalGroups: false,
  },
  reducers: {
    setApprovalGroups(state, isAddApprovalGroups) {
      return {...state, isAddApprovalGroups};
    },

    setApprovalGroupsData(state, approvalGroupsData) {
      return {...state, approvalGroupsData};
    },

    setRuleData(state, ruleData) {
      return {...state, ruleData};
    },

    saveDelApprovalGroups(state, isDelApprovalGroups) {
      return {...state, isDelApprovalGroups};
    },
    setDelApprovalGroups(state, isApprovalGroups) {
      return {...state, isApprovalGroups};
    },

    saveEditApprovalGroups(state, isEditApprovalGroups) {
      return {...state, isEditApprovalGroups};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addApprovalGroups = await apiService.add(data.token, data.data);

        if (addApprovalGroups.status == 200) {
          dispatch.approvalGroups.setApprovalGroups(true);
          dispatch.approvalGroups.get(data);
          dispatch.alerts.success({
            domain: 'addApprovalGroups',
            message: addApprovalGroups.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addApprovalGroups',
          message: e.message,
        });
      }
    },

    get: async data => {
      try {
        const approvalGroupsData = await apiService.get(data.token, data.e);

        if (approvalGroupsData.status == 200) {
          dispatch.approvalGroups.setApprovalGroupsData(
            approvalGroupsData?.list,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.message,
        });
      }
    },

    delete: async data => {
      try {
        const delApprovalGroups = await apiService.del(data.token, data.id);

        if (delApprovalGroups.status == 200) {
          dispatch.approvalGroups.saveDelApprovalGroups(true);
          dispatch.approvalGroups.get(data);
          dispatch.alerts.success({
            domain: 'delete ApprovalGroups',
            message: delApprovalGroups.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete ApprovalGroups',
          message: e.message,
        });
      }
    },

    deleteRules: async data => {
      try {
        const delApprovalGroups = await apiService.deleteRules(
          data.token,
          data.id,
        );

        if (delApprovalGroups.status == 200) {
          dispatch.approvalGroups.setDelApprovalGroups(true);
          dispatch.approvalGroups.get(data);
          dispatch.alerts.success({
            domain: 'delete ApprovalGroups ',
            message: delApprovalGroups.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'delete ApprovalGroups',
          message: e.message,
        });
      }
    },

    getRule: async data => {
      try {
        const getRule = await apiService.getRules(data.token, data.id);
        if (getRule.status == 200) {
          dispatch.approvalGroups.setRuleData(getRule?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.message,
        });
      }
    },

    update: async data => {
      try {
        const editRule = await apiService.edit(data.token, data.data, data.id);
        if (editRule.status == 200) {
          dispatch.approvalGroups.saveEditApprovalGroups(true);
          dispatch.approvalGroups.get(data);
          dispatch.alerts.success({
            domain: 'edit Deduction',
            message: editRule.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'editRule',
          message: e.message,
        });
      }
    },
  }),
});
