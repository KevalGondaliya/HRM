 
import {View, Text, TouchableOpacity} from 'react-native';
import React, {Fragment, useState} from 'react';
 

import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import Box from '../../../component/Box';
import Button from '../../../component/Button';
import DropDowns from '../../../component/DropDowns';
import TextInput from '../../../component/TextInput';
import Colors from '../../../theme';
import {scoreData} from '../../../utility/constant';
import Validator from '../../../utility/validator';
import styles from './style';  
 
const Body = ({
  isError,
  isView,
  addRuleBtnPress,
  isEdit,
  questionArr,
  onChange,
  onDelBtnPress,
}) => {
  return (
    <Box
      label={'Body'}
      children={
        <Fragment>
          {questionArr?.map((item, index) => {
            return (
              <View style={styles.tbHeaderView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.userNameTxt, styles.tbHeaderTxt]}>
                    ENTER QUESTION HERE
                  </Text>

 
                  {index >= 1 && isView == false && (
 
                    <TouchableOpacity
                      onPress={() => onDelBtnPress(index)}
                      style={{
                        marginRight: scale(10),
                        marginTop: scale(10),
                      }}>
                      <Icon
                        name={'minuscircleo'}
                        type={'antdesign'}
                        color={'red'}
                      />
                    </TouchableOpacity>
                  )}
                </View>
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
                  editable={isView ? false : true}
                  isError={isError && item.employee == ''}
                  validationPlaceHolder={'Leave Description'}
                  isValidationError={
                    item.employee != '' &&
                    Validator.validateTextInput(item.employee) == false
                      ? true
                      : false
                  }
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
                  editable={isView ? false : true}
                  isError={isError && item.reviewer == ''}
                  validationPlaceHolder={'Leave Description'}
                  isValidationError={
                    item.reviewer != '' &&
                    Validator.validateTextInput(item.reviewer) == false
                      ? true
                      : false
                  }
                />
                <DropDowns
                  key={index}
                  label={'Score*'}
                  placeholder={'Select Score...'}
                  data={scoreData}
                  value={item.score}
                  onChange={item => {
                    onChange('score', item, index);
                  }}
                  editable={isView ? false : true}
                  style={isError && item.score == '' && styles.error}
                  isError={isError && item.score == ''}
                />
                {/* 
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
                  isError={isError && item.score == ''}
                  editable={isView ? false : true}
                  validationPlaceHolder={' Score'}
                  isValidationError={
                    item.score != '' &&
                    Validator.validateNumber(item.score) == false
                      ? true
                      : false
                  }
                /> */}
              </View>
            );
          })}

          {isView == false && (
            <Button
              label={'Add Question'}
              btnStyle={[
                styles.cancelBtn,
                {backgroundColor: Colors.blackPearl},
              ]}
              labelStyle={styles.addRuleLabel}
              onPress={addRuleBtnPress}
            />
          )}
        </Fragment>
      }
    />
  );
};

export default Body;
