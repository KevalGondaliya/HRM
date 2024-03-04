import React from 'react';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import CountryPicker from 'react-native-country-picker-modal';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Validator from '../../../utility/validator';
import TextInput from '../../../component/TextInput';
import DropDowns from '../../../component/DropDowns';
import {addressType} from '../../../dummyData';

const BillingAddress = props => {
  return (
    <Box
      label={'Home Address'}
      children={
        <View style={{paddingBottom: scale(12)}}>
          <DropDowns
            label={'Address Type'}
            placeholder="Select Address Type…"
            data={addressType}
            value={props.addressType}
            onChange={item => {
              props.setAddressType(item.value);
            }}
            disable={props.isView ? true : false}
          />

          <Text style={styles.userNameTxt}>Postal Code*</Text>

          <TextInput
            onChangeText={props.setPostalCode}
            value={props.postalCode}
            style={[
              styles.userNameTextInput,
              {
                // borderWidth: props.isError && props.postalCode == '' ? 2 : 0,
                // borderColor:
                //   props.isError && props.postalCode == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Postal Code…'}
            placeholderTextColor={Colors.lightRed}
            keyboardType={'numeric'}
            maxLength={6}
            validationPlaceHolder={'Postal Code'}
            isValidationError={
              props.postalCode != '' &&
              Validator.validatePostalCode(props.postalCode) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Address Line 1*</Text>

          <TextInput
            onChangeText={props.setAddress1}
            value={props.address1}
            style={[
              styles.userNameTextInput,
              {
                // borderWidth: props.isError && props.address1 == '' ? 2 : 0,
                // borderColor:
                //   props.isError && props.address1 == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Address Line 1…'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Address Line 1'}
            isValidationError={
              props.address1 != '' &&
              Validator.validateTextInput(props.address1) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Address Line 2*</Text>

          <TextInput
            onChangeText={props.setAddress2}
            value={props.address2}
            style={[
              styles.userNameTextInput,
              {
                // borderWidth: props.isError && props.address2 == '' ? 2 : 0,
                // borderColor:
                //   props.isError && props.address2 == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Address Line 2…'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Address Line 2'}
            isValidationError={
              props.address2 != '' &&
              Validator.validateTextInput(props.address2) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Address Line 3*</Text>

          <TextInput
            onChangeText={props.setAddress3}
            value={props.address3}
            style={[
              styles.userNameTextInput,
              {
                // borderWidth: props.isError && props.address3 == '' ? 2 : 0,
                // borderColor:
                //   props.isError && props.address3 == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Address Line 3…'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Address Line 3'}
            isValidationError={
              props.address3 != '' &&
              Validator.validateTextInput(props.address3) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Country*</Text>

          <TouchableOpacity
            onPress={props.countryBtn}
            style={[
              styles.userNameTextInput,
              styles.countryPickerMainView,
              {
                // borderWidth: props.isError && props.countryName == '' ? 2 : 0,
                // borderColor:
                //   props.isError && props.countryName == '' ? 'red' : null,
                // marginBottom: scale(5),
              },
            ]}>
            <View style={styles.countryPickerView} key={props.count}>
              <CountryPicker
                withCallingCode={false}
                countryCode={props.selectedCountry}
                withFlag={true}
                withFilter={true}
                withModal={true}
                onSelect={country => {
                  props.selectCountryCode(country);
                }}
                visible={props.countryModal}
                onClose={props.onClose}
                placeholder={''}
              />

              <Text
                style={[
                  styles.countryName,
                  {color: props.countryName ? Colors.sBlack : Colors.lightRed},
                ]}>
                {props.countryName ? props.countryName : 'Select Country…'}
              </Text>
            </View>

            <Icon
              name={'chevron-small-down'}
              type={'entypo'}
              color={Colors.lightRed}
              style={{marginLeft: 4.5}}
            />
          </TouchableOpacity>

          {props.addressType == 'F' && (
            <>
              <Text style={styles.userNameTxt}>Country Code</Text>

              <TextInput
                onChangeText={props.setCountryCode}
                value={props.countryCode}
                style={[styles.userNameTextInput]}
                placeholder={'Enter Country Code…'}
                editable={props.isView ? false : true}
                placeholderTextColor={Colors.lightRed}
                validationPlaceHolder={'Postal Code'}
                maxLength={3}
                isValidationError={
                  props.countryCode != '' &&
                  (props.countryName === 'Singapore'
                    ? Validator.validateSingaporePattern(props.countryCode)
                    : Validator.validateOtherPattern(props.countryCode)) ==
                    false
                    ? true
                    : false
                }
                keyboardType={'numeric'}
              />
            </>
          )}
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  countryPickerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  countryPickerView: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(15),
  },
  countryName: {
    fontSize: 14,
    color: Colors.sBlack,
  },
});
export default BillingAddress;
