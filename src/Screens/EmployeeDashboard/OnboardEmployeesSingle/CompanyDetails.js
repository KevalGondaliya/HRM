import React, {Fragment} from 'react';
import {View, Text} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Button from '../../../component/Button';
import Country from '../../../component/Country';
import DropDowns from '../../../component/DropDowns';
import TextInput from '../../../component/TextInput';
import DateButton from '../../../component/DateButton';
import PhoneNumber from '../../../component/PhoneNumber';

import styles from './style';
import {identificationTypeData} from '../../../dummyData';

const CompanyDetails = props => {
  return (
    <Box
      label={'Personal Details'}
      children={
        <Fragment>
          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              <Text style={styles.userNameTxt}>First Name*</Text>

              <TextInput
                onChangeText={props.setFirstName}
                value={props.firstName}
                isError={props.isError && props.firstName == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter First Name…'}
                placeholderTextColor={Colors.lightRed}
              />
            </View>

            <View style={styles.width48}>
              <Text style={styles.userNameTxt}>Last Name*</Text>

              <TextInput
                onChangeText={props.setLastName}
                value={props.lastName}
                isError={props.isError && props.lastName == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter Last Name…'}
                placeholderTextColor={Colors.lightRed}
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
          />

          <Text style={styles.userNameTxt}>Identification Number*</Text>

          <TextInput
            onChangeText={props.setIdentificationNumber}
            value={props.identificationNumber}
            isError={props.isError && props.identificationNumber == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Identification Number…'}
            placeholderTextColor={Colors.lightRed}
          />

          <Text style={styles.userNameTxt}>Personal Email*</Text>

          <TextInput
            onChangeText={props.setPersonalEmail}
            value={props.personalEmail}
            isError={props.isError && props.personalEmail == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Personal Email…'}
            placeholderTextColor={Colors.lightRed}
            keyboardType={'email-address'}
          />

          <DateButton
            date={props.day}
            isError={props.isError}
            onPress={props.onDobBtnPress}
            label={'Date of Birth*'}
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
            isError={props.isError}
            key={props.count}
          />

          <PhoneNumber
            label={'Phone Number'}
            setCallingCode={props.setCallingCode}
            callingCode={props.callingCode}
            setMobile={props.setMobile}
            mobile={props.mobile}
          />

          <PhoneNumber
            label={'Office Number'}
            setCallingCode={props.setOfficeCallingCode}
            callingCode={props.officeCallingCode}
            setMobile={props.setOffilceMobile}
            mobile={props.officeMobile}
          />

          <PhoneNumber
            label={'Home Number'}
            setCallingCode={props.setHomeCallingCode}
            callingCode={props.homeCallingCode}
            setMobile={props.setHomeMobile}
            mobile={props.homeMobile}
          />

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
          />

          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
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
              />
            </View>

            <View style={styles.width48}>
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
              />
            </View>
          </View>

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
          />

          <DateButton
            date={props.prDay}
            isError={props.isError}
            onPress={props.onPRBtnPress}
            label={'PR Obtain Date*'}
          />

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
            />

            <Button
              label={'Remove'}
              btnStyle={styles.removeBtn}
              labelStyle={styles.browseTxt}
              onPress={props.removeBtnPress}
            />
          </View>
        </Fragment>
      }
    />
  );
};

export default CompanyDetails;
