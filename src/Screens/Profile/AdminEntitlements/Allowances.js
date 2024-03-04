import React from 'react';
import Modal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDowns from '../../../component/DropDowns';
import DateButton from '../../../component/DateButton';
import { recurringPeriodArrData } from '../../../utility/constant';

const Leaves = props => {
  return (
    <>
      <Box
        label={'Allowances'}
        style={{ marginTop: scale(8) }}
        addIconPress={() => props.setAllowanceIsModalVisible(true)}
        children={
          <>
            {props.empDashboardData?.map((data, index) => {
              return (
                <View style={styles.branchNameView}>
                  <Text style={[styles.branchNameTxt, { width: '25%' }]}>
                    {' '}
                    {data.entitlement}
                  </Text>
                  <View style={[styles.dotView, { marginLeft: scale(4) }]}></View>
                  <Text style={styles.branchNameTxt1}>
                    $ {data.total} / month
                  </Text>
                </View>
              );
            })}
          </>
        }
      />

      <Modal
        backdropOpacity={0.7}
        backdropColor={Colors.black}
        isVisible={props.allowanceIsModalVisible}
        animationType="slideInUp"
        onBackdropPress={() => {
          props.setAllowanceIsModalVisible(false);
        }}
        onBackButtonPress={() => { }}
        transparent={true}>
        <View style={styles.modalMainView}>
          <Text style={styles.modalLabel}>Add Allowances</Text>
          <KeyboardAwareScrollView
            style={{ marginTop: scale(5) }}
            showsVerticalScrollIndicator={false}>
            <DropDowns
              label={'Allowance Type*'}
              placeholder="Select Allowance Type…"
              data={props.allowanceArr}
              value={props.allowanceValue}
              onChange={item => {
                props.setAllowanceValue(item.value);
              }}
              disable={props.isView ? true : false}
              style={
                props.isError && props.allowanceValue == '' && styles.error
              }
            />
            <Text style={[styles.userNameTxt, styles.departmentNameTxt]}>
              Amount*
            </Text>
            <TextInput
              onChangeText={props.setAmount}
              value={props.amount}
              isError={props.isError && props.amount == ''}
              style={styles.userNameTextInput}
              placeholder={'Enter Amount…'}
              placeholderTextColor={Colors.lightRed}
              keyboardType={'numeric'}
              editable={props.isView ? false : true}
            />
            {/* <Text style={[styles.userNameTxt]}>Department Code*</Text>

            <TextInput
              onChangeText={props.setDepartmentCode}
              value={props.departmentCode}
              style={[
                styles.userNameTextInput,
                {
                  borderWidth:
                    props.isError && props.departmentCode == '' ? 2 : 0,
                  borderColor:
                    props.isError && props.departmentCode == '' ? 'red' : null,
                },
              ]}
              placeholder={'Enter Department Code…'}
              placeholderTextColor={Colors.lightRed}
            /> */}
            <DropDowns
              label={'Recurring?*'}
              placeholder="Select One…"
              data={props.recurringArr}
              value={props.recurringValue}
              onChange={item => {
                props.setRecurringValue(item.value);
              }}
              disable={props.isView ? true : false}
              style={
                props.isError && props.recurringValue == '' && styles.error
              }
            />
            <DropDowns
              label={'Recurring Period*'}
              placeholder="Select Recurring Period…"
              data={recurringPeriodArrData}
              value={props.recurringPeriodValue}
              onChange={item => {
                props.setRecurringPeriodValue(item.value);
              }}
              disable={props.isView ? true : false}
              style={
                props.isError &&
                props.recurringPeriodValue == '' &&
                styles.error
              }
            />

            <DateButton
              date={props.effectiveDate}
              isError={props.isError}
              onPress={props.onEffectiveBtnPress}
              label={'Effective Date*'}
              disabled={props.isView ? true : false}
            />

            <DateButton
              date={props.endDate}
              isError={props.isError}
              onPress={props.onEndDateBtnPress}
              label={'End Date*'}
              disabled={props.isView ? true : false}
            />

            <SaveCancelBtn
              cancelBtn={() => {
                props.setAllowanceIsModalVisible(false);
              }}
              style={styles.saveBtn}
              label={'Add'}
              submitBtn={props.submitBtnPress}
              saveLoading={props.isAllowanceTypesLoading}
            />
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  branchNameView: {
    flexDirection: 'row',
    width: '100%',
    height: scale(30),
    alignItems: 'center',
  },
  branchNameTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: '600',
    width: '20%',
  },
  dotView: {
    borderTopWidth: 1,
    borderStyle: 'dotted',
    width: '42%',
    top: scale(2),
    alignSelf: 'center',
  },
  branchNameTxt1: {
    fontSize: scale(12),
    color: '#666',
    fontWeight: '600',
    marginLeft: scale(5),
  },

  modalMainView: {
    width: '100%',
    height: '95%',
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(30),
    paddingVertical: scale(43),
  },
  modalLabel: {
    fontSize: scale(16),
    color: Colors.sBlack,
    textAlign: 'center',
    marginBottom: scale(0),
  },
  labelStyle: {
    color: Colors.lightRed,
    marginBottom: scale(3),
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  departmentTxt: {
    color: Colors.lightRed,
    marginBottom: scale(5),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  saveBtn: { marginTop: scale(25) },
  departmentNameTxt: {
    color: Colors.lightRed,
    marginTop: scale(10),
  },
  dropDownStyle: {
    marginBottom: scale(5),
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
  width28: { width: '28%' },
  width40: { width: '40%' },
  error: { borderWidth: 2, borderColor: 'red' },
});
export default Leaves;
