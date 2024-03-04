import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../component/Header';
import CPFSubmission from './CPFSubmission';
import CompanyDetails from './CompanyDetails';
import BillingAddress from './BillingAddress';
import {booleanData, dropDownData} from '../../dummyData';
import SaveCancelBtn from '../../component/SaveCancelBtn';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';

function AddOrganisations({route, navigation}) {
  const dispatch = useDispatch();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [count, setCount] = useState(0);
  const [acms, setAcms] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [isError, setIsError] = useState(false);
  const [cpfNumber, setCPFNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const acmsArr = booleanData;
  const [contribution, setContribution] = useState('');
  const [gstTypeValue, setGstTypeValue] = useState('');
  const [countryModal, setCountryModal] = useState(false);
  const [uploadDocument, setUploadDocument] = useState('');
  const [gstTypeArr, setGstTypeArr] = useState(booleanData);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [businessTypeValue, setBusinessTypeValue] = useState('');
  const [industryTypeValue, setIndustryTypeValue] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [companyArr, setCompanyArr] = useState([]);
  const [companyValue, setCompanyValue] = useState('');

  const companyData = useSelector(state => state.company?.companyData);

  const isDocLoading = useSelector(
    state => state.loading.effects.uploadDocument.setDocument,
  );
  const isLoading = useSelector(
    state => state.loading.effects.organisations.setOrganisations,
  );
  const isEditLoading = useSelector(
    state => state.loading.effects.organisations.editOrganisations,
  );
  const token = useSelector(state => state.session?.token);
  const addOrg = useSelector(state => state.organisations?.addOrg);
  const editOrg = useSelector(state => state.organisations?.editOrg);
  const uploadDoc = useSelector(state => state.uploadDocument?.document);

  const selectCountryCode = country => {
    setSelectedCountry(country.cca2);
    setCountryName(country.name);
  };

  useEffect(() => {
    if (editData) {
      let postal = editData?.postal?.toString();
      let gst = editData?.gst?.toString();
      let amcs = editData?.amcs?.toString();
      setCompanyValue(editData?.companyId || '');
      setAcms(amcs || '');
      setPostalCode(postal || '');
      setGstTypeValue(gst || '');
      setAddress1(editData?.add_line1 || '');
      setAddress2(editData?.add_line2 || '');
      setAddress3(editData?.add_line3 || '');
      setUploadDocument(editData?.logo || '');
      setCPFNumber(editData?.cpf_sub_no || '');
      setCountryName(editData?.country || '');
      setOrganisationName(editData?.org_name || '');
      setIndustryTypeValue(editData?.industry || '');
      setContribution(editData?.amcs_percentage || '');
      setRegistrationNumber(editData?.biz_reg_no || '');
      setBusinessTypeValue(editData?.biz_reg_type || '');
    } else {
      cancelBtn();
    }
  }, [editData]);

  useEffect(() => {
    if (addOrg?.status == 200) {
      navigation.navigate('Organisations');
      dispatch.organisations.saveOrganisations(null);
      cancelBtn();
    }
  }, [addOrg]);

  useEffect(() => {
    if (editOrg?.status == 200) {
      navigation.navigate('Organisations');
      dispatch.organisations.saveOrganisations(null);
      cancelBtn();
    }
  }, [editOrg]);

  const onSaveBtnPress = () => {
    if (
      acms != '' &&
      // address3 != '' &&
      // address2 != '' &&
      address1 != '' &&
      cpfNumber != '' &&
      postalCode != '' &&
      contribution != '' &&
      companyValue != '' &&
      countryName != '' &&
      gstTypeValue != '' &&
      uploadDocument != '' &&
      organisationName != '' &&
      businessTypeValue != '' &&
      industryTypeValue != '' &&
      registrationNumber != ''
    ) {
      setIsError(false);
      let id = editData?.id;
      let data = {
        companyId: companyValue,
        amcs: acms,
        gst: gstTypeValue,
        add_line1: address1,
        add_line2: address2,
        add_line3: address3,
        country: countryName,
        logo: uploadDoc?.url || editData?.logo,
        cpf_sub_no: cpfNumber,
        org_name: organisationName,
        postal: parseInt(postalCode),
        industry: industryTypeValue,
        biz_reg_type: businessTypeValue,
        biz_reg_no: registrationNumber,
        amcs_percentage: contribution,
      };
      isEdit
        ? dispatch.organisations.editOrganisations({token, data, id})
        : dispatch.organisations.setOrganisations({token, data});
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    setIsError(false);
    setAcms('');
    setAddress1('');
    setAddress2('');
    setAddress3('');
    setCPFNumber('');
    setPostalCode('');
    setContribution('');
    setCountryName('');
    setGstTypeValue('');
    setUploadDocument('');
    setOrganisationName('');
    setBusinessTypeValue('');
    setIndustryTypeValue('');
    setRegistrationNumber('');
    setSelectedCountry('');
    setCompanyValue('');
  };

  const onCancleBtn = () => {
    navigation.navigate('Organisations');
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

  const submitBtn = () => {
    isView == false ? onCancleBtn() : onSaveBtnPress();
  };

  const onClose = () => {
    setCountryModal(false);
    setCount(count + 1);
  };

  const removeBtn = () => {
    setUploadDocument('');
  };

  const countryBtn = () => {
    setCountryModal(true), setCount(count + 1);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Organisations'}
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
          description1={'Fill in the respective fields for'}
          description2={'your organisation profile.'}
        />

        <CompanyDetails
          companyData={companyArr}
          companyValue={companyValue}
          setCompanyValue={setCompanyValue}
          isError={isError}
          gstTypeArr={gstTypeArr}
          gstTypeValue={gstTypeValue}
          uploadDocument={uploadDocument}
          organisationName={organisationName}
          industryTypeValue={industryTypeValue}
          businessTypeValue={businessTypeValue}
          registrationNumber={registrationNumber}
          setGstTypeArr={setGstTypeArr}
          setGstTypeValue={setGstTypeValue}
          setOrganisationName={setOrganisationName}
          setBusinessTypeValue={setBusinessTypeValue}
          setIndustryTypeValue={setIndustryTypeValue}
          setRegistrationNumber={setRegistrationNumber}
          handleDocumentSelection={handleDocumentSelection}
          removeBtn={removeBtn}
          isSpinner={isDocLoading}
          isView={isView}
        />

        <BillingAddress
          count={count}
          isView={isView}
          isError={isError}
          address1={address1}
          address2={address2}
          address3={address3}
          postalCode={postalCode}
          countryName={countryName}
          countryModal={countryModal}
          selectedCountry={selectedCountry}
          setAddress1={setAddress1}
          setAddress2={setAddress2}
          setAddress3={setAddress3}
          setPostalCode={setPostalCode}
          selectCountryCode={selectCountryCode}
          onClose={onClose}
          countryBtn={countryBtn}
        />

        <CPFSubmission
          acms={acms}
          isView={isView}
          acmsArr={acmsArr}
          isError={isError}
          cpfNumber={cpfNumber}
          contribution={contribution}
          setAcms={setAcms}
          setCPFNumber={setCPFNumber}
          setContribution={setContribution}
        />

        <SaveCancelBtn
          cancelBtn={(cancelBtn, onCancleBtn)}
          submitBtn={submitBtn}
          saveLoading={isEditLoading || isLoading || isDocLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddOrganisations;
