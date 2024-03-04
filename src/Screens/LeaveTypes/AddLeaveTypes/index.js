import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';
import {dropDownData, gender} from '../../../dummyData';
import Validator from '../../../utility/validator';
import ApprovalGroupDetails from './ApprovalGroupDetails';

import styles from './style';

function AddLeaveTypes({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [serviceYears, setServiceYears] = useState('');
  const [companyValue, setCompanyValue] = useState('');
  const [entitledToValue, setEntitledToValue] = useState('');
  const [entitledNumber, setEntitledNumber] = useState('');
  const [openEntitledTo, setOpenEntitledTo] = useState(false);
  const [entitledToArr, setEntitledToArr] = useState(dropDownData);
  const [positionsValue, setPositionsValue] = useState('');
  const [openPositions, setOpenPositions] = useState(false);
  const [positionsArr, setPositionsArr] = useState(dropDownData);
  const [openEntitledFrom, setOpenEntitledFrom] = useState(false);
  const [entitledFromValue, setEntitledFromValue] = useState('');
  const [entitledFromArr, setEntitledFromArr] = useState(dropDownData);
  const [openGender, setOpenGender] = useState(false);
  const [genderValue, setGenderValue] = useState('');
  const [unusedLeaveDays, setUnusedLeaveDays] = useState('');
  const [genderArr, setGenderArr] = useState(gender);
  const [openOffboarding, setOpenOffboarding] = useState(false);
  const [offboardingValue, setOffboardingValue] = useState('');
  const [offboardingArr, setOffboardingArr] = useState(dropDownData);
  const [isNewEmployess, setIsNewEmployess] = useState(true);
  const [isExistingEmployess, setIsExistingEmployess] = useState(true);
  const [openEndYear, setOpenendYear] = useState(false);
  const [endYearValue, setendYearValue] = useState('');
  const [endYearArr, setendYearArr] = useState(dropDownData);
  const [openProrateBy, setOpenProrateBy] = useState(false);
  const [prorateByValue, setProrateByValue] = useState('');
  const [prorateByArr, setProrateByArr] = useState(dropDownData);
  const [openRoundingBy, setOpenRoundingBy] = useState(false);
  const [roundingByValue, setRoundingByValue] = useState('');
  const [roundingByArr, setRoundingByArr] = useState(dropDownData);
  const [openRoundingTo, setOpenRoundingTo] = useState(false);
  const [roundingToValue, setRoundingToValue] = useState('');
  const [roundingToArr, setRoundingToArr] = useState(dropDownData);
  const [isPaidLeave, setIsPaidLeave] = useState(true);
  const [isProrated, setIsProrated] = useState(true);
  const [isReasonRequired, setIsReasonRequired] = useState(true);
  const [isProofRequired, setIsProofRequired] = useState(true);
  const [companyArr, setCompanyArr] = useState('');
  const [positionArr, setPositionArr] = useState([]);
  const [rolloverMethod, setRolloverMethod] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUnpaid, setIsUnpaid] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isOffBoarding, setIsOffBoarding] = useState(false);
  const [departmentArr, setDepartmentArr] = useState('');
  const [positionValue, setPositionValue] = useState('');
  const [departmentValue, setDepartmentValue] = useState('');
  const [carryForwardNumber, setCarryForwardNumber] = useState('');
  const [enCashNumber, setEncashNumber] = useState('');
  const [employeeOffboardsDays, setEmployeeOffboardsDays] = useState('');
  const [employeeOffboardsEncash, setEmployeeOffboardsEncash] = useState('');

  const token = useSelector(state => state.session?.token);
  const companyData = useSelector(state => state.company?.companyData);
  const departmentData = useSelector(state => state.department?.getDepartment);
  const relationValue = useSelector(state => state.relationValue);
  const leaveTypeData = useSelector(state => state.leaveType);
  const isLeaveTypeLoading = useSelector(
    state => state.loading.effects.leaveType,
  );

  useEffect(() => {
    if (editData) {
      setDescription(editData?.leaveDesc);
      setServiceYears(editData?.noOfYrsRequired?.toString());
      setEntitledToValue(editData?.entitled_to);
      setEntitledToValue(editData?.entitled_to);
      setCompanyValue(editData?.companyId);
      setDepartmentValue(editData?.departmentId);
      setPositionValue(editData?.positionId);
      setIsNewEmployess(editData?.applyNewEmployee);
      setIsUnpaid(editData?.unpaid);
      setIsExistingEmployess(editData?.applyExistingEmployee);
      setEntitledFromValue(editData?.entitled_from);
      setRolloverMethod(editData?.rollover_method);
      setOffboardingValue(
        moment(editData?.offboard_method).format('YYYY-MM-DD'),
      );
      setGenderValue(editData?.gender);
      setIsPaidLeave(editData?.paid_leave);
      setIsProrated(editData?.prorated);
      setIsReasonRequired(editData?.reasonRequired);
      setIsProofRequired(editData?.proofRequired);
      setProrateByValue(editData?.prorateBy);
      setRoundingByValue(editData?.round_by);
      setRoundingToValue(editData?.round_to);
      setUnusedLeaveDays(editData?.unusedLeaveDaysEachYear);
      setEmployeeOffboardsDays(editData?.unusedLeaveDaysOffborads);
      setEncashNumber(editData?.noOfDaysEntitled?.toString());
      setEntitledNumber(editData?.noOfDaysEntitled?.toString());
      dispatch.relationValue.getDepartmentPosition({
        token,
        id: editData?.departmentId,
      });
      setCarryForwardNumber(editData?.maxCarryForward?.toString());
      setEncashNumber(editData?.maxEnCase?.toString());
      setEmployeeOffboardsEncash(editData?.offboardMaxEnCase?.toString());
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  useEffect(() => {
    dispatch.company.get({token});

    dispatch.department.department({token});
  }, []);

  useEffect(() => {
    if (companyData) {
      let arr = companyData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({label: arr[i].company_name, value: arr[i].id});
      }
      setCompanyArr(dropDownArr);
    }
  }, [companyData]);

  useEffect(() => {
    if (departmentData?.length > 0) {
      let arr = departmentData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].department, value: arr[i].id});
      }
      setDepartmentArr(dropDownArr);
    }
  }, [departmentData]);

  useEffect(() => {
    if (leaveTypeData.isAddLeaveType || leaveTypeData.isEditLeaveType) {
      dispatch.leaveType.setLeaveType(false);
      dispatch.leaveType.saveEditLeaveType(false);
      cancelBtn();
    }
  }, [leaveTypeData.isAddLeaveType || leaveTypeData.isEditLeaveType]);

  useEffect(() => {
    if (relationValue.positionValue) {
      let arr = relationValue.positionValue[0]?.positions;
      let orgArr = [];
      for (let i = 0; i < arr?.length; i++) {
        orgArr.push({label: arr[i].position, value: arr[i].id});
      }
      setPositionArr(orgArr);
    }
  }, [relationValue]);

  const handleConfirm = date => {
    if (isOffBoarding) {
      setOffboardingValue(date);
    } else {
      setServiceYears(date);
    }
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onDateBtnPress = () => {
    setDatePickerVisibility(true);
  };

  const onOffboardingPress = () => {
    setIsOffBoarding(true);
    setDatePickerVisibility(true);
  };

  const onSaveBtnPress = () => {
    const isEntitledValue =
      entitledToValue == 'Specific Positions'
        ? departmentValue != '' && positionValue != ''
        : true;
    const isEmployeeOffboardsDays =
      employeeOffboardsDays == 'Encash' ? employeeOffboardsEncash : true;
    const isUnusedLeaveDays =
      unusedLeaveDays == 'Carry Forward'
        ? Validator.validateOnlyNumber(carryForwardNumber)
        : unusedLeaveDays == 'Encash'
        ? Validator.validateOnlyNumber(enCashNumber)
        : true;

    if (
      Validator.validateTextInput(description) != '' &&
      Validator.validateAmount(serviceYears) != '' &&
      entitledToValue != '' &&
      isNewEmployess != '' &&
      isExistingEmployess != '' &&
      genderValue != '' &&
      prorateByValue != '' &&
      roundingByValue != '' &&
      Validator.validateAmount(entitledNumber) != '' &&
      unusedLeaveDays != '' &&
      roundingToValue != '' &&
      isEntitledValue &&
      isEmployeeOffboardsDays &&
      isUnusedLeaveDays
    ) {
      setIsError(false);

      const data = {
        leaveDesc: description,
        noOfYrsRequired: parseInt(serviceYears),
        entitled_to: entitledToValue,
        applyExistingEmployee: isExistingEmployess,
        applyNewEmployee: isNewEmployess,
        entitled_from: entitledFromValue,
        rollover_method: rolloverMethod,
        offboard_method: offboardingValue,
        gender: genderValue,
        paid_leave: isPaidLeave,
        prorated: isProrated,
        reasonRequired: isReasonRequired,
        proofRequired: isProofRequired,
        prorateBy: prorateByValue,
        round_by: roundingByValue,
        round_to: roundingToValue,
        noOfDaysEntitled: parseInt(entitledNumber),
        departmentId: departmentValue || null,
        positionId: positionValue || null,
        unusedLeaveDaysEachYear: unusedLeaveDays,
        maxCarryForward: parseInt(carryForwardNumber) || null,
        maxEnCase: parseInt(enCashNumber) || null,
        unusedLeaveDaysOffborads: employeeOffboardsDays,
        offboardMaxEnCase: parseInt(employeeOffboardsEncash) || null,
        unpaid: isUnpaid,
      };

      if (isEdit) {
        dispatch.leaveType.update({token, data, id: editData?.id});
      } else {
        dispatch.leaveType.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  const refresh = () => {
    setCompanyValue('');
    setDescription('');
    setServiceYears('');
    setEntitledFromValue('');
    setEntitledToValue('');
    setPositionsValue('');
    setIsNewEmployess(true);
    setIsExistingEmployess(true);
    setIsUnpaid(true);
    setendYearValue('');
    setOffboardingValue('');
    setGenderValue('');
    setIsPaidLeave(true);
    setIsProrated(true);
    setIsReasonRequired(true);
    setIsProofRequired(true);
    setProrateByValue('');
    setRoundingByValue('');
    setRoundingToValue('');
    setRolloverMethod('');
    setEntitledNumber('');
    setDepartmentValue('');
    setPositionValue('');
    setUnusedLeaveDays('');
    setCarryForwardNumber('');
    setEncashNumber('');
    setEmployeeOffboardsDays('');
    setEmployeeOffboardsEncash('');
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Leave Types'}
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
          description1={'Add leave types within the company here.'}
          description2={'Fill in the respective fields.'}
        />

        <ApprovalGroupDetails
          isError={isError}
          isView={isView}
          isModalVisible={isModalVisible}
          onPress={onDateBtnPress}
          setIsModalVisible={setIsModalVisible}
          setGroupName={setGroupName}
          companyData={companyArr}
          positionsData={positionArr}
          companyValue={companyValue}
          setCompanyValue={setCompanyValue}
          groupName={groupName}
          openEntitledTo={openEntitledTo}
          entitledToValue={entitledToValue}
          entitledToArr={entitledToArr}
          setOpenEntitledTo={setOpenEntitledTo}
          setEntitledToValue={setEntitledToValue}
          setEntitledToArr={setEntitledToArr}
          openPositions={openPositions}
          positionsValue={positionsValue}
          positionsArr={positionsArr}
          description={description}
          serviceYears={serviceYears}
          setServiceYears={setServiceYears}
          setDescription={setDescription}
          setOpenPositions={setOpenPositions}
          setPositionsValue={setPositionsValue}
          setPositionsArr={setPositionsArr}
          isNewEmployess={isNewEmployess}
          setIsNewEmployess={setIsNewEmployess}
          isExistingEmployess={isExistingEmployess}
          setIsExistingEmployess={setIsExistingEmployess}
          setEntitledFromArr={setEntitledFromArr}
          setEntitledFromValue={setEntitledFromValue}
          setOpenEntitledFrom={setOpenEntitledFrom}
          entitledFromArr={entitledFromArr}
          entitledFromValue={entitledFromValue}
          openEntitledFrom={openEntitledFrom}
          openOffboarding={openOffboarding}
          offboardingValue={offboardingValue}
          offboardingArr={offboardingArr}
          setOpenOffboarding={setOpenOffboarding}
          setOffboardingValue={setOffboardingValue}
          setOffboardingArr={setOffboardingArr}
          openGender={openGender}
          genderValue={genderValue}
          genderArr={genderArr}
          setOpenGender={setOpenGender}
          setGenderValue={setGenderValue}
          setGenderArr={setGenderArr}
          openEndYear={openEndYear}
          endYearValue={endYearValue}
          onOffboardingPress={onOffboardingPress}
          endYearArr={endYearArr}
          setOpenendYear={setOpenendYear}
          setendYearValue={setendYearValue}
          setendYearArr={setendYearArr}
          isPaidLeave={isPaidLeave}
          setIsPaidLeave={setIsPaidLeave}
          setIsProrated={setIsProrated}
          isProrated={isProrated}
          isReasonRequired={isReasonRequired}
          setIsReasonRequired={setIsReasonRequired}
          isProofRequired={isProofRequired}
          setIsProofRequired={setIsProofRequired}
          openProrateBy={openProrateBy}
          prorateByValue={prorateByValue}
          prorateByArr={prorateByArr}
          setOpenProrateBy={setOpenProrateBy}
          setProrateByValue={setProrateByValue}
          setProrateByArr={setProrateByArr}
          openRoundingBy={openRoundingBy}
          roundingByValue={roundingByValue}
          roundingByArr={roundingByArr}
          setOpenRoundingBy={setOpenRoundingBy}
          setRoundingByValue={setRoundingByValue}
          setRoundingByArr={setRoundingByArr}
          openRoundingTo={openRoundingTo}
          roundingToValue={roundingToValue}
          roundingToArr={roundingToArr}
          setOpenRoundingTo={setOpenRoundingTo}
          setRoundingToValue={setRoundingToValue}
          setRoundingToArr={setRoundingToArr}
          rolloverMethod={rolloverMethod}
          setRolloverMethod={setRolloverMethod}
          entitledNumber={entitledNumber}
          setEntitledNumber={setEntitledNumber}
          positionArr={positionArr}
          setPositionArr={setPositionArr}
          setDepartmentValue={setDepartmentValue}
          setDepartmentArr={setDepartmentArr}
          departmentValue={departmentValue}
          departmentArr={departmentArr}
          positionValue={positionValue}
          setPositionValue={setPositionValue}
          unusedLeaveDays={unusedLeaveDays}
          setUnusedLeaveDays={setUnusedLeaveDays}
          carryForwardNumber={carryForwardNumber}
          setCarryForwardNumber={setCarryForwardNumber}
          enCashNumber={enCashNumber}
          setEncashNumber={setEncashNumber}
          employeeOffboardsDays={employeeOffboardsDays}
          setEmployeeOffboardsDays={setEmployeeOffboardsDays}
          employeeOffboardsEncash={employeeOffboardsEncash}
          setEmployeeOffboardsEncash={setEmployeeOffboardsEncash}
          setIsUnpaid={setIsUnpaid}
          isUnpaid={isUnpaid}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : onSaveBtnPress}
          // label={'Save'}
          label={isEdit ? 'Update' : 'Submit'}
          saveLoading={isLeaveTypeLoading.add || isLeaveTypeLoading.update}
          isView={isView}
          isEdit={isEdit}
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

export default AddLeaveTypes;
