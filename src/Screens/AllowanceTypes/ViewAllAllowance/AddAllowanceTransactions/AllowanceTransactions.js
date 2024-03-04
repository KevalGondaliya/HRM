import React from 'react';
import {View, Text} from 'react-native';

import Validator from '../../../../utility/validator';
import Colors from '../../../../theme';
import Box from '../../../../component/Box';
import TextInput from '../../../../component/TextInput';
import DropDowns from '../../../../component/DropDowns';
import DateButton from '../../../../component/DateButton';

import styles from './style';

const AllowanceTransactions = ({
  isError,
  isView,
  setDescription,
  description,
  employeeArr,
  employee,
  setEmployee,
  leaveStartDate,
  onStartDateBtnPress,
  setNo_of_days,
  no_of_days,
}) => {
  return (
    <Box
      label={'Allowance Transactions'}
      children={
        <View style={styles.mainView}>
          <DropDowns
            label={'Employee*'}
            placeholder="Select Employee…"
            data={employeeArr || []}
            value={employee}
            onChange={item => {
              setEmployee(item.value);
            }}
            style={isError && employee == '' && styles.error}
            disable={isView ? true : false}
            isError={isError && employee === ''}
          />

          <Text style={styles.userNameTxt}>Allowance Description*</Text>

          <TextInput
            onChangeText={setDescription}
            value={description}
            isError={isError && description == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Allowance Description…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Allowance Description'}
            isValidationError={
              description != '' &&
              Validator.validateTextInput(description) == false
                ? true
                : false
            }
          />

          <DateButton
            date={leaveStartDate}
            onPress={onStartDateBtnPress}
            label={'Allowance Date*'}
            disabled={isView ? true : false}
            isError={isError && leaveStartDate === ''}
          />

          <Text style={styles.userNameTxt}>Amount*</Text>

          <TextInput
            onChangeText={setNo_of_days}
            value={no_of_days}
            isError={isError && no_of_days == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Amount…'}
            placeholderTextColor={Colors.lightRed}
            disable={isView ? true : false}
            keyboardType={'numeric'}
            editable={isView ? false : true}
            validationPlaceHolder={' New Basic Pay'}
            isValidationError={
              no_of_days != '' && Validator.validateAmount(no_of_days) == false
                ? true
                : false
            }
          />
        </View>
      }
    />
  );
};

export default AllowanceTransactions;
