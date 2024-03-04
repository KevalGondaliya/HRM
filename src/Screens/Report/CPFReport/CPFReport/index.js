/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ReportDetails from './ReportDetails';
import Header from '../../../../component/Header';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';

function CPFReport({navigation}) {
  const dispatch = useDispatch();
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [isError, setIsError] = useState(false);
  const [organisationArr, setOrganisationArr] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [organisationValue, setOrganisationValue] = useState('');
  const [selectType, setSelectType] = useState('');
  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const token = useSelector(state => state.session?.token);
  const organisationData = useSelector(state => state.organisations?.viewOrg);

  useEffect(() => {
    clearForm();
    // dispatch.organisations.getOrganisations({token});
  }, []);

  useEffect(() => {
    if (organisationData) {
      let arr = organisationData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({label: arr[i].org_name, value: arr[i].id});
      }
      setOrganisationArr(dropDownArr);
    }
  }, [organisationData]);

  const handleConfirm = date => {
    switch (selectType) {
      case 'month':
        setMonth(date);
        setDatePickerVisibility(false);
        break;

      case 'year':
        setYear(date);
        setDatePickerVisibility(false);
        break;
    }
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onDateBtnPress = type => {
    setDatePickerVisibility(true);
    setSelectType(type);
  };

  const submitBtn = () => {
    if (year !== '' && month !== '' && organisationValue !== '') {
      setIsError(false);
      navigation.navigate('ViewCPFReport');
    } else {
      setIsError(true);
    }
  };

  const clearForm = () => {
    setYear('');
    setMonth('');
    setOrganisationValue('');
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'CPF Report'}
        labelStyle={styles.headerLabel}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={`Download an excel file of organization's CPF transactions.`}
        />

        <ReportDetails
          year={year}
          month={month}
          isError={isError}
          setMonth={setMonth}
          isModalVisible={isModalVisible}
          organisationArr={organisationArr}
          openOrganisation={openOrganisation}
          organisationValue={organisationValue}
          setIsModalVisible={setIsModalVisible}
          onPress={() => onDateBtnPress('year')}
          setOrganisationArr={setOrganisationArr}
          setOpenOrganisation={setOpenOrganisation}
          setOrganisationValue={setOrganisationValue}
          onMonthPress={() => onDateBtnPress('month')}
        />

        <SaveCancelBtn
          label={'next'}
          style={styles.top}
          submitBtn={submitBtn}
          cancelBtn={clearForm}
        />
      </KeyboardAwareScrollView>

      <DateTimePickerModal
        mode="date"
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
        isVisible={isDatePickerVisible}
      />
    </SafeAreaView>
  );
}

export default CPFReport;
