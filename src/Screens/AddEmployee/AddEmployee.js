import React from 'react';
import {Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import Colors from '../../theme';
import Box from '../../component/Box';
import {empTypeArr} from '../../utility/constant';
import TextInput from '../../component/TextInput';
import DropDowns from '../../component/DropDowns';
import Validator from '../../utility/validator';

import styles from './style';

const AddEmployee = ({
  isView,
  isError,
  empType,
  userName,
  setUserName,
  email,
  setEmail,
  setEmpType,
}) => {
  return (
    <Box
      label={'Add Employee'}
      children={
        <View style={{paddingBottom: scale(15)}}>
          <Text style={styles.userNameTxt}>User Name*</Text>

          <TextInput
            onChangeText={setUserName}
            value={userName}
            isError={isError && userName == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter User Name...'}
            placeholderTextColor={Colors.lightRed}
            editable={isView && false}
            validationPlaceHolder={'User Name'}
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
            isError={isError && email == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter User Email…'}
            placeholderTextColor={Colors.lightRed}
            keyboardType={'email-address'}
            validationPlaceHolder={'Email'}
            isValidationError={
              email != '' && Validator.validateTextInput(email) == false
                ? true
                : false
            }
          />

          <DropDowns
            label={'Employee Type*'}
            data={empTypeArr}
            placeholder="Select Employee Type..."
            value={empType}
            onChange={item => {
              setEmpType(item.value);
            }}
            disable={isView ? true : false}
            style={isError && empType == '' && styles.error}
            isError={isError && empType == ''}
          />
        </View>
      }
    />
  );
};

export default AddEmployee;
