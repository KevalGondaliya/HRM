import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../component/Header';
import {dropDownData} from '../../../dummyData';
import EmploymentDetails from './EmploymentDetails';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import OnboardEmployees from '../../../component/OnboardEmployees';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';

const Onboard = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const userId = route?.params?.id;
  const [openPayType, setOpenPayType] = useState(false);
  const [payTypeValue, setPayTypeValue] = useState('');
  const [payTypeArr, setPayTypeArr] = useState(dropDownData);
  const [startDate, setStartDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCheck, setIsCheck] = useState(true);
  const [password, setIsPassword] = useState('');
  const token = useSelector(state => state.session?.token);
  const employeesInfo = useSelector(state => state.employees);
  const isLoading = useSelector(state => state.loading.effects.employees);

  useEffect(() => {
    if (employeesInfo.onBoard?.status == 200) {
      dispatch.employees.saveOnBoard(null);
      setOpenPayType(false);
      setIsPassword('');
      setPayTypeValue('');
      setStartDate('');
      navigation.navigate('EmployeeDashboard');
    }
  }, [employeesInfo]);

  const handleConfirm = date => {
    setStartDate(date);
    setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const submitBtn = () => {
    if (startDate && payTypeValue) {
      setIsError(false);
      let data = {
        onboarding: openPayType,
        empType: payTypeValue,
        password: password,
        startDate: startDate,
      };
      dispatch.employees.setOnboard({token, data, id: userId});
    } else {
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Onboard Employees (Single)'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />

      <KeyboardAwareScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <OnboardEmployees index={4} />

        <EmploymentDetails
          isError={isError}
          openPayType={openPayType}
          payTypeValue={payTypeValue}
          payTypeArr={payTypeArr}
          setOpenPayType={setOpenPayType}
          setPayTypeValue={setPayTypeValue}
          setPayTypeArr={setPayTypeArr}
          onStartBtnPress={() => {
            setDatePickerVisibility(true);
          }}
          startDate={startDate}
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          password={password}
          setIsPassword={setIsPassword}
        />

        <SaveCancelBtn
          cancelBtn={() => {
            navigation.goBack();
          }}
          submitBtn={submitBtn}
          label={'Onboard'}
          cancelLabel={'Back'}
          saveLoading={isLoading.setOnboard}
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

export default Onboard;
