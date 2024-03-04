import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Box from '../../../component/Box';
import DateDropDown from './DateDropDown';
import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';

function PayrollSettings({navigation}) {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [publishDay, setPublishDay] = useState('');
  const [periodEndDay, setPeriodEndDay] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const [periodStartDay, setPeriodStartDay] = useState('');
  const [autoGenerationDay, setAutoGenerationDay] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const payrollSettingData = useSelector(state => state.payrollSetting);
  const isLoading = useSelector(state => state.loading.effects.payrollSetting);
  const token = useSelector(state => state.session?.token);

  const handleConfirm = date => {
    switch (selectDateType) {
      case 'periodStartDay':
        setPeriodStartDay(date);
        setDatePickerVisibility(false);
        break;

      case 'periodEndDay':
        setPeriodEndDay(date);
        setDatePickerVisibility(false);
        break;

      case 'autoGenerationDay':
        setAutoGenerationDay(date);
        setDatePickerVisibility(false);
        break;

      case 'publishDay':
        setPublishDay(date);
        setDatePickerVisibility(false);
        break;
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onSubmitBtnPress = () => {
    if (periodStartDay && periodEndDay && autoGenerationDay && publishDay) {
      let data = {
        startDate: periodStartDay,
        endDate: periodEndDay,
        generationDate: autoGenerationDay,
        publishDate: publishDay,
      };
      dispatch.payrollSetting.add({token, data});

      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (payrollSettingData.isAddPayrollSettings) {
      dispatch.payrollSetting.setAddPayrollSettings(false);
      cancelBtn();
    }
  }, [payrollSettingData.isAddPayrollSettings]);

  const cancelBtn = () => {
    navigation.navigate('Dashboard');
    setPublishDay('');
    setPeriodEndDay('');
    setPeriodStartDay('');
    setAutoGenerationDay('');
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Payroll Settings'}
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
          description1={'Manage payroll settings within'}
          description2={'the company here.'}
        />

        <Box
          label={'Settings'}
          children={
            <>
              <DateDropDown
                label={'Payment Period Start Day*'}
                date={periodStartDay}
                onPress={() => {
                  setDatePickerVisibility(true);
                  setSelectDateType('periodStartDay');
                }}
                isError={isError}
              />

              <DateDropDown
                label={'Payment Period End Day*'}
                date={periodEndDay}
                onPress={() => {
                  setDatePickerVisibility(true);
                  setSelectDateType('periodEndDay');
                }}
                isError={isError}
              />

              <DateDropDown
                label={'Payroll Auto-Generation Day*'}
                date={autoGenerationDay}
                onPress={() => {
                  setDatePickerVisibility(true);
                  setSelectDateType('autoGenerationDay');
                }}
                isError={isError}
              />

              <DateDropDown
                label={'Payroll Publish Day*'}
                date={publishDay}
                onPress={() => {
                  setDatePickerVisibility(true);
                  setSelectDateType('publishDay');
                }}
                isError={isError}
              />
            </>
          }
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={onSubmitBtnPress}
          saveLoading={isLoading.add}
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
}

export default PayrollSettings;
