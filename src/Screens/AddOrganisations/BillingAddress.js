import React from 'react';
import {Icon} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import {View, Text, TouchableOpacity} from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import TextInput from '../../component/TextInput';

import styles from './style';

const BillingAddress = ({
  count,
  isView,
  onClose,
  isError,
  address1,
  address2,
  address3,
  postalCode,
  countryBtn,
  setAddress1,
  setAddress2,
  setAddress3,
  countryName,
  countryModal,
  setPostalCode,
  selectedCountry,
  selectCountryCode,
}) => {
  {
    console.log('countryName', countryName === null);
  }
  return (
    <Box
      label={'Billing Address'}
      children={
        <View>
          <Text style={styles.userNameTxt}>Postal Code*</Text>

          <TextInput
            onChangeText={setPostalCode}
            value={postalCode}
            isError={isError && postalCode == ''}
            style={styles.userNameTextInput}
            editable={isView}
            placeholder={'Enter Postal Code…'}
            placeholderTextColor={Colors.lightRed}
            keyboardType={'numeric'}
          />

          <Text style={styles.userNameTxt}>Address Line 1*</Text>

          <TextInput
            onChangeText={setAddress1}
            value={address1}
            isError={isError && address1 == ''}
            style={styles.userNameTextInput}
            editable={isView}
            placeholder={'Enter Address Line 1…'}
            placeholderTextColor={Colors.lightRed}
          />

          <Text style={styles.userNameTxt}>Address Line 2*</Text>

          <TextInput
            onChangeText={setAddress2}
            value={address2}
            isError={isError && address2 == ''}
            style={styles.userNameTextInput}
            editable={isView}
            placeholder={'Enter Address Line 2…'}
            placeholderTextColor={Colors.lightRed}
          />

          <Text style={styles.userNameTxt}>Address Line 3*</Text>

          <TextInput
            onChangeText={setAddress3}
            value={address3}
            // isError={isError && address3 == ''}
            style={styles.userNameTextInput}
            editable={isView}
            placeholder={'Enter Address Line 3…'}
            placeholderTextColor={Colors.lightRed}
          />

          <Text style={styles.userNameTxt}>Country*</Text>

          <TouchableOpacity
            onPress={countryBtn}
            disabled={isView == false && true}
            style={[
              styles.userNameTextInput,
              styles.countryPickerMainView,
              isError && countryName == '' && styles.error,
            ]}>
            <View style={styles.countryPickerView} key={count}>
              <CountryPicker
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
                  {color: countryName ? Colors.sBlack : Colors.lightRed},
                ]}>
                {countryName ? countryName : 'Select Country…'}
              </Text>
            </View>
            <Icon
              name={'chevron-small-down'}
              type={'entypo'}
              color={Colors.lightRed}
              style={styles.downArrow}
            />
          </TouchableOpacity>
        </View>
      }
    />
  );
};
export default BillingAddress;
