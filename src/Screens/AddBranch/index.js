import Modal from 'react-native-modal';
import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropShadow from 'react-native-drop-shadow';
import { useDispatch, useSelector } from 'react-redux';
// import {LeafletView} from 'react-native-leaflet-view';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Header from '../../component/Header';
import BillingAddress from './BillingAddress';
import SaveCancelBtn from '../../component/SaveCancelBtn';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';
import Colors from '../../theme';

function AddBranches({ route, navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [checkInRadius, setCheckInRadius] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryModal, setCountryModal] = useState(false);
  const [companyValue, setCompanyValue] = useState('');
  const [companyArr, setCompanyArr] = useState('');
  const [count, setCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lat, setLatitude] = useState(1.3521);
  const [lng, setLongitude] = useState(103.8198);

  const isLoading = useSelector(
    state => state.loading.effects.branch.setBranch,
  );
  const isEditLoading = useSelector(
    state => state.loading.effects.branch.editBranch,
  );

  const token = useSelector(state => state.session?.token);
  const addBranch = useSelector(state => state.branch?.addBranch);
  const companyData = useSelector(state => state.organisations?.viewOrg);
  const edit = useSelector(state => state.branch?.editBranch);

  useEffect(() => {
    // dispatch.organisations.getOrganisations({token});
  }, []);

  useEffect(() => {
    if (companyData) {
      let arr = companyData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({ label: arr[i].org_name, value: arr[i].id });
      }
      setCompanyArr(dropDownArr);
    }
  }, [companyData]);

  useEffect(() => {
    if (addBranch?.status == 200 || edit?.status == 200) {
      cancelBtn();
      dispatch.branch.saveBranch(null);
      dispatch.branch.saveEditBranch(null);
    }
  }, [addBranch || edit]);

  useEffect(() => {
    setCompanyValue(editData?.organisationId || '');
    setBranchName(editData?.branch_name || '');
    setPostalCode(editData?.postal?.toString() || '');
    setCheckInRadius(editData?.checkin_radius?.toString() || '');
    setAddress1(editData?.add_line1 || '');
    setAddress2(editData?.add_line2 || '');
    setAddress3(editData?.add_line3 || '');
    setCountryName(editData?.country || '');
  }, [editData, isFocused]);

  const selectCountryCode = country => {
    setSelectedCountry(country.cca2);
    setCountryName(country.name);
  };

  const onSaveBtnPress = () => {
    if (
      // companyValue != '' &&
      branchName != '' &&
      postalCode != '' &&
      address1 != '' &&
      // address2 != '' &&
      // address3 != '' &&
      countryName != '' &&
      checkInRadius != ''
    ) {
      let data = {
        // organisationId: companyValue,
        branch_name: branchName,
        checkin_radius: parseFloat(checkInRadius),
        postal: parseFloat(postalCode),
        add_line1: address1,
        add_line2: address2,
        add_line3: address3,
        country: countryName,
      };

      isEdit
        ? dispatch.branch.editBranch({ token, data, id: editData?.id })
        : dispatch.branch.setBranch({ token, data });
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const onClose = () => {
    setCountryModal(false);
    setCount(count + 1);
  };

  const countryBtn = () => {
    setCountryModal(true);
    setCount(count + 1);
  };

  const cancelBtn = () => {
    setCompanyValue('');
    setBranchName('');
    setAddress1('');
    setAddress2('');
    setAddress3('');
    setCheckInRadius('');
    setCountryName('');
    setPostalCode('');
    setLatitude(1.3521);
    setLongitude(103.8198);
    setSelectedCountry('');
    setCount(count + 1);
    navigation.navigate('ViewBranch');
  };

  const submitBtn = () => {
    onSaveBtnPress();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Branches'}
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
          description1={'Add branches for attendance taking '}
          description2={'within the company here.'}
          description3={'Fill in the respective fields.'}
        />

        <BillingAddress
          count={count}
          isView={isView}
          isError={isError}
          companyData={companyArr}
          companyValue={companyValue}
          setCompanyValue={setCompanyValue}
          address1={address1}
          address2={address2}
          address3={address3}
          postalCode={postalCode}
          branchName={branchName}
          countryName={countryName}
          countryModal={countryModal}
          checkInRadius={checkInRadius}
          selectedCountry={selectedCountry}
          setAddress1={setAddress1}
          setAddress2={setAddress2}
          setAddress3={setAddress3}
          setBranchName={setBranchName}
          setPostalCode={setPostalCode}
          setCheckInRadius={setCheckInRadius}
          selectCountryCode={selectCountryCode}
          onClose={onClose}
          setIsModalVisible={setIsModalVisible}
          countryBtn={countryBtn}
        />

        <DropShadow style={styles.mapView}>
          {/* <LeafletView mapCenterPosition={{lat: lat, lng: lng}} /> */}
        </DropShadow>

        <SaveCancelBtn
          label={'Save'}
          cancelBtn={cancelBtn}
          submitBtn={submitBtn}
          saveLoading={isLoading || isEditLoading}
        />
      </KeyboardAwareScrollView>
      <Modal
        backdropOpacity={0.7}
        backdropColor={Colors.black}
        isVisible={isModalVisible}
        animationType="slideInUp"
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}
        onBackButtonPress={() => { }}
        transparent={true}>
        <View
          style={[
            styles.userNameTextInput1,
            {
              marginRight: 0,
              width: '100%',
              height: '100%',
              backgroundColor: null,
            },
          ]}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details) => {
              console.log(data);
              setAddress1(data.description);
              setLongitude(details.geometry.location.lng);
              setLatitude(details.geometry.location.lat);
              setIsModalVisible(false);
              setCount(count + 1);
            }}
            query={{
              key: 'AIzaSyBtd4g5W2sMIx8WRg4wPcp14ZWsB77kL4g',
              language: 'en',
            }}
            renderRow={rowData => {
              const title = rowData.structured_formatting.main_text;
              const address = rowData.structured_formatting.secondary_text;
              return (
                <View style={[styles.listViews, {}]}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000',
                    }}>
                    {title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'grey',
                    }}>
                    {address}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default AddBranches;
