import React from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Validator from '../../../utility/validator';
import TextInput from '../../../component/TextInput';
import DropDowns from '../../../component/DropDowns';

const PaySchemeDetails = props => {
  return (
    <Box
      label={'Pay Scheme Details'}
      children={
        <View>
          <View style={styles.firstNameMainView}>
            <View style={{width: '48.5%'}}>
              <DropDowns
                label={'Payslip Template*'}
                placeholder="Select …"
                data={props.payslipTemplateArr || []}
                value={props.payslipTemplateValue}
                onChange={item => {
                  props.setPayslipTemplateValue(item.value);
                }}
                style={
                  props.isError &&
                  props.payslipTemplateValue == '' &&
                  styles.error
                }
                disable={props.isView ? true : false}
                isError={props.isError && props.payslipTemplateValue == ''}
              />
            </View>

            <View style={styles.width48}>
              <DropDowns
                label={'Pay Type*'}
                placeholder="Select Type…"
                data={props.payTypeArr || []}
                value={props.payTypeValue}
                onChange={item => {
                  props.setPayTypeValue(item.value);
                }}
                style={
                  props.isError && props.payTypeValue == '' && styles.error
                }
                disable={props.isView ? true : false}
                isError={props.isError && props.payTypeValue == ''}
              />
            </View>
          </View>

          <View style={styles.firstNameMainView}>
            <View style={{width: '48.5%'}}>
              <DropDowns
                label={'Currency*'}
                placeholder="Select Curren…"
                data={props.currencyArr || []}
                value={props.currencyValue}
                onChange={item => {
                  props.setCurrencyValue(item.value);
                }}
                style={
                  props.isError && props.currencyValue == '' && styles.error
                }
                disable={props.isView ? true : false}
                isError={props.isError && props.currencyValue == ''}
              />
            </View>

            <View style={styles.width48}>
              <Text style={styles.userNameTxt}>Basic Pay*</Text>
              <TextInput
                onChangeText={props.setPay}
                value={props.pay}
                keyboardType={'numeric'}
                isError={props.isError && props.pay == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter Pay…'}
                placeholderTextColor={Colors.lightRed}
                editable={false}
                validationPlaceHolder={'Pay'}
                isValidationError={
                  props.pay != '' &&
                  Validator.validateAmount(props.pay) == false
                    ? true
                    : false
                }
              />
            </View>
          </View>
          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              <Text style={styles.userNameTxt}>Monthly Pay*</Text>
              <TextInput
                onChangeText={props.setPay}
                value={props.pay}
                keyboardType={'numeric'}
                isError={props.isError && props.pay == ''}
                style={styles.userNameTextInput}
                placeholder={'Select Option…'}
                placeholderTextColor={Colors.lightRed}
                editable={false}
                validationPlaceHolder={'Pay'}
                isValidationError={
                  props.pay != '' &&
                  Validator.validateAmount(props.pay) == false
                    ? true
                    : false
                }
              />
            </View>
            <View style={styles.width48}>
              <Text style={styles.userNameTxt}>IC Number*</Text>
              <TextInput
                onChangeText={props.setIcNumber}
                value={props.icNumber}
                keyboardType={'numeric'}
                isError={props.isError && props.icNumber == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter IC Number…'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isView ? false : true}
                validationPlaceHolder={'IC Number'}
                isValidationError={
                  props.icNumber != '' &&
                  Validator.validateAmount(props.icNumber) == false
                    ? true
                    : false
                }
              />
            </View>
          </View>

          <View style={styles.firstNameMainView}>
            <View style={styles.width48} key={props.count}>
              <Text style={styles.userNameTxt}>CPF Employee*</Text>
              <View style={[styles.userNameTextInput, {paddingHorizontal: 20}]}>
                <Text
                  style={[
                    styles.userNameTxt,
                    {
                      color: props.cpfEmpl ? '#000' : Colors.lightRed,
                      top: 2,
                      fontWeight: props.cpfEmpl ? '400' : '600',
                    },
                  ]}>
                  {props.cpfEmpl || 'Enter CPF…'}
                </Text>
              </View>
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.userNameTxt}>CPF Employer*</Text>
              <View style={[styles.userNameTextInput, {paddingHorizontal: 20}]}>
                <Text
                  style={[
                    styles.userNameTxt,
                    {
                      color: props.cpfEmployer ? '#000' : Colors.lightRed,
                      top: 2,
                      fontWeight: props.cpfEmployer ? '400' : '600',
                    },
                  ]}>
                  {props.cpfEmployer || 'Enter CPF…'}
                </Text>
              </View>
            </View>
          </View>

          <DropDowns
            label={'Pay based on Attendance*'}
            placeholder="Select Option…"
            data={props.payAttendanceArr || []}
            value={props.payAttendanceValue}
            onChange={item => {
              props.setPayAttendanceValue(item.value);
            }}
            style={
              props.isError && props.payAttendanceValue == '' && styles.error
            }
            isError={props.isError && props.payAttendanceValue == ''}
            disable={props.isView ? true : false}
          />
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },

  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(45),
  },

  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
  },

  removeBtn: {
    backgroundColor: Colors.grayishRed,
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  dropDownStyle: {
    paddingHorizontal: scale(10),
    marginBottom: scale(2),
  },
  browseTxt: {fontSize: scale(11)},
  mobileView: {marginRight: 0, width: '75%'},
  containerStyle: {height: scale(200)},
  callingCodeView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
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
  countryPickerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  countryPickerView: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(15),
  },
  countryName: {
    fontSize: 14,
    color: Colors.sBlack,
  },
  width28: {width: '28%'},
  width40: {width: '40%'},
  width48: {width: '48.5%'},
  firstNameMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownStyle: {marginBottom: scale(2)},
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
export default PaySchemeDetails;
