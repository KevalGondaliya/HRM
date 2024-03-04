import React from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Button from '../../../component/Button';
import Country from '../../../component/Country';
import Validator from '../../../utility/validator';
import TextInput from '../../../component/TextInput';
import DropDowns from '../../../component/DropDowns';
import DateButton from '../../../component/DateButton';
import {identificationTypeData} from '../../../dummyData';
import PhoneInputs from '../../../component/PhoneInput';

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
            data={identificationTypeData}
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
              Validator.validateGSTNumber(props.identificationNumber) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Personal Email*</Text>

          <TextInput
            onChangeText={props.setEmail}
            value={props.email}
            isError={props.isError && props.personalEmail == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Personal Email…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
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
            data={props.maritalStatusArr}
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

          <Text style={styles.userNameTxt}>Country Of Work*</Text>
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

          <Text style={styles.userNameTxt}>Phone Number*</Text>

          <View style={styles.callingCodeView}>
            <PhoneInputs
              isError={props.isError && props.callingCode == ''}
              formattedValue={props.callingCode}
              setFormattedValue={props.setCallingCode}
              placeholder={'Enter Number...'}
            />
          </View>

          <Text style={styles.userNameTxt}>Office Number*</Text>

          <View style={styles.callingCodeView}>
            <PhoneInputs
              // isError={props.isError && props.officeCallingCode == ''}
              formattedValue={props.officeCallingCode}
              setFormattedValue={props.setOfficeCallingCode}
              placeholder={'Enter Number...'}
              validationPlaceHolder={'Office Number'}
            />
          </View>

          <Text style={styles.userNameTxt}>Home Number*</Text>

          <View style={styles.callingCodeView}>
            <PhoneInputs
              // isError={props.isError && props.homeCallingCode == ''}
              formattedValue={props.homeCallingCode}
              setFormattedValue={props.setHomeCallingCode}
              placeholder={'Enter Number...'}
            />
          </View>

          {/* <PhoneNumber
            label={'Phone Number'}
            setCallingCode={props.setCallingCode}
            callingCode={props.callingCode}
            setMobile={props.setMobile}
            mobile={props.mobile}
            editable={props.isView ? false : true}
          />

          <PhoneNumber
            label={'Office Number'}
            setCallingCode={props.setOfficeCallingCode}
            callingCode={props.officeCallingCode}
            setMobile={props.setOffilceMobile}
            mobile={props.officeMobile}
            editable={props.isView ? false : true}
          />

          <PhoneNumber
            label={'Home Number'}
            setCallingCode={props.setHomeCallingCode}
            callingCode={props.homeCallingCode}
            setMobile={props.setHomeMobile}
            mobile={props.homeMobile}
            editable={props.isView ? false : true}
          /> */}

          <DropDowns
            label={'Religion*'}
            placeholder="Select Religion…"
            data={props.religionArr}
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
                data={props.raceArr}
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
                data={props.genderArr}
                value={props.genderValue}
                onChange={item => {
                  props.setGender(item.value);
                }}
                disable={props.isView ? true : false}
                style={props.isError && props.genderValue == '' && styles.error}
                isError={props.isError && props.genderValue == ''}
              />
            </View>
          </View>
          {console.log('props.nationalityValue', props.nationalityValue)}
          <DropDowns
            label={'Nationality*'}
            placeholder="Select Nationality…"
            data={props.nationalityArr}
            value={props.nationalityValue}
            onChange={item => {
              props.setNationalityValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={
              props.isError && props.nationalityValue == '' && styles.error
            }
            isError={props.isError && props.nationalityValue == ''}
          />

          <Text style={styles.userNameTxt}>Citizenship*</Text>
          <Country
            onPress={props.citizenBtn}
            onSelect={country => {
              props.selectCitizenCode(country);
            }}
            countryName={props.citizenName}
            visible={props.citizenModal}
            onClose={props.onCitizenClose}
            countryCode={props.selectedCitizenCountry}
            isError={props.isError}
            key={props.count}
            disable={props.isView ? true : false}
          />
          {props.nationalityValue !== 'Singaporean' && (
            <>
              <DateButton
                date={props.prDay}
                isError={props.isError}
                onPress={props.onPRBtnPress}
                label={'PR Obtain Date*'}
              />
            </>
          )}
          <DateButton
            date={props.prEntryDay}
            isError={props.isError}
            onPress={props.onPREntryBtnPress}
            label={'Re-Entry Permit Expiration*'}
          />
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
