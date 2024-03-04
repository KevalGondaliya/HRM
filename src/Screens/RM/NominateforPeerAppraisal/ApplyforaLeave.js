import React from 'react';
import {View} from 'react-native';

import Box from '../../../component/Box';
import DropDowns from '../../../component/DropDowns';
import DateButton from '../../../component/DateButton';

import styles from './style';

const ApplyforaLeave = ({
  isView,
  endDate,
  isError,
  startDate,
  onDobBtnPress,
  onEndBtnPress,
  nomineeTypeArr,
  templateTypeArr,
  nomineeTypeValue,
  templateTypeValue,
  setNomineeTypeValue,
  setTemplateTypeValue,
}) => {
  return (
    <Box
      label={'Peer Appraisal Details'}
      children={
        <View style={styles.tbContainerView}>
          <DropDowns
            label={'Nominee*'}
            placeholder="Select Nominee…"
            data={nomineeTypeArr}
            value={nomineeTypeValue}
            onChange={item => {
              setNomineeTypeValue(item.value);
            }}
            disable={isView ? true : false}
            style={isError && nomineeTypeValue == '' && styles.error}
          />

          <DropDowns
            label={'Appraisal Template*'}
            placeholder="Select Appraisal Template…"
            data={templateTypeArr}
            value={templateTypeValue}
            onChange={item => {
              setTemplateTypeValue(item.value);
            }}
            disable={isView ? true : false}
            style={isError && templateTypeValue == '' && styles.error}
          />

          <DateButton
            date={startDate}
            isError={isError}
            onPress={onDobBtnPress}
            label={'Appraisal Start Date*'}
            disabled={isView ? true : false}
          />

          <DateButton
            date={endDate}
            isError={isError}
            onPress={onEndBtnPress}
            label={'Appraisal End Date*'}
            disabled={isView ? true : false}
          />
        </View>
      }
    />
  );
};

export default ApplyforaLeave;
