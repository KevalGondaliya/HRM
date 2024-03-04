import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ApplyforaLeave from './ApplyforaLeave';
import Header from '../../../component/Header';
import {leaveDropDownData} from '../../../dummyData';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const NominateforPeerAppraisal = ({route, navigation}) => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [nomineeTypeValue, setNomineeTypeValue] = useState('');
  const [openNomineeType, setOpenNomineeType] = useState(false);
  const [nomineeTypeArr, setNomineeTypeArr] = useState([]);
  const [templateTypeValue, setTemplateTypeValue] = useState('');
  const [openTemplateType, setOpenTemplateType] = useState(false);
  const [templateTypeArr, setTemplateTypeArr] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startDate, setStartDay] = useState('');
  const [endDate, setEndDay] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const token = useSelector(state => state.session?.token);
  const userData = useSelector(state => state.employees);
  const appraisalData = useSelector(state => state.appraisal);
  const appraisalTemplatesData = useSelector(state => state.appraisalTemplates);
  const isAppraisalLoading = useSelector(
    state => state.loading.effects.appraisal,
  );

  useEffect(() => {
    dispatch.employees.get({token});
    dispatch.appraisalTemplates.get({token});
  }, []);

  useEffect(() => {
    if (userData) {
      let arr = userData?.userData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].user_name, value: arr[i].id});
      }
      setNomineeTypeArr(dropDownArr);
    }

    if (appraisalTemplatesData) {
      let arr = appraisalTemplatesData?.appraisalTemplatesData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].appraisalTempName, value: arr[i].id});
      }
      setTemplateTypeArr(dropDownArr);
    }
  }, [userData, appraisalTemplatesData]);

  useEffect(() => {
    if (editData) {
      setNomineeTypeValue(editData?.userId);
      setTemplateTypeValue(editData?.apprTempID);
      setStartDay(editData?.startDate);
      setEndDay(editData?.endDate);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  useEffect(() => {
    if (appraisalData.isAddAppraisal || appraisalData.isEditAppraisal) {
      dispatch.appraisal.setAppraisal(false);
      dispatch.appraisal.saveEditAppraisal(false);
      cancelBtn();
    }
  }, [appraisalData.isAddAppraisal || appraisalData.isEditAppraisal]);

  const handleConfirm = date => {
    switch (selectDateType) {
      case 'startDate':
        setStartDay(date);
        setDatePickerVisibility(false);
        break;

      case 'endDate':
        setEndDay(date);
        setDatePickerVisibility(false);
        break;
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const submitBtn = () => {
    // navigation.navigate('ReviewAppraisals');
    if (nomineeTypeValue && templateTypeValue && startDate && endDate) {
      setIsError(false);
      let data = {
        userId: nomineeTypeValue,
        apprTempID: templateTypeValue,
        startDate: startDate,
        endDate: endDate,
      };

      if (isEdit) {
        console.log(data);
        dispatch.appraisal.update({
          token,
          data,
          id: editData?.id,
        });
      } else {
        dispatch.appraisal.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const refresh = () => {
    setNomineeTypeValue('');
    setTemplateTypeValue('');
    setStartDay('');
    setEndDay('');
    setIsError(false);
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  const onDobBtnPress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('startDate');
  };

  const onEndBtnPress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('endDate');
  };

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Nominate for Peer Appraisal'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Nominate your peers to appraise for you.'}
          description2={'This appraisal can be seen by your reporting managers'}
        />

        <ApplyforaLeave
          isError={isError}
          isView={isView}
          openNomineeType={openNomineeType}
          nomineeTypeValue={nomineeTypeValue}
          nomineeTypeArr={nomineeTypeArr}
          setOpenNomineeType={setOpenNomineeType}
          setNomineeTypeValue={setNomineeTypeValue}
          setNomineeTypeArr={setNomineeTypeArr}
          openTemplateType={openTemplateType}
          templateTypeValue={templateTypeValue}
          templateTypeArr={templateTypeArr}
          setOpenTemplateType={setOpenTemplateType}
          setTemplateTypeValue={setTemplateTypeValue}
          setTemplateTypeArr={setTemplateTypeArr}
          onDobBtnPress={onDobBtnPress}
          onEndBtnPress={onEndBtnPress}
          startDate={startDate}
          endDate={endDate}
        />

        <SaveCancelBtn
          label={'Nominate'}
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : submitBtn}
          saveLoading={isAppraisalLoading.add || isAppraisalLoading.update}
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

export default NominateforPeerAppraisal;
