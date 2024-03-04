import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ApplyforaLeave from './ApplyforaLeave';
import Header from '../../../component/Header';
import { leaveDropDownData } from '../../../dummyData';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const ApproveIndividualLeave = ({ route, navigation }) => {
  const isError = false;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [leaveTypeValue, setLeaveTypeValue] = useState('');
  const [openLeaveType, setOpenLeaveType] = useState(false);
  const [leaveTypeArr, setLeaveTypeArr] = useState(leaveDropDownData);

  const [leaveStartDay, setleaveStartDay] = useState('');
  const [leaveEndDay, setleaveEndDay] = useState('');
  const [totalNoOfDays, setTotalNoOfDays] = useState('');
  const [reason, setReasone] = useState('');
  const [empName, setEmpName] = useState('');
  const [checked, setChecked] = useState(true);

  const token = useSelector(state => state.session?.token);
  const isLeaveLoading = useSelector(state => state.loading.effects.leave);

  const leaveData = useSelector(state => state.leave);

  useEffect(() => {
    if (editData) {
      setEmpName(editData?.user?.user_name);
      setLeaveTypeValue(editData?.leaveDesc);
      setleaveStartDay(editData?.leaveStartDate);
      setleaveEndDay(editData?.leaveEndDate);
      setChecked(editData?.half_days);
      setTotalNoOfDays(editData?.totalNoOfDays);
      setReasone(editData?.reason);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const refresh = () => {
    setEmpName('');
    setLeaveTypeValue('');
    setleaveStartDay('');
    setleaveEndDay('');
    setChecked(true);
    setTotalNoOfDays('');
    setReasone('');
  };

  useEffect(() => {
    if (leaveData.isApproveLeave) {
      dispatch.leave.setApproveLeave(false);
      cancelBtn();
    }
  }, [leaveData.isApproveLeave]);

  const cancelBtn = () => {
    refresh('');
    navigation.goBack();
  };

  const submitBtn = () => {
    let data = {
      status: 'Approve',
    };

    dispatch.leave.leaveApprove({
      token,
      data,
      id: editData?.id,
    });
  };
  const rejectBtn = () => {
    let data = {
      status: 'Reject',
    };

    dispatch.leave.leaveApprove({
      token,
      data,
      id: editData?.id,
    });
  };

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Approve Individual Leave'}
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
          leaveStartDay={leaveStartDay}
          leaveEndDay={leaveEndDay}
          checked={checked}
          setChecked={setChecked}
          reason={reason}
          totalNoOfDays={totalNoOfDays}
          setReasone={setReasone}
        />

        <SaveCancelBtn
          label={'Approve'}
          cancelLabel={'Reject'}
          cancelBtn={rejectBtn}
          submitBtn={submitBtn}
          saveLoading={isLeaveLoading.leaveApprove}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ApproveIndividualLeave;
