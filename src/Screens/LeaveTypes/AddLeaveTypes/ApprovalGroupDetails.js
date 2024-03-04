import React from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Box from '../../../component/Box';
import Colors from '../../../theme';
import {
  employeeOffboardsDaysArr,
  entitledToArr,
  prorateByArr,
  roundingByArr,
  roundingToArr,
  unusedLeaveDaysArr,
} from '../../../utility/constant';
// import {dropDownData} from '../../../dummyData';
import DropDowns from '../../../component/DropDowns';
import RadioButton from '../../../component/RadioButton';
import TextInput from '../../../component/TextInput';
import Validator from '../../../utility/validator';
// import YearDropDown from '../../../component/YearDropDown';

import styles from './style';

const ApprovalGroupDetails = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  const onDepartmentChange = item => {
    dispatch.relationValue.getDepartmentPosition({token, id: item.value});
    props.setPositionValue('');
  };

  return (
    <Box
      label={'Leave Types'}
      children={
        <View style={styles.mainView}>
          <Text style={styles.userNameTxt}>Leave Description*</Text>
          <TextInput
            onChangeText={props.setDescription}
            value={props.description}
            isError={props.isError && props.description == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Leave Description…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
            validationPlaceHolder={'Leave Description'}
            isValidationError={
              props.description != '' &&
              Validator.validateTextInput(props.description) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>
            Number of Service Years Required*
          </Text>

          <TextInput
            onChangeText={props.setServiceYears}
            value={props.serviceYears}
            keyboardType={'numeric'}
            isError={props.isError && props.serviceYears == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Number of Service Years Required…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
            validationPlaceHolder={'Number of Service Years'}
            isValidationError={
              props.serviceYears != '' &&
              Validator.validateAmount(props.serviceYears) == false
                ? true
                : false
            }
          />

          <Text style={styles.userNameTxt}>Number of Days Entitled*</Text>

          <TextInput
            onChangeText={props.setEntitledNumber}
            value={props.entitledNumber}
            keyboardType={'numeric'}
            isError={props.isError && props.entitledNumber == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Number of Days Entitled…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
            validationPlaceHolder={'Number of Days Entitled'}
            isValidationError={
              props.entitledNumber != '' &&
              Validator.validateAmount(props.entitledNumber) == false
                ? true
                : false
            }
          />

          <DropDowns
            label={'Entitled To*'}
            data={entitledToArr || []}
            placeholder="Select Entitled To..."
            value={props.entitledToValue}
            onChange={item => {
              props.setEntitledToValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={props.isError && props.entitledToValue == '' && styles.error}
            isError={props.isError && props.entitledToValue == ''}
          />

          {props.entitledToValue == 'Specific Positions' && (
            <>
              <DropDowns
                label={'Department*'}
                data={props.departmentArr || []}
                placeholder="Select Department..."
                value={props.departmentValue}
                onChange={item => {
                  onDepartmentChange(item);
                  props.setDepartmentValue(item.value);
                }}
                disable={props.isView ? true : false}
                style={
                  props.isError && props.departmentValue == '' && styles.error
                }
              />
              <DropDowns
                label={'Position*'}
                data={props.positionArr || []}
                value={props.positionValue}
                disable={props.isView ? true : false}
                onChange={item => {
                  props.setPositionValue(item.value);
                }}
                placeholder="Select Position…"
                style={
                  props.isError && props.positionValue == '' && styles.error
                }
              />
            </>
          )}

          <DropDowns
            label={
              'Choose what to do with unused leave days at the end of each year*444'
            }
            data={unusedLeaveDaysArr || []}
            value={props.unusedLeaveDays}
            disable={props.isView ? true : false}
            onChange={item => {
              props.setUnusedLeaveDays(item.value);
            }}
            placeholder="Select Option..."
            style={props.isError && props.unusedLeaveDays == '' && styles.error}
            isError={props.isError && props.unusedLeaveDays == ''}
          />

          {props.unusedLeaveDays == 'Carry Forward' && (
            <>
              <Text style={styles.userNameTxt}>
                Maximum Number of Days to Carry Forward
              </Text>
              <TextInput
                onChangeText={props.setCarryForwardNumber}
                value={props.carryForwardNumber}
                keyboardType={'numeric'}
                style={styles.userNameTextInput}
                placeholder={'Enter carry Forward Number…'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isView ? false : true}
                isError={props.isError && props.carryForwardNumber == ''}
                validationPlaceHolder={'Number of Days Encash'}
                isValidationError={
                  props.carryForwardNumber != '' &&
                  Validator.validateOnlyNumber(props.carryForwardNumber) ==
                    false
                    ? true
                    : false
                }
              />
            </>
          )}

          {props.unusedLeaveDays == 'Encash' && (
            <>
              <Text style={styles.userNameTxt}>
                Maximum Number of Days to Encash*
              </Text>
              <TextInput
                onChangeText={props.setEncashNumber}
                value={props.enCashNumber}
                keyboardType={'numeric'}
                style={styles.userNameTextInput}
                placeholder={'Enter Maximum Number of Days to Encash…'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isView ? false : true}
                isError={props.isError && props.enCashNumber == ''}
                validationPlaceHolder={'Number of Days Encash'}
                isValidationError={
                  props.enCashNumber != '' &&
                  Validator.validateOnlyNumber(props.enCashNumber) == false
                    ? true
                    : false
                }
              />
            </>
          )}

          <DropDowns
            label={
              'Choose what to do with unused leave days when an employee offboards'
            }
            data={employeeOffboardsDaysArr || []}
            value={props.employeeOffboardsDays}
            disable={props.isView ? true : false}
            onChange={item => {
              props.setEmployeeOffboardsDays(item.value);
            }}
            placeholder="Select Option..."
            // style={
            //   props.isError && props.employeeOffboardsDays == '' && styles.error
            // }
            // isError={props.isError && props.employeeOffboardsDays == ''}
          />

          {props.employeeOffboardsDays == 'Encash' && (
            <>
              <Text style={styles.userNameTxt}>
                Maximum Number of Days to Encash
              </Text>
              <TextInput
                onChangeText={props.setEmployeeOffboardsEncash}
                value={props.employeeOffboardsEncash}
                keyboardType={'numeric'}
                style={styles.userNameTextInput}
                placeholder={'Enter Maximum Number of Days to Encash…'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isView ? false : true}
                validationPlaceHolder={'Number of Days Encash'}
                isValidationError={
                  props.employeeOffboardsEncash != '' &&
                  Validator.validateOnlyNumber(props.employeeOffboardsEncash) ==
                    false
                    ? true
                    : false
                }
                isError={props.isError && props.employeeOffboardsEncash == ''}
              />
            </>
          )}

          <Text style={styles.userNameTxt}>
            Default Apply to New Employees*
          </Text>
          <RadioButton
            value={props.isNewEmployess}
            onPress={props.setIsNewEmployess}
            isDisabled={props.isView ? true : false}
          />

          <Text style={styles.userNameTxt}>Apply to Existing Employee*</Text>
          <RadioButton
            value={props.isExistingEmployess}
            onPress={props.setIsExistingEmployess}
            isDisabled={props.isView ? true : false}
          />

          <Text style={styles.userNameTxt}>Unpaid*</Text>
          <RadioButton
            value={props.isUnpaid}
            onPress={props.setIsUnpaid}
            isDisabled={props.isView ? true : false}
          />

          {/* <Text style={styles.userNameTxt}>Entitled From*</Text>
          <TextInput
            onChangeText={props.setEntitledFromValue}
            value={props.entitledFromValue}
            isError={props.isError && props.entitledFromValue == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Entitled From...'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
          />

          <DropDowns
            label={'Rollover Leave Method?*'}
            placeholder="Select Option…"
            data={dropDownData || []}
            value={props.rolloverMethod}
            onChange={item => {
              props.setRolloverMethod(item.value);
            }}
            style={props.isError && props.rolloverMethod == '' && styles.error}
            disable={props.isView && true}
            isError={props.isError && props.rolloverMethod == ''}
          /> */}

          {/* <Text style={styles.userNameTxt}>Offboard Leave Method*</Text>
          <YearDropDown
            // isError={props.isError}
            date={
              props.offboardingValue &&
              moment(props.offboardingValue).format('DD-MM-YYYY')
            }
            onPress={props.onOffboardingPress}
            placeHolder={'Select Option…'}
            style={{ marginBottom: scale(-2) }}
            disabled={props.isView ? true : false}
            isError={props.isError && props.offboardingValue == ''}
          /> */}

          <DropDowns
            label={'Gender*'}
            placeholder="Select Option…"
            data={props.genderArr || []}
            value={props.genderValue}
            onChange={item => {
              props.setGenderValue(item.value);
            }}
            style={props.isError && props.genderValue == '' && styles.error}
            disable={props.isView && true}
            isError={props.isError && props.genderValue == ''}
          />

          <View style={styles.padiView}>
            <View>
              <Text style={styles.userNameTxt}>Paid Leave?</Text>

              <RadioButton
                value={props.isPaidLeave}
                onPress={props.setIsPaidLeave}
                isDisabled={props.isView ? true : false}
              />
            </View>
            <View>
              <Text style={styles.userNameTxt}>Prorated?</Text>

              <RadioButton
                value={props.isProrated}
                onPress={props.setIsProrated}
                isDisabled={props.isView ? true : false}
              />
            </View>
          </View>

          <View style={styles.padiView}>
            <View>
              <Text style={styles.userNameTxt}>Reason Required?</Text>

              <RadioButton
                value={props.isReasonRequired}
                onPress={props.setIsReasonRequired}
                isDisabled={props.isView ? true : false}
              />
            </View>
            <View>
              <Text style={styles.userNameTxt}>Proof Required?</Text>

              <RadioButton
                value={props.isProofRequired}
                onPress={props.setIsProofRequired}
                isDisabled={props.isView ? true : false}
              />
            </View>
          </View>

          <DropDowns
            label={'Prorate By?*'}
            placeholder="Select Prora…"
            data={prorateByArr || []}
            value={props.prorateByValue}
            onChange={item => {
              props.setProrateByValue(item.value);
            }}
            style={props.isError && props.prorateByValue == '' && styles.error}
            disable={props.isView && true}
            isError={props.isError && props.prorateByValue == ''}
          />

          <DropDowns
            label={'Rounding By?*'}
            isError={props.isError && props.roundingByValue == ''}
            placeholder="Select Round…"
            data={roundingByArr || []}
            value={props.roundingByValue}
            onChange={item => {
              props.setRoundingByValue(item.value);
            }}
            style={props.isError && props.roundingByValue == '' && styles.error}
            disable={props.isView && true}
          />

          <DropDowns
            isError={props.isError && props.roundingToValue == ''}
            label={'Rounding To?*'}
            placeholder="Select Round…"
            data={roundingToArr || []}
            value={props.roundingToValue}
            onChange={item => {
              props.setRoundingToValue(item.value);
            }}
            style={props.isError && props.roundingToValue == '' && styles.error}
            disable={props.isView && true}
          />
        </View>
      }
    />
  );
};

export default ApprovalGroupDetails;
