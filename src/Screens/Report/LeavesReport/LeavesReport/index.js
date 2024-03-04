/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ReportDetails from './ReportDetails';
import Header from '../../../../component/Header';
import {dropDownData, leaveDropDownData} from '../../../../dummyData';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

function LeavesReport({route, navigation}) {
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
  const [employeeArr, setEmployeeArr] = useState(dropDownData);
  const [organisationValue, setOrganisationValue] = useState('');
  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [leavesTypeValue, setLeavesTypeValue] = useState('');
  const [openLeavesType, setOpenLeavesType] = useState(false);
  const [leavesTypeArr, setLeavesTypeArr] = useState(leaveDropDownData);
  const [organisationItem, setOrganisationItem] = useState('');
  const [departmentItem, setDepartmentItem] = useState('');
  const [leaveTypeItem, setLeaveTypeItem] = useState('');
  const departmentData = useSelector(state => state.department?.getDepartment);
  const userData = useSelector(state => state.employees);
  const token = useSelector(state => state.session?.token);
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const relationValue = useSelector(state => state.relationValue);

  useEffect(() => {
    clearForm();
    // dispatch.organisations.getOrganisations({token});
    dispatch.department.department({token});
    dispatch.employees.get({token});
  }, []);

  useEffect(() => {
    clearForm();
  }, [isFocused]);

  useEffect(() => {
    if (userData) {
      let arr = userData?.userData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].user_name, value: arr[i].id});
      }
      setEmployeeArr(dropDownArr);
    }
  }, [userData]);

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
      departmentValue !== '' &&
      // organisationValue !== '' &&
      leavesTypeValue != ''
    ) {
      let data = {
        year: moment(year).format('YYYY'),
        month: moment(month).format('MM'),
        // org: organisationValue,
        department: departmentValue,
        user: employeeValue,
        leaveType: leavesTypeValue,
      };

      dispatch.leavesReport.get({token, data});
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
        leaveType: leavesTypeValue,
      };
      navigation.navigate('ViewLeavesReport', {data: reportData});
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
    setLeavesTypeValue('');
  };

  const cancelBtn = () => {
    navigation.navigate('Dashboard');
    clearForm();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Leaves Report'}
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
          description1={`Download an excel file of all employees' leaves.`}
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
          leavesTypeValue={leavesTypeValue}
          openLeavesType={openLeavesType}
          leavesTypeArr={leavesTypeArr}
          setOpenLeavesType={setOpenLeavesType}
          setLeavesTypeValue={setLeavesTypeValue}
          setLeavesTypeArr={setLeavesTypeArr}
          setOrganisationItem={setOrganisationItem}
          setDepartmentItem={setDepartmentItem}
          setLeaveTypeItem={setLeaveTypeItem}
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

export default LeavesReport;
