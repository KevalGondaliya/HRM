import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../component/Header';
import {dropDownData} from '../../dummyData';
import PositionDetails from './PositionDetails';
import SaveCancelBtn from '../../component/SaveCancelBtn';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {salaryArrData} from '../../utility/constant';

const SalaryAdjustment = ({navigation}) => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const [empNameValue, setEmpNameValue] = useState('');
  const [openEmpName, setOpenEmpName] = useState(false);
  const [empNameArr, setEmpNameArr] = useState(dropDownData);
  const [currentBasicPay, setCurrentBasicPay] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [openSalary, setOpenSalary] = useState(false);
  const [salaryValue, setSalaryValue] = useState('');
  const [salaryArr, setSalaryArr] = useState(salaryArrData);
  const [amount, setAmount] = useState('');
  const [basicPay, setBasicPay] = useState('');
  const token = useSelector(state => state.session?.token);
  const empData = useSelector(state => state.employees);
  const userDetails = useSelector(state => state.user?.userDetails);
  const positionReassignment = useSelector(state => state.positionReassignment);
  const isPositionReassignmentLoading = useSelector(
    state => state.loading.effects.positionReassignment,
  );
  console.log(isError);
  useEffect(() => {
    setIsError(false);
    dispatch.employees.get({token});
    // dispatch.organisations.getOrganisations({token});
  }, []);

  useEffect(() => {
    setCurrentBasicPay(userDetails?.paySchemes[0]?.basicPay);
  }, [userDetails]);

  useEffect(() => {
    if (empData) {
      let arr = empData?.userData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].user_name, value: arr[i].id});
      }
      setEmpNameArr(dropDownArr);
    }
  }, [empData]);

  useEffect(() => {
    if (empNameValue) {
      dispatch.user.getProfile({id: empNameValue, token});
      refresh();
    }
  }, [empNameValue]);

  useEffect(() => {
    if (positionReassignment.salaryReassign) {
      dispatch.positionReassignment.saveSalaryReassign(false);
      cancelBtn();
    }
  }, [positionReassignment.salaryReassign]);

  const refresh = () => {
    setSalaryValue('');
    setAmount('');
    setBasicPay('');
    setStartDate('');
  };

  const handleConfirm = date => {
    setStartDate(date);
    setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const cancelBtn = () => {
    navigation.navigate('Dashboard');
    setEmpNameValue('');
    refresh();
  };

  const submitBtn = () => {
    if (basicPay && startDate && amount && salaryValue) {
      setIsError(false);
      let data = {
        userId: empNameValue,
        salaryAdjustment: salaryValue,
        amount: parseFloat(amount),
        basicPay: parseFloat(basicPay),
        startDate: startDate,
      };

      dispatch.positionReassignment.setSalaryReassign({token, data});
    } else setIsError(true);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Salary Adjustment'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Select the employee you would like to adjust'}
          description2={'the salary for. Fill in the respective fields.'}
        />
        <View style={{paddingHorizontal: scale(8)}}>
          <PositionDetails
            isError={isError}
            openEmpName={openEmpName}
            empNameValue={empNameValue}
            empNameArr={empNameArr}
            setOpenEmpName={setOpenEmpName}
            setEmpNameValue={setEmpNameValue}
            setEmpNameArr={setEmpNameArr}
            openSalary={openSalary}
            salaryValue={salaryValue}
            salaryArr={salaryArr}
            setOpenSalary={setOpenSalary}
            setSalaryValue={setSalaryValue}
            setSalaryArr={setSalaryArr}
            setDatePickerVisibility={setDatePickerVisibility}
            startDate={startDate}
            currentBasicPay={currentBasicPay}
            amount={amount}
            setAmount={setAmount}
            basicPay={basicPay}
            setBasicPay={setBasicPay}
          />

          {empNameValue ? (
            <SaveCancelBtn
              cancelBtn={cancelBtn}
              submitBtn={submitBtn}
              label={'Save'}
              saveLoading={isPositionReassignmentLoading.setSalaryReassign}
            />
          ) : null}
        </View>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

export default SalaryAdjustment;
