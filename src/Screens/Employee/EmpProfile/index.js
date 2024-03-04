import {Icon} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  gender,
  religion,
  raceDataArr,
  citizenship,
  dropDownData,
  maritalStatus,
  nationality,
} from '../../../dummyData';
import Colors from '../../../theme';
import Validator from '../../../utility/validator';
import ChangeStatus from './ChangeStatus';
import BillingAddress from './BillingAddress';
import Header from '../../../component/Header';
import PersonalDetails from './PersonalDetails';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import PropfileButton from '../../../component/PropfileButton';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';

const EmpProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isStatusError, setIsStatusError] = useState(false);
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
  const [nationalityValue, setNationalityValue] = useState('');
  const [nationalityArr, setNationalityArr] = useState(nationality);
  const [openRaceModal, setOpenRaceModal] = useState(false);
  const [homeCallingCode, setHomeCallingCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [citizenshipValue, setCitizenshipValue] = useState('');
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
  const [isStatusModalVisible, setIsStatusModalVisibility] = useState(false);
  const [changeStatusValue, setChangeStatusValue] = useState();
  const [addressType, setAddressType] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isIdentificationId, setIsIdentificationId] = useState(false);
  const uploadDoc = useSelector(state => state.uploadDocument?.document);
  const employeeProfile = useSelector(
    state => state.employeeProfile.personalInfo,
  );
  const isPersonalLoading = useSelector(
    state => state.loading.effects.employees,
  );
  const employeesInfo = useSelector(state => state.employees);
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);
  const officeStatus = useSelector(state => state.officeStatus);
  const isStatusLoading = useSelector(
    state => state.loading.effects.officeStatus.add,
  );
  const [data, setData] = useState(employeeProfile?.employments[0]?.empType);
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setChangeStatusValue(data);
  }, [data]);

  const getUserData = () => {
    dispatch.employeeProfile.getPersonalInfo({
      token,
      id: user?.id,
    });
  };

  useEffect(() => {
    if (officeStatus.officeStatus) {
      getUserData();
      setIsStatusModalVisibility(false);
      dispatch.officeStatus.setOfficeStatus(false);
    }
  }, [officeStatus]);

  useEffect(() => {
    if (employeeProfile) {
      let data = employeeProfile;
      setData(employeeProfile?.employments[0]?.empType);
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
      setRace(data?.staff_personal_infos[0]?.race || '');
      setNationalityValue(data?.staff_personal_infos[0]?.nationality || '');
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
      setCount(count + 1);
      setAddressType(data?.staff_personal_infos[0]?.address_type || '');
      setCountryCode(data?.staff_personal_infos[0]?.country_code || '');
      setIsIdentificationId(
        data?.staff_personal_infos?.[0]?.identity_no ? true : false,
      );
    }
  }, [employeeProfile]);

  console.log(addressType);

  const modalClose = () => {
    setIsStatusModalVisibility(false);
  };

  const selectCountryCode = country => {
    setSelectedCountry(country.cca2);
    setCountryName(country.name);
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
      dispatch.uploadDocument.setDocument({
        token,
        formData,
      });
      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) {}
  };

  const changeStatusPress = () => {
    setIsStatusModalVisibility(true);
  };

  useEffect(() => {
    if (employeesInfo.personalInfo?.status == 200) {
      dispatch.employees.savePersonalInfo(null);
      navigation.navigate('EmpEmploymentDetails', {data: user});
    }
  }, [employeesInfo]);

  const cancelBtn = () => {
    navigation.navigate('Dashboard');
  };

  const removeBtnPress = () => {
    setUploadDocument('');
  };

  const documentBtnPress = () => {
    navigation.navigate('EmpDocuments');
  };

  const employmentDetails = () => {
    navigation.navigate('EmpEmploymentDetails');
  };

  const entitlementsBtnPress = () => {
    navigation.navigate('EmpEntitlements');
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

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

  const saveBtn = () => {
    if (changeStatusValue != '') {
      let data = {
        empType: changeStatusValue,
      };
      dispatch.officeStatus.add({token, data, id: user?.id});
      setIsStatusError(false);
    } else {
      setIsStatusError(true);
    }
  };

  const submitBtn = () => {
    if (
      Validator.validateTextInput(firstName) &&
      Validator.validateTextInput(lastName) &&
      industryTypeValue &&
      Validator.validateGSTNumber(identificationNumber) &&
      Validator.validateEmail(email) &&
      day &&
      maritalStatusValue &&
      // countryName &&
      Validator.validateOnlyPhoneNumber(callingCode) &&
      // officeCallingCode &&
      // homeCallingCode &&
      religionValue &&
      race &&
      genderValue &&
      citizenshipValue &&
      prDay &&
      prEntery &&
      uploadDocument &&
      // Validator.validatePostalCode(postalCode) &&
      // Validator.validateTextInput(address1) &&
      // Validator.validateTextInput(address2) &&
      // Validator.validateTextInput(address3) &&
      countryOfWorkValue
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
        nationality: countryName,
        citizenship: citizenshipValue,
        country_of_work: countryOfWorkValue,
        country_code: selectedCountry,
        phone_no: `${callingCode}`,
        office_no: `${officeCallingCode}`,
        home_no: `${homeCallingCode}`,
        photo:
          uploadDoc?.url || employeeProfile?.staff_personal_infos[0]?.photo,
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
      dispatch.employees.setPersonalInfo({token, data, id: user?.id});
    } else {
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={styles.containerView} key={count}>
      <Header
        isblank
        label={
          employeeProfile?.staff_personal_infos[0]?.firstName +
            ' ' +
            employeeProfile?.staff_personal_infos[0]?.lastName || ''
        }
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
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

        <TouchableOpacity
          onPress={changeStatusPress}
          style={[
            styles.statusBtn,
            {
              backgroundColor:
                data == 'Contract'
                  ? '#A26565'
                  : data == 'Part-Time'
                  ? '#CFB87C'
                  : data == 'Full-Time'
                  ? '#69846e'
                  : data == 'Internship'
                  ? '#697184'
                  : '#69846e',
            },
          ]}>
          <Text style={styles.statusTxt}>{data || 'Select Status'}</Text>
          <Icon
            name={'edit'}
            type={'materialicons'}
            color={Colors.white}
            size={styles.editIcon}
          />
        </TouchableOpacity>

        <PropfileButton
          isProfile={true}
          documentBtnPress={documentBtnPress}
          employmentDetails={employmentDetails}
          entitlementsBtnPress={entitlementsBtnPress}
        />

        <PersonalDetails
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
          nationalityArr={nationalityArr}
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
          day={day}
          prDay={prDay}
          prEntryDay={prEntery}
          citizenModal={citizenModal}
          handleDocumentSelection={handleDocumentSelection}
          removeBtnPress={removeBtnPress}
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
          isError={isError}
          address1={address1}
          address2={address2}
          address3={address3}
          postalCode={postalCode}
          countryName={countryName}
          countryModal={countryModal}
          addressType={addressType}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          setAddressType={setAddressType}
          selectedCountry={selectedCountry}
          setAddress1={setAddress1}
          setAddress2={setAddress2}
          setAddress3={setAddress3}
          setPostalCode={setPostalCode}
          selectCountryCode={selectCountryCode}
          onClose={() => {
            setCountryModal(false);
            setCount(count + 1);
          }}
          countryBtn={() => {
            setCountryModal(true), setCount(count + 1);
          }}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          label={'Save'}
          submitBtn={submitBtn}
          saveLoading={isPersonalLoading.setPersonalInfo}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <ChangeStatus
          isStatusError={isStatusError}
          isStatusModalVisible={isStatusModalVisible}
          changeStatusValue={changeStatusValue}
          setChangeStatusValue={setChangeStatusValue}
          modalClose={modalClose}
          saveBtn={saveBtn}
          saveLoading={isStatusLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmpProfile;
