import React from 'react';
import {Text, View} from 'react-native';

import Box from '../../component/Box';
import Button from '../../component/Button';
import DropDowns from '../../component/DropDowns';
import TextInput from '../../component/TextInput';
import Colors from '../../theme';
import {monthData} from '../../utility/constant';
import Validator from '../../utility/validator';
// import Validator from '../../../utility/validator';

import styles from './style';

const CompanyDetails = props => {
  return (
    <Box
      label={'Company Details'}
      children={
        <View>
          <Text style={styles.userNameTxt}>Company Name*</Text>

          <TextInput
            onChangeText={props.setCompanyName}
            value={props.companyName}
            isError={props.isError && props.companyName == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Company Name…'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Company Name'}
            isValidationError={
              props.companyName != '' &&
              Validator.validateTextInput(props.companyName) == false
                ? true
                : false
            }
          />
          {/* <Text style={styles.userNameTxt}>Sub Domain*</Text>

          <TextInput
            onChangeText={props.setSubDomain}
            value={props.subDomain}
            isError={props.isError && props.subDomain == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Sub Domain…'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Sub Domain'}
            isValidationError={
              props.subDomain != '' &&
              Validator.validateTextInput(props.subDomain) == false
                ? true
                : false
            }
          /> */}

          {/* <DropDowns
            label={'Business Type*'}
            data={businessType}
            placeholder="Select Business Type..."
            value={props.businessTypeValue}
            onChange={item => {
              props.setBusinessTypeValue(item.value);
            }}
            isError={props.isError && props.businessTypeValue == ''}
          /> */}

          {/* <DropDowns
            label={'Industry Type*'}
            placeholder="Select Industry Type..."
            data={industrySectorType}
            value={props.industryTypeValue}
            onChange={item => {
              props.setIndustryTypeValue(item.value);
            }}
            isError={props.isError && props.industryTypeValue == ''}
          /> */}

          <DropDowns
            label={'  Financial Month*'}
            placeholder="Select Month..."
            data={monthData}
            value={props.month}
            onChange={item => {
              props.setMonth(item.value);
            }}
            isError={props.isError && props.month == ''}
          />
          {/* <View style={styles.dropDownMainView}>
            <View style={styles.width48}>
              <DropDowns
                label={'Month*'}
                placeholder="Select Month..."
                data={monthData}
                value={props.month}
                onChange={item => {
                  props.setMonth(item.value);
                }}
                isError={props.isError && props.month == ''}
              />
            </View>

            <View style={styles.width48}>
              <DropDowns
                label={'Year Established*'}
                placeholder="Select Year…"
                data={props.yearArr}
                value={props.year}
                onChange={item => {
                  props.setYear(item.value);
                }}
                isError={props.isError && props.year == ''}
              />
            </View>
          </View> */}

          {/* <Text style={styles.userNameTxt}>Company Number*</Text>

          <View style={styles.callingCodeView}>
            <PhoneInputs
              isError={props.isError && props.callingCode == ''}
              formattedValue={props.callingCode}
              setFormattedValue={props.setCallingCode}
              placeholder={'Enter Number...'}
            />
          </View> */}

          <Text style={styles.userNameTxt}>Company Email*</Text>

          <TextInput
            onChangeText={props.setEmail}
            value={props.email}
            keyboardType={'email-address'}
            isError={
              props.isError && Validator.validateEmail(props.email) == ''
            }
            style={styles.userNameTextInput}
            placeholder={'Enter Company Email...'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Company Email'}
            isValidationError={
              props.email != '' &&
              Validator.validateTextInput(props.email) == false
                ? true
                : false
            }
          />

          <DropDowns
            label={'GST Registered?*'}
            placeholder="Select One…"
            data={props.gstTypeArr}
            value={props.gstTypeValue}
            onChange={item => {
              props.setGstTypeValue(item.value);
            }}
            isError={props.isError && props.gstTypeValue == ''}
          />

          {props.gstTypeValue && (
            <>
              <Text style={styles.userNameTxt}>GST Number*</Text>

              <TextInput
                onChangeText={props.setGSTNumber}
                value={props.gstNumber}
                style={styles.userNameTextInput}
                placeholder={'Enter GST Number…'}
                placeholderTextColor={Colors.lightRed}
                isError={props.isError && props.gstNumber == ''}
                maxLength={15}
                validationPlaceHolder={'GST Number'}
                isValidationError={
                  props.gstNumber != '' &&
                  Validator.validateTextInput(props.gstNumber) == false
                    ? true
                    : false
                }
              />
            </>
          )}

          <Text style={styles.userNameTxt}>Upload Logo*</Text>

          <TextInput
            value={props.uploadDocument}
            isError={props.isError && props.uploadDocument == ''}
            style={styles.userNameTextInput}
            editable={false}
            placeholder={'Upload Logo...'}
            placeholderTextColor={Colors.lightRed}
          />

          <View style={{flexDirection: 'row'}}>
            <Button
              label={'Browse Files…'}
              btnStyle={styles.browseBtn}
              onPress={props.handleDocumentSelection}
              labelStyle={styles.browseTxt}
              isSpinner={props.isSpinner}
            />

            <Button
              label={'Remove'}
              btnStyle={styles.removeBtn}
              labelStyle={styles.browseTxt}
              onPress={props.removeBtnPress}
            />
          </View>
        </View>
      }
    />
  );
};

export default CompanyDetails;
