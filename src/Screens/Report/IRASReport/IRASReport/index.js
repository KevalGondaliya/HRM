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

function IRASReport({navigation}) {
  const dispatch = useDispatch();
  const [year, setYear] = useState('');
  const [isError, setIsError] = useState(false);
  const [organisationArr, setOrganisationArr] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [organisationValue, setOrganisationValue] = useState('');
  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const token = useSelector(state => state.session?.token);
  const organisationData = useSelector(state => state.organisations?.viewOrg);

  useEffect(() => {
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
    if (year !== '' && organisationValue !== '') {
      setIsError(false);
      navigation.navigate('ViewIRASReport');
    } else {
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'IRAS Report'}
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
          description1={`Download an excel file of organization's IRAS transactions.`}
        />

        <ReportDetails
          year={year}
          isError={isError}
          onPress={onDateBtnPress}
          isModalVisible={isModalVisible}
          organisationArr={organisationArr}
          openOrganisation={openOrganisation}
          organisationValue={organisationValue}
          setOrganisationArr={setOrganisationArr}
          setIsModalVisible={setIsModalVisible}
          setOrganisationValue={setOrganisationValue}
          setOpenOrganisation={setOpenOrganisation}
        />

        <SaveCancelBtn
          label={'next'}
          style={styles.top}
          submitBtn={submitBtn}
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

export default IRASReport;
