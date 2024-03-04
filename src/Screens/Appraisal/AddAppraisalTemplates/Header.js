import moment from 'moment';
import React, {Fragment, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {scale} from 'react-native-size-matters';

import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';
import {appeaisalHeaderTbData} from '../../../dummyData';
import Colors from '../../../theme';
import Validator from '../../../utility/validator';

import {useDispatch, useSelector} from 'react-redux';
import DropDowns from '../../../component/DropDowns';
import styles from './style';

const Header = ({
  dob,
  isEdit,
  isView,
  setDob,
  isError,
  onPress,
  hireDate,
  positions,
  department,
  setHireDate,
  employeeName,
  setPositions,
  organisation,
  setDepartment,
  selectDateType,
  employeeNumber,
  setEmployeeName,
  onHireDatePress,
  setOrganisation,
  setEmployeeNumber,
  isDatePickerVisible,
  setDatePickerVisibility,
  organisationArr,
  departmentArr,
  positionArr,
  employeeArr,
  numberOfService,
  setNumberOfService,
}) => {
  const [count, setCount] = useState(0);
  const [headerLabelArr, setHeaderLabelArr] = useState(appeaisalHeaderTbData);

  useEffect(() => {
    if (isView || isEdit) {
      dispatch.relationValue.getOrgDepartment({token, id: organisation});
      dispatch.relationValue.getDepartmentPosition({token, id: department});
    }
  }, [isView, isEdit]);

  const handleConfirm = date => {
    switch (selectDateType) {
      case 'dob':
        setDob(date);
        setDatePickerVisibility(false);
        break;

      case 'hireDate':
        setHireDate(date);
        setDatePickerVisibility(false);
        break;
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  // const onOrgChange = item => {
  //   dispatch.relationValue.getOrgDepartment({token, id: item.value});
  //   setDepartment('');
  //   setPositions('');
  // };

  const onDepartmentChange = item => {
    dispatch.relationValue.getDepartmentPosition({token, id: item.value});
    setPositions('');
  };
  const onHeaderClick = (data, index) => {
    console.log('dataaaa', data);
    let arr = headerLabelArr;
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i].isCheck = !arr[i].isCheck;
      }
    }
    setCount(count + 1);
    setHeaderLabelArr(arr);
  };

  return (
    <Box
      label={'Header'}
      children={
        <Fragment>
          <View style={styles.headerLabelView} key={count}>
            {headerLabelArr.map((data, index) => {
              return (
                <View
                  // onPress={() => {
                  //   onCheckPress(index);
                  // }}
                  style={styles.mappingMainView}
                  key={index}>
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
          {headerLabelArr[0].isCheck && (
            <DropDowns
              label={'Employee Name*'}
              placeholder={'Enter Employee Name...'}
              data={employeeArr || []}
              value={employeeName}
              onChange={item => {
                setEmployeeName(item.value);
              }}
              // disable={isEdit ? true : false}
              style={isError && employeeName == '' && styles.error}
              isError={isError && employeeName == ''}
            />
          )}
          {headerLabelArr[1].isCheck && (
            <>
              <Text style={styles.userNameTxt}>Employee Number*</Text>
              <TextInput
                value={employeeNumber}
                style={styles.userNameTextInput}
                onChangeText={setEmployeeNumber}
                keyboardType={'numeric'}
                placeholderTextColor={Colors.lightRed}
                isError={isError && employeeNumber == ''}
                placeholder={'Enter Employee Number...'}
                editable={isEdit ? false : true}
                validationPlaceHolder={'Employee Number'}
                isValidationError={
                  employeeNumber != '' &&
                  Validator.validateNumber(employeeNumber) == false
                    ? true
                    : false
                }></TextInput>
            </>
          )}
          {headerLabelArr[6].isCheck && (
            <>
              <Text style={styles.userNameTxt}>
                Number of Years of Service*
              </Text>

              <TextInput
                value={numberOfService}
                style={styles.userNameTextInput}
                onChangeText={setNumberOfService}
                keyboardType={'numeric'}
                placeholderTextColor={Colors.lightRed}
                isError={isError && numberOfService == ''}
                placeholder={'Enter Show Number of Years of Service...'}
                // editable={isEdit ? false : true}
                validationPlaceHolder={' Number of Years of Service'}
                isValidationError={
                  numberOfService != '' &&
                  Validator.validateNumber(numberOfService) == false
                    ? true
                    : false
                }
              />
            </>
          )}

          {headerLabelArr[2].isCheck && (
            <>
              <Text style={styles.userNameTxt}>Date of Birth*</Text>

              <TouchableOpacity
                onPress={onPress}
                style={[
                  styles.datePickerView,
                  isError && dob == '' && styles.error,
                ]}
                // disabled={isEdit ? true : false}
              >
                <Text
                  style={[
                    styles.dateTxt,
                    {
                      color: dob ? Colors.blackPearl : Colors.lightRed,
                    },
                  ]}>
                  {dob ? moment(dob).format('YYYY MM DD') : 'Date of Birth'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {headerLabelArr[3].isCheck && (
            <>
              <Text style={styles.userNameTxt}>Employee Hire Date*</Text>

              <TouchableOpacity
                onPress={onHireDatePress}
                style={[
                  styles.datePickerView,
                  isError && hireDate == '' && styles.error,
                ]}
                disabled={isEdit ? true : false}>
                <Text
                  style={[
                    styles.dateTxt,
                    {
                      color: hireDate ? Colors.blackPearl : Colors.lightRed,
                    },
                  ]}>
                  {hireDate
                    ? moment(hireDate).format('DD-MM-YYYY')
                    : 'Hire Date'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* <DropDowns
            label={'Organisation*'}
            data={organisationArr || []}
            placeholder="Select Organisation..."
            value={organisation}
            onChange={item => {
              onOrgChange(item);
              setOrganisation(item.value);
            }}
            disable={isView ? true : false}
            style={isError && organisation == '' && styles.error}
          /> */}
          {headerLabelArr[4].isCheck && (
            <DropDowns
              label={'Department*'}
              data={departmentArr || []}
              placeholder="Select Department..."
              value={department}
              onChange={item => {
                onDepartmentChange(item);
                setDepartment(item.value);
              }}
              disable={isEdit ? true : false}
              style={isError && department == '' && styles.error}
              isError={isError && department == ''}
            />
          )}
          {headerLabelArr[5].isCheck && (
            <DropDowns
              label={'Position*'}
              data={positionArr || []}
              value={positions}
              disable={isEdit ? true : false}
              onChange={item => {
                setPositions(item.value);
              }}
              placeholder="Select Position…"
              style={isError && positions == '' && styles.error}
              isError={isError && positions == ''}
            />
          )}

          <DateTimePickerModal
            mode="date"
            isVisible={isDatePickerVisible}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </Fragment>
      }
    />
  );
};

export default Header;
