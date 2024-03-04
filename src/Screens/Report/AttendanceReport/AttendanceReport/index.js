/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ReportDetails from './ReportDetails';
import Header from '../../../../component/Header';
import {dropDownData} from '../../../../dummyData';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

function AttendanceReport({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const editData = route?.params?.data;
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [isError, setIsError] = useState(false);
  const [selectType, setSelectType] = useState('');
  const [departmentArr, setDepartmentArr] = useState([]);
  const [employeeValue, setEmployeeValue] = useState('');
  const [openEmployee, setOpenEmployee] = useState(false);
  const [departmentValue, setDepartmentValue] = useState('');
  const [organisationArr, setOrganisationArr] = useState([]);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeArr, setEmployeeArr] = useState([]);
  const [organisationValue, setOrganisationValue] = useState('');
  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [branchValue, setBranchValue] = useState('');
  const [openBranch, setOpenBranch] = useState(false);
  const [branchArr, setBranchArr] = useState(dropDownData);
  const [organisationItem, setOrganisationItem] = useState('');
  const [departmentItem, setDepartmentItem] = useState('');
  const [branchItem, setBranchItem] = useState('');
  const token = useSelector(state => state.session?.token);
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const userData = useSelector(state => state.employees);
  const getBranch = useSelector(state => state.branch?.getBranch);
  const relationValue = useSelector(state => state.relationValue);
  const departmentData = useSelector(state => state.department?.getDepartment);

  useEffect(() => {
    clearForm();
    // dispatch.organisations.getOrganisations({token});
    dispatch.employees.get({token});
    dispatch.branch.Branch({token});
    dispatch.department.department({token});
  }, []);

  useEffect(() => {
    clearForm();
  }, [isFocused]);

  useEffect(() => {
    if (organisationData) {
      let arr = organisationData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({label: arr[i].org_name, value: arr[i].id});
      }
      setOrganisationArr(dropDownArr);
    }

    if (userData) {
      let arr = userData?.userData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].user_name, value: arr[i].id});
      }
      setEmployeeArr(dropDownArr);
    }

    if (getBranch) {
      let arr = getBranch;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].branch_name, value: arr[i].id});
      }
      setBranchArr(dropDownArr);
    }
  }, [organisationData, relationValue, userData, getBranch]);

  useEffect(() => {
    if (departmentData?.length > 0) {
      let arr = departmentData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].department, value: arr[i].id});
      }
      setDepartmentArr(dropDownArr);
    }
  }, [departmentData]);

  const handleConfirm = date => {
    switch (selectType) {
      case 'month':
        setMonth(date);
        setDatePickerVisibility(false);
        break;

      case 'year':
        setYear(date);
        setDatePickerVisibility(false);
        break;
    }
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onDateBtnPress = type => {
    setDatePickerVisibility(true);
    setSelectType(type);
  };

  const submitBtn = () => {
    if (
      year !== '' &&
      month !== '' &&
      employeeValue !== '' &&
      departmentValue !== ''
      // organisationValue !== ''
      // branchValue != ''
    ) {
      let data = {
        year: moment(year).format('YYYY'),
        month: moment(month).format('MMM'),
        org: organisationValue,
        department: departmentValue,
        user: employeeValue,
      };
      console.log(data);
      dispatch.attendanceReport.get({token, data});
      setIsError(false);
      clearForm();
      let reportData = {
        organisationItem: organisationItem,
        departmentItem: departmentItem,
        year: year,
        month: month,
        org: organisationValue,
        department: departmentValue,
        user: employeeValue,
        branchItem: branchItem,
      };
      navigation.navigate('ViewAttendanceReport', {data: reportData});
    } else {
      setIsError(true);
    }
  };

  const clearForm = () => {
    setYear('');
    setMonth('');
    setOrganisationValue('');
    setDepartmentValue('');
    setEmployeeValue('');
    setBranchValue('');
  };

  const cancelBtn = () => {
    navigation.navigate('Dashboard');
    clearForm();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Attendance Report'}
        labelStyle={styles.headerLabel}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={`Download an excel file of all employees' attendances.`}
          style={styles.padding0}
        />

        <ReportDetails
          year={year}
          month={month}
          isError={isError}
          setMonth={setMonth}
          isModalVisible={isModalVisible}
          organisationArr={organisationArr}
          openOrganisation={openOrganisation}
          organisationValue={organisationValue}
          setIsModalVisible={setIsModalVisible}
          onPress={() => onDateBtnPress('year')}
          setOrganisationArr={setOrganisationArr}
          setOpenOrganisation={setOpenOrganisation}
          setOrganisationValue={setOrganisationValue}
          onMonthPress={() => onDateBtnPress('month')}
          departmentValue={departmentValue}
          openDepartment={openDepartment}
          departmentArr={departmentArr}
          setOpenDepartment={setOpenDepartment}
          setDepartmentValue={setDepartmentValue}
          setDepartmentArr={setDepartmentArr}
          employeeValue={employeeValue}
          openEmployee={openEmployee}
          employeeArr={employeeArr}
          setOpenEmployee={setOpenEmployee}
          setEmployeeValue={setEmployeeValue}
          setEmployeeArr={setEmployeeArr}
          branchValue={branchValue}
          openBranch={openBranch}
          branchArr={branchArr}
          setOpenBranch={setOpenBranch}
          setBranchValue={setBranchValue}
          setBranchArr={setBranchArr}
          setOrganisationItem={setOrganisationItem}
          setDepartmentItem={setDepartmentItem}
          setBranchItem={setBranchItem}
        />

        <SaveCancelBtn
          label={'next'}
          style={styles.top}
          submitBtn={submitBtn}
          cancelBtn={cancelBtn}
        />
      </KeyboardAwareScrollView>

      <DateTimePickerModal
        mode="date"
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
        isVisible={isDatePickerVisible}
      />
    </SafeAreaView>
  );
}

export default AttendanceReport;
