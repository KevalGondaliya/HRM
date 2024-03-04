import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import Box from '../../../component/Box';
import Button from '../../../component/Button';
import Country from '../../../component/Country';
import DateButton from '../../../component/DateButton';
import DropDowns from '../../../component/DropDowns';
import PhoneInputs from '../../../component/PhoneInput';
import TextInput from '../../../component/TextInput';
import {
  citizenshipArr,
  identificationTypeData,
  nationality,
} from '../../../dummyData';
import Colors from '../../../theme';
import Validator from '../../../utility/validator';

const PersonalDetails = props => {
  return (
    <Box
      label={'Personal Details'}
      children={
        <View>
          <View style={styles.firstNameMainView}>
            <View style={{width: '48.5%'}}>
              <Text style={styles.userNameTxt}>First Name*</Text>

              <TextInput
                onChangeText={props.setFirstName}
                value={props.firstName}
                isError={props.isError && props.firstName == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter First Name…'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isView ? false : true}
                validationPlaceHolder={'First Name'}
                isValidationError={
                  props.firstName != '' &&
                  Validator.validateTextInput(props.firstName) == false
                    ? true
                    : false
                }
              />
            </View>

            <View style={{width: '48%'}}>
              <Text style={styles.userNameTxt}>Last Name*</Text>

              <TextInput
                onChangeText={props.setLastName}
                value={props.lastName}
                isError={props.isError && props.lastName == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter Last Name…'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isView ? false : true}
                validationPlaceHolder={'Last Name'}
                isValidationError={
                  props.lastName != '' &&
                  Validator.validateTextInput(props.lastName) == false
                    ? true
                    : false
                }
              />
            </View>
          </View>

          <DropDowns
            label={'Select Identification Type*'}
            placeholder="Select Type…"
            data={identificationTypeData || []}
            value={props.industryTypeValue}
            onChange={item => {
              props.setIndustryTypeValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={
              props.isError && props.industryTypeValue == '' && styles.error
            }
            isError={props.isError && props.industryTypeValue == ''}
          />

          <Text style={styles.userNameTxt}>Identification Number*</Text>

          <TextInput
            onChangeText={props.setIdentificationNumber}
            value={props.identificationNumber}
            isError={props.isError && props.identificationNumber == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Identification Number…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView || props.isIdentificationId ? false : true}
            validationPlaceHolder={'Identification Number'}
            isValidationError={
              props.identificationNumber != '' &&
              Validator.validateTextInput(props.identificationNumber) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Personal Email*</Text>

          <TextInput
            onChangeText={props.setEmail}
            value={props.email}
            keyboardType={'email-address'}
            isError={props.isError && props.email == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Personal Email…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
            validationPlaceHolder={'Personal Email'}
            isValidationError={
              props.email != '' && Validator.validateEmail(props.email) == false
                ? true
                : false
            }
          />

          <DateButton
            date={props.day}
            isError={props.isError}
            onPress={props.onDobBtnPress}
            label={'Date of Birth*'}
            disabled={props.isView ? true : false}
          />

          <DropDowns
            label={'Marital Status*'}
            placeholder="Select Marital Status…"
            data={props.maritalStatusArr || []}
            value={props.maritalStatusValue}
            onChange={item => {
              props.setMaritalStatusValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={
              props.isError && props.maritalStatusValue == '' && styles.error
            }
            isError={props.isError && props.maritalStatusValue == ''}
          />

          <Text style={styles.userNameTxt}>Country Of Work*1</Text>
          <Country
            onPress={props.countryOfWorkBtn}
            onSelect={country => {
              props.selectCountryOfWorkCode(country);
            }}
            countryName={props.countryOfWorkName}
            visible={props.countryOfWorkModal}
            onClose={props.onCountryOfWorkClose}
            countryCode={props.selectedCountryOfWork}
            isError={props.isError}
            key={props.count}
            disable={props.isView ? true : false}
          />
          <DropDowns
            label={'Religion*'}
            placeholder="Select Religion…"
            data={props.religionArr || []}
            value={props.religionValue}
            onChange={item => {
              props.setReligionValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={props.isError && props.religionValue == '' && styles.error}
            isError={props.isError && props.religionValue == ''}
          />

          <View style={styles.firstNameMainView}>
            <View style={{width: '48%'}}>
              <DropDowns
                label={'Race*'}
                placeholder="Select Race…"
                data={props.raceArr || []}
                value={props.race}
                onChange={item => {
                  props.setRace(item.value);
                }}
                disable={props.isView ? true : false}
                style={props.isError && props.race == '' && styles.error}
                isError={props.isError && props.race == ''}
              />
            </View>

            <View style={{width: '49%'}}>
              <DropDowns
                label={'Gender*'}
                placeholder="Select Gender"
                data={props.genderArr || []}
                value={props.genderValue}
                onChange={item => {
                  props.setGender(item.value);
                }}
                isError={props.isError && props.genderValue == ''}
                disable={props.isView ? true : false}
                style={props.isError && props.genderValue == '' && styles.error}
              />
            </View>
          </View>

          <DropDowns
            label={'Nationality*'}
            placeholder="Select Nationality"
            data={nationality || []}
            value={props.nationalityName}
            onChange={item => {
              props.setNationalityName(item.value);
            }}
            disable={props.isView ? true : false}
            isError={props.isError && props.nationalityName == ''}
            style={props.isError && props.nationalityName == '' && styles.error}
          />

          <DropDowns
            label={'Citizenship*'}
            placeholder="Select Citizenship"
            data={citizenshipArr || []}
            value={props.citizenName}
            onChange={item => {
              props.setCitizenshipValue(item.value);
              props.selectCitizenCode(item.value);
            }}
            disable={props.isView ? true : false}
            style={props.isError && props.citizenName == '' && styles.error}
            isError={props.isError && props.citizenName == ''}
          />
          <Text style={styles.userNameTxt}>Phone Number*</Text>

          <View style={styles.callingCodeView}>
            <PhoneInputs
              isError={props.isError && props.callingCode == ''}
              formattedValue={props.callingCode}
              setFormattedValue={props.setCallingCode}
              placeholder={'Enter Number...'}
              disabled={props.isView ? true : false}
              isView={props.isView}
            />
          </View>

          <Text style={styles.userNameTxt}>Office Number*</Text>

          <View style={styles.callingCodeView}>
            <PhoneInputs
              // isError={props.isError && props.officeCallingCode == ''}
              formattedValue={props.officeCallingCode}
              setFormattedValue={props.setOfficeCallingCode}
              placeholder={'Enter Number...'}
              disabled={props.isView ? true : false}
            />
          </View>

          <Text style={styles.userNameTxt}>Home Number*</Text>

          <View style={styles.callingCodeView}>
            <PhoneInputs
              // isError={props.isError && props.homeCallingCode == ''}
              formattedValue={props.homeCallingCode}
              setFormattedValue={props.setHomeCallingCode}
              placeholder={'Enter Number...'}
              disabled={props.isView ? true : false}
            />
          </View>

          {props.nationalityName !== 'Singaporean' && (
            <View>
              <DateButton
                date={props.prDay}
                isError={props.isError}
                onPress={props.onPRBtnPress}
                label={'PR Obtain Date*'}
                disabled={props.isView ? true : false}
              />

              <DateButton
                date={props.prEntryDay}
                isError={props.isError}
                onPress={props.onPREntryBtnPress}
                label={'Re-Entry Permit Expiration*'}
                disabled={props.isView ? true : false}
              />
            </View>
          )}
          <Text style={styles.userNameTxt}>Upload Photo*</Text>

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
              disabled={props.isView ? true : false}
            />

            <Button
              label={'Remove'}
              btnStyle={styles.removeBtn}
              labelStyle={styles.browseTxt}
              onPress={props.removeBtnPress}
              disabled={props.isView ? true : false}
            />
          </View>
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

  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
  },

  removeBtn: {
    backgroundColor: Colors.grayishRed,
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  dropDownStyle: {
    paddingHorizontal: scale(10),
    marginBottom: scale(2),
  },
  browseTxt: {fontSize: scale(11)},
  mobileView: {marginRight: 0, width: '75%'},
  containerStyle: {height: scale(200)},
  callingCodeView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  dobMainView: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(-5),
  },
  dateView: {
    justifyContent: 'center',
    alignItems: 'center',
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
  width28: {width: '28%'},
  width40: {width: '40%'},
  firstNameMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default PersonalDetails;
