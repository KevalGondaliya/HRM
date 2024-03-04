import {createModel} from '@rematch/core';
import * as apiService from '../utility/employeeService';

export const employees = createModel()({
  state: {
    employee: null,
    userData: null,
    adminData: null,
    rmData: null,
    personalInfo: null,
    jobInfo: null,
    onBoard: null,
    isDeleteEmployee: false,
    isEditAdmin: false,
    jobPositionsData: null,
    allEmployee: null,
  },
  reducers: {
    saveEmployee(state, employee) {
      return {...state, employee};
    },

    setUserData(state, userData) {
      return {...state, userData};
    },
    setAllUserData(state, allEmployee) {
      return {...state, allEmployee};
    },
    setAdminData(state, adminData) {
      return {...state, adminData};
    },

    setRMData(state, rmData) {
      return {...state, rmData};
    },

    savePersonalInfo(state, personalInfo) {
      return {...state, personalInfo};
    },

    saveJob(state, jobInfo) {
      return {...state, jobInfo};
    },

    saveOnBoard(state, onBoard) {
      return {...state, onBoard};
    },
    setDeleteEmployee(state, isDeleteEmployee) {
      return {...state, isDeleteEmployee};
    },
    setUpdateAdmin(state, isEditAdmin) {
      return {...state, isEditAdmin};
    },
    setJobPositionData(state, jobPositionsData) {
      return {...state, jobPositionsData};
    },
  },

  effects: dispatch => ({
    setEmployee: async data => {
      try {
        const employee = await apiService.addEmployee(data.token, data.data);

        if (employee.status == 200) {
          dispatch.alerts.success({
            domain: 'emp add',
            message: employee.message,
          });
          dispatch.employees.saveEmployee(employee.data);
          dispatch.employees.getAdminUser(data);
          dispatch.employees.get(data);
          dispatch.employees.getAllEmplyee(data);
        } else {
          dispatch.alerts.error({
            domain: 'EMP User already exits',
            message: employee.message,
          });
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.message,
        });
      }
    },

    get: async data => {
      try {
        const getUserData = await apiService.get(data.token, data.e);

        if (getUserData.status == 200) {
          dispatch.employees.setUserData(getUserData?.data);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },
    getAllEmplyee: async data => {
      try {
        const getAllEmplyee = await apiService.allEmployee(data.token, data.e);

        if (getAllEmplyee.status == 200) {
          dispatch.employees.setAllUserData(getAllEmplyee?.data);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },

    getJobPositionData: async data => {
      try {
        const getUserData = await apiService.getJobPositions(
          data.token,
          data.id,
        );
        if (getUserData.status == 200) {
          dispatch.employees.setJobPositionData(getUserData?.list);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.response.message,
        });
      }
    },

    getAdminUser: async data => {
      try {
        const getAdminUserData = await apiService.getAdminUserData(
          data.token,
          data.e,
        );
        if (getAdminUserData.status == 200) {
          dispatch.employees.setAdminData(getAdminUserData?.data);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.message,
        });
      }
    },

    getRmsUser: async data => {
      try {
        const getAdminUserData = await apiService.getRms(data.token, data.e);
        if (getAdminUserData.status == 200) {
          dispatch.employees.setRMData(getAdminUserData?.data);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'get approvalGroups',
          message: e.message,
        });
      }
    },

    setPersonalInfo: async data => {
      try {
        const info = await apiService.addPersonalInfo(
          data.token,
          data.data,
          data.id,
        );

        console.log(info);
        if (info.status == 200) {
          dispatch.employees.savePersonalInfo(info);
        }
      } catch (e) {
        dispatch.alerts.error({
          domain: 'user info',
          message: e.message,
        });
      }
    },

    setJob: async data => {
      try {
        const job = await apiService.addJobInfo(data.token, data.data, data.id);

        console.log(job);
        if (job.status == 200) {
          dispatch.employees.saveJob(job);
        }
      } catch (e) {
        console.log(e);
        dispatch.alerts.error({
          domain: 'user info',
          message: e.message,
        });
      }
    },

    setOnboard: async data => {
      try {
        const addOnboard = await apiService.addOnboard(
          data.token,
          data.data,
          data.id,
        );

        if (addOnboard.status == 200) {
          dispatch.employees.saveOnBoard(addOnboard);
          dispatch.employees.get({token: data.token});
          dispatch.employees.getAllEmplyee({token: data.token});
        }
      } catch (e) {
        console.log(e);
        dispatch.alerts.error({
          domain: 'user info',
          message: e.message,
        });
      }
    },

    deleteUserProfile: async data => {
      console.log(data);
      try {
        const user = await apiService.deleteUserProfile(
          data.token,
          data.data,
          data.id,
        );
        if (user.status == 200) {
          dispatch.employees.setDeleteEmployee(true);
          dispatch.employees.getAdminUser(data);
          dispatch.alerts.success({
            domain: 'user authenticate',
            message: user.message,
          });
        }
      } catch (e) {
        console.log('calll', e.response.data);
        dispatch.alerts.error({
          domain: 'user authenticate',
          message: e.response.message,
        });
      }
    },

    editEmployee: async data => {
      try {
        const editEmployee = await apiService.editAdmin(
          data.token,
          data.data,
          data.id,
        );
        if (editEmployee.status == 200) {
          dispatch.employees.setUpdateAdmin(true);
          dispatch.employees.get(data);
          dispatch.employees.getAdminUser(data);
          dispatch.employees.getAllEmplyee(data);
          dispatch.alerts.success({
            domain: 'edit Branch',
            message: editEmployee.message,
          });
        }
      } catch (e) {
        console.log('e', e);
        dispatch.alerts.error({
          domain: 'edit editEmployee',
          message: e.response.message,
        });
      }
    },
  }),
});
