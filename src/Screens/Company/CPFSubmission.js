import React from 'react';
import { View, Text } from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import Validator from '../../utility/validator';
import TextInput from '../../component/TextInput';

import styles from './style';

const CPFSubmission = ({ isView, isError, cpfNumber, setCPFNumber }) => {
  return (
    <Box
      label={'CPF Submission'}
      children={
        <View>
          <Text style={styles.userNameTxt}>CPF Submission Number*</Text>

          <TextInput
            onChangeText={setCPFNumber}
            value={cpfNumber}
            isError={isError && cpfNumber == ''}
            style={styles.userNameTextInput}
            editable={isView}
            placeholder={'Enter CPF Submission Number…'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'CPF Submission Number'}
            keyboardType={'numeric'}
            isValidationError={cpfNumber != '' && Validator.validateNumber(cpfNumber) == false ? true : false}
          />
        </View>
      }
    />
  );
};

export default CPFSubmission;
