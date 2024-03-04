import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../../component/Header';
import PropfileButton from '../../../component/PropfileButton';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import {
  PaymentDetailsArr,
  booleanData,
  dropDownData,
  empStatusArr,
  jobPositions,
} from '../../../dummyData';
import {
  currencyArrData,
  payTypeDataArr,
  paymentMethodDataArr,
  weekDay,
  weekDay1,
} from '../../../utility/constant';
import Validator from '../../../utility/validator';
import EmploymentDetails from './EmploymentDetails';
import JobPositions from './JobPositions';
import Overtime from './Overtime';
import PaySchemeDetails from './PaySchemeDetails';
import PaymentDetails from './PaymentDetails';
import WorkingDays from './WorkingDays';

import styles from './style';

const EmpEmploymentDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;

  const [isError, setIsError] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [organisationTypeValue, setOrganisationTypeValue] = useState('');
  const [openOrganisationType, setOpenOrganisationType] = useState(false);
  const [organisationTypeArr, setOrganisationTypeArr] = useState(dropDownData);
  const [empStatus, setEmpStatus] = useState(empStatusArr);

  const [departmentValue, setDepartmentValue] = useState('');
  const [openDepartment, setOpenDepartment] = useState(false);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [positionValue, setPositionValue] = useState('');
  const [openPosition, setOpenPosition] = useState(false);
  const [positionArr, setPositionArr] = useState([]);
  const [empId, setEmpId] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [openApprovalGroup, setOpenApprovalGroup] = useState(false);
  const [approvalGroupValue, setApprovalGroupValue] = useState('');
  const [approvalGroupArr, setApprovalGroupArr] = useState([]);

  const [openPayslipTemplate, setOpenPayslipTemplate] = useState(false);
  const [payslipTemplateValue, setPayslipTemplateValue] = useState('');
  const [payslipTemplateArr, setPayslipTemplateArr] = useState(booleanData);
  const [openPayType, setOpenPayType] = useState(false);
  const [payTypeValue, setPayTypeValue] = useState('');
  const [payTypeArr, setPayTypeArr] = useState(payTypeDataArr);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [currencyValue, setCurrencyValue] = useState('');
  const [currencyArr, setCurrencyArr] = useState(currencyArrData);
  const [openPayAttendance, setOpenPayAttendance] = useState(false);
  const [payAttendanceValue, setPayAttendanceValue] = useState('');
  const [payAttendanceArr, setPayAttendanceArr] = useState(booleanData);
  const [pay, setPay] = useState('');
  const [empTypeValue, setEmpTypeValue] = useState('');
  const [empStatusValue, setEmpStatusValue] = useState('');
  const [empStartDate, setEmpStartDate] = useState('');
  const [cardDayArr, setCardDayArr] = useState(weekDay);
  const [cpfEmpl, setCpfEmpl] = useState('');
  const [cpfEmployer, setCpfEmployer] = useState('');
  const [isEmpDatePickerVisible, setEmpDatePickerVisibility] = useState(false);

  const [accountNumber, setAccountNumber] = useState('');
  const [detailArr, setDetailArr] = useState(PaymentDetailsArr);
  const [paymentMethodValue, setPaymentMethodValue] = useState('');
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [bankArr, setBankArr] = useState(dropDownData);
  const [paymentMethodArr, setPaymentMethodArr] =
    useState(paymentMethodDataArr);
  const [icNumber, setIcNumber] = useState('');
  const [otRate, setOTRate] = useState('');
  const [openHasOvertime, setOpenHasOvertime] = useState(false);
  const [hasOvertimeValue, setHasOvertimeValue] = useState('');
  const [workingHourValue, setWorkingHourValue] = useState('');
  const [hasOvertimeArr, setHasOvertimeArr] = useState(booleanData);
  const [openProRated, setOpenProRated] = useState(false);
  const [proRatedValue, setProRatedValue] = useState('');
  const [proRatedArr, setProRatedArr] = useState(booleanData);
  const [openOTStartFrom, setOpenOTStartFrom] = useState(false);
  const [otStartFromValue, setOTStartFromValue] = useState('');
  const [otStartFromArr, setOTStartFromArr] = useState(dropDownData);
  const [openOTRate, setOpenOTRate] = useState(false);
  const [otRateValue, setOTRateValue] = useState('');
  const [otRateArr, setOTRateArr] = useState(dropDownData);
  const [openOffDayOTRate, setOpenOffDayOTRate] = useState(false);
  const [offDayOTRateValue, setOffDayOTRateValue] = useState('');
  const [offDayOTRateArr, setOffDayOTRateArr] = useState(dropDownData);
  const [openRestDayOTRate, setOpenRestDayOTRate] = useState(false);
  const [restDayOTRateValue, setRestDayOTRateValue] = useState('');
  const [restDayOTRateArr, setRestDayOTRateArr] = useState(dropDownData);
  const [openHolidayOTRate, setOpenHolidayOTRate] = useState(false);
  const [holidayOTRateValue, setHolidayOTRateValue] = useState('');
  const [holidayOTRateArr, setHolidayOTRateArr] = useState(dropDownData);
  const [empEndDate, setEmpEndDate] = useState('');
  const relationValue = useSelector(state => state.relationValue);
  const [isEmployeeId, setIsEmployeeId] = useState(false);
  const employeeProfile = useSelector(
    state => state.employeeProfile.personalInfo,
  );
  const [empStartDateType, setEmpStartDateType] = useState('');
  const token = useSelector(state => state.session?.token);
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const payslipTemplatesData = useSelector(
    state => state.payslipTemplates?.payslipTemplatesData,
  );
  const user = useSelector(state => state.session?.user);
  const isPersonalLoading = useSelector(
    state => state.loading.effects.employees,
  );
  const departmentData = useSelector(state => state.department?.getDepartment);
  const approvalData = useSelector(
    state => state.approvalGroups?.approvalGroupsData,
  );
  const employeesInfo = useSelector(state => state.employees);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    dispatch.employeeProfile.getPersonalInfo({
      token,
      id: user?.id,
    });
  };

  useEffect(() => {
    if (employeesInfo.jobInfo?.status == 200) {
      dispatch.employees.saveJob(null);
      navigation.navigate('EmpDocuments', {data: editData});
    }
  }, [employeesInfo]);

  useEffect(() => {
    // dispatch.organisations.getOrganisations({token});
    dispatch.department.department({token});
    dispatch.approvalGroups.get({token});
    dispatch.payslipTemplates.get({token});
  }, []);

  useEffect(() => {
    if (organisationData) {
      let arr = organisationData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
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

    if (approvalData?.length > 0) {
      let arr = approvalData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].approvalGroupName, value: arr[i].id});
      }
      setApprovalGroupArr(dropDownArr);
    }
  }, [departmentData, approvalData]);

  useEffect(() => {
    if (payslipTemplatesData) {
      let arr = payslipTemplatesData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].payslipTempName, value: arr[i].id});
      }

      setPayslipTemplateArr(dropDownArr);
    }
  }, [payslipTemplatesData]);

  useEffect(() => {
    if (employeeProfile) {
      let data = employeeProfile;
      console.log('data?.employments[0]?.empStatus', data?.employments);
      // setOrganisationTypeValue(data?.employments[0]?.organisationId || '');
      setDepartmentValue(data?.employments[0]?.departmentId || '');
      setPositionValue(data?.employments[0]?.positionId || '');
      setEmpTypeValue(data?.employments[0]?.empType);
      setWorkingHourValue(data?.employments[0]?.workingHrsType);
      setEmpStatusValue(data?.employments[0]?.empStatus);
      setEmpStartDate(data?.employments[0]?.emp_start_date);
      setEmpEndDate(data?.employments[0]?.emp_end_date);
      setEmpId(data?.employments[0]?.empId || '');
      setWorkEmail(data?.employments[0]?.work_email || '');
      setApprovalGroupValue(data?.employments[0]?.approvalGroupId || '');
      setPayslipTemplateValue(data?.paySchemes[0]?.payslipId || '');
      setPayTypeValue(data?.paySchemes[0]?.payType || '');
      setCurrencyValue(data?.paySchemes[0]?.currency || '');
      setPay(data?.paySchemes[0]?.basicPay?.toString() || '');
      setPayAttendanceValue(
        data?.paySchemes[0]?.payBasedAttendance?.toString() || '',
      );
      setHasOvertimeValue(data?.overtimes[0]?.hasOT?.toString() || '');
      setProRatedValue(data?.overtimes[0]?.prorate?.toString() || '');
      setOTRate(data?.overtimes[0]?.otRate?.toString() || '');
      setOTStartFromValue(data?.overtimes[0]?.otStartFrom || '');
      setOTRateValue(data?.overtimes[0]?.normalOT?.toString() || '');
      setOffDayOTRateValue(data?.overtimes[0]?.offOT?.toString() || '');
      setRestDayOTRateValue(data?.overtimes[0]?.restOT?.toString() || '');
      setHolidayOTRateValue(data?.overtimes[0]?.holidayOT?.toString() || '');
      // setApprovalGroupValue(data?.employments[0]?.approvalGroupId || '');
      if (data?.employments[0]?.departmentId) {
        dispatch.relationValue.getDepartmentPosition({
          token,
          id: data?.employments[0]?.departmentId,
        });
      }
      setCpfEmpl(data?.paySchemes[0]?.cpf_emp?.toString() || '');
      setCpfEmployer(data?.paySchemes[0]?.cpf_empyer?.toString() || '');
      setAmount(data?.paymemts[0]?.cpf_empyer?.toString() || '');
      setIcNumber(data?.paySchemes[0]?.icNo || '');
      setIsEmployeeId(data?.employments?.[0]?.empId ? true : false);

      let arr = [];

      if (data?.workingDays[0]?.monday) {
        arr.push(JSON.parse(data?.workingDays[0]?.monday));

        arr.push(JSON.parse(data?.workingDays[0]?.tuesday));

        arr.push(JSON.parse(data?.workingDays[0]?.wednesday));

        arr.push(JSON.parse(data?.workingDays[0]?.thursday));

        arr.push(JSON.parse(data?.workingDays[0]?.friday));
        setCardDayArr(arr);
      } else {
        setCardDayArr(weekDay1);
      }
      let arrPayment = [];

      arrPayment.push({
        label:
          'Opt out from Chinese Development Assistance Council (CDAC) scheme',
        isCheck: data?.paymemts[0]?.cdacOptOut || false,
      });
      arrPayment.push({
        label:
          'Set a fixed Chinese Development Assistance Council (CDAC) amount',
        isCheck: data?.paymemts[0]?.setCdacAmt || false,
      });
      arrPayment.push({
        label: 'Opt in to Community Chest contributions',
        isCheck: data?.paymemts[0]?.communityChestOptIn || false,
      });
      arrPayment.push({
        label: 'Exclude from Skills Development Levy (SDL)',
        isCheck: data?.paymemts[0]?.SDL || false,
      });
      arrPayment.push({
        label: 'Exclude from IRAS Auto-Inclusion Scheme (AIS)',
        isCheck: data?.paymemts[0]?.irasAIS || false,
      });
      // arrPayment.push({
      //   label: 'Exclude from Central Provident Fund (CPF) contributions',
      //   isCheck: data?.paymemts[0]?.cpfContribution || false,
      // });
      // arrPayment.push({
      //   label: 'Allow Full Employer CPF',
      //   isCheck: data?.paymemts[0]?.fullEmployerCPF || false,
      // });

      setDetailArr(arrPayment);

      setPaymentMethodValue(data?.paymemts[0]?.payMethod || '');
      setBank(data?.paymemts[0]?.bank || '');
      setAccountNumber(data?.paymemts[0]?.bankAccNo || '');
      onBasicPayChange(data?.paySchemes[0]?.basicPay?.toString() || '');
    }
  }, [employeeProfile]);

  const onBasicPayChange = e => {
    let data = employeeProfile;
    setPay(e);
    let text = e ? parseInt(e) : '';
    let monthPay = text;
    let employeeCPF = text != '' ? (text < 6000 ? 1000 : 1200) : 0;
    let employerCPF = text != '' ? (text < 6000 ? 1000 : 1020) : 0;
    var cadcValue = 0;
    if (data?.staff_personal_infos[0]?.race === 'Chinese') {
      if (text < 2000) cadcValue = 0.5;
      else if (text >= 2000 && text < 3500) cadcValue = 1.0;
      else if (text >= 3500 && text < 5000) cadcValue = 1.5;
      else if (text >= 5000 && text < 7500) cadcValue = 2.0;
      else if (text >= 7500) cadcValue = 3.0;
    }
    if (data?.staff_personal_infos[0]?.race === 'Eurasian') {
      if (text < 1000) cadcValue = 2.0;
      else if (text >= 1000 && text < 1500) cadcValue = 4.0;
      else if (text >= 1500 && text < 2500) cadcValue = 6.0;
      else if (text >= 2500 && text < 4000) cadcValue = 9.0;
      else if (text >= 4000 && text < 7000) cadcValue = 12.0;
      else if (text >= 7000 && text < 10000) cadcValue = 16.0;
      else if (text >= 10000) cadcValue = 20.0;
    }
    if (data?.staff_personal_infos[0]?.race === 'Malay') {
      if (text < 1000) cadcValue = 3.0;
      else if (text >= 1000 && text < 2000) cadcValue = 4.5;
      else if (text >= 2000 && text < 3000) cadcValue = 6.5;
      else if (text >= 3000 && text < 4000) cadcValue = 15.0;
      else if (text >= 4000 && text < 6000) cadcValue = 19.5;
      else if (text >= 6000 && text < 8000) cadcValue = 22.0;
      else if (text >= 8000 && text < 10000) cadcValue = 24.0;
      else if (text >= 10000) cadcValue = 26.0;
    }
    if (data?.staff_personal_infos[0]?.race === 'Indian') {
      if (text < 1000) cadcValue = 1.0;
      else if (text >= 1000 && text < 1500) cadcValue = 3.0;
      else if (text >= 1500 && text < 2500) cadcValue = 5.0;
      else if (text >= 2500 && text < 4500) cadcValue = 7.0;
      else if (text >= 4500 && text < 7500) cadcValue = 9.0;
      else if (text >= 7500 && text < 10000) cadcValue = 12.0;
      else if (text >= 10000 && text < 15000) cadcValue = 18.0;
      else if (text >= 15000) cadcValue = 30.0;
    }
    setCpfEmpl(employeeCPF);
    setCpfEmployer(employerCPF);
    setAmount(cadcValue);
  };

  const handleEmpStrtDate = val => {
    setEmpDatePickerVisibility(true);
    setEmpStartDateType(val);
  };

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

  useEffect(() => {
    getUserData();
  }, [isFocused]);

  const handleConfirm = date => {
    setOTStartFromValue(date);
    setDatePickerVisibility(false);
  };

  const handleStartDateConfirm = date => {
    switch (empStartDateType) {
      case 'startDate':
        setEmpStartDate(date);
        break;
      case 'endDate':
        setEmpEndDate(date);
        break;
    }

    setEmpDatePickerVisibility(false);
  };

  const hideDateStartDatePicker = () => {
    setEmpDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const cancelBtn = () => {
    navigation.goBack();
  };

  const submitBtn = () => {
    // const validation = cardDayArr.every(item => item?.timeFrom && item?.timeTo);
    if (
      // organisationTypeValue &&
      departmentValue &&
      positionValue &&
      empId &&
      Validator.validateEmail(workEmail) &&
      approvalGroupValue &&
      empTypeValue &&
      payslipTemplateValue &&
      payTypeValue &&
      currencyValue &&
      Validator.validateAmount(pay) &&
      payAttendanceValue &&
      payslipTemplateValue &&
      payTypeValue &&
      Validator.validateAlphabate(accountNumber) &&
      // validation &&
      hasOvertimeValue &&
      proRatedValue &&
      Validator.validateAmount(otRate) &&
      otStartFromValue &&
      Validator.validateAmount(otRateValue) &&
      Validator.validateAmount(offDayOTRateValue) &&
      Validator.validateAmount(restDayOTRateValue) &&
      Validator.validateAmount(holidayOTRateValue) &&
      paymentMethodValue &&
      Validator.validateAlphabate(bank) &&
      empEndDate &&
      empStatusValue
    ) {
      setIsError(false);
      let data = {
        employeement: {
          approvalGroupId: approvalGroupValue,
          // organisationId: organisationTypeValue,
          departmentId: departmentValue,
          positionId: positionValue,
          empId: empId,
          work_email: workEmail,
          empType: empTypeValue,
          emp_start_date: empStartDate,
          emp_end_date: empEndDate,
          empStatus: empStatusValue,
          workingHrsType: workingHourValue,
        },
        payscheme: {
          payslipId: payslipTemplateValue,
          payType: payTypeValue,
          currency: currencyValue,
          basicPay: parseFloat(pay),
          monthlyPay: parseFloat(pay),
          payBasedAttendance: payAttendanceValue,
          ICnumber: icNumber,
          cpfEmployee: cpfEmpl,
          cpfemployer: cpfEmployer,
        },
        payment: {
          payMethod: paymentMethodValue,
          bank: bank,
          bankAccNo: accountNumber,
          cdacAmt: parseFloat(amount),
          cdacOptOut: detailArr[0].isCheck,
          setCdacAmt: detailArr[1].isCheck,
          communityChestOptIn: detailArr[2].isCheck,
          SDL: detailArr[3].isCheck,
          irasAIS: detailArr[4].isCheck,
          cpfContribution: detailArr[5].isCheck,
          fullEmployerCPF: detailArr[6].isCheck,
        },
        workingDay: {
          monday: JSON.stringify(cardDayArr[0]),
          tuesday: JSON.stringify(cardDayArr[1]),
          wednesday: JSON.stringify(cardDayArr[2]),
          thursday: JSON.stringify(cardDayArr[3]),
          friday: JSON.stringify(cardDayArr[4]),
        },
        overtime: {
          hasOT: hasOvertimeValue,
          prorate: proRatedValue,
          otRate: parseFloat(otRate),
          otStartFrom: otStartFromValue,
          normalOT: parseFloat(otRateValue),
          offOT: parseFloat(offDayOTRateValue),
          restOT: parseFloat(restDayOTRateValue),
          holidayOT: parseFloat(holidayOTRateValue),
        },
      };

      dispatch.employees.setJob({token, data, id: user?.id});
    } else {
      setIsError(true);
    }
    console.log(validation, isError);
    // navigation.navigate('OnboardDocument');
  };
  console.log('---*-*-*employeeProfile', employeeProfile);
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
          isEmpDetails={true}
          documentBtnPress={() => {
            navigation.navigate('EmpDocuments');
          }}
          personalDeails={() => {
            navigation.navigate('EmpProfile');
          }}
          entitlementsBtnPress={() => {
            navigation.navigate('EmpEntitlements');
          }}
        />

        <EmploymentDetails
          isError={isError}
          isView={isView}
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
          setWorkEmail={setWorkEmail}
          workEmail={workEmail}
          openApprovalGroup={openApprovalGroup}
          approvalGroupValue={approvalGroupValue}
          approvalGroupArr={approvalGroupArr}
          setOpenApprovalGroup={setOpenApprovalGroup}
          setApprovalGroupValue={setApprovalGroupValue}
          setApprovalGroupArr={setApprovalGroupArr}
          empTypeValue={empTypeValue}
          setEmpTypeValue={setEmpTypeValue}
          setEmpStartDate={setEmpStartDate}
          onStartBtnPress={() => {
            setEmpDatePickerVisibility(true);
          }}
          empStartDate={empStartDate}
          setWorkingHourValue={setWorkingHourValue}
          workingHourValue={workingHourValue}
          setEmpStatusValue={setEmpStatusValue}
          empStatusValue={empStatusValue}
          isEmployeeId={isEmployeeId}
          empEndDate={empEndDate}
          handleEmpStrtDate={() => handleEmpStrtDate('startDate')}
          handleEmpEndDate={() => handleEmpStrtDate('endDate')}
          setEmpStartDateType={setEmpStartDateType}
        />

        <PaySchemeDetails
          isError={isError}
          isView={isView}
          openPayslipTemplate={openPayslipTemplate}
          payslipTemplateValue={payslipTemplateValue}
          payslipTemplateArr={payslipTemplateArr}
          setOpenPayslipTemplate={setOpenPayslipTemplate}
          setPayslipTemplateValue={setPayslipTemplateValue}
          setPayslipTemplateArr={setPayslipTemplateArr}
          openPayType={openPayType}
          payTypeValue={payTypeValue}
          payTypeArr={payTypeArr}
          setOpenPayType={setOpenPayType}
          setPayTypeValue={setPayTypeValue}
          setPayTypeArr={setPayTypeArr}
          openCurrency={openCurrency}
          currencyValue={currencyValue}
          currencyArr={currencyArr}
          setOpenCurrency={setOpenCurrency}
          setCurrencyValue={setCurrencyValue}
          setCurrencyArr={setCurrencyArr}
          setPay={setPay}
          pay={pay}
          openPayAttendance={openPayAttendance}
          payAttendanceValue={payAttendanceValue}
          payAttendanceArr={payAttendanceArr}
          setOpenPayAttendance={setOpenPayAttendance}
          setPayAttendanceValue={setPayAttendanceValue}
          setPayAttendanceArr={setPayAttendanceArr}
          cpfEmpl={cpfEmpl}
          setCpfEmpl={setCpfEmpl}
          cpfEmployer={cpfEmployer}
          setCpfEmployer={setCpfEmployer}
          icNumber={icNumber}
          setIcNumber={setIcNumber}
        />

        <JobPositions data={jobPositions} isView={isView} />
        <PaymentDetails
          isError={isError}
          isView={isView}
          openPayslipTemplate={openPayslipTemplate}
          payslipTemplateValue={payslipTemplateValue}
          payslipTemplateArr={payslipTemplateArr}
          setOpenPayslipTemplate={setOpenPayslipTemplate}
          setPayslipTemplateValue={setPayslipTemplateValue}
          setPayslipTemplateArr={setPayslipTemplateArr}
          openPayType={openPayType}
          payTypeValue={payTypeValue}
          payTypeArr={payTypeArr}
          setOpenPayType={setOpenPayType}
          setPayTypeValue={setPayTypeValue}
          setPayTypeArr={setPayTypeArr}
          openCurrency={openCurrency}
          currencyValue={currencyValue}
          currencyArr={currencyArr}
          setOpenCurrency={setOpenCurrency}
          setCurrencyValue={setCurrencyValue}
          setCurrencyArr={setCurrencyArr}
          setPay={setPay}
          pay={pay}
          openPayAttendance={openPayAttendance}
          payAttendanceValue={payAttendanceValue}
          payAttendanceArr={payAttendanceArr}
          setOpenPayAttendance={setOpenPayAttendance}
          setPayAttendanceValue={setPayAttendanceValue}
          setPayAttendanceArr={setPayAttendanceArr}
          detailArr={detailArr}
          setDetailArr={setDetailArr}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          paymentMethodValue={paymentMethodValue}
          setPaymentMethodValue={setPaymentMethodValue}
          paymentMethodArr={paymentMethodArr}
          amount={amount}
          setAmount={setAmount}
          bank={bank}
          setBank={setBank}
          bankArr={bankArr}
        />

        <WorkingDays
          setCardDayArr={setCardDayArr}
          cardDayArr={cardDayArr}
          isError={isError}
          isView={isView}
        />

        <Overtime
          isError={isError}
          isView={isView}
          openHasOvertime={openHasOvertime}
          hasOvertimeValue={hasOvertimeValue}
          hasOvertimeArr={hasOvertimeArr}
          setOpenHasOvertime={setOpenHasOvertime}
          setHasOvertimeValue={setHasOvertimeValue}
          setHasOvertimeArr={setHasOvertimeArr}
          openProRated={openProRated}
          proRatedValue={proRatedValue}
          proRatedArr={proRatedArr}
          setOpenProRated={setOpenProRated}
          setProRatedValue={setProRatedValue}
          setProRatedArr={setProRatedArr}
          setOTRate={setOTRate}
          otRate={otRate}
          openOTStartFrom={openOTStartFrom}
          otStartFromValue={otStartFromValue}
          otStartFromArr={otStartFromArr}
          setOpenOTStartFrom={setOpenOTStartFrom}
          setOTStartFromValue={setOTStartFromValue}
          setOTStartFromArr={setOTStartFromArr}
          openOTRate={openOTRate}
          otRateValue={otRateValue}
          otRateArr={otRateArr}
          setOpenOTRate={setOpenOTRate}
          setOTRateValue={setOTRateValue}
          setOTRateArr={setOTRateArr}
          openOffDayOTRate={openOffDayOTRate}
          offDayOTRateValue={offDayOTRateValue}
          offDayOTRateArr={offDayOTRateArr}
          setOpenOffDayOTRate={setOpenOffDayOTRate}
          setOffDayOTRateValue={setOffDayOTRateValue}
          setOffDayOTRateArr={setOffDayOTRateArr}
          openRestDayOTRate={openRestDayOTRate}
          restDayOTRateValue={restDayOTRateValue}
          restDayOTRateArr={restDayOTRateArr}
          setOpenRestDayOTRate={setOpenRestDayOTRate}
          setRestDayOTRateValue={setRestDayOTRateValue}
          setRestDayOTRateArr={setRestDayOTRateArr}
          openHolidayOTRate={openHolidayOTRate}
          holidayOTRateValue={holidayOTRateValue}
          holidayOTRateArr={holidayOTRateArr}
          setOpenHolidayOTRate={setOpenHolidayOTRate}
          setHolidayOTRateValue={setHolidayOTRateValue}
          setHolidayOTRateArr={setHolidayOTRateArr}
          onPress={() => {
            setDatePickerVisibility(true);
          }}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : submitBtn}
          label={'Next'}
          cancelLabel={'Back'}
          saveLoading={isPersonalLoading.setJob}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <DateTimePickerModal
          isVisible={isEmpDatePickerVisible}
          mode="date"
          onConfirm={handleStartDateConfirm}
          onCancel={hideDateStartDatePicker}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmpEmploymentDetails;
