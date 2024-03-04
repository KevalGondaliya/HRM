import { SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Overtime from './Overtime';
import WorkingDays from './WorkingDays';
import PaymentDetails from './PaymentDetails';
import Header from '../../../component/Header';
import PaySchemeDetails from './PaySchemeDetails';
import EmploymentDetails from './EmploymentDetails';
import {
  currencyArrData,
  currencyDataArr,
  paymentMethodDataArr,
  payTypeDataArr,
  weekDay,
  weekDay1,
} from '../../../utility/constant';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import OnboardEmployees from '../../../component/OnboardEmployees';
import { booleanData, dropDownData, PaymentDetailsArr } from '../../../dummyData';

import styles from './style';

const EmpEmploymentDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const userId = route?.params?.id;
  const [isError, setIsError] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [organisationTypeValue, setOrganisationTypeValue] = useState('');
  const [openOrganisationType, setOpenOrganisationType] = useState(false);
  const [organisationTypeArr, setOrganisationTypeArr] = useState('');
  const [departmentValue, setDepartmentValue] = useState('');
  const [openDepartment, setOpenDepartment] = useState(false);
  const [departmentArr, setDepartmentArr] = useState('');
  const [positionValue, setPositionValue] = useState('');
  const [openPosition, setOpenPosition] = useState(false);
  const [positionArr, setPositionArr] = useState('');
  const [empId, setEmpId] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [openApprovalGroup, setOpenApprovalGroup] = useState(false);
  const [approvalGroupValue, setApprovalGroupValue] = useState('');
  const [approvalGroupArr, setApprovalGroupArr] = useState('');

  const [openPayslipTemplate, setOpenPayslipTemplate] = useState(false);
  const [payslipTemplateValue, setPayslipTemplateValue] = useState('');
  const [payslipTemplateArr, setPayslipTemplateArr] = useState([]);
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
  const [accountNumber, setAccountNumber] = useState('');
  const [detailArr, setDetailArr] = useState(PaymentDetailsArr);
  const [paymentMethodValue, setPaymentMethodValue] = useState('');
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [bankArr, setBankArr] = useState(dropDownData);
  const [paymentMethodArr, setPaymentMethodArr] =
    useState(paymentMethodDataArr);

  const [cardDayArr, setCardDayArr] = useState(weekDay);

  const [otRate, setOTRate] = useState('');
  const [openHasOvertime, setOpenHasOvertime] = useState(false);
  const [hasOvertimeValue, setHasOvertimeValue] = useState('');
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
  const token = useSelector(state => state.session?.token);
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const relationValue = useSelector(state => state.relationValue);
  const employeesInfo = useSelector(state => state.employees);
  const payslipTemplatesData = useSelector(
    state => state.payslipTemplates?.payslipTemplatesData,
  );
  const isPersonalLoading = useSelector(
    state => state.loading.effects.employees,
  );
  console.log("otStartFromValue", otStartFromValue);
  useEffect(() => {
    if (employeesInfo.onBoard?.status == 200) {
      dispatch.employees.saveOnBoard(null);
      setOrganisationTypeValue('');
      setDepartmentValue('');
      setPositionValue('');
      setEmpId('');
      setWorkEmail('');
      setApprovalGroupValue('');
      setHasOvertimeValue('');
      setProRatedValue('');
      setOTRate('');
      setOTStartFromValue('');
      setOTRateValue('');
      setOffDayOTRateValue('');
      setRestDayOTRateValue('');
      setHolidayOTRateValue('');
      setPaymentMethodValue('');
      setBank('');
      setAccountNumber('');
      setAmount('');
      setCardDayArr(weekDay1);
    }
  }, [employeesInfo]);

  useEffect(() => {
    // dispatch.organisations.getOrganisations({token});
    dispatch.payslipTemplates.get({ token });
  }, []);

  useEffect(() => {
    if (employeesInfo.jobInfo?.status == 200) {
      dispatch.employees.saveJob(null);
      navigation.navigate('OnboardDocument', { id: userId });
    }
  }, [employeesInfo]);

  useEffect(() => {
    if (organisationData) {
      let arr = organisationData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({ label: arr[i].org_name, value: arr[i].id });
      }
      setOrganisationTypeArr(dropDownArr);
    }
  }, [organisationData]);

  useEffect(() => {
    if (payslipTemplatesData) {
      let arr = payslipTemplatesData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({ label: arr[i].payslipTempName, value: arr[i].id });
      }

      setPayslipTemplateArr(dropDownArr);
    }
  }, [payslipTemplatesData]);

  useEffect(() => {
    if (relationValue.departmentValue) {
      let arr = relationValue?.departmentValue[0]?.departments;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({ label: arr[i].department, value: arr[i].id });
      }
      setDepartmentArr(dropDownArr);
    }

    if (relationValue.positionValue) {
      let arr = relationValue.positionValue[0]?.positions;
      let orgArr = [];
      for (let i = 0; i < arr.length; i++) {
        orgArr.push({ label: arr[i].position, value: arr[i].id });
      }
      setPositionArr(orgArr);
    }

    if (relationValue.approvalGroupValue) {
      let arr = relationValue.approvalGroupValue.approvalGroups;
      let orgArr = [];
      for (let i = 0; i < arr.length; i++) {
        orgArr.push({ label: arr[i].approvalGroupName, value: arr[i].id });
      }
      setApprovalGroupArr(orgArr);
    }
  }, [relationValue]);

  const handleConfirm = date => {
    setOTStartFromValue(date);
    setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const cancelBtn = () => {
    navigation.goBack();
  };

  const submitBtn = () => {
    const validation = cardDayArr.every(item => item.timeFrom && item.timeTo);

    if (
      organisationTypeValue &&
      departmentValue &&
      positionValue &&
      empId &&
      workEmail &&
      approvalGroupValue &&
      payslipTemplateValue &&
      payTypeValue &&
      currencyValue &&
      pay &&
      payAttendanceValue &&
      payslipTemplateValue &&
      payTypeValue &&
      accountNumber &&
      validation &&
      hasOvertimeValue &&
      proRatedValue &&
      otRate &&
      otStartFromValue &&
      otRateValue &&
      offDayOTRateValue &&
      restDayOTRateValue &&
      holidayOTRateValue &&
      paymentMethodValue &&
      bank
    ) {
      setIsError(false);
      let data = {
        employeement: {
          approvalGroupId: approvalGroupValue,
          organisationId: organisationTypeValue,
          departmentId: departmentValue,
          positionId: positionValue,
          empId: empId,
          work_email: workEmail,
        },
        payscheme: {
          payslipId: payslipTemplateValue,
          payType: payTypeValue,
          currency: currencyValue,
          basicPay: parseFloat(pay),
          payBasedAttendance: payAttendanceValue,
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
          otStartFrom: '10:00 am',
          normalOT: parseFloat(otRateValue),
          offOT: parseFloat(offDayOTRateValue),
          restOT: parseFloat(restDayOTRateValue),
          holidayOT: parseFloat(holidayOTRateValue),
        },
      };
      dispatch.employees.setJob({ token, data, id: userId });
    } else {
      setIsError(true);
    }
    // navigation.navigate('OnboardDocument');
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
        <OnboardEmployees index={2} />

        <EmploymentDetails
          isError={isError}
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
        />

        <PaySchemeDetails
          isError={isError}
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
        />

        <PaymentDetails
          isError={isError}
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
        />

        <Overtime
          isError={isError}
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
          submitBtn={submitBtn}
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmpEmploymentDetails;
