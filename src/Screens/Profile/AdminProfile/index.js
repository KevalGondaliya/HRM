import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Header from '../../../component/Header';
import PropfileButton from '../../../component/PropfileButton';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import {
  citizenship,
  dropDownData,
  gender,
  maritalStatus,
  raceDataArr,
  religion,
} from '../../../dummyData';
import Validator from '../../../utility/validator';
import BillingAddress from './BillingAddress';
import PersonalDetails from './PersonalDetails';

import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';

const AdminProfile = ({route, navigation}) => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [race, setRace] = useState('');
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [lastName, setLastName] = useState('');
  const [genderValue, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [homeMobile, setHomeMobile] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const [genderArr, setGenderArr] = useState(gender);
  const [raceArr, setRaceArr] = useState(raceDataArr);
  const [officeMobile, setOffilceMobile] = useState('');
  const [religionValue, setReligionValue] = useState('');
  const [countryModal, setCountryModal] = useState(false);
  const [openReligion, setOpenReligion] = useState(false);
  const [uploadDocument, setUploadDocument] = useState('');
  const [religionArr, setReligionArr] = useState(religion);
  const [openRaceModal, setOpenRaceModal] = useState(false);
  const [homeCallingCode, setHomeCallingCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [citizenshipValue, setCitizenshipValue] = useState('');
  const [nationalityName, setNationalityName] = useState('');
  const [openGenderModal, setOpenGenderModal] = useState(false);
  const [openCitizenship, setOpenCitizenship] = useState(false);
  const [industryTypeValue, setIndustryTypeValue] = useState('');
  const [officeCallingCode, setOfficeCallingCode] = useState('');
  const [openIndustryType, setOpenIndustryType] = useState(false);
  const [maritalStatusValue, setMaritalStatusValue] = useState('');
  const [citizenshipArr, setCitizenshipArr] = useState(citizenship);
  const [openMaritalStatus, setOpenMaritalStatus] = useState(false);
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [industryTypeArr, setIndustryTypeArr] = useState(dropDownData);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [maritalStatusArr, setMaritalStatusArr] = useState(maritalStatus);
  const [countryOfWorkValue, setCountryOfWorkValue] = useState('');
  const [citizenModal, setCitizenModal] = useState(false);
  const [selectedCitizenCountry, SetSelectedCitizenCountry] = useState('');
  const [countryOfWorkModal, setCountryOfWorkModal] = useState(false);
  const [selectedCountryOfWork, SetSelectedCountryOfWork] = useState('');
  const [day, setDay] = useState('');
  const [prDay, setPrDay] = useState('');
  const [prEntery, setPREntery] = useState('');
  const [dateType, setDateType] = useState('');
  const [addressType, setAddressType] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isIdentificationId, setIsIdentificationId] = useState(false);

  const employeesInfo = useSelector(state => state.employees);
  const isPersonalLoading = useSelector(
    state => state.loading.effects.employees,
  );
  const token = useSelector(state => state.session?.token);
  const employeeProfile = useSelector(
    state => state.employeeProfile.personalInfo,
  );
  const uploadDoc = useSelector(state => state.uploadDocument?.userDocument);

  useEffect(() => {
    if (employeesInfo.personalInfo?.status == 200) {
      dispatch.employees.savePersonalInfo(null);
      navigation.navigate('AdminEmploymentDetails', {
        data: editData,
        isEdit: isEdit,
      });
    }
  }, [employeesInfo]);

  useEffect(() => {
    if (addressType == 'N') {
      setCountryCode('');
      selectCountryCode('');
      setSelectedCountry('');
      setAddress3('');
      setAddress2('');
      setAddress1('');
      setPostalCode('');
      setCountryName('');
    }
  }, [addressType]);

  useEffect(() => {
    if (citizenshipValue == 'Others') setCountryCode('');
    else {
      setCountryCode(
        citizenshipValue == 'Singaporean'
          ? '301'
          : citizenshipValue == 'Malaysian'
          ? '304'
          : citizenshipValue == 'Indian' && '354',
      );
    }
  }, [citizenshipValue]);

  const selectCountryCode = country => {
    setSelectedCountry(country.cca2);
    setCountryName(country.name);
  };

  const selectCitizenCode = country => {
    SetSelectedCitizenCountry(country.cca2);
  };

  const selectCountryOfWorkCode = country => {
    SetSelectedCountryOfWork(country.cca2);
    setCountryOfWorkValue(country.name);
  };

  const handleConfirm = date => {
    switch (dateType) {
      case 'dob':
        setDay(date);

        break;

      case 'PR':
        setPrDay(date);
        break;
      case 'PREntery':
        setPREntery(date);
        break;
    }
    setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      const formData = new FormData();
      formData.append('document', response[0]);
      dispatch.uploadDocument.setUserDocument({
        token,
        formData,
        id: editData?.id,
      });
      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) {}
  };

  useEffect(() => {
    if (employeeProfile) {
      let data = employeeProfile;
      setFirstName(data?.staff_personal_infos[0]?.firstName || '');
      setLastName(data?.staff_personal_infos[0]?.lastName || '');
      setIndustryTypeValue(data?.staff_personal_infos[0]?.identity || '');
      setIdentificationNumber(data?.staff_personal_infos[0]?.identity_no || '');
      setEmail(data?.staff_personal_infos[0]?.personal_email || '');
      setDay(data?.staff_personal_infos[0]?.dob || '');
      setMaritalStatusValue(
        data?.staff_personal_infos[0]?.marital_status || '',
      );
      setCountryOfWorkValue(
        data?.staff_personal_infos[0]?.country_of_work || '',
      );
      setCallingCode(data?.staff_personal_infos[0]?.phone_no || '');
      setMobile(data?.staff_personal_infos[0]?.phone_no || '');
      setOfficeCallingCode(data?.staff_personal_infos[0]?.office_no || '');
      setOffilceMobile(data?.staff_personal_infos[0]?.office_no || '');
      setHomeCallingCode(data?.staff_personal_infos[0]?.home_no || '');
      setHomeMobile(data?.staff_personal_infos[0]?.home_no || '');
      setReligionValue(data?.staff_personal_infos[0]?.religion || '');
      setNationalityName(data?.staff_personal_infos[0]?.nationality || '');
      setRace(data?.staff_personal_infos[0]?.race || '');
      setGender(data?.staff_personal_infos[0]?.gender || '');
      setCitizenshipValue(data?.staff_personal_infos[0]?.citizenship || '');
      setPrDay(data?.staff_personal_infos[0]?.prObtainDate || '');
      setPREntery(data?.staff_personal_infos[0]?.permitExpiration || '');
      setUploadDocument(data?.staff_personal_infos[0]?.photo || '');
      setPostalCode(data?.staff_personal_infos[0]?.postal?.toString() || '');
      setAddress1(data?.staff_personal_infos[0]?.add_line1 || '');
      setAddress2(data?.staff_personal_infos[0]?.add_line2 || '');
      setAddress3(data?.staff_personal_infos[0]?.add_line3 || '');
      setCountryName(data?.staff_personal_infos[0]?.country || '');
      setAddressType(data?.staff_personal_infos[0]?.address_type || '');

      setCountryCode(data?.staff_personal_infos[0]?.country_code || '');
      setIsIdentificationId(
        data?.staff_personal_infos?.[0]?.identity_no ? true : false,
      );

      setCount(count + 1);
    }
  }, [employeeProfile]);
  useEffect(() => {
    if (editData) {
      dispatch.employeeProfile.getPersonalInfo({
        token,
        id: editData?.id,
      });
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const refresh = () => {};

  const submitBtn = () => {
    if (
      Validator.validateTextInput(firstName) &&
      Validator.validateTextInput(lastName) &&
      industryTypeValue &&
      Validator.validateTextInput(identificationNumber) &&
      Validator.validateEmail(email) &&
      day &&
      maritalStatusValue &&
      countryName &&
      Validator.validateOnlyPhoneNumber(callingCode) &&
      // Validator.validateOnlyPhoneNumber(officeCallingCode) &&
      // Validator.validateOnlyPhoneNumber(homeCallingCode) &&
      religionValue &&
      race &&
      genderValue &&
      citizenshipValue &&
      prDay &&
      prEntery &&
      uploadDocument &&
      Validator.validatePostalCode(postalCode) &&
      Validator.validateTextInput(address1) &&
      Validator.validateTextInput(address2) &&
      Validator.validateTextInput(address3) &&
      countryOfWorkValue &&
      nationalityName
    ) {
      setIsError(false);
      let data = {
        firstName: firstName,
        lastName: lastName,
        personal_email: email,
        identity: industryTypeValue,
        identity_no: identificationNumber,
        dob: day,
        marital_status: maritalStatusValue,
        gender: genderValue,
        religion: religionValue,
        race: race,
        nationality: nationalityName,
        citizenship: citizenshipValue,
        country_of_work: countryOfWorkValue,
        country_code: selectedCountry,
        phone_no: `${callingCode}`,
        office_no: `${officeCallingCode}`,
        home_no: `${homeCallingCode}`,
        photo: uploadDoc?.url || editData?.photo,
        postal: parseInt(postalCode),
        add_line1: address1,
        add_line2: address2,
        add_line3: address3,
        country: countryName,
        prObtainDate: prDay,
        permitExpiration: prEntery,
        address_type: addressType,
        country_code: countryCode,
      };
      dispatch.employees.setPersonalInfo({token, data, id: editData?.id});
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    navigation.navigate('EmployeeDashboard');
  };

  useEffect(() => {
    if (employeesInfo.onBoard?.status == 200) {
      dispatch.employees.saveOnBoard(null);
      onRefresh();
    }
  }, [employeesInfo]);

  const onRefresh = () => {
    setFirstName('');
    setLastName();
    setIndustryTypeValue('');
    setIdentificationNumber();
    setPersonalEmail('');
    setDay('');
    setMaritalStatusValue('');
    setCountryName('');
    setSelectedCountry('');
    setCallingCode('');
    setOfficeCallingCode('');
    setHomeCallingCode('');
    setReligionValue('');
    setRace('');
    setGender();
    setCitizenshipValue('');
    setCountryOfWorkValue('');
    setPrDay('');
    setPREntery('');
    setUploadDocument('');
    setPostalCode('');
    setAddress1('');
    setAddress2('');
    setAddress3('');
    setAddressType('');
    setNationalityName('');
    setCountryCode('');
  };
  // console.log(
  //   'employeeProfile',
  //   employeeProfile?.staff_personal_infos[0].firstName,
  // );
  return (
    <SafeAreaView style={styles.containerView} key={count}>
      <Header
        isblank
        label={
          employeeProfile?.staff_personal_infos[0].firstName +
            ' ' +
            employeeProfile?.staff_personal_infos[0].lastName || ''
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
          isProfile={true}
          documentBtnPress={() => {
            navigation.navigate('AdminDocuments', {
              id: editData?.id,
              data: editData,
              isView: isView,
              isEdit: isEdit,
            });
          }}
          employmentDetails={() => {
            navigation.navigate('AdminEmploymentDetails', {
              id: editData?.id,
              data: editData,
              isView: isView,
              isEdit: isEdit,
            });
          }}
          entitlementsBtnPress={() => {
            navigation.navigate('AdminEntitlements', {
              id: editData?.id,
              data: editData,
              isView: isView,
              isEdit: isEdit,
            });
          }}
        />

        <PersonalDetails
          isError={isError}
          isView={isView}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          identificationNumber={identificationNumber}
          setIdentificationNumber={setIdentificationNumber}
          onDobBtnPress={() => {
            setDateType('dob');
            setDatePickerVisibility(true);
          }}
          onPRBtnPress={() => {
            setDateType('PR');
            setDatePickerVisibility(true);
          }}
          onPREntryBtnPress={() => {
            setDateType('PREntery');
            setDatePickerVisibility(true);
          }}
          openMaritalStatus={openMaritalStatus}
          maritalStatusValue={maritalStatusValue}
          maritalStatusArr={maritalStatusArr}
          setCallingCode={setCallingCode}
          callingCode={callingCode}
          mobile={mobile}
          setMobile={setMobile}
          setOfficeCallingCode={setOfficeCallingCode}
          officeCallingCode={officeCallingCode}
          setHomeCallingCode={setHomeCallingCode}
          homeCallingCode={homeCallingCode}
          officeMobile={officeMobile}
          setOffilceMobile={setOffilceMobile}
          setHomeMobile={setHomeMobile}
          homeMobile={homeMobile}
          religionValue={religionValue}
          openReligion={openReligion}
          religionArr={religionArr}
          setOpenReligion={setOpenReligion}
          setReligionValue={setReligionValue}
          setReligionArr={setReligionArr}
          race={race}
          openRaceModal={openRaceModal}
          raceArr={raceArr}
          setRaceArr={setRaceArr}
          setOpenRaceModal={setOpenRaceModal}
          setRace={setRace}
          openGenderModal={openGenderModal}
          genderValue={genderValue}
          genderArr={genderArr}
          setOpenGenderModal={setOpenGenderModal}
          setGender={setGender}
          setGenderArr={setGenderArr}
          setNationalityName={setNationalityName}
          openCitizenship={openCitizenship}
          // citizenshipValue={citizenshipValue}
          citizenshipArr={citizenshipArr}
          setOpenCitizenship={setOpenCitizenship}
          setCitizenshipValue={setCitizenshipValue}
          setCitizenshipArr={setCitizenshipArr}
          uploadDocument={uploadDocument}
          day={day}
          prDay={prDay}
          prEntryDay={prEntery}
          citizenModal={citizenModal}
          handleDocumentSelection={() => {
            handleDocumentSelection();
          }}
          removeBtnPress={() => {
            setUploadDocument('');
          }}
          nationalityName={nationalityName}
          openIndustryType={openIndustryType}
          industryTypeValue={industryTypeValue}
          industryTypeArr={industryTypeArr}
          setOpenIndustryType={setOpenIndustryType}
          setIndustryTypeValue={setIndustryTypeValue}
          setIndustryTypeArr={setIndustryTypeArr}
          setOpenMaritalStatus={setOpenMaritalStatus}
          setMaritalStatusValue={setMaritalStatusValue}
          setMaritalStatusArr={setMaritalStatusArr}
          email={email}
          setEmail={setEmail}
          countryBtn={() => {
            setCountryModal(true), setCount(count + 1);
          }}
          selectCitizenCode={selectCitizenCode}
          citizenName={citizenshipValue}
          onCitizenClose={() => {
            setCitizenModal(false);
            setCount(count + 1);
          }}
          citizenBtn={() => {
            setCitizenModal(true), setCount(count + 1);
          }}
          selectedCitizenCountry={selectedCitizenCountry}
          selectCountryOfWorkCode={selectCountryOfWorkCode}
          onCountryOfWorkClose={() => {
            setCountryOfWorkModal(false);
            setCount(count + 1);
          }}
          countryOfWorkBtn={() => {
            setCountryOfWorkModal(true), setCount(count + 1);
          }}
          countryOfWorkName={countryOfWorkValue}
          countryOfWorkModal={countryOfWorkModal}
          selectedCountryOfWork={selectedCountryOfWork}
          isIdentificationId={isIdentificationId}
        />

        <BillingAddress
          count={count}
          isView={isView}
          isError={isError}
          address1={address1}
          address2={address2}
          address3={address3}
          postalCode={postalCode}
          addressType={addressType}
          countryCode={countryCode}
          countryName={countryName}
          countryModal={countryModal}
          selectedCountry={selectedCountry}
          setAddress1={setAddress1}
          setCountryCode={setCountryCode}
          setAddress2={setAddress2}
          setAddress3={setAddress3}
          setPostalCode={setPostalCode}
          setAddressType={setAddressType}
          selectCountryCode={selectCountryCode}
          onClose={() => {
            setCountryModal(false);
            setCount(count + 1);
          }}
          countryBtn={() => {
            setCountryModal(true), setCount(count + 1);
          }}
          citizenName={citizenshipValue}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : submitBtn}
          saveLoading={isPersonalLoading.setPersonalInfo}
          label={isEdit ? 'Update' : 'Submit'}
          isView={isView}
          isEdit={isEdit}
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

export default AdminProfile;
