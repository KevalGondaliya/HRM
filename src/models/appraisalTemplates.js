import {createModel} from '@rematch/core';
import * as apiService from '../utility/appraisalTemplatesServices';

export const appraisalTemplates = createModel()({
  state: {
    isAddAppraisalTemplates: false,
    isEditAppraisalTemplates: false,
    isDelAppraisalTemplates: false,
    appraisalTemplatesData: null,
    questionData: null,
    appraisalByUserData: null,
    nominatedAppraisalByUserData: null,
    pandingAppraisalData: null,
    isApprovePandingAppraisalData: false,
  },
  reducers: {
    setAppraisalTemplates(state, isAddAppraisalTemplates) {
      return {...state, isAddAppraisalTemplates};
    },

    saveEditAppraisalTemplates(state, isEditAppraisalTemplates) {
      return {...state, isEditAppraisalTemplates};
    },

    setAppraisalTemplatesData(state, appraisalTemplatesData) {
      return {...state, appraisalTemplatesData};
    },

    saveDelAppraisalTemplates(state, isDelAppraisalTemplates) {
      return {...state, isDelAppraisalTemplates};
    },

    setQuestionData(state, questionData) {
      return {...state, questionData};
    },

    setAppraisalByUserData(state, appraisalByUserData) {
      return {...state, appraisalByUserData};
    },

    setNominatedAppraisalByUserData(state, nominatedAppraisalByUserData) {
      return {...state, nominatedAppraisalByUserData};
    },

    setPandingAppraisalData(state, pandingAppraisalData) {
      return {...state, pandingAppraisalData};
    },

    setApprovePandingAppraisalData(state, isApprovePandingAppraisalData) {
      return {...state, isApprovePandingAppraisalData};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addAppraisalTemplates = await apiService.add(
          data.token,
          data.data,
        );

        if (addAppraisalTemplates.status == 200) {
          dispatch.appraisalTemplates.setAppraisalTemplates(true);
          dispatch.appraisalTemplates.get(data);
          dispatch.alerts.success({
            domain: 'add Deduction',
            message: addAppraisalTemplates.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add appraisalTemplates',
          message: e.response.message,
        });
      }
    },

    get: async data => {
      try {
        const getLeaveType = await apiService.get(data.token, data.e);

        if (getLeaveType.status == 200) {
          dispatch.appraisalTemplates.setAppraisalTemplatesData(
            getLeaveType.list,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.response.message,
        });
      }
    },

    delete: async data => {
      try {
        const delApprovalGroups = await apiService.del(data.token, data.id);

        if (delApprovalGroups.status == 200) {
          dispatch.appraisalTemplates.saveDelAppraisalTemplates(true);
          dispatch.appraisalTemplates.get(data);
          dispatch.alerts.success({
            domain: 'delete ApprovalGroups',
            message: delApprovalGroups.message,
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
        const editLeaveType = await apiService.edit(
          data.token,
          data.data,
          data.id,
        );
        if (editLeaveType.status == 200) {
          dispatch.appraisalTemplates.saveEditAppraisalTemplates(true);
          dispatch.appraisalTemplates.get(data);
          dispatch.alerts.success({
            domain: 'edit Deduction',
            message: editLeaveType.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.response.message,
        });
      }
    },

    getQuestions: async data => {
      try {
        const getRule = await apiService.getRules(data.token, data.id);
        if (getRule.status == 200) {
          dispatch.appraisalTemplates.setQuestionData(getRule?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },

    getAppraisalByUserData: async data => {
      try {
        const getAppraisalByUser = await apiService.getAppraisalByUser(
          data.token,
          data.id,
          data.e,
        );

        if (getAppraisalByUser.status == 200) {
          dispatch.appraisalTemplates.setAppraisalByUserData(
            getAppraisalByUser?.list,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },

    getNominatedAppraisalByUserData: async data => {
      try {
        const getNominatedAppraisalByUser =
          await apiService.getNominatedAppraisalByUser(
            data.token,
            data.id,
            data.e,
          );

        if (getNominatedAppraisalByUser.status == 200) {
          dispatch.appraisalTemplates.setNominatedAppraisalByUserData(
            getNominatedAppraisalByUser?.list,
          );
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.message,
        });
      }
    },

    getPandingAppraisal: async data => {
      try {
        const pandingData = await apiService.getPandingData(data.token);

        if (pandingData.status == 200) {
          dispatch.appraisalTemplates.setPandingAppraisalData(pandingData.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'add LeaveType',
          message: e.message,
        });
      }
    },

    updatePending: async data => {
      try {
        const pandingAppraisal = await apiService.pandingAppraisalData(
          data.token,
          data.data,
          data.id,
        );
        if (pandingAppraisal.status == 200) {
          dispatch.appraisalTemplates.setApprovePandingAppraisalData(true);
          dispatch.appraisalTemplates.getPandingAppraisal(data);
          dispatch.alerts.success({
            domain: 'edit Panding Appraisal Data',
            message: pandingAppraisal.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'panding Appraisal Data',
          message: e.message,
        });
      }
    },
  }),
});
