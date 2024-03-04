import React from 'react';
import Modal from 'react-native-modal';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import DropDown from '../../../component/DropDown';
import TextInput from '../../../component/TextInput';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import DropDowns from '../../../component/DropDowns';
import {leaveDropDownData} from '../../../dummyData';

const Leaves = props => {
  console.log(props.empDashboardData);
  return (
    <>
      <Box
        label={'Leaves'}
        addIconPress={() => props.setIsModalVisible(true)}
        children={
          <>
            {props.empDashboardData?.map((data, index) => {
              return (
                <View style={styles.branchNameView}>
                  <Text style={styles.branchNameTxt}> {data.entitlement}</Text>
                  <View style={[styles.dotView, {marginLeft: scale(3)}]}></View>
                  <Text style={styles.branchNameTxt1}>
                    {data.remaining} / {data.total}
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
        isVisible={props.isModalVisible}
        animationType="slideInUp"
        onBackdropPress={() => {
          props.setIsModalVisible(false);
        }}
        onBackButtonPress={() => {}}
        transparent={true}>
        <View style={[styles.modalView]}>
          <View style={styles.modalMainView}>
            <Text style={styles.modalLabel}>Add Leaves</Text>
            <DropDowns
              label={'Leave Type*'}
              placeholder="Select Leave Type…"
              data={leaveDropDownData}
              value={props.leaveValue}
              onChange={item => {
                props.setLeaveValue(item.value);
              }}
              disable={props.isView ? true : false}
              style={props.isError && props.leaveValue == '' && styles.error}
            />

            <Text style={[styles.userNameTxt, styles.departmentNameTxt]}>
              Number of Days Entitled*
            </Text>

            <TextInput
              onChangeText={props.setDayEntitled}
              value={props.dayEntitled}
              isError={props.isError && props.dayEntitled == ''}
              style={styles.userNameTextInput}
              placeholder={'Enter Reason for Leave…'}
              placeholderTextColor={Colors.lightRed}
              keyboardType={'numeric'}
              editable={props.isView ? false : true}
            />

            <Text style={[styles.userNameTxt, styles.departmentNameTxt]}>
              Number of Days remaining*
            </Text>

            <TextInput
              onChangeText={props.setRemaining}
              value={props.remaining}
              isError={props.isError && props.remaining == ''}
              style={styles.userNameTextInput}
              placeholder={'Enter Reason for Leave…'}
              placeholderTextColor={Colors.lightRed}
              keyboardType={'numeric'}
              editable={props.isView ? false : true}
            />

            <SaveCancelBtn
              cancelBtn={props.leaveCancleBtn}
              style={styles.saveBtn}
              label={'Add'}
              submitBtn={props.leaveSubmitBtn}
              saveLoading={props.saveLoading}
            />
          </View>
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
    width: '35%',
  },
  dotView: {
    borderTopWidth: 1,
    borderStyle: 'dotted',
    width: '45%',
    top: scale(2),
    alignSelf: 'center',
  },
  branchNameTxt1: {
    fontSize: scale(12),
    color: '#666',
    fontWeight: '600',
    width: '16%',
    marginLeft: scale(3),
    textAlign: 'right',
  },
  modalMainView: {
    width: '100%',
    minHeight: scale(50),
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(30),
    paddingVertical: scale(45),
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
  saveBtn: {marginTop: scale(15)},
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
export default Leaves;
