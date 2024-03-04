import React, {Fragment} from 'react';
import {View, Text} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Button from '../../../component/Button';
import DropDowns from '../../../component/DropDowns';
import TextInput from '../../../component/TextInput';
import RadioButton from '../../../component/RadioButton';
import {limitPeriodData} from '../../../utility/constant';
import Validator from '../../../utility/validator';

import styles from './style';

const ApprovalGroupDetails = ({
  isView,
  isError,
  isInstalments,
  setIsInstalments,
  deductionTypeValue,
  setDeductionTypeValue,
  employeeArr,
  employeeValue,
  setEmployeeValue,
  instalmentPeriodValue,
  isSpinner,
  setInstalmentPeriodValue,
  percentage,
  setPercentage,
  uploadDocument,
  handleDocumentSelection,
  removeBtnPress,
  deductionTypeArr,
}) => {
  return (
    <Box
      label={'Deduction Types'}
      children={
        <Fragment>
          <DropDowns
            isError={isError && employeeValue == ''}
            label={'Employee*'}
            placeholder="Select Employee…"
            data={employeeArr || []}
            value={employeeValue}
            onChange={item => {
              setEmployeeValue(item.value);
            }}
            style={isError && employeeValue == '' && styles.error}
            disable={isView ? true : false}
          />

          <DropDowns
            label={'Deduction Type*'}
            placeholder={'Enter Deduction Type'}
            data={deductionTypeArr || []}
            value={deductionTypeValue}
            onChange={item => {
              setDeductionTypeValue(item.value);
            }}
            style={isError && deductionTypeValue == '' && styles.error}
            disable={isView ? true : false}
            isError={isError && deductionTypeValue == ''}
          />

          <View style={styles.padiView}>
            <View>
              <Text style={styles.userNameTxt}>Percentage Per Month*</Text>

              <TextInput
                onChangeText={setPercentage}
                value={percentage}
                isError={isError && percentage == ''}
                keyboardType={'numeric'}
                style={styles.userNameTextInput}
                placeholder={'Enter Percentage…'}
                placeholderTextColor={Colors.lightRed}
                editable={isView ? false : true}
                validationPlaceHolder={'Percentage per Month'}
                isValidationError={
                  percentage != '' &&
                  Validator.validateNumber(percentage) == false
                    ? true
                    : false
                }
              />
            </View>
            <View>
              <Text style={styles.userNameTxt}>Installments?*</Text>

              <RadioButton
                value={isInstalments}
                onPress={setIsInstalments}
                isDisabled={isView ? true : false}
              />
            </View>
          </View>

          {isInstalments && (
            <DropDowns
              label={'Installments Period*'}
              placeholder="Select Installments Period…"
              data={limitPeriodData || []}
              value={instalmentPeriodValue}
              onChange={item => {
                setInstalmentPeriodValue(item.value);
              }}
              style={isError && instalmentPeriodValue == '' && styles.error}
              disable={isView ? true : false}
              isError={isError && instalmentPeriodValue == ''}
            />
          )}

          <Text style={styles.userNameTxt}>Upload File*</Text>

          <TextInput
            editable={false}
            placeholder={'Upload File…'}
            value={uploadDocument}
            style={styles.userNameTextInput}
            placeholderTextColor={Colors.lightRed}
            isError={isError && uploadDocument == ''}
          />

          <View style={styles.browseBtnView}>
            <Button
              label={'Browse Files…'}
              btnStyle={styles.browseBtn}
              labelStyle={styles.browseTxt}
              onPress={handleDocumentSelection}
              isSpinner={isSpinner}
              // disable={isView ? true : false}
              editable={isView ? false : true}
            />

            <Button
              label={'Remove'}
              btnStyle={styles.removeBtn}
              labelStyle={styles.browseTxt}
              onPress={removeBtnPress}
              // disable={isView ? true : false}
              editable={isView ? false : true}
            />
          </View>
        </Fragment>
      }
    />
  );
};

export default ApprovalGroupDetails;
