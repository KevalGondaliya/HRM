import { SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  gender,
  religion,
  raceDataArr,
  citizenship,
  dropDownData,
  maritalStatus,
} from '../../../dummyData';
import BillingAddress from './BillingAddress';
import CompanyDetails from './CompanyDetails';
import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import OnboardEmployees from '../../../component/OnboardEmployees';

import styles from './style';

const OnboardEmployeesSingle = ({ route, navigation }) => {
  const userId = route?.params?.id;
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
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
  const [genderArr, setGenderArr] = useState(gender);
  const [raceArr, setRaceArr] = useState(raceDataArr);
  const [officeMobile, setOffilceMobile] = useState('');
  const [religionValue, setReligionValue] = useState('');

  const [openReligion, setOpenReligion] = useState(false);
  const [uploadDocument, setUploadDocument] = useState('');
  const [religionArr, setReligionArr] = useState(religion);
  const [openRaceModal, setOpenRaceModal] = useState(false);
  const [homeCallingCode, setHomeCallingCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryModal, setCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [openGenderModal, setOpenGenderModal] = useState(false);
  const [openCitizenship, setOpenCitizenship] = useState(false);
  const [industryTypeValue, setIndustryTypeValue] = useState('');
  const [officeCallingCode, setOfficeCallingCode] = useState('');
  const [openIndustryType, setOpenIndustryType] = useState(false);
  const [maritalStatusValue, setMaritalStatusValue] = useState('');
  const [citizenshipArr, setCitizenshipArr] = useState(citizenship);
  const [openMaritalStatus, setOpenMaritalStatus] = useState(false);
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [day, setDay] = useState('');
  const [prDay, setPrDay] = useState('');
  const [prEntery, setPREntery] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [dateType, setDateType] = useState('');
  const [industryTypeArr, setIndustryTypeArr] = useState(dropDownData);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [maritalStatusArr, setMaritalStatusArr] = useState(maritalStatus);

  const [billCountryName, setBillCountryName] = useState('');
  const [billCountryModal, setBillCountryModal] = useState(false);
  const [billSelectedCountry, setBillSelectedCountry] = useState('');

  const [citizenshipValue, setCitizenshipValue] = useState('');
  const [citizenModal, setCitizenModal] = useState(false);
  const [selectedCitizenCountry, SetSelectedCitizenCountry] = useState('');

  const [countryOfWorkValue, setCountryOfWorkValue] = useState('');
  const [countryOfWorkModal, setCountryOfWorkModal] = useState(false);
  const [selectedCountryOfWork, SetSelectedCountryOfWork] = useState('');
  const token = useSelector(state => state.session?.token);
  const uploadDoc = useSelector(state => state.uploadDocument?.document);
  const employeesInfo = useSelector(state => state.employees);
  const isPersonalLoading = useSelector(
    state => state.loading.effects.employees,
  );

  const selectCountryCode = country => {
    setSelectedCountry(country.cca2);
    setCountryName(country.name);
  };

  const billSelectCountryCode = country => {
    setBillSelectedCountry(country.cca2);
    setBillCountryName(country.name);
  };

  const selectCitizenCode = country => {
    SetSelectedCitizenCountry(country.cca2);
    setCitizenshipValue(country.name);
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
      dispatch.uploadDocument.setDocument({ token, formData });
      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) { }
  };

  useEffect(() => {
    if (employeesInfo.personalInfo?.status == 200) {
      dispatch.employees.savePersonalInfo(null);
      navigation.navigate('OnboardEmployeesSingleJob', { id: userId });
    }
  }, [employeesInfo]);

  const submitBtn = () => {
    if (
      firstName &&
      lastName &&
      industryTypeValue &&
      identificationNumber &&
      personalEmail &&
      day &&
      maritalStatusValue &&
      countryName &&
      callingCode &&
      officeCallingCode &&
      homeCallingCode &&
      religionValue &&
      nationalityValue &&
      race &&
      genderValue &&
      citizenshipValue &&
      prDay &&
      prEntery &&
      uploadDocument &&
      postalCode &&
      address1 &&
      address2 &&
      address3 &&
      billCountryName &&
      countryOfWorkValue &&
      mobile &&
      officeMobile &&
      homeMobile
    ) {
      setIsError(false);
      let data = {
        firstName: firstName,
        lastName: lastName,
        personal_email: personalEmail,
        identity: industryTypeValue,
        identity_no: identificationNumber,
        dob: day,
        marital_status: maritalStatusValue,
        gender: genderValue,
        religion: religionValue,
        nationalityValue: nationalityValue,
        race: race,
        nationality: countryName,
        citizenship: citizenshipValue,
        country_of_work: countryOfWorkValue,
        country_code: selectedCountry,
        phone_no: `${callingCode},${mobile}`,
        office_no: `${officeCallingCode},${officeMobile}`,
        home_no: `${homeCallingCode},${officeMobile}`,
        photo: uploadDoc?.url,
        postal: parseInt(postalCode),
        add_line1: address1,
        add_line2: address2,
        add_line3: address3,
        country: countryName,
        prObtainDate: prDay,
        permitExpiration: prEntery,
      };
      dispatch.employees.setPersonalInfo({ token, data, id: userId });
    } else {
      setIsError(true);
    }
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
    setNationalityValue('');
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
    setBillCountryName('');
    setBillSelectedCountry('');
    SetSelectedCountryOfWork('');
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
        showsVerticalScrollIndicator={false}
        style={styles.midView}>
        <OnboardEmployees index={1} />

        <CompanyDetails
          isError={isError}
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
          nationalityValue={nationalityValue}
          openReligion={openReligion}
          religionArr={religionArr}
          setOpenReligion={setOpenReligion}
          setReligionValue={setReligionValue}
          setNationalityValue={setNationalityValue}
          setReligionArr={setReligionArr}
          setNationalityArr={setNationalityArr}
          race={race}
          openRaceModal={openRaceModal}
          raceArr={raceArr}
          setOpenRaceModal={setOpenRaceModal}
          setRace={setRace}
          setRaceArr={setRaceArr}
          openGenderModal={openGenderModal}
          genderValue={genderValue}
          genderArr={genderArr}
          personalEmail={personalEmail}
          setPersonalEmail={setPersonalEmail}
          setOpenGenderModal={setOpenGenderModal}
          setGender={setGender}
          setGenderArr={setGenderArr}
          openCitizenship={openCitizenship}
          citizenshipValue={citizenshipValue}
          citizenshipArr={citizenshipArr}
          setOpenCitizenship={setOpenCitizenship}
          setCitizenshipValue={setCitizenshipValue}
          setCitizenshipArr={setCitizenshipArr}
          uploadDocument={uploadDocument}
          handleDocumentSelection={handleDocumentSelection}
          removeBtnPress={() => {
            setUploadDocument('');
          }}
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
          day={day}
          prDay={prDay}
          prEntryDay={prEntery}
          selectCountryCode={selectCountryCode}
          onClose={() => {
            setCountryModal(false);
            setCount(count + 1);
          }}
          countryBtn={() => {
            setCountryModal(true), setCount(count + 1);
          }}
          countryName={countryName}
          countryModal={countryModal}
          selectedCountry={selectedCountry}
          selectCitizenCode={selectCitizenCode}
          onCitizenClose={() => {
            setCitizenModal(false);
            setCount(count + 1);
          }}
          citizenBtn={() => {
            setCitizenModal(true), setCount(count + 1);
          }}
          citizenName={citizenshipValue}
          citizenModal={citizenModal}
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
        />

        <BillingAddress
          count={count}
          isError={isError}
          address1={address1}
          address2={address2}
          address3={address3}
          postalCode={postalCode}
          countryName={billCountryName}
          countryModal={billCountryModal}
          selectedCountry={billSelectedCountry}
          setAddress1={setAddress1}
          setAddress2={setAddress2}
          setAddress3={setAddress3}
          setPostalCode={setPostalCode}
          selectCountryCode={billSelectCountryCode}
          onClose={() => {
            setBillCountryModal(false);
            setCount(count + 1);
          }}
          countryBtn={() => {
            setBillCountryModal(true), setCount(count + 1);
          }}
        />

        <SaveCancelBtn
          cancelBtn={() => {
            navigation.goBack();
          }}
          submitBtn={submitBtn}
          label={'Next'}
          saveLoading={isPersonalLoading.setPersonalInfo}
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

export default OnboardEmployeesSingle;
