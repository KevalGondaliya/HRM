import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../../component/Header';
import AddClaimTransactions from './AddClaimTransactions';
import {statusArrData} from '../../../../dummyData';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import Validator from '../../../../utility/validator';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';

function AddLeaveTransactions({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [employee, setEmployee] = useState('');
  const [description, setDescription] = useState('');
  const [employeeArr, setEmployeeArr] = useState([]);
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const [claimTypeCategory, setClaimTypeCategory] = useState('');
  const [claimTypeCategoryArr, setClaimTypeCategoryArr] = useState([]);
  const [no_of_days, setNo_of_days] = useState('');
  const [name, setName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [uploadDocument, setUploadDocument] = useState('');
  const [status, setStatus] = useState('');
  const statusArr = statusArrData;
  const [isHalfLeave, setIsHalfLeave] = useState(true);
  const userData = useSelector(state => state.employees);
  const token = useSelector(state => state.session?.token);

  const leaveTransactionsData = useSelector(state => state.claimTransactions);
  const claimTypes = useSelector(state => state.claimTypes?.claimTypesData);

  const isLeaveTransactionsLoading = useSelector(
    state => state.loading.effects.claimTransactions,
  );

  useEffect(() => {
    dispatch.employees.get({token});
    dispatch.claimTypes.get({token});
  }, []);

  const onSaveBtnPress = () => {
    if (
      employee != '' &&
      Validator.validateTextInput(description) != '' &&
      leaveStartDate != '' &&
      Validator.validateAmount(no_of_days) != '' &&
      claimTypeCategory != '' &&
      Validator.validateTextInput(name)
    ) {
      setIsError(false);
      const data = {
        claimTypeId: claimTypeCategory,
        userId: employee,
        claimDate: leaveStartDate,
        name: name,
        desciption: description,
        amount: parseFloat(no_of_days),
      };

      if (isEdit) {
        dispatch.claimTransactions.update({token, data, id: editData?.id});
      } else {
        dispatch.claimTransactions.add({token, data});
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
      setEmployee(editData?.userId);
      setDescription(editData?.desciption);
      setLeaveStartDate(editData?.claimDate);
      setNo_of_days(editData?.amount.toString());
      setName(editData?.name);
      setClaimTypeCategory(editData?.claimTypeId);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const refresh = () => {
    setEmployee('');
    setDescription('');
    setLeaveStartDate('');
    setNo_of_days('');
    setName('');
    setClaimTypeCategory('');
    setIsError(false);
  };

  useEffect(() => {
    if (
      leaveTransactionsData.isAddClaimTransactions ||
      leaveTransactionsData.isEditClaimTransactions
    ) {
      dispatch.claimTransactions.setClaimTransactions(false);
      dispatch.claimTransactions.saveEditClaimTransactions(false);
      cancelBtn();
    }
  }, [
    leaveTransactionsData.isAddClaimTransactions ||
      leaveTransactionsData.isEditClaimTransactions,
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
    if (claimTypes) {
      let arr = claimTypes;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].description, value: arr[i].id});
      }
      setClaimTypeCategoryArr(dropDownArr);
    }
  }, [userData, claimTypes]);

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
        label={'Add Claim Transactions'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Add claim transactions within the company here.'}
          description2={'Fill in the respective fields.'}
          style={{paddingHorizontal: 0}}
        />

        <AddClaimTransactions
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
          leaveEndDate={leaveEndDate}
          setLeaveEndDate={setLeaveEndDate}
          isHalfLeave={isHalfLeave}
          setIsHalfLeave={setIsHalfLeave}
          no_of_days={no_of_days}
          setNo_of_days={setNo_of_days}
          name={name}
          setName={setName}
          uploadDocument={uploadDocument}
          status={status}
          setStatus={setStatus}
          statusArr={statusArr}
          claimTypeCategory={claimTypeCategory}
          setClaimTypeCategory={setClaimTypeCategory}
          claimTypeCategoryArr={claimTypeCategoryArr}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : onSaveBtnPress}
          label={isEdit ? 'Update' : 'Submit'}
          isView={isView}
          isEdit={isEdit}
          saveLoading={
            isLeaveTransactionsLoading.add || isLeaveTransactionsLoading.update
          }
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

export default AddLeaveTransactions;
