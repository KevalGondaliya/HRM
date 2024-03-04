import moment from 'moment';
import React, {useEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../component/Header';
import SaveCancelBtn from '../../component/SaveCancelBtn';
import ScreenDescription from '../../component/ScreenDescription';
import {boolean_Data} from '../../dummyData';
import Validator from '../../utility/validator';
import AMCS from './AMCS';
import BillingAddress from './BillingAddress';
import CPFSubmission from './CPFSubmission';
import CompanyDetails from './CompanyDetails';
import styles from './style';

function Company({navigation}) {
  const dispatch = useDispatch();
  const [year, setYear] = useState('');
  const [count, setCount] = useState(0);
  const [month, setMonth] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [yearArr, setYearArr] = useState([]);
  const [address3, setAddress3] = useState('');
  const [address2, setAddress2] = useState('');
  const [address1, setAddress1] = useState('');
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [gstTypeValue, setGstTypeValue] = useState('');
  const [countryModal, setCountryModal] = useState(false);
  const [uploadDocument, setUploadDocument] = useState('');
  const [gstNumber, setGSTNumber] = useState('');

  const gstTypeArr = boolean_Data;

  const [selectedCountry, setSelectedCountry] = useState('');
  const [businessTypeValue, setBusinessTypeValue] = useState('');
  const [industryTypeValue, setIndustryTypeValue] = useState('');

  const [isAMCS, setIsAMCS] = useState(false);
  const [amcsTypeValue, setAmcsTypeValue] = useState('');
  const [amcsAmountTypeValue, setAmcsAmountTypeValue] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [isNewEmployees, setIsNewEmployees] = useState(false);
  // const [subDomain, setSubDomain] = useState('');

  const [cpfNumber, setCPFNumber] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const isDocLoading = useSelector(
    state => state.loading.effects.uploadDocument.setDocument,
  );
  const isLoading = useSelector(state => state.loading.effects.company);
  const token = useSelector(state => state.session?.token);
  const addCompany = useSelector(state => state.company?.addCompany);
  const isEditCompanyData = useSelector(
    state => state.company?.isEditCompanyData,
  );
  const companyData = useSelector(state => state.company?.companyData);
  const uploadDoc = useSelector(state => state.uploadDocument?.document);

  const selectCountryCode = country => {
    setSelectedCountry(country.cca2);
    setCountryName(country.name);
  };

  useEffect(() => {
    if (addCompany?.status == 200 || isEditCompanyData) {
      navigation.navigate('Dashboard');
      dispatch.company.saveComapny(null);
      dispatch.company.setEditCompanyData(false);
      onCancelBtnPress();
      cancelBtn();
      setIsEdit(false);
      dispatch.company.get({token});
    }
  }, [addCompany, isEditCompanyData]);

  useEffect(() => {
    dispatch.company.get({token});
  }, []);

  useEffect(() => {
    if (companyData) {
      console.log('companyData', companyData?.gstNumber);
      setIsEdit(true);
      setAddress1(companyData?.add_line1);
      setAddress2(companyData?.add_line2);
      setAddress3(companyData?.add_line3);
      setAddress3(companyData?.add_line3);
      setCompanyName(companyData?.company_name);
      // setSubDomain(companyData?.subDoMain);
      setMonth(companyData?.financial_month);
      setEmail(companyData?.cmp_email);
      // setGstTypeValue(companyData?.gstNumber != '' ? true : false);
      setGstTypeValue(companyData?.gst);
      setGSTNumber(companyData?.gstNumber);
      setUploadDocument(companyData?.logo);
      setPostalCode(companyData?.postal?.toString());
      setCountryName(companyData?.country);
      setCPFNumber(companyData?.cpf_sub_no);
      setCPFNumber(companyData?.cpf_sub_no);
      setAmcsTypeValue(companyData?.amcs_contribution || '');
      setAmcsAmountTypeValue(companyData?.amcs_type || '');
      setContributionAmount(companyData?.amcs_percentage || '');
      setIsNewEmployees(companyData?.amountNewEmployee?.toString() || false);
      setLongitude(companyData?.long);
      setLatitude(companyData?.lat);
      // setIsAMCS(amcsTypeValue
      //   companyData?.amountType != '' ||
      //     companyData?.contributeAmt != '' ||
      //     companyData?.amountNewEmployee
      //     ? 'true'
      //     : 'false',
      // );
      setIsAMCS(companyData?.amcs);
    }
  }, [companyData]);

  useEffect(() => {
    let year = 1920;
    let arr = [];
    let currYear = moment().year();
    for (let i = year; i < currYear; i++) {
      arr.push({
        label: `${(year = year + 1)}`,
        value: `${year}`,
      });
    }
    setYearArr(arr);
  }, []);

  const onSaveBtnPress = () => {
    if (
      month != '' &&
      // Validator.validateTextInput(subDomain) != '' &&
      address1 != '' &&
      Validator.validatePostalCode(postalCode) != '' &&
      countryName != '' &&
      Validator.validateTextInput(companyName) != '' &&
      uploadDocument != '' &&
      Validator.validateNumber(cpfNumber) != '' &&
      Validator.validateEmail(email) != ''
    ) {
      setIsError(false);
      let data = {
        company_name: companyName,
        financial_month: month,
        // subDoMain: subDomain,
        comp_no: `${callingCode}`,
        cmp_email: email,
        cpfNumber: cpfNumber,
        // industry: industryTypeValue,
        gst: Boolean(gstTypeValue),
        postal: parseInt(postalCode),
        add_line1: address1,
        add_line2: address2,
        add_line3: address3,
        country: countryName,
        amcs_contribution: amcsTypeValue,
        amcs_type: amcsAmountTypeValue,
        amcs_percentage: contributionAmount,
        amountNewEmployee: isNewEmployees,
        cpf_sub_no: cpfNumber,
        gstNumber: gstNumber,
        logo: uploadDoc?.url || companyData?.logo,
        lat: latitude,
        long: longitude,
        amcs: isAMCS,
      };
      console.log(data, isEdit, companyData?.id);
      if (isEdit) {
        dispatch.company.update({token, data, id: companyData?.id});
      } else dispatch.company.setCompany({token, data});
    } else {
      setIsError(true);
    }
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });

      const formData = new FormData();
      formData.append('document', response[0]);

      dispatch.uploadDocument.setDocument({token, formData});

      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) {}
  };

  const onCancelBtnPress = () => {
    setYear('');
    setEmail('');
    setMonth('');
    setAddress1('');
    setAddress2('');
    setAddress3('');
    setCallingCode('');
    setCompanyName('');
    setBusinessTypeValue('');
    setCountryName('');
    setGstTypeValue('');
    setIndustryTypeValue('');
    setPostalCode('');
    setUploadDocument('');
    setSelectedCountry('');
    // setSubDomain('');
    setAmcsAmountTypeValue('');
    setContributionAmount('');
    setGSTNumber('');
    setIsNewEmployees('');
    setCPFNumber('');
    setIsAMCS(false);
  };

  const onClose = () => {
    setCountryModal(false);
    setCount(count + 1);
  };

  const removeBtnPress = () => {
    setUploadDocument('');
  };

  const countryBtn = () => {
    setCountryModal(true), setCount(count + 1);
  };

  const cancelBtn = () => {
    onCancelBtnPress();
    navigation.navigate('Dashboard');
  };

  const submitBtn = () => {
    onSaveBtnPress();
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  const setAddress = data => {
    setLatitude(data.geometry.location.lat);
    setLongitude(data.geometry.location.lng);
    setAddress1(data.formatted_address);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Company'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Fill in the respective fields for'}
          description2={'your company profile.'}
        />

        <CompanyDetails
          isError={isError}
          companyName={companyName}
          setCompanyName={setCompanyName}
          businessTypeValue={businessTypeValue}
          setBusinessTypeValue={setBusinessTypeValue}
          industryTypeValue={industryTypeValue}
          setIndustryTypeValue={setIndustryTypeValue}
          month={month}
          setMonth={setMonth}
          year={year}
          yearArr={yearArr}
          setYear={setYear}
          callingCode={callingCode}
          setCallingCode={setCallingCode}
          setMobile={setMobile}
          mobile={mobile}
          setEmail={setEmail}
          email={email}
          gstTypeValue={gstTypeValue}
          gstTypeArr={gstTypeArr}
          setGstTypeValue={setGstTypeValue}
          gstNumber={gstNumber}
          setGSTNumber={setGSTNumber}
          uploadDocument={uploadDocument}
          handleDocumentSelection={handleDocumentSelection}
          removeBtnPress={removeBtnPress}
          isSpinner={isDocLoading}
          // subDomain={subDomain}
          // setSubDomain={setSubDomain}
        />

        <BillingAddress
          count={count}
          isError={isError}
          address1={address1}
          address2={address2}
          address3={address3}
          postalCode={postalCode}
          countryName={countryName}
          countryModal={countryModal}
          selectedCountry={selectedCountry}
          setAddress={data => setAddress(data)}
          setAddress1={setAddress1}
          setAddress2={setAddress2}
          setAddress3={setAddress3}
          setPostalCode={setPostalCode}
          selectCountryCode={selectCountryCode}
          onClose={onClose}
          countryBtn={countryBtn}
        />

        <AMCS
          isAMCS={isAMCS}
          setIsAMCS={setIsAMCS}
          amcsTypeValue={amcsTypeValue}
          setAmcsTypeValue={setAmcsTypeValue}
          amcsAmountTypeValue={amcsAmountTypeValue}
          setAmcsAmountTypeValue={setAmcsAmountTypeValue}
          contributionAmount={contributionAmount}
          setContributionAmount={setContributionAmount}
          isNewEmployees={isNewEmployees}
          setIsNewEmployees={setIsNewEmployees}
        />

        <CPFSubmission
          isError={isError}
          cpfNumber={cpfNumber}
          setCPFNumber={setCPFNumber}
        />

        <SaveCancelBtn
          label={isEdit ? 'Update' : 'Submit'}
          cancelBtn={cancelBtn}
          submitBtn={submitBtn}
          saveLoading={
            isLoading?.setCompany || isLoading?.update || isDocLoading
          }
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Company;
