import React from 'react';
import { Text, View } from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Validator from '../../../utility/validator';
import DropDowns from '../../../component/DropDowns';
import TextInput from '../../../component/TextInput';
import DateButton from '../../../component/DateButton';

import styles from './style';

const ApplyforaLeave = props => {
  return (
    <Box
      label={'Leave Types'}
      children={
        <View style={styles.container}>
          <DropDowns
            label={'Leave Description*'}
            placeholder="Select Leave Description…"
            data={props.leaveTypeArr}
            value={props.leaveTypeValue}
            onChange={item => {
              props.setLeaveTypeValue(item.value);
            }}
            disable={props.isView ? true : false}
            isError={props.isError && props.leaveTypeValue == ''}
            style={props.isError && props.leaveTypeValue == '' && styles.error}
          />

          <Text style={styles.userNameTxt}>Number of Days*</Text>

          <TextInput
            onChangeText={props.setNumberOfDay}
            value={props.numberOfDay}
            isError={props.isError && props.numberOfDay == ''}
            style={styles.userNameTextInput}
            keyboardType={'numeric'}
            placeholder={'Enter Reason for Leave…'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Reason for Leave'}
            isValidationError={props.numberOfDay != '' && Validator.validateOnlyNumber(props.numberOfDay) == false ? true : false}
          />

          <DateButton
            date={props.leaveEndDay}
            isError={props.isError}
            onPress={props.onEndBtnPress}
            label={'Leave Start Date*'}
          />
        </View>
      }
    />
  );
};

export default ApplyforaLeave;
