import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../../../component/Header';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import ScreenDescription from '../../../../component/ScreenDescription';
import {statusArrData} from '../../../../dummyData';
import Validator from '../../../../utility/validator';
import LeaveTransactions from './LeaveTransactions';

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
  const [employeeArr, setEmployeeArr] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const [no_of_days, setNo_of_days] = useState('');
  const [reason, setReason] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [uploadDocument, setUploadDocument] = useState('');
  const [status, setStatus] = useState('');
  const statusArr = statusArrData;
  const [isHalfLeave, setIsHalfLeave] = useState(true);
  const userData = useSelector(state => state.employees);
  const token = useSelector(state => state.session?.token);

  const leaveTransactionsData = useSelector(state => state.leaveTransactions);
  const uploadDoc = useSelector(state => state.uploadDocument?.document);
  const isLeaveTransactionsLoading = useSelector(
    state => state.loading.effects.leaveTransactions,
  );
  const isSpinner = useSelector(
    state => state.loading.effects.uploadDocument.setDocument,
  );

  const onSaveBtnPress = () => {
    if (
      employee &&
      Validator.validateTextInput(description) &&
      leaveEndDate &&
      leaveStartDate &&
      // Validator.validateNumber(no_of_days) &&
      Validator.validateTextInput(reason)
      // &&
      // uploadDocument &&
      // status
    ) {
      setIsError(false);
      const data = {
        leaveDesc: description,
        leaveStartDate: leaveStartDate,
        leaveEndDate: leaveEndDate,
        half_days: isHalfLeave,
        totalNoOfDays: Number(no_of_days),
        reason: reason,
        // filePath: uploadDoc?.url || editData?.filePath,
        userId: employee,
        // status: status,
      };

      if (isEdit) {
        dispatch.leaveTransactions.update({token, data, id: editData?.id});
      } else {
        dispatch.leaveTransactions.add({token, data});
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
      setDescription(editData?.leaveDesc);
      setLeaveEndDate(editData?.leaveEndDate);
      setLeaveStartDate(editData?.leaveStartDate);
      setIsHalfLeave(editData?.half_days);
      setNo_of_days(editData?.totalNoOfDays.toString());
      setReason(editData?.reason);
      // setUploadDocument(editData?.filePath);
      // setStatus(editData?.status);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const refresh = () => {
    setEmployee('');
    setDescription('');
    setLeaveEndDate('');
    setLeaveStartDate('');
    setIsHalfLeave(true);
    setNo_of_days('');
    setReason('');
    // setUploadDocument('');
    // setStatus('');
    setIsError(false);
  };

  useEffect(() => {
    dispatch.employees.get({token});
  }, []);

  useEffect(() => {
    if (
      leaveTransactionsData.isAddLeaveTransactions ||
      leaveTransactionsData.isEditLeaveTransactions
    ) {
      dispatch.leaveTransactions.setLeaveTransactions(false);
      dispatch.leaveTransactions.saveEditLeaveTransactions(false);
      cancelBtn();
    }
  }, [
    leaveTransactionsData.isAddLeaveTransactions ||
      leaveTransactionsData.isEditLeaveTransactions,
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

      case 'endDate':
        setLeaveEndDate(date);
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

  const onEndDateBtnPress = () => {
    onDateBtnPress();
    setSelectDateType('endDate');
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      const formData = new FormData();
      formData.append('document', response[0]);
      dispatch.uploadDocument.setDocument({token, formData});
      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) {}
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Leave Transactions'}
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

        <LeaveTransactions
          isError={isError}
          isView={isView}
          isEdit={isEdit}
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
          onEndDateBtnPress={onEndDateBtnPress}
          isHalfLeave={isHalfLeave}
          setIsHalfLeave={setIsHalfLeave}
          no_of_days={no_of_days}
          setNo_of_days={setNo_of_days}
          reason={reason}
          setReason={setReason}
          // uploadDocument={uploadDocument}
          // status={status}
          // setStatus={setStatus}
          // statusArr={statusArr}
          handleDocumentSelection={handleDocumentSelection}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : onSaveBtnPress}
          isEdit={isEdit}
          isView={isView}
          label={isEdit ? 'Update' : 'Submit'}
          saveLoading={
            isSpinner ||
            isLeaveTransactionsLoading.add ||
            isLeaveTransactionsLoading.update
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
