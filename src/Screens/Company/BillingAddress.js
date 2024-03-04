import React, { Fragment } from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import Colors from '../../theme';
import Box from '../../component/Box';
import Validator from '../../utility/validator';
import TextInput from '../../component/TextInput';

import styles from './style';

const BillingAddress = props => {
  return (
    <Box
      label={'Billing Address'}
      children={
        <Fragment>
          <Text style={styles.userNameTxt}>Address Line*</Text>
          <GooglePlacesAutocomplete
            placeholder='Enter Address Line…'
            fetchDetails={true}
            getDefaultValue={props.address1}
            textInputProps={{
              value: props.address1,
              onChangeText: (text) => { props.setAddress1(text) }

            }}
            onPress={(data, details = null) => {
              props.setAddress(details)
            }}
            styles={{
              textInput: [styles.userNameTextInput, { borderWidth: props.isError && props.address1 == '' ? 2 : 0, borderColor: props.isError && props.address1 == '' ? 'red' : null }]
            }}
            query={{
              key: 'AIzaSyC8ajL-D9GZ1bkiFT94-AORTuC8-Z6Knf8',
              language: 'en',
            }}
            renderRow={rowData => {
              const title = rowData.structured_formatting.main_text;
              const address = rowData.structured_formatting.secondary_text;
              return (
                <View style={styles.listViews}>
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
          // style={styles.userNameTextInput}
          />
          {/* <TextInput
            onChangeText={props.setAddress1}
            value={props.address1}
            isError={props.isError && props.address1 == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Address Line 1…'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Address Line 1'}
            isValidationError={
              props.address1 != '' &&
                Validator.validateTextInput(props.address1) == false
                ? true
                : false
            }
          /> */}
          <Text style={styles.userNameTxt}>Postal Code*</Text>
          <TextInput
            onChangeText={props.setPostalCode}
            value={props.postalCode}
            isError={props.isError && props.postalCode == ''}
            style={styles.userNameTextInput}
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

          {/* <Text style={styles.userNameTxt}>Address Line 2*</Text>

          <TextInput
            onChangeText={props.setAddress2}
            value={props.address2}
            isError={props.isError && props.address2 == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Address Line 2…'}
            placeholderTextColor={Colors.lightRed}
          />

          <Text style={styles.userNameTxt}>Address Line 3*</Text>

          <TextInput
            onChangeText={props.setAddress3}
            value={props.address3}
            isError={props.isError && props.address3 == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Address Line 3…'}
            placeholderTextColor={Colors.lightRed}
          /> */}

          <Text style={styles.userNameTxt}>Country*</Text>

          <TouchableOpacity
            onPress={props.countryBtn}
            style={[
              styles.userNameTextInput,
              styles.countryPickerMainView,
              props.isError && props.countryName == '' && styles.error,
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
              // isError={props.isError && props.selectedCountry == ''}
              />

              <Text
                style={[
                  styles.countryName,
                  { color: props.countryName ? Colors.sBlack : Colors.lightRed },
                ]}>
                {props.countryName ? props.countryName : 'Select Country…'}
              </Text>
            </View>
            {/* {props.countryName&& <Text>hhhhhh</Text>} */}
            {console.log('countryoriogin', props.countryName)}

            <Icon
              name={'chevron-small-down'}
              type={'entypo'}
              color={Colors.lightRed}
              style={{ marginLeft: 4.5 }}
            />
          </TouchableOpacity>
        </Fragment>
      }
    />
  );
};
export default BillingAddress;
