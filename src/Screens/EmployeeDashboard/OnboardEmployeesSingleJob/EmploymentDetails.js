import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import DropDowns from '../../../component/DropDowns';
import TextInput from '../../../component/TextInput';

import styles from './style';

const PersonalDetails = ({
  isView,
  empId,
  isError,
  setEmpId,
  workEmail,
  positionArr,
  setWorkEmail,
  positionValue,
  departmentArr,
  departmentValue,
  setPositionValue,
  approvalGroupArr,
  approvalGroupValue,
  setDepartmentValue,
  organisationTypeArr,
  setApprovalGroupValue,
  organisationTypeValue,
  setOrganisationTypeValue,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  const onOrgChange = item => {
    dispatch.relationValue.getOrgDepartment({token, id: item.value});
    dispatch.relationValue.getApprovalGroup({token, id: item.value});
    setDepartmentValue('');
    setPositionValue('');
    setApprovalGroupValue('');
  };

  const onDepartmentChange = item => {
    dispatch.relationValue.getDepartmentPosition({token, id: item.value});
    setPositionValue('');
  };
  return (
    <Box
      label={'Employment Details'}
      children={
        <Fragment>
          <DropDowns
            label={'Payment Method*'}
            placeholder="Select Method"
            data={props.paymentMethodArr || []}
            value={props.paymentMethodValue}
            onChange={item => {
              props.setPaymentMethodValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={
              props.isError && props.paymentMethodValue == '' && styles.error
            }
          />

          <Text style={styles.userNameTxt}>Bank*</Text>
          <TextInput
            onChangeText={props.setBank}
            value={props.bank}
            isError={props.isError && props.bank == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Bank…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
          />

          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              <DropDowns
                label={'Position*'}
                data={positionArr || []}
                value={positionValue}
                disable={isView ? true : false}
                onChange={item => {
                  setPositionValue(item.value);
                }}
                placeholder="Select Position…"
                style={isError && positionValue == '' && styles.error}
              />
            </View>

            <View style={styles.width48}>
              <Text style={styles.userNameTxt}>Employee ID*</Text>
              <View
                style={[
                  styles.userNameTextInput,
                  styles.fTxtView,
                  {
                    borderWidth: isError && empId == '' ? 2 : 0,
                    borderColor: 'red',
                  },
                ]}>
                <Text style={styles.fTxt}>F</Text>
                <TextInput
                  onChangeText={setEmpId}
                  value={empId}
                  style={{
                    width: '80%',
                  }}
                  placeholder={'Enter ID'}
                  placeholderTextColor={Colors.lightRed}
                />
              </View>
            </View>
          </View>

          <Text style={styles.userNameTxt}>Work Email*</Text>

          <TextInput
            onChangeText={setWorkEmail}
            value={workEmail}
            isError={isError && workEmail == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Work Email…'}
            keyboardType={'email-address'}
            placeholderTextColor={Colors.lightRed}
          />

          <DropDowns
            label={'Approval Group*'}
            placeholder="Select Approval Group..."
            data={approvalGroupArr || []}
            value={approvalGroupValue}
            onChange={item => {
              setApprovalGroupValue(item.value);
            }}
            disable={isView ? true : false}
            style={isError && approvalGroupValue == '' && styles.error}
          />
        </Fragment>
      }
    />
  );
};

export default PersonalDetails;
