import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../component/Header';
import AssignmentDetails from './AssignmentDetails';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import Validator from '../../../utility/validator';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {limitPeriodData} from '../../../utility/constant';

function AssignAllowances({navigation}) {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [description, setDescription] = useState('');
  const [isInstalments, setIsInstalments] = useState(true);
  const [employeeArr, setEmployeeArr] = useState([]);
  const [employeeValue, setEmployeeValue] = useState('');
  const [openEmployee, setOpenEmployee] = useState(false);
  const [allowanceTypeArr, setAllowanceTypeArr] = useState([]);
  const [allowanceTypeValue, setAllowanceTypeValue] = useState('');
  const [openAllowanceType, setOpenAllowanceType] = useState(false);
  const [recurringPeriodArr, setRecurringPeriodArr] = useState(limitPeriodData);
  const [recurringPeriodValue, setRecurringPeriodValue] = useState('');
  const [openRecurringPeriod, setOpenRecurringPeriod] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isHasGst, setIsHasGst] = useState(true);
  const [isRecurring, setIsRecurring] = useState(true);
  const [amount, setAmount] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const userData = useSelector(state => state.employees);
  const allownceTypeData = useSelector(
    state => state.allowanceTypes.allowanceTypesData,
  );
  const token = useSelector(state => state.session?.token);
  const payslipTemplatesData = useSelector(state => state.assignAllowances);
  const isPayslipTemplatesLoading = useSelector(
    state => state.loading.effects.assignAllowances,
  );

  useEffect(() => {
    dispatch.employees.get({token});
    dispatch.allowanceTypes.get({token});
  }, []);

  useEffect(() => {
    if (payslipTemplatesData.isAddAssignAllowances) {
      dispatch.assignAllowances.setAssignAllowances(false);
      cancelBtn();
    }
  }, [payslipTemplatesData.isAddAssignAllowances]);

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
    if (allownceTypeData) {
      let arr = allownceTypeData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].description, value: arr[i].id});
      }
      setAllowanceTypeArr(dropDownArr);
    }
  }, [allownceTypeData]);

  const onSaveBtnPress = () => {
    if (
      employeeValue != '' &&
      allowanceTypeValue != '' &&
      Validator.validateAmount(amount) != '' &&
      recurringPeriodValue != '' &&
      startDate != '' &&
      endDate != ''
    ) {
      let data = {
        // gst: isHasGst,
        allowance: isRecurring,
        amount: parseFloat(amount),
        period: recurringPeriodValue,
        startDate: startDate,
        endDate: endDate,
        userId: employeeValue,
        allowanceTypeId: allowanceTypeValue,
      };

      dispatch.assignAllowances.add({token, data});

      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    setEmployeeValue('');
    setAllowanceTypeValue('');
    setAmount('');
    setRecurringPeriodValue('');
    setStartDate('');
    setEndDate('');
    setIsHasGst(true);
    setIsRecurring(true);
    navigation.goBack();
  };

  const handleConfirm = date => {
    switch (selectDateType) {
      case 'startDate':
        setStartDate(date);
        setDatePickerVisibility(false);
        break;

      case 'endDate':
        setEndDate(date);
        setDatePickerVisibility(false);
        break;
    }
  };

  const onStartBtnPress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('startDate');
  };

  const onEndBtnPress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('endDate');
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Assign Allowances to Employees'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Add allowance types within the company here.'}
          description2={'Fill in the respective fields.'}
        />

        <AssignmentDetails
          isError={isError}
          setDescription={setDescription}
          description={description}
          isInstalments={isInstalments}
          setIsInstalments={setIsInstalments}
          employeeArr={employeeArr}
          setEmployeeArr={setEmployeeArr}
          employeeValue={employeeValue}
          setEmployeeValue={setEmployeeValue}
          openEmployee={openEmployee}
          setOpenEmployee={setOpenEmployee}
          allowanceTypeArr={allowanceTypeArr}
          setAllowanceTypeArr={setAllowanceTypeArr}
          allowanceTypeValue={allowanceTypeValue}
          setAllowanceTypeValue={setAllowanceTypeValue}
          openAllowanceType={openAllowanceType}
          setOpenAllowanceType={setOpenAllowanceType}
          recurringPeriodArr={recurringPeriodArr}
          setRecurringPeriodArr={setRecurringPeriodArr}
          recurringPeriodValue={recurringPeriodValue}
          setRecurringPeriodValue={setRecurringPeriodValue}
          openRecurringPeriod={openRecurringPeriod}
          setOpenRecurringPeriod={setOpenRecurringPeriod}
          amount={amount}
          setAmount={setAmount}
          isHasGst={isHasGst}
          setIsHasGst={setIsHasGst}
          isRecurring={isRecurring}
          setIsRecurring={setIsRecurring}
          startDate={startDate}
          endDate={endDate}
          onStartBtnPress={onStartBtnPress}
          onEndBtnPress={onEndBtnPress}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={onSaveBtnPress}
          label={'Save'}
          saveLoading={isPayslipTemplatesLoading.add}
        />
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}

export default AssignAllowances;
