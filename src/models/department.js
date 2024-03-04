import {createModel} from '@rematch/core';
import * as apiService from '../utility/departmentService';

export const department = createModel()({
  state: {
    addDepartment: null,
    getDepartment: null,
    editDepartment: null,
    delDepartment: null,
  },
  reducers: {
    saveDepartment(state, addDepartment) {
      return {...state, addDepartment};
    },

    saveGetDepartment(state, getDepartment) {
      return {...state, getDepartment};
    },

    saveEditDepart(state, editDepartment) {
      return {...state, editDepartment};
    },

    saveDelDepartment(state, delDepartment) {
      return {...state, delDepartment};
    },
  },

  effects: dispatch => ({
    setDepartment: async data => {
      try {
        const addDepartment = await apiService.addDepartment(
          data.token,
          data.data,
        );

        if (addDepartment.status == 200) {
          dispatch.department.saveDepartment(addDepartment);
          dispatch.alerts.success({
            domain: 'save Department',
            message: addDepartment.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'saveDepartment',
          message: e.response.message,
        });
      }
    },

    department: async data => {
      try {
        const getDepartment = await apiService.getDepartment(data.token);

        if (getDepartment?.status == 200) {
          dispatch.department.saveGetDepartment(getDepartment.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get Department',
          message: e.response.message,
        });
      }
    },

    editDepartment: async data => {
      try {
        const editDepartments = await apiService.editDepartment(
          data.token,
          data.data,
          data.id,
        );
        if (editDepartments.status == 200) {
          dispatch.department.saveEditDepart(editDepartments);
          dispatch.department.department(data);
          dispatch.department.success({
            domain: 'edit Department',
            message: editDepartments.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'edit Organisations',
          message: e.response.message,
        });
      }
    },

    deleteDepartment: async data => {
      try {
        const delDepartment = await apiService.delDepartment(
          data.token,
          data.id,
        );
        if (delDepartment?.status == 200) {
          dispatch.department.department(data);
          dispatch.department.saveDelDepartment(delDepartment);
          dispatch.alerts.success({
            domain: 'del department',
            message: delDepartment.message,
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
