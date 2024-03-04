import {createModel} from '@rematch/core';
import * as apiService from '../utility/eLearningQuestionDataServices';

export const eLearningQuestion = createModel()({
  state: {
    addELearningQuestionData: false,
    questionData: null,
    questionAnsData: null,
    questionIdData: null,
    isDelELearningQuestionData: false,
    isAnsELearningQuestionData: false,
    isEditELearningQuestionData: false,
  },
  reducers: {
    setELearningQuestion(state, addELearningQuestionData) {
      return {...state, addELearningQuestionData};
    },
    setQuestionData(state, questionData) {
      return {...state, questionData};
    },
    setQuestionIdData(state, questionIdData) {
      return {...state, questionIdData};
    },
    setDelELearningQuestion(state, isDelELearningQuestionData) {
      return {...state, isDelELearningQuestionData};
    },
    setEditELearningQuestion(state, isEditELearningQuestionData) {
      return {...state, isEditELearningQuestionData};
    },
    setELearningQuestionAns(state, isAnsELearningQuestionData) {
      return {...state, isAnsELearningQuestionData};
    },
    setQuestionAns(state, questionAnsData) {
      return {...state, questionAnsData};
    },
  },

  effects: dispatch => ({
    add: async data => {
      try {
        const addQuestionData = await apiService.add(data.token, data.data);

        if (addQuestionData.status == 200) {
          dispatch.eLearningQuestion.setELearningQuestion(true);
          dispatch.eLearningQuestion.get(data);
          dispatch.alerts.success({
            domain: 'addQuestionData',
            message: addQuestionData.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addQuestionData',
          message: e.message,
        });
      }
    },

    get: async data => {
      try {
        const getQuestion = await apiService.get(data.token);
        if (getQuestion.status == 200) {
          dispatch.eLearningQuestion.setQuestionData(getQuestion?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.message,
        });
      }
    },

    getAns: async data => {
      try {
        const getQuestion = await apiService.getQuizAns(data.token, data.id);
        console.log('getQuestion', getQuestion, data);
        if (getQuestion.status == 200) {
          dispatch.eLearningQuestion.setQuestionAns(getQuestion);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.message,
        });
      }
    },

    getQuestionElearnId: async data => {
      try {
        const getQuestion = await apiService.getQuestionById(
          data.token,
          data.id,
        );
        if (getQuestion.status == 200) {
          dispatch.eLearningQuestion.setQuestionIdData(getQuestion?.list);
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
        const editDeduction = await apiService.edit(
          data.token,
          data.data,
          data.id,
        );
        if (editDeduction.status == 200) {
          dispatch.eLearningQuestion.setEditELearningQuestion(true);
          dispatch.eLearningQuestion.get(data);
          dispatch.alerts.success({
            domain: 'edit eLearningQuestion',
            message: editDeduction.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'editDeduction',
          message: e.message,
        });
      }
    },

    addQuestionAns: async data => {
      try {
        const addQuestionData = await apiService.addAns(data.token, data.data);
        console.log(addQuestionData);
        if (addQuestionData.status == 200) {
          dispatch.eLearningQuestion.setELearningQuestionAns(true);

          dispatch.alerts.success({
            domain: 'addQuestionData',
            message: addQuestionData.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'addQuestionData',
          message: e.message,
        });
      }
    },
  }),
});
