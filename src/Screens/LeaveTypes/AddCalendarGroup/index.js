/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ReportDetails from './ReportDetails';
import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function AddCalendarGroup({ navigation }) {
  const dispatch = useDispatch();
  const [year, setYear] = useState('');
  const [count, setCount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [companyArr, setCompanyArr] = useState([]);
  const [companyValue, setCompanyValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = useSelector(state => state.session?.token);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [countryModal, setCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const companyData = useSelector(state => state.company?.companyData);
  const calendarGroup = useSelector(state => state.calendarGroup);
  const isCalendarGroupLoading = useSelector(
    state => state.loading.effects.addAppraisalCycles,
  );

  useEffect(() => {
    dispatch.company.get({ token });
  }, []);

  useEffect(() => {
    if (calendarGroup.isAddCalendarGroup) {
      dispatch.calendarGroup.setCalendarGroup(false);
      cancelBtn();
    }
  }, [calendarGroup.isAddCalendarGroup]);

  useEffect(() => {
    if (companyData) {
      let arr = companyData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({ label: arr[i].company_name, value: arr[i].id });
      }
      setCompanyArr(dropDownArr);
    }
  }, [companyData]);

  const handleConfirm = date => {
    setYear(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onDateBtnPress = () => {
    setDatePickerVisibility(true);
  };

  const submitBtn = () => {
    if (year !== '' && countryName !== '') {
      let data = {
        year: year,
        country: countryName,
        // companyId: companyValue,
      };
      dispatch.calendarGroup.add({ token, data });
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const selectCountryCode = country => {
    setSelectedCountry(country.cca2);
    setCountryName(country.name);
  };

  const onClose = () => {
    setCountryModal(false);
    setCount(count + 1);
  };

  const countryBtn = () => {
    setCountryModal(true), setCount(count + 1);
  };

  const cancelBtn = () => {
    setCompanyValue('');
    setYear('');
    setCountryName('');
    navigation.goBack();
    setIsError(false);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Calendar Group'}
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
          description1={`Add calendar group within the company here. Fill in the respective fields.`}
        />

        <ReportDetails
          year={year}
          isError={isError}
          onPress={onDateBtnPress}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          countryName={countryName}
          countryModal={countryModal}
          selectedCountry={selectedCountry}
          selectCountryCode={selectCountryCode}
          countryBtn={countryBtn}
          onClose={onClose}
          companyArr={companyArr}
          companyValue={companyValue}
          setCompanyValue={setCompanyValue}
        />

        <SaveCancelBtn
          label={'Save'}
          style={styles.top}
          submitBtn={submitBtn}
          cancelBtn={cancelBtn}
          saveLoading={isCalendarGroupLoading.add}
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

export default AddCalendarGroup;
