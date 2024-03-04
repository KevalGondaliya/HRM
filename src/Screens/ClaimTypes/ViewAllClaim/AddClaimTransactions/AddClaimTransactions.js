import React from 'react';
import {View, Text} from 'react-native';

import Colors from '../../../../theme';
import Box from '../../../../component/Box';
import Validator from '../../../../utility/validator';
import TextInput from '../../../../component/TextInput';
import DropDowns from '../../../../component/DropDowns';
import DateButton from '../../../../component/DateButton';

import styles from './style';

const LeaveTransactions = ({
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
  name,
  setName,
  claimTypeCategory,
  setClaimTypeCategory,
  claimTypeCategoryArr,
}) => {
  return (
    <Box
      label={'Claim Transactions'}
      children={
        <View style={styles.mainView}>
          <DropDowns
            label={'Employee Name*'}
            placeholder="Select Employee…"
            data={employeeArr || []}
            value={employee}
            onChange={item => {
              setEmployee(item.value);
            }}
            style={isError && employee == '' && styles.error}
            disable={isView ? true : false}
            isError={isError && employee == ''}
          />

          <DropDowns
            label={'Claim Type Category*'}
            placeholder="Select claim Type Category"
            data={claimTypeCategoryArr || []}
            value={claimTypeCategory}
            onChange={item => {
              setClaimTypeCategory(item.value);
            }}
            style={isError && claimTypeCategory == '' && styles.error}
            disable={isView ? true : false}
            isError={isError && claimTypeCategory == ''}
          />

          <DateButton
            date={leaveStartDate}
            isError={isError}
            onPress={onStartDateBtnPress}
            label={'Claim Date*'}
            disabled={isView ? true : false}
          />

          <Text style={styles.userNameTxt}>Name*</Text>

          <TextInput
            onChangeText={setName}
            value={name}
            isError={isError && name == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Name…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Name'}
            isValidationError={
              name != '' && Validator.validateTextInput(name) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Claim Description*</Text>

          <TextInput
            onChangeText={setDescription}
            value={description}
            isError={isError && description == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Description…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Description'}
            isValidationError={
              description != '' &&
              Validator.validateTextInput(description) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Amount*</Text>

          <TextInput
            onChangeText={setNo_of_days}
            value={no_of_days}
            isError={isError && no_of_days == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Expenditure Amount…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            keyboardType={'numeric'}
            validationPlaceHolder={'Amount'}
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

export default LeaveTransactions;
