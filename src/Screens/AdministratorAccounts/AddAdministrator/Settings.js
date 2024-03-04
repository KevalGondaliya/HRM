import React from 'react';
import {Text, View} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Validator from '../../../utility/validator';
import TextInput from '../../../component/TextInput';

import styles from './style';

const Settings = ({
  isError,
  setUserName,
  userName,
  setEmail,
  email,
  password,
  editData,
  isEdit,
  isView,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <Box
      label={'Assignment Details'}
      children={
        <View style={styles.mainView}>
          <Text style={styles.userNameTxt}>User Name*</Text>

          <TextInput
            onChangeText={setUserName}
            value={userName}
            style={styles.userNameTextInput}
            placeholder={'Enter Username...'}
            placeholderTextColor={Colors.lightRed}
            isError={isError && userName === ''}
            validationPlaceHolder={'Username'}
            isValidationError={
              userName != '' && Validator.validateTextInput(userName) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Email*</Text>

          <TextInput
            onChangeText={setEmail}
            value={email}
            editable={isEdit ? false : true}
            style={styles.userNameTextInput}
            placeholder={'Enter Email Address...'}
            keyboardType={'email-address'}
            placeholderTextColor={Colors.lightRed}
            isError={isError && email === ''}
            validationPlaceHolder={'Email'}
            isValidationError={
              email != '' && Validator.validateTextInput(email) == false
                ? true
                : false
            }
          />
          {!isEdit && (
            <>
              <Text style={styles.userNameTxt}>Password*</Text>

              <TextInput
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                isError={isError && password === ''}
                style={styles.userNameTextInput}
                placeholder={'Enter Password...'}
                placeholderTextColor={Colors.lightRed}
                validationPlaceHolder={'Password'}
                isValidationError={
                  password != '' &&
                  Validator.validateTextInput(password) == false
                    ? true
                    : false
                }
              />

              <Text style={styles.userNameTxt}>Confirm Password*</Text>

              <TextInput
                secureTextEntry
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                // isError={confirmPassword != password}
                isError={isError && confirmPassword === ''}
                style={styles.userNameTextInput}
                placeholder={'Re-enter Password...'}
                placeholderTextColor={Colors.lightRed}
                validationPlaceHolder={'Password'}
                isValidationError={
                  confirmPassword != '' &&
                  Validator.validateTextInput(confirmPassword) == false
                    ? true
                    : false
                }
              />
            </>
          )}
        </View>
      }
    />
    // <Text>hggd</Text>
  );
};

export default Settings;
