import React, { Fragment } from 'react';
import moment from 'moment';
import { scale } from 'react-native-size-matters';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import DropDown from '../../component/DropDown';
import TextInput from '../../component/TextInput';
import DropDowns from '../../component/DropDowns';
import { useDispatch, useSelector } from 'react-redux';
import DateButton from '../../component/DateButton';
import Validator from '../../utility/validator';
import { employeementTypeArr } from '../../dummyData';

const PositionDetails = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  const onOrgChange = item => {
    dispatch.relationValue.getOrgDepartment({ token, id: item.value });
    props.setDepartmentValue('');
    props.setPositionValue('');
  };

  const onDepartmentChange = item => {
    dispatch.relationValue.getDepartmentPosition({ token, id: item.value });
    props.setPositionValue('');
  };
  return (
    <>
      <Box
        label={'Position Details'}
        style={{ marginTop: scale(8) }}
        children={
          <View
            style={{
              paddingBottom: scale(30),
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
                <View style={styles.mainView}>
                  <View style={styles.currentTxtView}>
                    <Text style={styles.userNameTxt}>Current Department</Text>
                    <Text style={styles.departMentTxt}>
                      {props.currentDepartment || '-'}
                    </Text>
                  </View>
                  <View style={styles.currentTxtView}>
                    <Text style={styles.userNameTxt}>Current Position</Text>
                    <Text style={styles.departMentTxt}>
                      {props.currentPosition || '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.mainView}>
                  <View style={styles.currentTxtView}>
                    <Text style={styles.userNameTxt}>Current Basic Pay</Text>
                    <Text style={styles.departMentTxt}>
                      ${props.currentBasicPay || '-'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.userNameTxt}>Current Employment Type</Text>
                <Text style={styles.departMentTxt}>
                  {props.currentEmploymentType || '-'}
                </Text>

                <DropDowns
                  label={'Department*'}
                  data={props.departmentArr || []}
                  placeholder="Select Department..."
                  value={props.departmentValue}
                  onChange={item => {
                    props.setDepartmentValue(item.value);
                    onDepartmentChange(item);
                  }}
                  disable={props.isView ? true : false}
                  style={
                    props.isError && props.departmentValue == '' && styles.error
                  }
                  isError={props.isError && props.departmentValue == ''}
                />

                <View style={styles.firstNameMainView}>
                  <View style={{ width: '48.5%' }}>
                    <DropDowns
                      label={'Position*'}
                      data={props.positionArr || []}
                      value={props.positionValue}
                      onChange={item => {
                        props.setPositionValue(item.value);
                      }}
                      placeholder="Select Position…"
                      style={
                        props.isError &&
                        props.positionValue == '' &&
                        styles.error
                      }
                      isError={props.isError && props.positionValue == ''}
                    />
                  </View>

                  <View style={styles.width48}>
                    <Text
                      style={[styles.userNameTxt, { color: Colors.lightRed }]}>
                      Employee ID*
                    </Text>

                    <View
                      style={[
                        styles.userNameTextInput,
                        styles.fTxtView,
                        {
                          borderWidth:
                            props.isError && props.empId == '' ? 2 : 0,
                          borderColor: 'red',
                        },
                      ]}>
                      <Text style={styles.fTxt}>T</Text>
                      <TextInput
                        keyboardType={'numeric'}
                        onChangeText={props.setEmpId}
                        value={props.empId}
                        style={{
                          width: '80%',
                        }}
                        placeholder={'Enter ID'}
                        placeholderTextColor={Colors.lightRed}
                        editable={false}

                      />
                    </View>
                  </View>
                </View>

                <DropDowns
                  label={'Employment Type*'}
                  data={employeementTypeArr || []}
                  value={props.empTypeValue}
                  onChange={item => {
                    props.setEmpTypeValue(item.value);
                  }}
                  placeholder="Select Employment Type…"
                  style={
                    props.isError && props.empTypeValue == '' && styles.error
                  }
                  isError={props.isError && props.empTypeValue == ''}
                />

                <Text style={[styles.userNameTxt, { color: Colors.lightRed }]}>
                  Basic Pay*
                </Text>

                <TextInput
                  onChangeText={props.setBasicPay}
                  value={props.basicPay}
                  isError={props.isError && props.basicPay == ''}
                  placeholder={'Enter Basic Pay…'}
                  keyboardType={'numeric'}
                  placeholderTextColor={Colors.lightRed}
                  style={styles.userNameTextInput}
                  validationPlaceHolder={'Basic Pay'}
                  isValidationError={
                    props.basicPay != '' &&
                      Validator.validateAmount(props.basicPay) == false
                      ? true
                      : false
                  }
                />

                <DateButton
                  date={props.startDate}
                  isError={props.isError}
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
  currentTxtView: { width: '48%' },
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

  width28: { width: '28%' },
  width40: { width: '40%' },
  width48: { width: '48%' },
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
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
export default PositionDetails;
