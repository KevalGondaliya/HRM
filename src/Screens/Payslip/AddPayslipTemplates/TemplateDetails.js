import React from 'react';
import {Icon} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import {View, Text, TouchableOpacity} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';
import Validator from '../../../utility/validator';
// import DropDowns from '../../../component/DropDowns';

import styles from './style';

const TemplateDetails = props => {
  // console.log("props.companyValueprops.companyValue222222", props.companyValue);
  return (
    <Box
      label={'Payslip Details'}
      children={
        <View>
          {/* <DropDowns
            label={'Company*'}
            data={props.companyArr || []}
            placeholder="Select Company..."
            value={props.companyValue}
            onChange={item => {
              props.setCompanyValue(item.value);
            }}
            style={props.isError && props.companyValue == '' && styles.error}
            disable={props.isView ? true : false}
            isError={props.isError && props.companyValue == ''}
          /> */}

          <Text style={styles.userNameTxt}>Payslip Template Name*</Text>

          <TextInput
            onChangeText={props.setTemplateName}
            value={props.templateName}
            isError={props.isError && props.templateName == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Payslip Template Name…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
            validationPlaceHolder={'Payslip Template Name'}
            isValidationError={
              props.templateName != '' &&
              Validator.validateTextInput(props.templateName) == false
                ? true
                : false
            }
          />

          <Text style={[styles.userNameTxt]}>Country*</Text>

          <TouchableOpacity
            onPress={props.countryBtn}
            disabled={props.isView ? true : false}
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
                // isError={isError}
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
        </View>
      }
    />
  );
};

export default TemplateDetails;
