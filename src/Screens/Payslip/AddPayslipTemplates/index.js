import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import TemplateHeader from './Header';
import PaymentHeader from './PaymentHeader';
import Header from '../../../component/Header';
import TemplateDetails from './TemplateDetails';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import Validator from '../../../utility/validator';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import {log} from 'react-native-reanimated';
import {payslipHeaderTbData, payslipHeaderTbData1} from '../../../dummyData';

function AddPayslipTemplates({route, navigation}) {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const salary = 15000;
  const bounus = 1500;
  const overtime = 1500;
  const allowances = 2000;
  const [dob, setDob] = useState('');
  const [count, setCount] = useState(0);
  // const [icNumber, setICNumber] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [positions, setPositions] = useState('');
  const [department, setDepartment] = useState('');
  const [countryName, setCountryName] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [countryModal, setCountryModal] = useState(false);
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [companyArr, setCompanyArr] = useState([]);
  const [companyValue, setCompanyValue] = useState('');
  const [organisationArr, setOrganisationArr] = useState([]);
  const [positionArr, setPositionArr] = useState([]);
  const [departmentArr, setDepartmentArr] = useState('');
  const [basicSalary, setBasicSalary] = useState(false);
  const [grossSalary, setGrossSalary] = useState(false);
  const [cpfDeductions, setCpfDeductions] = useState(false);
  const [employerCPF, setEmployerCPF] = useState(false);
  const [bonus, setBonus] = useState(false);
  const [isAllowances, setIsAllowances] = useState(false);
  const [claims, setClaims] = useState(false);
  const [deductions, setDeductions] = useState(false);
  const [leaveBreakdown, setLeaveBreakdown] = useState(false);
  const [overtimeBreakdown, setOvertimeBreakdown] = useState(false);
  const [CdacMbmfSinda, setCdacMbmfSinda] = useState(false);
  const [employeeArr, setEmployeeArr] = useState([]);
  const [headerLabelArr, setHeaderLabelArr] = useState(payslipHeaderTbData);

  const token = useSelector(state => state.session?.token);
  const companyData = useSelector(state => state.company?.companyData);
  // const organisationData = useSelector(state => state.organisations?.viewOrg);
  const departmentData = useSelector(state => state.department?.getDepartment);
  const relationValue = useSelector(state => state.relationValue);
  const payslipTemplatesData = useSelector(state => state.payslipTemplates);
  const userData = useSelector(state => state.employees);
  const isLoading = useSelector(
    state => state.loading.effects.payslipTemplates,
  );

  useEffect(() => {
    dispatch.company.get({token});
    dispatch.position.get({token});
    dispatch.department.department({token});
    dispatch.employees.get({token});
    setHeaderLabelArr(payslipHeaderTbData1);
  }, []);

  useEffect(() => {
    if (editData) {
      setCompanyValue(editData?.companyId || '');
      setTemplateName(editData?.payslipTempName || '');
      setCountryName(editData?.country || '');
      setEmployeeName(editData?.user?.id || '');
      setEmployeeNumber(editData?.identity_no || '');
      setDob(editData?.createdAt || '');
      setHireDate(editData?.empHireDate);
      setDepartment(editData?.department?.id || null);
      setPositions(editData?.positionId || null);
      setBasicSalary(editData?.basicSalary);
      setGrossSalary(editData?.grossSalary);
      setCpfDeductions(editData?.cpfDeductions);
      setBonus(editData?.bonus);
      setIsAllowances(editData?.allowances);
      setClaims(editData?.claims);
      setDeductions(editData?.deductions);
      setCdacMbmfSinda(editData?.CdacMbmfSinda);
      setLeaveBreakdown(editData?.leaveBreakdown);
      setOvertimeBreakdown(editData?.overtimeBreakdown);
      setEmployerCPF(editData?.employerCPF);

      dispatch.relationValue.getDepartmentPosition({
        token,
        id: editData?.departmentId,
      });
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  useEffect(() => {
    if (companyData?.length > 0) {
      let arr = companyData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
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
    if (
      payslipTemplatesData.isAddPayslipTemplates ||
      payslipTemplatesData.isEditPayslipTemplates
    ) {
      dispatch.payslipTemplates.setPayslipTemplates(false);
      dispatch.payslipTemplates.saveEditPayslipTemplates(false);
      cancelBtn();
    }
  }, [
    payslipTemplatesData.isAddPayslipTemplates ||
      payslipTemplatesData.isEditPayslipTemplates,
  ]);

  const selectCountryCode = country => {
    setSelectedCountry(country.cca2);
    setCountryName(country.name);
  };

  const countryBtn = () => {
    setCountryModal(true), setCount(count + 1);
  };

  const dobBtnPress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('dob');
  };

  const onHireDatePress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('hireDate');
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
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
    if (userData) {
      let arr = userData?.userData;

      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].user_name, value: arr[i].id});
      }

      console.log('dropDownArr', dropDownArr);
      setEmployeeArr(dropDownArr);
    }
  }, [userData]);

  const submitBtn = () => {
    if (
      Validator.validateTextInput(templateName) &&
      countryName &&
      Validator.validateTextInput(employeeName)
    ) {
      setIsError(false);
      let data = {
        userId: employeeName,
        payslipTempName: templateName,
        empName: payslipHeaderTbData[0].isCheck,
        empNo: payslipHeaderTbData[1].isCheck,
        dob: dob,
        empHireDate: hireDate,
        basicSalary: basicSalary,
        grossSalary: grossSalary,
        cpfDeductions: cpfDeductions,
        employerCPF: employerCPF,
        bonus: bonus,
        allowances: isAllowances,
        claims: claims,
        deductions: deductions,
        leaveBreakdown: leaveBreakdown,
        overtimeBreakdown: overtimeBreakdown,
        CdacMbmfSinda: CdacMbmfSinda,
        departmentId: department,
        positionId: positions,
        country: countryName,
      };
      console.log('data', data);
      if (isEdit) {
        dispatch.payslipTemplates.update({
          token,
          data,
          id: editData?.id,
        });
      } else {
        dispatch.payslipTemplates.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const refresh = () => {
    setCompanyValue('');
    setTemplateName('');
    setCountryName('');
    setEmployeeName('');
    setEmployeeNumber('');
    setDob('');
    setHireDate('');
    setOrganisation('');
    setDepartment('');
    setPositions('');
    // setICNumber('');
    setBasicSalary(false);
    setGrossSalary(false);
    setCpfDeductions(false);
    setBonus(false);
    setIsAllowances(false);
    setClaims(false);
    setDeductions(false);
    setCdacMbmfSinda(false);
    setLeaveBreakdown(false);
    setOvertimeBreakdown(false);
    setEmployerCPF(false);
    setSelectedCountry('');
    setHeaderLabelArr(payslipHeaderTbData1);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Payslip Templates'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Add payslip templates within the'}
          description2={'company here. Fill in the respective fields.'}
        />

        <TemplateDetails
          count={count}
          isError={isError}
          isView={isView}
          countryName={countryName}
          countryModal={countryModal}
          templateName={templateName}
          selectedCountry={selectedCountry}
          setEmployeeName={setEmployeeName}
          setTemplateName={setTemplateName}
          selectCountryCode={selectCountryCode}
          countryBtn={countryBtn}
          companyArr={companyArr}
          companyValue={companyValue}
          setCompanyValue={setCompanyValue}
        />

        <TemplateHeader
          dob={dob}
          isError={isError}
          isEdit={isEdit}
          isView={isView}
          hireDate={hireDate}
          // icNumber={icNumber}
          positions={positions}
          department={department}
          employeeName={employeeName}
          organisation={organisation}
          employeeNumber={employeeNumber}
          selectDateType={selectDateType}
          isDatePickerVisible={isDatePickerVisible}
          setDob={setDob}
          setHireDate={setHireDate}
          headerLabelArr={headerLabelArr}
          setHeaderLabelArr={setHeaderLabelArr}
          // setICNumber={setICNumber}
          setPositions={setPositions}
          setDepartment={setDepartment}
          setOrganisation={setOrganisation}
          setEmployeeName={setEmployeeName}
          setEmployeeNumber={setEmployeeNumber}
          setDatePickerVisibility={setDatePickerVisibility}
          onPress={dobBtnPress}
          onHireDatePress={onHireDatePress}
          companyArr={companyArr}
          companyValue={companyValue}
          setCompanyValue={setCompanyValue}
          organisationArr={organisationArr}
          positionArr={positionArr}
          departmentArr={departmentArr}
          employeeArr={employeeArr}
        />

        <PaymentHeader
          salary={salary}
          isView={isView}
          bounus={bounus}
          overtime={overtime}
          allowances={allowances}
          basicSalary={basicSalary}
          setBasicSalary={setBasicSalary}
          grossSalary={grossSalary}
          setGrossSalary={setGrossSalary}
          cpfDeductions={cpfDeductions}
          setCpfDeductions={setCpfDeductions}
          setEmployerCPF={setEmployerCPF}
          employerCPF={employerCPF}
          bonus={bonus}
          setBonus={setBonus}
          isAllowances={isAllowances}
          setIsAllowances={setIsAllowances}
          claims={claims}
          setClaims={setClaims}
          deductions={deductions}
          setDeductions={setDeductions}
          leaveBreakdown={leaveBreakdown}
          setLeaveBreakdown={setLeaveBreakdown}
          overtimeBreakdown={overtimeBreakdown}
          setOvertimeBreakdown={setOvertimeBreakdown}
          CdacMbmfSinda={CdacMbmfSinda}
          setCdacMbmfSinda={setCdacMbmfSinda}
        />

        <SaveCancelBtn
          label={isEdit ? 'Update' : 'Submit'}
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : submitBtn}
          saveLoading={isLoading.add || isLoading.update}
          isView={isView}
          isEdit={isEdit}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddPayslipTemplates;
