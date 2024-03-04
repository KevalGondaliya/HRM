import React, { Fragment } from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

import Colors from '../../theme';
import Box from '../../component/Box';
import TextInput from '../../component/TextInput';
import DropDowns from '../../component/DropDowns';

import styles from './style';

const BillingAddress = ({
  count,
  isView,
  isError,
  onClose,
  address1,
  address3,
  address2,
  countryBtn,
  branchName,
  postalCode,
  setAddress3,
  setAddress2,
  countryName,
  setAddress1,
  countryModal,
  setPostalCode,
  setBranchName,
  checkInRadius,
  selectedCountry,
  setCheckInRadius,
  selectCountryCode,
  companyData,
  companyValue,
  setCompanyValue,
  setIsModalVisible,
}) => {
  return (
    <Box
      label={'Billing Address'}
      children={
        <Fragment>
          <Text style={styles.userNameTxt}>Branch Name*</Text>

          <TextInput
            onChangeText={setBranchName}
            value={branchName}
            isError={isError && branchName == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Branch Name...'}
            placeholderTextColor={Colors.lightRed}
            editable={isView && false}
          />

          <Text style={styles.userNameTxt}>Country*</Text>

          <TouchableOpacity
            disabled={isView && true}
            onPress={countryBtn}
            style={[
              styles.userNameTextInput,
              styles.countryPickerMainView,
              isError && countryName == '' && styles.error,
            ]}>
            <View style={styles.countryPickerView} key={count}
              isError={isError}>
              <CountryPicker
                disabled={isView && false}
                withCallingCode={false}
                countryCode={selectedCountry}
                withFlag={true}
                withFilter={true}
                withModal={true}
                onSelect={country => {
                  selectCountryCode(country);
                }}
                visible={countryModal}
                onClose={onClose}
                placeholder={''}

              />

              <Text
                style={[
                  styles.countryName,
                  { color: countryName ? Colors.sBlack : Colors.lightRed },
                ]}>
                {countryName ? countryName : 'Select Country…'}
              </Text>
            </View>

            <Icon
              name={'chevron-small-down'}
              type={'entypo'}
              color={Colors.lightRed}
              style={{ marginLeft: 4.5 }}
            />
          </TouchableOpacity>

          <Text style={styles.userNameTxt}>Check In Radius*</Text>

          <TextInput
            onChangeText={setCheckInRadius}
            value={checkInRadius}
            isError={isError && checkInRadius == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Check In Radius…'}
            placeholderTextColor={Colors.lightRed}
            keyboardType={'numeric'}
            editable={isView && false}
          />

          <Text style={styles.userNameTxt}>Postal Code*</Text>

          <TextInput
            onChangeText={setPostalCode}
            value={postalCode}
            isError={isError && postalCode == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Postal Code…'}
            placeholderTextColor={Colors.lightRed}
            keyboardType={'numeric'}
            editable={isView && false}
          />

          <Text style={styles.userNameTxt}>Address *</Text>
          <TouchableOpacity
            disabled={isView && true}
            onPress={() => {
              setIsModalVisible(true);
            }}>
            <TextInput
              onChangeText={setAddress1}
              value={address1}
              isError={isError && address1 == ''}
              style={styles.userNameTextInput}
              placeholder={'Enter Address Line 1…'}
              placeholderTextColor={Colors.lightRed}
              editable={false}
            />
          </TouchableOpacity>

          <Text style={styles.userNameTxt}>Address Line 2*</Text>

          <TextInput
            onChangeText={setAddress2}
            value={address2}
            isError={isError && address2 == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Address Line 2…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView && false}
          />

          <Text style={styles.userNameTxt}>Address Line 3*</Text>

          <TextInput
            onChangeText={setAddress3}
            value={address3}
            isError={isError && address3 == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Address Line 3…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView && false}
          />
        </Fragment>
      }
    />
  );
};

export default BillingAddress;
