import React from 'react';
import moment from 'moment';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import DropDown from '../../component/DropDown';
import TextInput from '../../component/TextInput';
import DropDowns from '../../component/DropDowns';
import DateButton from '../../component/DateButton';
import Validator from '../../utility/validator';

const PositionDetails = (props, isError) => {
  return (
    <>
      <Box
        label={'Position Details'}
        style={styles.style}
        children={
          <View
            style={{
              paddingBottom: scale(20),
              minHeight: props.openEmpName ? scale(200) : 0,
            }}>
            <DropDowns
              label={'Employee Name*'}
              placeholder="Select Employee Name…"
              data={props.empNameArr || []}
              value={props.empNameValue}
              onChange={item => {
                props.setEmpNameValue(item.value);
              }}
              style={props.isError && props.empNameValue == '' && styles.error}
              disable={props.isView ? true : false}
            />

            {props.empNameValue ? (
              <>
                <Text style={styles.userNameTxt}>Current Basic Pay</Text>
                <Text style={styles.departMentTxt}>
                  $ {props.currentBasicPay || 0}
                </Text>

                <DropDowns
                  label={'Salary Adjustment*'}
                  placeholder="Select Adjustment…"
                  data={props.salaryArr || []}
                  value={props.salaryValue}
                  onChange={item => {
                    props.setSalaryValue(item.value);
                  }}
                  style={
                    props.isError && props.salaryValue == '' && styles.error
                  }
                  disable={props.isView ? true : false}
                  isError={props.isError && props.salaryValue == ''}
                />

                <View style={styles.firstNameMainView}>
                  <View style={styles.width48}>
                    <Text
                      style={[styles.userNameTxt, {color: Colors.lightRed}]}>
                      Amount/Percentage*
                    </Text>

                    <TextInput
                      onChangeText={props.setAmount}
                      value={`${props.amount}`}
                      keyboardType={'numeric'}
                      style={[
                        styles.userNameTextInput,
                        {
                          borderWidth:
                            props.isError && props.amount == '' ? 2 : 0,
                          borderColor:
                            props.isError && props.amount == '' ? 'red' : null,
                        },
                      ]}
                      placeholder={'Enter Amount…'}
                      placeholderTextColor={Colors.lightRed}
                      isError={props.isError && props.amount == ''}
                      validationPlaceHolder={'Amount / Percentage'}
                      isValidationError={
                        props.amount != '' &&
                        Validator.validateAmount(props.amount) == false
                          ? true
                          : false
                      }
                    />
                  </View>

                  <View style={styles.width48}>
                    <Text
                      style={[styles.userNameTxt, {color: Colors.lightRed}]}>
                      New Basic Pay*
                    </Text>

                    <TextInput
                      onChangeText={props.setBasicPay}
                      value={`${props.basicPay}`}
                      keyboardType={'numeric'}
                      style={[
                        styles.userNameTextInput,
                        {
                          borderWidth:
                            props.isError && props.basicPay == '' ? 2 : 0,
                          borderColor:
                            props.isError && props.basicPay == ''
                              ? 'red'
                              : null,
                        },
                      ]}
                      placeholder={'Enter Amount…'}
                      placeholderTextColor={Colors.lightRed}
                      isError={props.isError && props.basicPay == ''}
                      validationPlaceHolder={' New Basic Pay'}
                      isValidationError={
                        props.basicPay != '' &&
                        Validator.validateAmount(props.basicPay) == false
                          ? true
                          : false
                      }
                    />
                  </View>
                </View>

                <DateButton
                  date={props.startDate}
                  isError={props.isError && props.startDate == ''}
                  onPress={() => props.setDatePickerVisibility(true)}
                  label={'Start Date*'}
                />
              </>
            ) : null}
          </View>
        }
      />
    </>
  );
};
const styles = StyleSheet.create({
  labelStyles: {
    color: Colors.lightRed,
    marginBottom: scale(3),
  },
  dropDownStyle: {
    marginBottom: scale(5),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  departMentTxt: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Colors.blackPearl,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentTxtView: {width: '48%'},
  firstNameMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fTxt: {
    width: '20%',
    textAlign: 'right',
    fontSize: scale(12),
    fontWeight: '600',
    color: Colors.blackPearl,
  },
  fTxtView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(45),
  },

  width28: {width: '28%'},
  width40: {width: '40%'},
  width48: {width: '48%'},
  dobMainView: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(-5),
  },
  dateView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  style: {marginTop: scale(8)},
});
export default PositionDetails;
