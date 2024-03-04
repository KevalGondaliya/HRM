import React from 'react';
import { RadioButton } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Validator from '../../../utility/validator';
import TextInput from '../../../component/TextInput';
import DropDowns from '../../../component/DropDowns';
import DateButton from '../../../component/DateButton';
import Button from '../../../component/Button';

const ApplyforaLeave = props => {
  return (
    <Box
      label={'Apply for a Leave'}
      children={
        <View style={styles.containerView}>
          <DropDowns
            label={'Leave Type*'}
            placeholder="Select Leave Type…"
            data={props.leaveTypeArr}
            value={props.leaveTypeValue}
            onChange={item => {
              props.setLeaveTypeValue(item.value);
            }}
            disable={props.isView ? true : false}
            isError={props.isError && props.leaveTypeValue == ''}
            style={props.isError && props.leaveTypeValue == '' && styles.error}
          />

          <DateButton
            date={props.leaveStartDay}
            isError={props.isError}
            onPress={props.onDobBtnPress}
            label={'Leave Start Date*'}
            disabled={props.isView ? true : false}
          />

          <DateButton
            date={props.leaveEndDay}
            isError={props.isError}
            onPress={props.onEndBtnPress}
            label={'Leave End Date*'}
            disabled={props.isView ? true : false}
          />

          <Text style={styles.userNameTxt}>Any Half Days?*</Text>

          <View style={styles.radioButtonView}>
            <RadioButton
              color={Colors.blackPearl}
              status={props.checked ? 'checked' : 'unchecked'}
              onPress={() => props.setChecked(!props.checked)}
              disabled={props.isView ? true : false}
            />
            <Text style={styles.yesTxt}>Yes</Text>
            <RadioButton
              color={Colors.blackPearl}
              status={props.checked ? 'unchecked' : 'checked'}
              onPress={() => props.setChecked(!props.checked)}
              disabled={props.isView ? true : false}
            />
            <Text style={styles.yesTxt}>No</Text>
          </View>

          <Text style={styles.userNameTxt}>Reason for Leave*</Text>

          <TextInput
            onChangeText={props.setReasone}
            value={props.reason}
            isError={props.isError && props.reason == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Reason for Leave…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
            validationPlaceHolder={'Expenditure Amount'}
            isValidationError={props.reason != '' && Validator.validateOnlyAlphabate(props.reason) == false ? true : false}
          />

          <Text style={styles.userNameTxt}>Upload Receipt*</Text>

          <TextInput
            value={props.uploadDocument}
            isError={props.isError && props.uploadDocument == ''}
            style={styles.userNameTextInput}
            editable={false}
            placeholder={'Upload Receipt...'}
            placeholderTextColor={Colors.lightRed}
          />

          <View style={{ flexDirection: 'row' }}>
            <Button
              label={'Browse Files…'}
              btnStyle={styles.browseBtn}
              onPress={props.handleDocumentSelection}
              labelStyle={styles.browseTxt}
              isSpinner={props.isSpinner}
              disabled={props.isView ? true : false}
            />

            <Button
              label={'Remove'}
              btnStyle={styles.removeBtn}
              labelStyle={styles.browseTxt}
              onPress={props.removeBtnPress}
              disabled={props.isView ? true : false}
            />
          </View>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  dobMainView: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(-5),
  },
  width28: { width: '28%' },
  width40: { width: '40%' },
  dateView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    marginRight: scale(10),
  },
  radioButtonView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerView: { paddingBottom: scale(18) },
  browseTxt: { fontSize: scale(11) },
  removeBtn: {
    backgroundColor: Colors.grayishRed,
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    backgroundColor: Colors.blackPearl,
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default ApplyforaLeave;
