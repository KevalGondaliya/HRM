import React from 'react';
import {View, Text} from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import Button from '../../component/Button';
import DropDowns from '../../component/DropDowns';
import TextInput from '../../component/TextInput';
import {businessType, industrySectorType} from '../../utility/constant';

import styles from './style';

const CompanyDetails = ({
  isError,
  isView,
  removeBtn,
  isSpinner,
  gstTypeArr,
  gstTypeValue,
  uploadDocument,
  setGstTypeValue,
  organisationName,
  industryTypeValue,
  businessTypeValue,
  registrationNumber,
  setOrganisationName,
  setIndustryTypeValue,
  setBusinessTypeValue,
  setRegistrationNumber,
  handleDocumentSelection,
  companyData,
  companyValue,
  setCompanyValue,
}) => {
  return (
    <Box
      label={'Company Details'}
      children={
        <View>
          <DropDowns
            label={'Company*'}
            data={companyData}
            placeholder="Select Company..."
            value={companyValue}
            onChange={item => {
              setCompanyValue(item.value);
            }}
            style={isError && companyValue == '' && styles.error}
          />

          <Text style={styles.userNameTxt}>Organisation Name*</Text>

          <TextInput
            onChangeText={setOrganisationName}
            value={organisationName}
            isError={isError && organisationName == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Organisation Name…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView}
          />

          <DropDowns
            label={'Business Type*'}
            data={businessType}
            placeholder="Select Business Type..."
            value={businessTypeValue}
            onChange={item => {
              setBusinessTypeValue(item.value);
            }}
            style={isError && businessTypeValue == '' && styles.error}
            disabled={isView == false && true}
          />

          <Text style={styles.userNameTxt}>Business Registration Number*</Text>

          <TextInput
            onChangeText={setRegistrationNumber}
            value={registrationNumber}
            editable={isView}
            style={styles.userNameTextInput}
            placeholder={'Enter Business Registration Number...'}
            isError={isError && registrationNumber == ''}
            placeholderTextColor={Colors.lightRed}
          />

          <DropDowns
            label={'Industry Type*'}
            placeholder="Select Industry Type..."
            data={industrySectorType}
            value={industryTypeValue}
            onChange={item => {
              setIndustryTypeValue(item.value);
            }}
            style={isError && industryTypeValue == '' && styles.error}
            disabled={isView == false && true}
          />

          <DropDowns
            label={'GST Registered?*'}
            placeholder="Select One…"
            data={gstTypeArr}
            value={gstTypeValue}
            onChange={item => {
              setGstTypeValue(item.value);
            }}
            style={isError && gstTypeValue == '' && styles.error}
            disabled={isView == false && true}
          />

          <Text style={styles.userNameTxt}>Upload Logo*</Text>

          <TextInput
            value={uploadDocument}
            isError={isError && uploadDocument == ''}
            style={styles.userNameTextInput}
            editable={false}
            placeholder={'Upload Logo...'}
            placeholderTextColor={Colors.lightRed}
          />

          <View style={styles.browseBtnView}>
            <Button
              disabled={isView == false && true}
              label={'Browse Files…'}
              btnStyle={styles.browseBtn}
              onPress={handleDocumentSelection}
              labelStyle={styles.browseTxt}
              isSpinner={isSpinner}
            />

            <Button
              label={'Remove'}
              disabled={isView == false && true}
              btnStyle={styles.removeBtn}
              labelStyle={styles.browseTxt}
              onPress={removeBtn}
            />
          </View>
        </View>
      }
    />
  );
};
export default CompanyDetails;
