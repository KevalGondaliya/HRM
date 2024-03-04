import moment from 'moment';
import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ApplyforaClaim from './ApplyforaClaim';
import Header from '../../../component/Header';
import Validator from '../../../utility/validator';
import {
  categoryDataArr,
  claimTypeCatagoryDataArr,
} from '../../../utility/constant';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';

const ApplyLeave = ({route, navigation}) => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [leaveTypeValue, setLeaveTypeValue] = useState('');
  const [leaveTypeArr, setLeaveTypeArr] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [categoryArr, setCategoryArr] = useState(claimTypeCatagoryDataArr);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [leaveStartDay, setleaveStartDay] = useState('');
  const [uploadDocument, setUploadDocument] = useState('');
  const [reason, setReasone] = useState('');
  const [gst, setGst] = useState('');
  const [checked, setChecked] = useState(true);

  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);
  const claimTypes = useSelector(state => state.claimTypes);
  const categoryData = useSelector(state => state.claimTypesCategory);
  const uploadDoc = useSelector(state => state.uploadDocument?.document);

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
      setCategoryValue(editData?.claimTypeCategoryId);
      setReasone(editData?.expenditureAmt?.toString());
      setChecked(editData?.gstInclusive);
      setGst(editData?.gstAmt?.toString());
      setleaveStartDay(editData?.expediture_date);
      setUploadDocument(editData?.receipt);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

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

  useEffect(() => {
    if (applyClaimsData.isAddApplyClaims || applyClaimsData.isEditApplyClaims) {
      dispatch.applyClaims.setAddApplyClaims(false);
      dispatch.applyClaims.setEditApplyClaims(false);
      cancelBtn();
    }
  }, [applyClaimsData.isAddApplyClaims || applyClaimsData.isEditApplyClaims]);

  useEffect(() => {
    getClaimData();
  }, []);

  const getClaimData = () => {
    dispatch.claimTypes.get({token});
    dispatch.claimTypesCategory.get({token});
  };

  const handleConfirm = date => {
    setleaveStartDay(date);
    setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const removeBtnPress = () => {
    setUploadDocument('');
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
    if (checked && gst === '') {
      setIsError(true);
    } else if (
      leaveTypeValue &&
      categoryValue &&
      Validator.validateAmount(reason) &&
      leaveStartDay &&
      uploadDocument
    ) {
      setIsError(false);
      let data = {
        claimTypeId: leaveTypeValue,
        userId: user?.id,
        submit_date: editData?.createdAt || moment(),
        claimTypeCategoryId: categoryValue,
        expenditureAmt: parseInt(reason),
        gstInclusive: checked,
        gstAmt: parseInt(gst),
        expediture_date: leaveStartDay,
        receipt: uploadDoc?.url,
      };

      if (isEdit) {
        dispatch.applyClaims.update({
          token,
          data,
          id: editData?.id,
        });
      } else {
        dispatch.applyClaims.add({token, data});
      }
    } else {
      setIsError(true);
    }
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
          onDobBtnPress={() => {
            setDatePickerVisibility(true);
          }}
          leaveStartDay={leaveStartDay}
          checked={checked}
          setChecked={setChecked}
          reason={reason}
          setReasone={setReasone}
          gst={gst}
          setGst={setGst}
          uploadDocument={uploadDocument}
          handleDocumentSelection={handleDocumentSelection}
          removeBtnPress={removeBtnPress}
          isSpinner={isDocLoading}
        />

        <SaveCancelBtn
          label={'Apply'}
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : submitBtn}
          saveLoading={
            isDocLoading ||
            isApplyClaimsLoading.add ||
            isApplyClaimsLoading.update
          }
          isView={isView}
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

export default ApplyLeave;
