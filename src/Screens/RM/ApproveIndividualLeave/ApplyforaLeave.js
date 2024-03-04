import React from 'react';
import {Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import DropDown from '../../../component/DropDown';
import TextInput from '../../../component/TextInput';
import DateButton from '../../../component/DateButton';

import styles from './style';

const ApplyforaLeave = ({
  checked,
  reason,
  isError,
  empName,
  setReasone,
  setEmpName,
  leaveEndDay,
  leaveTypeArr,
  leaveStartDay,
  openLeaveType,
  leaveTypeValue,
  setLeaveTypeArr,
  setOpenLeaveType,
  setLeaveTypeValue,
  totalNoOfDays,
}) => {
  return (
    <Box
      label={'Leave Details'}
      children={
        <View style={styles.container}>
          <Text style={styles.userNameTxt}>Employee Name</Text>

          <TextInput
            editable={false}
            onChangeText={setEmpName}
            value={empName}
            style={[styles.userNameTextInput, {borderWidth: 0}]}
            placeholder={'Enter Reason for Leave…'}
            placeholderTextColor={Colors.lightRed}
          />

          <DropDown
            label={'Leave Type*'}
            placeholder="Select Leave Type…"
            open={openLeaveType}
            value={leaveTypeValue}
            items={leaveTypeArr}
            setOpen={setOpenLeaveType}
            setValue={setLeaveTypeValue}
            setItems={setLeaveTypeArr}
            dropDownStyle={styles.dropDownStyle}
            disabled={true}
          />

          <DateButton
            date={leaveStartDay}
            isError={isError}
            disabled={true}
            label={'Leave Start Date*'}
          />
          <DateButton
            date={leaveEndDay}
            isError={isError}
            disabled={true}
            label={'Leave End Date*'}
          />

          <Text style={styles.userNameTxt}>Any Half Days?*</Text>

          <View style={styles.radioButtonView}>
            <RadioButton
              color={Colors.blackPearl}
              status={checked ? 'checked' : 'unchecked'}
            />
            <Text style={styles.yesTxt}>Yes</Text>
            <RadioButton
              color={Colors.blackPearl}
              status={checked ? 'unchecked' : 'checked'}
            />
            <Text style={styles.yesTxt}>No</Text>
          </View>

          {checked && (
            <>
              <Text style={styles.userNameTxt}>Half Days*</Text>

              <TextInput
                editable={false}
                onChangeText={setEmpName}
                value={totalNoOfDays}
                style={[styles.userNameTextInput, {borderWidth: 0}]}
                placeholder={'Enter Half Days…'}
                placeholderTextColor={Colors.lightRed}
              />
            </>
          )}

          <Text style={styles.userNameTxt}>Reason for Leave*</Text>

          <TextInput
            onChangeText={setReasone}
            value={reason}
            editable={false}
            style={styles.userNameTextInput}
            placeholder={'Enter Reason for Leave…'}
            placeholderTextColor={Colors.lightRed}
          />
        </View>
      }
    />
  );
};

export default ApplyforaLeave;
