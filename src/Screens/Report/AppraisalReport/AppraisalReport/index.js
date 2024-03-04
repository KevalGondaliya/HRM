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
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

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
  const [employeeArr, setEmployeeArr] = useState(dropDownData);
  const [organisationValue, setOrganisationValue] = useState('');
  const [organisationItem, setOrganisationItem] = useState('');
  const [departmentItem, setDepartmentItem] = useState('');
  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const token = useSelector(state => state.session?.token);
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const userData = useSelector(state => state.employees);
  const departmentData = useSelector(state => state.department?.getDepartment);
  const relationValue = useSelector(state => state.relationValue);
  const isAppraisalReportLoading = useSelector(
    state => state.loading.effects.appraisalReport,
  );

  useEffect(() => {
    if (editData) {
      setYear(moment(editData?.year).format('YYYY'));
      setMonth(moment(editData?.month).format('MMM'));
      setOrganisationValue(editData?.org);
      setDepartmentValue(editData?.department);
      setEmployeeValue(editData?.user);
    } else {
      clearForm();
    }
  }, [editData, isFocused]);

  useEffect(() => {
    clearForm();
    // dispatch.organisations.getOrganisations({token});
    dispatch.department.department({token});
    dispatch.employees.get({token});
  }, []);

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
  }, [organisationData, relationValue, userData]);

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
    ) {
      let data = {
        year: moment(year).format('YYYY'),
        month: moment(month).format('MMM'),
        // org: organisationValue,
        department: departmentValue,
        user: employeeValue,
      };

      dispatch.appraisalReport.add({token, data});
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
      };
      navigation.navigate('ViewAppraisalReport', {data: reportData});
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
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Appraisal Report'}
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
          description1={`Download an excel file of all employees' appraisals.`}
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
          setOrganisationItem={setOrganisationItem}
          setDepartmentItem={setDepartmentItem}
        />

        <SaveCancelBtn
          label={'next'}
          style={styles.top}
          submitBtn={submitBtn}
          cancelBtn={clearForm}
        />
      </KeyboardAwareScrollView>

      <DateTimePickerModal
        mode="date"
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
        isVisible={isDatePickerVisible}
        saveLoading={isAppraisalReportLoading.add}
      />
    </SafeAreaView>
  );
}

export default AttendanceReport;
