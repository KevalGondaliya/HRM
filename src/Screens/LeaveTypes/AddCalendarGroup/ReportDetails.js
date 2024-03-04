import React from 'react';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { View, Text, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import YearDropDown from '../../../component/YearDropDown';

import styles from './style';
import DropDowns from '../../../component/DropDowns';

const ReportDetails = ({
  year,
  style,
  onPress,
  isError,
  countryBtn,
  countryName,
  count,
  selectedCountry,
  selectCountryCode,
  countryModal,
  onClose,
  companyArr,
  companyValue,
  setCompanyValue,
}) => {
  return (
    <Box
      label={'Calendar Group'}
      children={
        <View style={{ marginTop: scale(5) }}>
          {/* <DropDowns
            label={'Company*'}
            data={companyArr}
            placeholder="Select Company..."
            value={companyValue}
            onChange={item => {
              setCompanyValue(item.value);
            }}
            style={isError && companyValue == '' && styles.error}
          /> */}
          <Text style={[styles.userNameTxt]}>Year*</Text>
          <YearDropDown
            // isError={isError}
            isError={isError && year == ''}
            date={year && moment(year).format('YYYY MMM DD')}
            style={style}
            onPress={onPress}
            placeHolder={'Select Year...'}
          />
          <Text style={[styles.userNameTxt, { marginTop: scale(5) }]}>
            Country*
          </Text>
          <TouchableOpacity
            onPress={countryBtn}
            style={[
              styles.userNameTextInput,
              styles.countryPickerMainView,
              isError && countryName == '' && styles.error,
            ]}>
            <View style={styles.countryPickerView} key={count}>
              <CountryPicker
                withCallingCode={false}
                countryCode={selectedCountry}
                withFlag={true}
                withFilter={true}
                withModal={true}
                onSelect={country => {
                  selectCountryCode(country);
                }}
                visible={countryModal}
                onClose={onClose}
                placeholder={''}
                // isError={isError }
                isError={isError && selectedCountry == ''}

              />

              <Text
                style={[
                  styles.countryName,
                  { color: countryName ? Colors.sBlack : Colors.lightRed },
                ]}>
                {countryName ? countryName : 'Select Country…'}
              </Text>
            </View>

            <Icon
              name={'chevron-small-down'}
              type={'entypo'}
              color={Colors.lightRed}
              style={{ marginLeft: 4.5 }}
            />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default ReportDetails;
