import React, {Fragment} from 'react';
import {View, Text} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';
import RadioButton from '../../../component/RadioButton';
import Validator from '../../../utility/validator';

import styles from './style';

const ApprovalGroupDetails = ({
  setDescription,
  isError,
  description,
  isDocuments,
  setIsDocuments,
  isInstalments,
  setIsInstalments,
  isView,
}) => {
  return (
    <Box
      label={'Deduction Types'}
      children={
        <Fragment>
          <Text style={styles.userNameTxt}>Deduction Description*</Text>

          <TextInput
            onChangeText={setDescription}
            value={description}
            isError={isError && description == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Deduction Description…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Deduction Description'}
            isValidationError={
              description != '' &&
              Validator.validateTextInput(description) == false
                ? true
                : false
            }
          />

          <View style={styles.padiView}>
            <View>
              <Text style={styles.userNameTxt}>Allow Installments?*</Text>

              <RadioButton
                value={isInstalments}
                onPress={setIsInstalments}
                isDisabled={isView && true}
              />
            </View>
            <View>
              <Text style={styles.userNameTxt}>Require Documents?*</Text>

              <RadioButton
                value={isDocuments}
                onPress={setIsDocuments}
                isDisabled={isView && true}
              />
            </View>
          </View>
        </Fragment>
      }
    />
  );
};

export default ApprovalGroupDetails;
