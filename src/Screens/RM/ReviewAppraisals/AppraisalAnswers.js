import React, {Fragment} from 'react';
import {View, Text} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';

import styles from './style';

const AppraisalAnswers = ({isView, questionArr}) => {
  return (
    <Box
      label={'Appraisal Answers'}
      children={
        <Fragment>
          {questionArr?.map((item, index) => {
            return (
              <View style={styles.tbHeaderView} key={index}>
                <Text style={[styles.userNameTxt, styles.tbHeaderTxt]}>
                  QUESTION {index + 1}
                </Text>

                <Text style={[styles.userNameTxt, styles.marginTopEmpName]}>
                  Filled by Employee*
                </Text>

                <TextInput
                  value={item.employee}
                  onChangeText={item => {
                    onChange('employee', item, index);
                  }}
                  style={styles.userNameTextInput}
                  placeholderTextColor={Colors.lightRed}
                  placeholder={'Enter Answer…'}
                  editable={false}
                />

                <Text style={styles.userNameTxt}>Filled by Reviewer*</Text>

                <TextInput
                  value={item.reviewer}
                  onChangeText={item => {
                    onChange('reviewer', item, index);
                  }}
                  style={styles.userNameTextInput}
                  placeholderTextColor={Colors.lightRed}
                  placeholder={'Enter Reviewer…'}
                  editable={false}
                />

                <Text style={styles.userNameTxt}>Score*</Text>

                <TextInput
                  value={item.score && item.score?.toString()}
                  onChangeText={item => {
                    onChange('score', item, index);
                  }}
                  keyboardType={'numeric'}
                  style={styles.userNameTextInput}
                  placeholderTextColor={Colors.lightRed}
                  placeholder={'Enter Score…'}
                  editable={false}
                />
              </View>
            );
          })}
        </Fragment>
      }
    />
  );
};

export default AppraisalAnswers;
