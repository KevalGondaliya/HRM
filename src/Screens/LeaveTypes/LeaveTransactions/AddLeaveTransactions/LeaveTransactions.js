import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import Box from '../../../../component/Box';
import DateButton from '../../../../component/DateButton';
import DropDowns from '../../../../component/DropDowns';
import RadioButton from '../../../../component/RadioButton';
import TextInput from '../../../../component/TextInput';
import Colors from '../../../../theme';
import Validator from '../../../../utility/validator';

import styles from './style';

const LeaveTransactions = ({
  isError,
  isView,
  isEdit,
  setDescription,
  description,
  employeeArr,
  employee,
  setEmployee,
  leaveStartDate,
  onStartDateBtnPress,
  leaveEndDate,
  onEndDateBtnPress,
  isHalfLeave,
  setIsHalfLeave,
  setNo_of_days,
  no_of_days,
  reason,
  setReason,
  uploadDocument,
  removeBtn,
  handleDocumentSelection,
  status,
  setStatus,
  statusArr,
}) => {
  const isSpinner = useSelector(
    state => state.loading.effects.uploadDocument.setDocument,
  );
  return (
    <Box
      label={'Leave Transactions'}
      children={
        <View style={styles.mainView}>
          <DropDowns
            label={'Employee*'}
            placeholder="Select Employee…"
            data={employeeArr || []}
            value={employee}
            onChange={item => {
              setEmployee(item.value);
            }}
            style={isError && employee == '' && styles.error}
            disable={isView ? true : false}
            isError={isError && employee == ''}
          />

          <Text style={styles.userNameTxt}>Leave Description*</Text>

          <TextInput
            onChangeText={setDescription}
            value={description}
            isError={isError && description == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Leave Description…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Leave Description'}
            isValidationError={
              description != '' &&
              Validator.validateTextInput(description) == false
                ? true
                : false
            }
          />

          <DateButton
            date={leaveStartDate}
            isError={isError}
            onPress={onStartDateBtnPress}
            label={'Leave Start Date*'}
            disabled={isView ? true : false}
            editable={isView ? false : true}
          />

          <DateButton
            date={leaveEndDate}
            isError={isError}
            onPress={onEndDateBtnPress}
            label={'Leave End Date*'}
            editable={isView ? false : true}
            disabled={isView ? true : false}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.userNameTxt}>Half Leave?</Text>

              <RadioButton
                value={isHalfLeave}
                onPress={setIsHalfLeave}
                isDisabled={isView ? true : false}
              />
            </View>
            {(isEdit || isView) && (
              <View style={{width: '55%'}}>
                <Text style={styles.userNameTxt}>Numbers of days*</Text>
                <TextInput
                  onChangeText={setNo_of_days}
                  value={no_of_days}
                  isError={isError && no_of_days == ''}
                  style={styles.userNameTextInput}
                  placeholder={'Enter Total Number Of Leave…'}
                  placeholderTextColor={Colors.lightRed}
                  disable={isView ? true : false}
                  keyboardType={'numeric'}
                  editable={isView || isEdit ? false : true}
                  validationPlaceHolder={'Numbers of days'}
                  isValidationError={
                    no_of_days != '' &&
                    Validator.validateNumber(no_of_days) == false
                      ? true
                      : false
                  }
                />
              </View>
            )}
          </View>

          <Text style={styles.userNameTxt}>Reason*</Text>

          <TextInput
            onChangeText={setReason}
            value={reason}
            isError={isError && reason == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Reason…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Reason'}
            isValidationError={
              reason != '' && Validator.validateTextInput(reason) == false
                ? true
                : false
            }
          />

          {/* <Text style={styles.userNameTxt}>Upload Logo*</Text>

          <TextInput
            value={uploadDocument}
            isError={isError && uploadDocument == ''}
            style={styles.userNameTextInput}
            editable={false}
            placeholder={'Upload Logo...'}
            placeholderTextColor={Colors.lightRed}
          />

          {isView ? null : (
            <View style={styles.browseBtnView}>
              <Button
                disable={isView ? true : false}
                label={'Browse Files…'}
                btnStyle={styles.browseBtn}
                onPress={handleDocumentSelection}
                labelStyle={styles.browseTxt}
                isSpinner={isSpinner}
              />

              <Button
                label={'Remove'}
                btnStyle={styles.removeBtn}
                labelStyle={styles.browseTxt}
                onPress={removeBtn}
                disable={isView ? true : false}
              />
            </View>
          )} */}

          {/* <DropDowns
            label={'Status*'}
            placeholder="Select Status…"
            data={statusArr || []}
            value={status}
            onChange={item => {
              setStatus(item.value);
            }}
            style={isError && status == '' && styles.error}
            disable={isView ? true : false}
            isError={isError && status == ''}
          /> */}
        </View>
      }
    />
  );
};

export default LeaveTransactions;
