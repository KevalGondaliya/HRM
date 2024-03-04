import React from 'react';
import {View, Text} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';
import DropDowns from '../../../component/DropDowns';
import DateButton from '../../../component/DateButton';
import Validator from '../../../utility/validator';
import RadioButton from '../../../component/RadioButton';

import styles from './style';
import {recurringPeriodArrData} from '../../../utility/constant';

const AssignmentDetails = ({
  isError,
  isRecurring,
  setIsRecurring,
  allowanceTypeArr,
  allowanceTypeValue,
  setAllowanceTypeValue,
  employeeArr,
  employeeValue,
  setEmployeeValue,
  recurringPeriodValue,
  setRecurringPeriodValue,
  setAmount,
  amount,
  startDate,
  onStartBtnPress,
  endDate,
  onEndBtnPress,
  isView,
}) => {
  return (
    <Box
      label={'Assignment Details'}
      children={
        <View style={styles.mainView}>
          <DropDowns
            label={'Employee*'}
            placeholder="Select Employee…"
            data={employeeArr || []}
            value={employeeValue}
            onChange={item => {
              setEmployeeValue(item.value);
            }}
            disable={isView ? true : false}
            style={isError && employeeValue == '' && styles.error}
            isError={isError && employeeValue == ''}
          />

          <DropDowns
            label={'Allowance Type*'}
            placeholder="Select Allowance Type..."
            data={allowanceTypeArr || []}
            value={allowanceTypeValue}
            onChange={item => {
              setAllowanceTypeValue(item.value);
            }}
            disable={isView ? true : false}
            style={isError && allowanceTypeValue == '' && styles.error}
            isError={isError && allowanceTypeValue == ''}
          />

          <View style={styles.padiView}>
            {/* <View>
              <Text style={styles.userNameTxt}>Has GST?*</Text>

              <RadioButton
                isDisabled={isView ? true : false}
                value={isHasGst}
                onPress={setIsHasGst}
              />
            </View> */}
            <View>
              <Text style={styles.userNameTxt}>Recurring Allowance?*</Text>

              <RadioButton
                isDisabled={isView ? true : false}
                value={isRecurring}
                onPress={setIsRecurring}
              />
            </View>
          </View>

          <Text style={styles.userNameTxt}>Amount</Text>

          <TextInput
            onChangeText={setAmount}
            value={amount}
            isError={isError && amount == ''}
            keyboardType={'numeric'}
            style={styles.userNameTextInput}
            placeholder={'Enter Amount...'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Amount / Percentage'}
            isValidationError={
              amount != '' && Validator.validateAmount(amount) == false
                ? true
                : false
            }
          />

          <DropDowns
            label={'Recurring Period*'}
            placeholder="Select Recurring Period…"
            data={recurringPeriodArrData || []}
            value={recurringPeriodValue}
            onChange={item => {
              setRecurringPeriodValue(item.value);
            }}
            disable={isView ? true : false}
            style={isError && recurringPeriodValue == '' && styles.error}
            isError={isError && recurringPeriodValue == ''}
          />

          <DateButton
            date={startDate}
            isError={isError}
            onPress={onStartBtnPress}
            label={'Start Date*'}
            disabled={isView ? true : false}
          />
          <DateButton
            date={endDate}
            isError={isError}
            onPress={onEndBtnPress}
            label={'End Date*'}
            disabled={isView ? true : false}
          />
        </View>
      }
    />
  );
};

export default AssignmentDetails;
