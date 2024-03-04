import React, {useState} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Leaves from './Leaves';
import Allowances from './Allowances';
import Header from '../../../component/Header';
import {booleanData, dropDownData} from '../../../dummyData';
import PropfileButton from '../../../component/PropfileButton';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {limitPeriodData} from '../../../utility/constant';

const Entitlements = ({route, navigation}) => {
  const dispatch = useDispatch();
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [allowanceIsModalVisible, setAllowanceIsModalVisible] = useState(false);
  const [dayEntitled, setDayEntitled] = useState('');
  const [leaveValue, setLeaveValue] = useState('');
  const [remaining, setRemaining] = useState('');

  const [isAllownceError, setIsAllownceError] = useState(false);
  const [openAllowance, setOpenAllowance] = useState(false);
  const [allowanceValue, setAllowanceValue] = useState('');
  const [allowanceArr, setAllowanceArr] = useState(dropDownData);
  const [openRecurring, setOpenRecurring] = useState(false);
  const [recurringValue, setRecurringValue] = useState('');
  const [recurringArr, setRecurringArr] = useState(booleanData);
  const [openRecurringPeriod, setOpenRecurringPeriod] = useState(false);
  const [recurringPeriodValue, setRecurringPeriodValue] = useState('');
  const [recurringPeriodArr, setRecurringPeriodArr] = useState(limitPeriodData);
  const [departmentCode, setDepartmentCode] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amount, setAmount] = useState('');
  const [dateType, setDateType] = useState('');
  const employeeProfile = useSelector(
    state => state.employeeProfile.personalInfo,
  );
  const token = useSelector(state => state.session?.token);
  const leaveData = useSelector(state => state.leave);
  const isLeaveDataLoading = useSelector(state => state.loading.effects.leave);
  const isAllowanceTypesLoading = useSelector(
    state => state.loading.effects.allowanceTypes,
  );
  const empDashboardData = useSelector(state => state.empDashboard);
  const allowanceTypesData = useSelector(state => state.allowanceTypes);

  useEffect(() => {
    dispatch.empDashboard.getEntitlesLeaveData({token});
    dispatch.empDashboard.getEntitlesAllownceData({token});
    dispatch.empDashboard.getEntitlesAllownceData({token});
    dispatch.allowanceTypes.get({token});
  }, []);

  useEffect(() => {
    if (allowanceTypesData?.allowanceTypesData) {
      let arr = allowanceTypesData?.allowanceTypesData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({label: arr[i].description, value: arr[i].id});
      }
      setAllowanceArr(dropDownArr);
    }
  }, [allowanceTypesData]);

  useEffect(() => {
    if (leaveData.leaveMessage || allowanceTypesData.allowanceData) {
      dispatch.leave.addLeave(null);
      dispatch.allowanceTypes.setAllowance(false);
      leaveCancleBtn();
    }
  }, [leaveData.leaveMessage, allowanceTypesData.allowanceData]);

  const handleConfirm = date => {
    switch (dateType) {
      case 'effectiveDate':
        setEffectiveDate(date);
        setDatePickerVisibility(false);
        break;

      case 'endDate':
        setEndDate(date);
        setDatePickerVisibility(false);
        break;
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const leaveSubmitBtn = () => {
    if (leaveValue && dayEntitled && remaining) {
      setIsError(false);
      let data = {
        LeaveTypeId: leaveValue,
        userId: editData?.id,
        entitlement: dayEntitled,
        remaining: parseFloat(remaining),
      };
      dispatch.leave.setAddLeaveType({
        token,
        data,
      });
    } else {
      setIsError(true);
    }
  };
  const leaveCancleBtn = () => {
    refesh();
    setIsModalVisible(false);
    setAllowanceIsModalVisible(false);
  };

  const refesh = () => {
    setLeaveValue('');
    setDayEntitled('');
    setRemaining('');
    setAllowanceValue('');
    setAmount('');
    setRecurringValue('');
    setRecurringPeriodValue('');
    setEffectiveDate('');
    setEndDate('');
  };

  const allownceSubmitPress = () => {
    if (
      allowanceValue &&
      amount &&
      recurringValue &&
      recurringPeriodValue &&
      effectiveDate &&
      endDate
    ) {
      setIsAllownceError(false);
      let data = {
        allowanceTypeId: allowanceValue,
        userId: editData?.id,
        amount: amount,
        recurring: recurringValue,
        reccuring_period: recurringPeriodValue,
        effective_date: effectiveDate,
        end_date: endDate,
      };
      dispatch.allowanceTypes.addAllowanceData({
        token,
        data,
      });
    } else {
      setIsAllownceError(true);
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={
          employeeProfile?.staff_personal_infos[0]?.firstName +
            ' ' +
            employeeProfile?.staff_personal_infos[0]?.lastName || ''
        }
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />

      <KeyboardAwareScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <View style={styles.userImageMainView}>
          <View style={styles.userImageView}>
            <Image
              source={
                employeeProfile?.staff_personal_infos[0]?.photo != null
                  ? {uri: employeeProfile?.staff_personal_infos[0]?.photo}
                  : require('../../../assets/placeholder.png')
              }
              style={styles.userImage}
            />
          </View>
        </View>

        <PropfileButton
          isEntitlements={true}
          employmentDetails={() => {
            navigation.navigate('AdminEmploymentDetails');
          }}
          documentBtnPress={() => {
            navigation.navigate('AdminDocuments');
          }}
          personalDeails={() => {
            navigation.navigate('AdminProfile');
          }}
        />

        <Leaves
          isError={isError}
          leaveValue={leaveValue}
          setLeaveValue={setLeaveValue}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          dayEntitled={dayEntitled}
          setDayEntitled={setDayEntitled}
          remaining={remaining}
          setRemaining={setRemaining}
          leaveSubmitBtn={leaveSubmitBtn}
          leaveCancleBtn={leaveCancleBtn}
          saveLoading={isLeaveDataLoading.setAddLeaveType}
          empDashboardData={empDashboardData?.entitlesLeaveData}
        />
        <Allowances
          openAllowance={openAllowance}
          allowanceValue={allowanceValue}
          allowanceArr={allowanceArr}
          setOpenAllowance={setOpenAllowance}
          setAllowanceValue={setAllowanceValue}
          setAllowanceArr={setAllowanceArr}
          setAmount={setAmount}
          amount={amount}
          departmentCode={departmentCode}
          setDepartmentCode={setDepartmentCode}
          openRecurring={openRecurring}
          recurringValue={recurringValue}
          recurringArr={recurringArr}
          setOpenRecurring={setOpenRecurring}
          setRecurringValue={setRecurringValue}
          setRecurringArr={setRecurringArr}
          openRecurringPeriod={openRecurringPeriod}
          recurringPeriodValue={recurringPeriodValue}
          recurringPeriodArr={recurringPeriodArr}
          setOpenRecurringPeriod={setOpenRecurringPeriod}
          setRecurringPeriodValue={setRecurringPeriodValue}
          setRecurringPeriodArr={setRecurringPeriodArr}
          effectiveDate={effectiveDate}
          endDate={endDate}
          onEffectiveBtnPress={() => {
            setDateType('effectiveDate');
            setDatePickerVisibility(true);
          }}
          onEndDateBtnPress={() => {
            setDateType('endDate');
            setDatePickerVisibility(true);
          }}
          allowanceIsModalVisible={allowanceIsModalVisible}
          setAllowanceIsModalVisible={setAllowanceIsModalVisible}
          submitBtnPress={allownceSubmitPress}
          empDashboardData={empDashboardData?.entitlesAllowncesData}
          isError={isAllownceError}
          isAllowanceTypesLoading={isAllowanceTypesLoading?.addAllowanceData}
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

export default Entitlements;
