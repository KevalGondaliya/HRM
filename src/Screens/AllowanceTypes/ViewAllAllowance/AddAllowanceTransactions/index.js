import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../../component/Header';
import AllowanceTransactions from './AllowanceTransactions';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import Validator from '../../../../utility/validator';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';

function AddAllowanceTransactions({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [employee, setEmployee] = useState('');
  const [description, setDescription] = useState('');
  const [employeeArr, setEmployeeArr] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const [no_of_days, setNo_of_days] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const userData = useSelector(state => state.employees);
  const token = useSelector(state => state.session?.token);

  const leaveTransactionsData = useSelector(
    state => state.allowanceTransactions,
  );

  const isAllownceTransactionsLoading = useSelector(
    state => state.loading.effects.allowanceTransactions,
  );
  const isSpinner = useSelector(
    state => state.loading.effects.uploadDocument.setDocument,
  );
  useEffect(() => {
    dispatch.employees.get({token});
  }, []);

  const onSaveBtnPress = () => {
    if (
      employee &&
      Validator.validateTextInput(description) &&
      leaveStartDate &&
      Validator.validateAmount(no_of_days)
    ) {
      setIsError(false);
      const data = {
        allowanceDate: leaveStartDate,
        allowDesc: description,
        amount: parseFloat(no_of_days),
        userId: employee,
      };

      if (isEdit) {
        dispatch.allowanceTransactions.update({token, data, id: editData?.id});
      } else {
        dispatch.allowanceTransactions.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  useEffect(() => {
    if (editData) {
      setEmployee(editData?.userId || '');
      setDescription(editData?.allowDesc || '');
      setLeaveStartDate(editData?.allowanceDate || '');
      setNo_of_days(editData?.amount.toString() || '');
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const refresh = () => {
    setEmployee();
    setDescription('');
    setLeaveStartDate();
    setNo_of_days('');
  };

  useEffect(() => {
    dispatch.employees.get({token});
  }, []);

  useEffect(() => {
    if (
      leaveTransactionsData.isAddAllowanceTransactions ||
      leaveTransactionsData.isEditAllowanceTransactions
    ) {
      dispatch.allowanceTransactions.setAllowanceTransactions(false);
      dispatch.allowanceTransactions.saveEditAllowanceTransactions(false);
      cancelBtn();
    }
  }, [
    leaveTransactionsData.isAddAllowanceTransactions ||
      leaveTransactionsData.isEditAllowanceTransactions,
  ]);

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

  const handleConfirm = date => {
    switch (selectDateType) {
      case 'startDate':
        setLeaveStartDate(date);
        break;
    }
    setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onDateBtnPress = () => {
    setDatePickerVisibility(true);
  };

  const onStartDateBtnPress = () => {
    onDateBtnPress();
    setSelectDateType('startDate');
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Allowance Transactions'}
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
          description1={'Add leave transactions within the company here.'}
          description2={'Fill in the respective fields.'}
          style={{paddingHorizontal: 0}}
        />

        <AllowanceTransactions
          isError={isError}
          isView={isView}
          employee={employee}
          setEmployee={setEmployee}
          employeeArr={employeeArr}
          setDescription={setDescription}
          description={description}
          leaveStartDate={leaveStartDate}
          setLeaveStartDate={setLeaveStartDate}
          onStartDateBtnPress={onStartDateBtnPress}
          no_of_days={no_of_days}
          setNo_of_days={setNo_of_days}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : onSaveBtnPress}
          saveLoading={
            isSpinner ||
            isAllownceTransactionsLoading.add ||
            isAllownceTransactionsLoading.update
          }
          isEdit={isEdit}
          isView={isView}
          label={isEdit ? 'Update' : 'Submit'}
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

export default AddAllowanceTransactions;
