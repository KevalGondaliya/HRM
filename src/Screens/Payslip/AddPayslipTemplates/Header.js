import moment from 'moment';
import {Icon} from 'react-native-elements';
import React, {Fragment, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';
import Validator from '../../../utility/validator';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import DropDowns from '../../../component/DropDowns';
import {log} from 'react-native-reanimated';

const Header = props => {
  const [count, setCount] = useState(0);

  const handleConfirm = date => {
    switch (props.selectDateType) {
      case 'dob':
        props.setDob(date);
        props.setDatePickerVisibility(false);
        break;

      case 'hireDate':
        props.setHireDate(date);
        props.setDatePickerVisibility(false);
        break;
    }
  };

  const hideDatePicker = () => {
    props.setDatePickerVisibility(false);
  };

  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  const onDepartmentChange = item => {
    dispatch.relationValue.getDepartmentPosition({token, id: item.value});
    props.setPositions('');
  };
  const onHeaderClick = (data, index) => {
    console.log('dataaaa', data);
    let arr = props.headerLabelArr;
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i].isCheck = !arr[i].isCheck;
      }
    }
    setCount(count + 1);
    props.setHeaderLabelArr(arr);
  };

  return (
    <Box
      label={'Header'}
      children={
        <Fragment>
          <View style={styles.headerLabelView} key={count}>
            {props.headerLabelArr?.map((data, index) => {
              return (
                <View style={styles.mappingMainView} key={index}>
                  <TouchableOpacity
                    style={styles.checkIconView}
                    onPress={() => onHeaderClick(data, index)}>
                    {data.isCheck && (
                      <Icon name={'check'} type={'entypo'} size={scale(12)} />
                    )}
                  </TouchableOpacity>

                  <Text style={styles.labelTxt}>{data.label}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.borderView} />
          {props.headerLabelArr[0].isCheck && (
            <>
              <DropDowns
                label={'Employees Name*'}
                data={props.employeeArr}
                placeholder="Select Employees Name…"
                value={props.employeeName}
                onChange={item => {
                  props.setEmployeeName(item.value);
                }}
                style={
                  props.isError && props.employeeName == '' && styles.error
                }
                isError={props.isError && props.employeeName == ''}
                disable={props.isEdit ? true : false}
              />
            </>
          )}

          {props.headerLabelArr[1].isCheck && (
            <>
              <Text style={[styles.userNameTxt]}>Employee Number*</Text>
              <TextInput
                onChangeText={props.setEmployeeNumber}
                value={props.employeeNumber}
                isError={props.isError && props.employeeNumber == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter Employee Number...'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isEdit ? false : true}
                validationPlaceHolder={'Employee Number'}
                isValidationError={
                  props.employeeNumber != '' &&
                  Validator.validateAlphabate(props.employeeNumber) == false
                    ? true
                    : false
                }
              />
            </>
          )}
          {props.headerLabelArr[2].isCheck && (
            <>
              <Text style={[styles.userNameTxt]}>Date of Birth*</Text>

              <TouchableOpacity
                onPress={props.onPress}
                disabled={props.isEdit ? true : false}
                style={[
                  styles.datePickerView,
                  props.isError && props.dob == '' && styles.error,
                  props.style,
                ]}>
                <Text
                  style={[
                    styles.dateTxt,
                    {
                      color: props.dob ? Colors.blackPearl : Colors.lightRed,
                    },
                  ]}>
                  {props.dob
                    ? moment(props.dob).format('YYYY MM DD')
                    : 'Date of Birth'}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {console.log('props.hireDate', props.hireDate)}
          {props.headerLabelArr[3].isCheck && (
            <>
              <Text style={[styles.userNameTxt]}>Employee Hire Date*</Text>

              <TouchableOpacity
                onPress={props.onHireDatePress}
                disabled={props.isEdit ? true : false}
                style={[
                  styles.datePickerView,
                  props.isError && props.hireDate == '' && styles.error,
                  props.style,
                ]}>
                <Text
                  style={[
                    styles.dateTxt,
                    {
                      color: props.hireDate
                        ? Colors.blackPearl
                        : Colors.lightRed,
                    },
                  ]}>
                  {props.hireDate
                    ? moment(props.hireDate).format('YYYY MMM DD')
                    : 'Employee Hire Date'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* <DropDowns
            label={'Organisation*'}
            data={props.organisationArr || []}
            placeholder="Select Organisation..."
            value={props.organisation}
            onChange={item => {
              onOrgChange(item);
              props.setOrganisation(item.value);
            }}
            disable={props.isView ? true : false}
            style={props.isError && props.organisation == '' && styles.error}
          /> */}
          {props.headerLabelArr[4].isCheck && (
            <DropDowns
              label={'Department*'}
              data={props.departmentArr || []}
              placeholder="Select Department..."
              value={props.department}
              onChange={item => {
                onDepartmentChange(item);
                props.setDepartment(item.value);
              }}
              disable={props.isEdit ? true : false}
              style={props.isError && props.department == '' && styles.error}
              isError={props.isError && props.department == ''}
            />
          )}
          {props.headerLabelArr[5].isCheck && (
            <DropDowns
              label={'Position*'}
              data={props.positionArr || []}
              value={props.positions}
              disable={props.isEdit ? true : false}
              onChange={item => {
                props.setPositions(item.value);
              }}
              placeholder="Select Position…"
              style={props.isError && props.positions == '' && styles.error}
              isError={props.isError && props.positions == ''}
            />
          )}
          {/* {props.headerLabelArr[6].isCheck && (
            <>
              <Text style={[styles.userNameTxt]}>IC Number*</Text>
              <TextInput
                onChangeText={props.setICNumber}
                value={props.icNumber}
                isError={props.isError && props.icNumber == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter IC Number...'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isEdit ? false : true}
                validationPlaceHolder={'Employee Name'}
                isValidationError={
                  props.icNumber != '' &&
                  Validator.validateOnlyNumber(props.icNumber) == false
                    ? true
                    : false
                }
              />
            </>
          )} */}

          <DateTimePickerModal
            isVisible={props.isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </Fragment>
      }
    />
  );
};

export default Header;
