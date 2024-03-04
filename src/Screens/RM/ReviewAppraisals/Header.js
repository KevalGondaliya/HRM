import React from 'react';
import moment from 'moment';
import {Text, TouchableOpacity} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';

import styles from './style';

const Header = ({
  dob,
  style,
  onPress,
  isError,
  hireDate,
  positions,
  department,
  employeeName,
  setPositions,
  organisation,
  setDepartment,
  employeeNumber,
  setOrganisation,
  onHireDatePress,
  setEmployeeName,
  setEmployeeNumber,
}) => {
  return (
    <Box
      label={'Employee Details'}
      children={
        <>
          <Text style={[styles.userNameTxt, {marginTop: 0}]}>
            Employee Name*
          </Text>

          <TextInput
            onChangeText={setEmployeeName}
            value={employeeName}
            isError={isError && employeeName == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Employee Name...'}
            placeholderTextColor={Colors.lightRed}
            editable={false}
          />

          <Text style={[styles.userNameTxt]}>Employee Number*</Text>

          <TextInput
            onChangeText={setEmployeeNumber}
            value={employeeNumber}
            isError={isError && employeeNumber == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Employee Number...'}
            editable={false}
            placeholderTextColor={Colors.lightRed}
          />

          <Text style={[styles.userNameTxt]}>Date of Birth*</Text>

          <TouchableOpacity
            disabled={true}
            onPress={onPress}
            style={[
              styles.datePickerView,
              isError && dob == '' && styles.error,
              style,
            ]}>
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

          <Text style={[styles.userNameTxt]}>Employee Hire Date*</Text>

          <TouchableOpacity
            disabled={true}
            onPress={onHireDatePress}
            style={[
              styles.datePickerView,
              style,
              isError && hireDate == '' && styles.error,
            ]}>
            <Text
              style={[
                styles.dateTxt,
                {
                  color: hireDate ? Colors.blackPearl : Colors.lightRed,
                },
              ]}>
              {hireDate
                ? moment(hireDate).format('YYYY MMM DD')
                : 'Enter Hire Date...'}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.userNameTxt]}>Organisation*</Text>

          <TextInput
            onChangeText={setOrganisation}
            value={organisation}
            isError={isError && organisation == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Organisation...'}
            placeholderTextColor={Colors.lightRed}
            editable={false}
          />

          <Text style={[styles.userNameTxt]}>Department*</Text>

          <TextInput
            onChangeText={setDepartment}
            value={department}
            isError={isError && department == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Department...'}
            editable={false}
            placeholderTextColor={Colors.lightRed}
          />

          <Text style={[styles.userNameTxt]}>Positions*</Text>

          <TextInput
            onChangeText={setPositions}
            value={positions}
            isError={isError && positions == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Positions...'}
            editable={false}
            placeholderTextColor={Colors.lightRed}
          />
        </>
      }
    />
  );
};

export default Header;
