import React, {Fragment} from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, TouchableOpacity} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';

import styles from './style';

const BillingAddress = props => {
  return (
    <Box
      label={'Billing Address'}
      children={
        <Fragment>
          <Text style={styles.userNameTxt}>Postal Code*</Text>

          <TextInput
            onChangeText={props.setPostalCode}
            value={props.postalCode}
            isError={props.isError && props.postalCode == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Postal Code…'}
            placeholderTextColor={Colors.lightRed}
            keyboardType={'numeric'}
          />

          <Text style={styles.userNameTxt}>Address Line 1*</Text>

          <TextInput
            onChangeText={props.setAddress1}
            value={props.address1}
            isError={props.isError && props.address1 == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Address Line 1…'}
            placeholderTextColor={Colors.lightRed}
          />

          <Text style={styles.userNameTxt}>Address Line 2*</Text>

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
          />

          <Text style={styles.userNameTxt}>Country*</Text>

          <TouchableOpacity
            onPress={props.countryBtn}
            style={[
              styles.userNameTextInput,
              styles.countryPickerMainView,
              props.isError && props.countryName == '' && styles.error,
              styles.countryStyle,
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
        </Fragment>
      }
    />
  );
};

export default BillingAddress;
