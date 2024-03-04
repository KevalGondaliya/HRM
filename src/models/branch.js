import {createModel} from '@rematch/core';
import * as apiService from '../utility/branchService';

export const branch = createModel()({
  state: {
    addBranch: null,
    getBranch: null,
    editBranch: null,
    delBranch: null,
  },
  reducers: {
    saveBranch(state, addBranch) {
      return {...state, addBranch};
    },

    saveGetBranch(state, getBranch) {
      return {...state, getBranch};
    },

    saveEditBranch(state, editBranch) {
      return {...state, editBranch};
    },

    saveDelBranch(state, delBranch) {
      return {...state, delBranch};
    },
  },

  effects: dispatch => ({
    setBranch: async data => {
      try {
        const addBranch = await apiService.addBranch(data.token, data.data);
        if (addBranch.status == 200) {
          dispatch.branch.saveBranch(addBranch);
          dispatch.branch.Branch(data);
          dispatch.alerts.success({
            domain: 'save Branch',
            message: addBranch.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'save Branch',
          message: e.response.message,
        });
      }
    },

    Branch: async data => {
      try {
        const getBranch = await apiService.getBranch(data.token, data.e);
        if (getBranch.status == 200) {
          dispatch.branch.saveGetBranch(getBranch.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get Branch',
          message: e.response.message,
        });
      }
    },

    editBranch: async data => {
      try {
        const editBranchs = await apiService.editBranch(
          data.token,
          data.data,
          data.id,
        );
        if (editBranchs.status == 200) {
          dispatch.branch.saveEditBranch(editBranchs);
          dispatch.branch.Branch(data);
          dispatch.alerts.success({
            domain: 'edit Branch',
            message: editBranchs.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'edit Organisations',
          message: e.response.message,
        });
      }
    },

    deleteBranch: async data => {
      try {
        const delBranch = await apiService.delBranch(data.token, data.id);
        if (delBranch?.status == 200) {
          dispatch.branch.Branch(data);
          dispatch.branch.saveDelBranch(delBranch);
          dispatch.alerts.success({
            domain: 'del Branch',
            message: delBranch.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'del organisation',
          message: e.response.message,
        });
      }
    },
  }),
});
