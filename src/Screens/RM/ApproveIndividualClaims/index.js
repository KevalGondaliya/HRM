import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ApplyforaClaim from './ApplyforaClaim';
import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {categoryDataArr} from '../../../utility/constant';

const ApproveIndividualClaims = ({route, navigation}) => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [leaveTypeValue, setLeaveTypeValue] = useState('');
  const [leaveTypeArr, setLeaveTypeArr] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [categoryArr, setCategoryArr] = useState(categoryDataArr);
  const [leaveStartDay, setleaveStartDay] = useState('');
  const [uploadDocument, setUploadDocument] = useState('');
  const [reason, setReasone] = useState('');
  const [gst, setGst] = useState('');
  const [checked, setChecked] = useState(true);

  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);
  const claimTypes = useSelector(state => state.claimTypes);
  const categoryData = useSelector(state => state.claimTypesCategory);

  const applyClaimsData = useSelector(state => state.applyClaims);
  const isApplyClaimsLoading = useSelector(
    state => state.loading.effects.applyClaims,
  );
  const isDocLoading = useSelector(
    state => state.loading.effects.uploadDocument.setDocument,
  );

  useEffect(() => {
    if (editData) {
      setLeaveTypeValue(editData?.claimTypeId);
      setCategoryValue(parseInt(editData?.category));
      setReasone(editData?.expenditureAmt?.toString());
      setChecked(editData?.gstInclusive);
      setGst(editData?.gstAmt?.toString());
      setleaveStartDay(editData?.expediture_date);
      setUploadDocument(editData?.receipt);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  useEffect(() => {
    if (applyClaimsData.isApproveClaims) {
      dispatch.applyClaims.setApproveClaims(false);
      cancelBtn();
      getClaimData();
    }
  }, [applyClaimsData.isApproveClaims]);

  useEffect(() => {
    getClaimData();
  }, []);

  const getClaimData = () => {
    dispatch.claimTypes.get({token});
    dispatch.claimTypesCategory.get({token});
  };

  useEffect(() => {
    if (claimTypes) {
      let arr = claimTypes.claimTypesData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].description, value: arr[i].id});
      }
      setLeaveTypeArr(dropDownArr);
    }
  }, [claimTypes]);

  const submitBtn = () => {
    setIsError(false);
    let data = {
      status: 'Approve',
    };

    dispatch.applyClaims.addApproveClaim({
      token,
      data,
      id: editData?.id,
      userId: user?.id,
    });
  };
  const rejectBtn = () => {
    setIsError(false);
    let data = {
      status: 'Reject',
    };

    dispatch.applyClaims.addApproveClaim({
      token,
      data,
      id: editData?.id,
      userId: user?.id,
    });
  };

  const refresh = () => {
    setLeaveTypeValue('');
    setCategoryValue('');
    setReasone('');
    setleaveStartDay('');
    setUploadDocument('');
    setGst('');
    setChecked(true);
  };

  const cancelBtn = () => {
    refresh('');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Apply Claims'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Apply claims within the company here.'}
          description2={'Fill in the respective fields.'}
        />

        <ApplyforaClaim
          isError={isError}
          isView={isView}
          leaveTypeValue={leaveTypeValue}
          setLeaveTypeValue={setLeaveTypeValue}
          leaveTypeArr={leaveTypeArr}
          categoryValue={categoryValue}
          categoryArr={categoryArr}
          setCategoryValue={setCategoryValue}
          leaveStartDay={leaveStartDay}
          checked={checked}
          setChecked={setChecked}
          reason={reason}
          setReasone={setReasone}
          gst={gst}
          setGst={setGst}
          uploadDocument={uploadDocument}
          isSpinner={isDocLoading}
        />

        <SaveCancelBtn
          label={'Approve'}
          cancelLabel={'Reject'}
          cancelBtn={rejectBtn}
          submitBtn={submitBtn}
          saveLoading={isApplyClaimsLoading.addApproveClaim}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ApproveIndividualClaims;
