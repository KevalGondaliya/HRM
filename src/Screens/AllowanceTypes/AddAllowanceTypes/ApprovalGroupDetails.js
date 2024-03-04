import {Text} from 'react-native';
import React, {Fragment} from 'react';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';
import Validator from '../../../utility/validator';
// import DropDowns from '../../../component/DropDowns';
// import Validator from '../../../utility/validator';

import styles from './style';

const ApprovalGroupDetails = props => {
  return (
    <Box
      label={'Allowance Details'}
      children={
        <Fragment>
          <Text style={styles.userNameTxt}>Approval Group Name*</Text>

          <TextInput
            onChangeText={props.setGroupName}
            value={props.groupName}
            isError={props.isError && props.groupName == ''}
            style={[styles.userNameTextInput, styles.bottom]}
            placeholder={'Enter Approval Group Name…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
            validationPlaceHolder={'Approval Group Name'}
            isValidationError={
              props.groupName != '' &&
              Validator.validateTextInput(props.groupName) == false
                ? true
                : false
            }
          />
        </Fragment>
      }
    />
  );
};
export default ApprovalGroupDetails;
