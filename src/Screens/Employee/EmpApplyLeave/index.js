import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Leaves from './Leaves';
import ApplyforaLeave from './ApplyforaLeave';
import Validator from '../../../utility/validator';
import Header from '../../../component/Header';
import { leaveDropDownData } from '../../../dummyData';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const EmpApplyLeave = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [leaveTypeValue, setLeaveTypeValue] = useState('');
  const [openLeaveType, setOpenLeaveType] = useState(false);
  const [leaveTypeArr, setLeaveTypeArr] = useState(leaveDropDownData);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [leaveStartDay, setleaveStartDay] = useState('');
  const [leaveEndDay, setleaveEndDay] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const [uploadDocument, setUploadDocument] = useState('');
  const [reason, setReasone] = useState('');
  const [checked, setChecked] = useState(false);

  const uploadDoc = useSelector(state => state.uploadDocument?.document);
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);
  const leaveTransactionsData = useSelector(state => state.leaveTransactions);
  const isLeaveLoading = useSelector(
    state => state.loading.effects.leaveTransactions,
  );
  const isDocLoading = useSelector(
    state => state.loading.effects.uploadDocument.setDocument,
  );

  useEffect(() => {
    if (editData) {
      setLeaveTypeValue(editData?.leaveDesc);
      setleaveStartDay(editData?.leaveStartDate);
      setleaveEndDay(editData?.leaveEndDate);
      setChecked(editData?.half_days);
      setReasone(editData?.reason);
      setUploadDocument(editData?.filePath);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const refresh = () => {
    setLeaveTypeValue('');
    setleaveStartDay('');
    setleaveEndDay('');
    setChecked(false);
    setReasone('');
    setUploadDocument('');
  };

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

  const handleConfirm = date => {
    switch (selectDateType) {
      case 'startDate':
        setleaveStartDay(date);
        setDatePickerVisibility(false);
        break;

      case 'endDate':
        setleaveEndDay(date);
        setDatePickerVisibility(false);
        break;
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });

      const formData = new FormData();
      formData.append('document', response[0]);

      dispatch.uploadDocument.setDocument({ token, formData });

      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) { }
  };

  const submitBtn = () => {
    if (
      leaveTypeValue &&
      leaveStartDay &&
      leaveEndDay &&
      Validator.validateTextInput(reason) &&
      uploadDocument
    ) {
      setIsError(false);
      const data = {
        leaveDesc: leaveTypeValue,
        leaveStartDate: leaveStartDay,
        leaveEndDate: leaveEndDay,
        half_days: checked,
        // totalNoOfDays: Number(no_of_days),
        reason: reason,
        filePath: uploadDoc?.url || editData?.filePath,
        userId: user?.id,
      };

      if (isEdit) {
        dispatch.leaveTransactions.update({ token, data, id: editData?.id });
      } else {
        dispatch.leaveTransactions.add({ token, data });
      }
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    refresh('');
    navigation.goBack();
  };

  const removeBtnPress = () => {
    setUploadDocument('');
  };

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Apply Leave'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Apply leave within the company here.'}
          description2={'Fill in the respective fields.'}
        />

        <Leaves />
        <ApplyforaLeave
          isError={isError}
          isView={isView}
          leaveTypeValue={leaveTypeValue}
          setLeaveTypeValue={setLeaveTypeValue}
          openLeaveType={openLeaveType}
          setOpenLeaveType={setOpenLeaveType}
          leaveTypeArr={leaveTypeArr}
          setLeaveTypeArr={setLeaveTypeArr}
          onDobBtnPress={() => {
            setDatePickerVisibility(true);
            setSelectDateType('startDate');
          }}
          onEndBtnPress={() => {
            setDatePickerVisibility(true);
            setSelectDateType('endDate');
          }}
          leaveStartDay={leaveStartDay}
          leaveEndDay={leaveEndDay}
          checked={checked}
          setChecked={setChecked}
          reason={reason}
          setReasone={setReasone}
          uploadDocument={uploadDocument}
          handleDocumentSelection={handleDocumentSelection}
          removeBtnPress={removeBtnPress}
          isSpinner={isDocLoading}
        />

        <SaveCancelBtn

          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : submitBtn}
          saveLoading={
            isDocLoading || isLeaveLoading.add || isLeaveLoading.update
          }
          isView={isView}
          isEdit={isEdit}
          label={isEdit ? "Update" : "Submit"}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmpApplyLeave;
