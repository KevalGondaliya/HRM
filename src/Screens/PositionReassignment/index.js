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

const PositionReassignment = ({navigation}) => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const [empNameValue, setEmpNameValue] = useState('');
  const [openEmpName, setOpenEmpName] = useState(false);
  const [empNameArr, setEmpNameArr] = useState([]);
  const [currentOrganisation, setCurrentOrganisation] = useState('');
  const [currentDepartment, setCurrentDepartment] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [currentBasicPay, setCurrentBasicPay] = useState('');
  const [currentEmploymentType, setCurrentEmploymentType] = useState('');
  const [organisationTypeValue, setOrganisationTypeValue] = useState('');
  const [openOrganisationType, setOpenOrganisationType] = useState(false);
  const [organisationTypeArr, setOrganisationTypeArr] = useState([]);
  const [departmentValue, setDepartmentValue] = useState('');
  const [openDepartment, setOpenDepartment] = useState(false);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [positionValue, setPositionValue] = useState('');
  const [openPosition, setOpenPosition] = useState(false);
  const [positionArr, setPositionArr] = useState([]);
  const [empId, setEmpId] = useState('');
  const [basicPay, setBasicPay] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [empTypeValue, setEmpTypeValue] = useState('');
  const [openEmpType, setOpenEmpType] = useState(false);
  const [empTypeArr, setEmpTypeArr] = useState(dropDownData);

  const empData = useSelector(state => state.employees);
  const token = useSelector(state => state.session?.token);
  const userDetails = useSelector(state => state.user?.userDetails);
  const relationValue = useSelector(state => state.relationValue);
  const positionReassignment = useSelector(state => state.positionReassignment);
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const departmentData = useSelector(state => state.department?.getDepartment);
  const isPositionReassignmentLoading = useSelector(
    state => state.loading.effects.positionReassignment,
  );
  useEffect(() => {
    dispatch.employees.get({token});
    dispatch.department.department({token});
    // dispatch.organisations.getOrganisations({token});
  }, []);

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
    if (positionReassignment.positionReassign) {
      dispatch.positionReassignment.savePositionReassign(false);
      cancelBtn();
    }
  }, [positionReassignment.positionReassign]);

  const refresh = () => {
    setCurrentOrganisation('');
    setCurrentDepartment('');
    setCurrentPosition('');
    setCurrentBasicPay('');
    setCurrentEmploymentType('');
    setOrganisationTypeValue('');
    setDepartmentValue('');
    setPositionValue('');
    setEmpTypeValue('');
    setBasicPay('');
    setStartDate('');
    setEmpId('');
  };

  useEffect(() => {
    setCurrentDepartment(userDetails?.employments[0]?.department?.department);
    setCurrentPosition(userDetails?.employments[0]?.position?.position);
    setCurrentBasicPay(userDetails?.paySchemes[0]?.basicPay);
    setCurrentEmploymentType(userDetails?.employments[0]?.empType);
    setEmpId(userDetails?.employments[0]?.empId);
  }, [userDetails]);

  useEffect(() => {
    if (organisationData) {
      let arr = organisationData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({label: arr[i].org_name, value: arr[i].id});
      }
      setOrganisationTypeArr(dropDownArr);
    }
  }, [organisationData]);

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
    setStartDate(date);
    setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const submitBtn = () => {
    if (
      departmentValue &&
      positionValue &&
      empId &&
      empTypeValue &&
      basicPay &&
      startDate
    ) {
      setIsError(false);
      let data = {
        userId: empNameValue,
        // organisationId: organisationTypeValue,
        departmentId: departmentValue,
        positionId: positionValue,
        empId: empId,
        empType: empTypeValue,
        basicPay: parseFloat(basicPay),
        startDate: startDate,
      };

      dispatch.positionReassignment.setPositionReassign({token, data});
    } else setIsError(true);
  };

  const cancelBtn = () => {
    navigation.navigate('Dashboard');
    setEmpNameValue('');
    refresh();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Position Reassignment'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Select the employee you would like to reassign'}
          description2={'the position for. Fill in the respective fields.'}
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
            currentOrganisation={currentOrganisation}
            currentDepartment={currentDepartment}
            currentPosition={currentPosition}
            currentBasicPay={currentBasicPay}
            currentEmploymentType={currentEmploymentType}
            openOrganisationType={openOrganisationType}
            organisationTypeValue={organisationTypeValue}
            organisationTypeArr={organisationTypeArr}
            setOpenOrganisationType={setOpenOrganisationType}
            setOrganisationTypeValue={setOrganisationTypeValue}
            setOrganisationTypeArr={setOrganisationTypeArr}
            openDepartment={openDepartment}
            departmentValue={departmentValue}
            departmentArr={departmentArr}
            setOpenDepartment={setOpenDepartment}
            setDepartmentValue={setDepartmentValue}
            setDepartmentArr={setDepartmentArr}
            openPosition={openPosition}
            positionValue={positionValue}
            positionArr={positionArr}
            setOpenPosition={setOpenPosition}
            setPositionValue={setPositionValue}
            setPositionArr={setPositionArr}
            setEmpId={setEmpId}
            empId={empId}
            openEmpType={openEmpType}
            empTypeValue={empTypeValue}
            empTypeArr={empTypeArr}
            setOpenEmpType={setOpenEmpType}
            setEmpTypeValue={setEmpTypeValue}
            setEmpTypeArr={setEmpTypeArr}
            setBasicPay={setBasicPay}
            basicPay={basicPay}
            setDatePickerVisibility={setDatePickerVisibility}
            startDate={startDate}
          />

          {empNameValue ? (
            <SaveCancelBtn
              cancelBtn={cancelBtn}
              submitBtn={submitBtn}
              label={'Save'}
              saveLoading={isPositionReassignmentLoading.setPositionReassign}
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

export default PositionReassignment;
