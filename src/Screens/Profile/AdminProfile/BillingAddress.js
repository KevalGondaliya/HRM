import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import Box from '../../../component/Box';
import Country from '../../../component/Country';
import DropDowns from '../../../component/DropDowns';
import TextInput from '../../../component/TextInput';
import {addressType} from '../../../dummyData';
import Colors from '../../../theme';
import Validator from '../../../utility/validator';

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
                borderWidth: props.isError && props.postalCode == '' ? 2 : 0,
                borderColor:
                  props.isError && props.postalCode == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Postal Code…'}
            placeholderTextColor={Colors.lightRed}
            keyboardType={'numeric'}
            editable={props.isView ? false : true}
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
                borderWidth: props.isError && props.address1 == '' ? 2 : 0,
                borderColor:
                  props.isError && props.address1 == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Address Line 1…'}
            editable={props.isView ? false : true}
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
            editable={props.isView ? false : true}
            style={[
              styles.userNameTextInput,
              {
                borderWidth: props.isError && props.address2 == '' ? 2 : 0,
                borderColor:
                  props.isError && props.address2 == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Address Line 2…'}
            placeholderTextColor={Colors.lightRed}
            isError={props.isError && props.address2 === ''}
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
            editable={props.isView ? false : true}
            style={[
              styles.userNameTextInput,
              {
                borderWidth: props.isError && props.address3 == '' ? 2 : 0,
                borderColor:
                  props.isError && props.address3 == '' ? 'red' : null,
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

          <Country
            onPress={props.countryBtn}
            onSelect={country => {
              props.selectCountryCode(country);
            }}
            countryName={props.countryName}
            visible={props.countryModal}
            onClose={props.onClose}
            countryCode={props.selectedCountry}
            // isError={props.isError}
            key={props.count}
            disable={props.isView ? true : false}
          />

          {/* {props.addressType == 'Foreign' ? (
            <DropDowns
              label={'Country Code'}
              placeholder={'Select Country Code…'}
              data={citizenshipCode || []}
              value={props.countryCode}
              onChange={item => {
                props.setCountryCode(item.value);
              }}
              disable={props.isView ? true : false}
            />
          ) : (
            // <TextInput
            //   onChangeText={props.setCountryCode}
            //   value={props.countryCode}
            //   style={[styles.userNameTextInput]}
            //   placeholder={'Enter Country Code…'}
            //   editable={props.isView ? false : true}
            //   placeholderTextColor={Colors.lightRed}
            //   validationPlaceHolder={'Postal Code'}
            //   maxLength={3}
            //   isValidationError={
            //     props.countryCode != '' &&
            //       (props.countryName === 'Singapore'
            //         ? Validator.validateSingaporePattern(props.countryCode)
            //         : Validator.validateOtherPattern(props.countryCode)) ==
            //       false
            //       ? true
            //       : false
            //   }
            //   keyboardType={'numeric'}
            // />

              )} */}
          {props.addressType == 'Foreign' && (
            <>
              <Text style={styles.userNameTxt}>Country Code</Text>
              <View
                style={[
                  styles.userNameTextInput,
                  {justifyContent: 'center', paddingHorizontal: 18},
                ]}>
                <Text style={{fontSize: 13, color: '#000'}}>
                  {props.countryCode}
                </Text>
              </View>
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
