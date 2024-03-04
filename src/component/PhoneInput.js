import {PhoneNumberUtil} from 'google-libphonenumber';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import PhoneInput, {isValidNumber} from 'react-native-phone-number-input';
import {scale} from 'react-native-size-matters';

import Colors from '../theme';
import Validator from '../utility/validator';

function PhoneInputs({
  formattedValue,
  setFormattedValue,
  placeholder,
  isError,
  disabled,
  isView,
  style,
}) {
  const [countryCodeValue, setCountryCodeValue] = useState('SG');
  const [count, setCount] = useState(0);
  const [phoneNunber, setPhoneNunber] = useState('');

  useEffect(() => {
    if (formattedValue != '') {
      let phoneNo = '+' + formattedValue;
      console.log('phonenumber', phoneNo, formattedValue);
      let isValidNuber = isValidNumber(phoneNo);
      console.log('isValidNuber', isValidNuber);
      if (isValidNuber) {
        const phoneUtil = PhoneNumberUtil.getInstance();
        const parsedNo = phoneUtil.parse(phoneNo, '');
        const nationalNumber = parsedNo.getNationalNumberOrDefault().toString();
        const code = parsedNo.getCountryCodeOrDefault();
        const countryCode = phoneUtil.getRegionCodeForCountryCode(code);
        setPhoneNunber(nationalNumber);
        setCountryCodeValue(countryCode);
      }
      setCount(count + 1);
    }
  }, []);

  return (
    <PhoneInput
      key={count}
      defaultValue={phoneNunber}
      placeholder={placeholder}
      disabled={disabled}
      isView={isView}
      defaultCode={countryCodeValue}
      layout="second"
      onChangeFormattedText={text => {
        setFormattedValue(text);
      }}
      containerStyle={{backgroundColor: null}}
      textContainerStyle={[
        styles.textContainerStyle,
        style,
        isError && styles.error,
        formattedValue &&
        Validator.validateOnlyPhoneNumber(formattedValue) == false
          ? styles.error
          : null,
      ]}
      flagButtonStyle={styles.flagButtonStyle}
    />
  );
}

const styles = StyleSheet.create({
  textContainerStyle: {
    paddingVertical: 0,
    height: scale(45),
    marginLeft: scale(15),
    borderRadius: scale(10),
    backgroundColor: Colors.grey,
    marginRight: scale(18),
  },
  flagButtonStyle: {
    paddingVertical: 0,
    borderRadius: scale(10),
    backgroundColor: Colors.grey,
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default PhoneInputs;
