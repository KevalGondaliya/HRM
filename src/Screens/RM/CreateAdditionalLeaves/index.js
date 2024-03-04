import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ApplyforaLeave from './ApplyforaLeave';
import Header from '../../../component/Header';
import Validator from '../../../utility/validator';
import { leaveDropDownData } from '../../../dummyData';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import { useDispatch, useSelector } from 'react-redux';

const ApproveIndividualLeave = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [leaveTypeValue, setLeaveTypeValue] = useState('');
  const [openLeaveType, setOpenLeaveType] = useState(false);
  const [leaveTypeArr, setLeaveTypeArr] = useState(leaveDropDownData);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [leaveEndDay, setleaveEndDay] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const [numberOfDay, setNumberOfDay] = useState('');
  const [empName, setEmpName] = useState('');
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);

  const leaveTransactionsData = useSelector(state => state.leaveTransactions);
  const isLeaveLoading = useSelector(
    state => state.loading.effects.leaveTransactions,
  );

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
      case 'endDate':
        setleaveEndDay(date);
        setDatePickerVisibility(false);
        break;
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onEndBtnPress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('endDate');
  };

  const cancelBtn = () => {
    setLeaveTypeValue('');
    setNumberOfDay('');
    setleaveEndDay('');
    navigation.goBack();
  };

  const submitBtn = () => {
    if (leaveTypeValue && Validator.validateOnlyNumber(numberOfDay) && leaveEndDay) {
      setIsError(false);
      const data = {
        leaveDesc: leaveTypeValue,
        leaveEndDate: leaveEndDay,
        totalNoOfDays: Number(numberOfDay),
        userId: user?.id,
      };

      dispatch.leaveTransactions.add({ token, data });
    } else {
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Create Additional Leaves'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Create additional leaves for employees.'}
          description2={'Fill in the respective fields.'}
        />

        <ApplyforaLeave
          isError={isError}
          empName={empName}
          setEmpName={setEmpName}
          leaveTypeValue={leaveTypeValue}
          setLeaveTypeValue={setLeaveTypeValue}
          openLeaveType={openLeaveType}
          setOpenLeaveType={setOpenLeaveType}
          leaveTypeArr={leaveTypeArr}
          setLeaveTypeArr={setLeaveTypeArr}
          onEndBtnPress={onEndBtnPress}
          leaveEndDay={leaveEndDay}
          setNumberOfDay={setNumberOfDay}
          numberOfDay={numberOfDay}
        />

        <SaveCancelBtn
          label={'Save'}
          cancelBtn={cancelBtn}
          submitBtn={submitBtn}
          saveLoading={isLeaveLoading.add || isLeaveLoading.update}
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

export default ApproveIndividualLeave;
