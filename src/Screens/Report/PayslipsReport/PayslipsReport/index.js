/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ReportDetails from './ReportDetails';
import Header from '../../../../component/Header';
import { dropDownData } from '../../../../dummyData';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';

function PayslipsReport({ navigation }) {
  const dispatch = useDispatch();
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

  const token = useSelector(state => state.session?.token);
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const getDepartment = useSelector(state => state.department?.getDepartment);

  useEffect(() => {
    clearForm();
    // dispatch.organisations.getOrganisations({token});
  }, []);

  useEffect(() => {
    if (organisationData) {
      let arr = organisationData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({ label: arr[i].org_name, value: arr[i].id });
      }
      setOrganisationArr(dropDownArr);
    }
    if (getDepartment) {
      let arr = getDepartment;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({ label: arr[i].department, value: arr[i].id });
      }
      setDepartmentArr(dropDownArr);
    }
  }, [organisationData, getDepartment]);

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
      organisationValue !== ''
    ) {
      setIsError(false);
      navigation.navigate('ViewPayslipsReport');
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
        label={'Payslips Report'}
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
          description1={`Download an excel file of all employees' payslips.`}
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
      />
    </SafeAreaView>
  );
}

export default PayslipsReport;
