import React from 'react';
import {Text, View} from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import DropDowns from '../../component/DropDowns';
import TextInput from '../../component/TextInput';
import Validator from '../../utility/validator';

import styles from './style';

const ApprovalGroupDetails = ({
  empArr,
  isView,
  isError,
  empValue,
  groupName,
  setEmpValue,
  setGroupName,
}) => {
  return (
    <Box
      label={'Approval Group Details'}
      children={
        <View style={styles.bottom}>
          <Text style={styles.userNameTxt}>Approval Group Name*</Text>

          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            editable={isView ? false : true}
            isError={isError && groupName == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Approval Group Name…'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Approval Group Name'}
            isValidationError={
              groupName != '' && Validator.validateTextInput(groupName) == false
                ? true
                : false
            }
          />

          <DropDowns
            label={'Employees*'}
            data={empArr}
            placeholder="Select Employees…"
            disable={isView ? true : false}
            value={empValue}
            onChange={item => {
              setEmpValue(item.value);
            }}
            style={isError && empValue == '' && styles.error}
            isError={isError && empValue == ''}
          />
        </View>
      }
    />
  );
};

export default ApprovalGroupDetails;
