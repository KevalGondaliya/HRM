import React from 'react';
import {View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';

import Colors from '../../../../theme';
import Box from '../../../../component/Box';
import DropDowns from '../../../../component/DropDowns';
import TextInput from '../../../../component/TextInput';
import DateButton from '../../../../component/DateButton';
import Validator from '../../../../utility/validator';

import styles from './style';

const AppraisalCycleDetails = ({
  isView,
  endDate,
  isError,
  template,
  startDate,
  empEndDate,
  flowTypeArr,
  setTemplate,
  flowTypeValue,
  setFlowTypeValue,
  onEndDateBtnPress,
  onStartDateBtnPress,
  onEmpEndDateBtnPress,
  employeeArr,
  employee,
  setEmployee,
  templateTypeArr,
  cycleName,
  setCycleName,
}) => {
  return (
    <Box
      label={'Appraisal Cycle Details'}
      children={
        <View style={styles.mainViewStyle}>
          <DropDowns
            label={'Appraisal Template*'}
            placeholder="Enter Appraisal Template…"
            data={templateTypeArr || []}
            value={template}
            onChange={item => {
              setTemplate(item.value);
            }}
            style={isError && template == '' && styles.error}
            disable={isView ? true : false}
            isError={isError && template == ''}
          />
          <Text
            style={{
              fontSize: scale(12),
              color: Colors.lightRed,
              fontWeight: '600',
              lineHeight: scale(25),
              marginTop: scale(8),
            }}>
            Appraisal Cycle Name*
          </Text>
          <TextInput
            onChangeText={setCycleName}
            value={cycleName}
            isError={isError && cycleName == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Appraisal Cycle Name…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Appraisal Cycle Name'}
            isValidationError={
              cycleName != '' && Validator.validateTextInput(cycleName) == false
                ? true
                : false
            }
          />

          {/* <DropDowns
            label={'Employee*'}
            placeholder="Select Employee…"
            data={employeeArr || []}
            value={employee}
            onChange={item => {
              setEmployee(item.value);
            }}
            style={isError && employee == '' && styles.error}
            disable={isView ? true : false}
          /> */}

          <DropDowns
            label={'Flow Type*'}
            placeholder="Select Flow Type…"
            data={flowTypeArr || []}
            value={flowTypeValue}
            onChange={item => {
              setFlowTypeValue(item.value);
            }}
            style={isError && flowTypeValue == '' && styles.error}
            disable={isView ? true : false}
            isError={isError && flowTypeValue == ''}
          />

          <DateButton
            date={startDate}
            isError={isError}
            onPress={onStartDateBtnPress}
            label={'Appraisal Start Date*'}
            disabled={isView ? true : false}
          />

          <DateButton
            date={endDate}
            isError={isError}
            onPress={onEndDateBtnPress}
            label={'Appraisal End Date*'}
            disabled={isView ? true : false}
          />

          <DateButton
            date={empEndDate}
            isError={isError}
            onPress={onEmpEndDateBtnPress}
            label={'End Date for Employee*'}
            disabled={isView ? true : false}
          />
        </View>
      }
    />
  );
};

export default AppraisalCycleDetails;
