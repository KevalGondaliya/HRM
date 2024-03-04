import React, {Fragment} from 'react';
import {View, Text} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import DropDown from '../../../component/DropDown';
import TextInput from '../../../component/TextInput';

import styles from './style';
import DropDowns from '../../../component/DropDowns';

const PaySchemeDetails = ({
  pay,
  setPay,
  isError,
  payTypeArr,
  currencyArr,
  payTypeValue,
  currencyValue,
  setPayTypeValue,
  setCurrencyValue,
  payAttendanceArr,
  payAttendanceValue,
  payslipTemplateArr,
  payslipTemplateValue,
  setPayAttendanceValue,
  setPayslipTemplateValue,
}) => {
  return (
    <Box
      label={'Pay Scheme Details'}
      children={
        <Fragment>
          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              <DropDowns
                label={'Payslip Template*'}
                placeholder="Select …"
                data={payslipTemplateArr || []}
                value={payslipTemplateValue}
                onChange={item => {
                  setPayslipTemplateValue(item.value);
                }}
                style={isError && payslipTemplateValue == '' && styles.error}
              />
            </View>

            <View style={styles.width48}>
              <DropDowns
                label={'Pay Type*'}
                placeholder="Select Type…"
                data={payTypeArr || []}
                value={payTypeValue}
                onChange={item => {
                  setPayTypeValue(item.value);
                }}
                style={isError && payTypeValue == '' && styles.error}
              />
            </View>
          </View>

          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              <DropDowns
                label={'Currency*'}
                placeholder="Select Curren…"
                data={currencyArr || []}
                value={currencyValue}
                onChange={item => {
                  setCurrencyValue(item.value);
                }}
                style={isError && currencyValue == '' && styles.error}
              />
            </View>

            <View style={styles.width48}>
              <Text style={styles.userNameTxt}>Basic Pay*</Text>

              <TextInput
                onChangeText={setPay}
                value={pay}
                keyboardType={'numeric'}
                isError={isError && pay == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter Pay…'}
                placeholderTextColor={Colors.lightRed}
              />
            </View>
          </View>

          <DropDowns
            label={'Pay based on Attendance*'}
            placeholder="Select Option…"
            data={payAttendanceArr || []}
            value={payAttendanceValue}
            onChange={item => {
              setPayAttendanceValue(item.value);
            }}
            style={isError && payAttendanceValue == '' && styles.error}
          />
        </Fragment>
      }
    />
  );
};

export default PaySchemeDetails;
