import React, {Fragment} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import Box from '../../../component/Box';
import Button from '../../../component/Button';
import DropDowns from '../../../component/DropDowns';
import TextInput from '../../../component/TextInput';
import Colors from '../../../theme';
import {limitPeriodData} from '../../../utility/constant';
import Validator from '../../../utility/validator';

import {Icon} from 'react-native-elements';
import styles from './style';

const Rules = ({
  isError,
  ruleAerr,
  onChange,
  addRuleBtnPress,
  isView,
  isEdit,
  positionArr,
  onDelBtnPress,
  departmentArr,
  departmentValue,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  const onDepartmentChange = item => {
    dispatch.relationValue.getDepartmentPosition({token, id: item.value});
  };

  return (
    <Box
      label={'Rules'}
      children={
        <Fragment>
          {ruleAerr?.map((item, index) => {
            return (
              <View style={styles.tbHeaderView} key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.userNameTxt, styles.tbHeaderTxt]}>
                    RULE #{index + 1}
                  </Text>

                  {index >= 1 && isView == false && (
                    <TouchableOpacity
                      onPress={() => onDelBtnPress(item, index)}
                      style={{
                        marginRight: scale(10),
                      }}>
                      <Icon
                        name={'minuscircleo'}
                        type={'antdesign'}
                        color={'red'}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <Text
                  style={[styles.userNameTxt, styles.tbHeaderTxt, styles.top]}>
                  Who will the rule apply to?
                </Text>

                <DropDowns
                  label={'Department*'}
                  data={departmentArr || []}
                  placeholder="Select Department..."
                  value={item.departmentId}
                  onChange={item => {
                    onDepartmentChange(item);
                    onChange('departmentId', item, index);
                  }}
                  disable={isView ? true : false}
                  style={isError && item.departmentId == '' && styles.error}
                  isError={isError && item.departmentId == ''}
                  // baseColor="#000"
                  // textColor="#000"
                />

                <DropDowns
                  label={'Position*'}
                  data={positionArr || []}
                  value={item.positionId}
                  disable={isView ? true : false}
                  onChange={item => {
                    onChange('positionId', item, index);
                  }}
                  placeholder="Select Position…"
                  style={isError && item.positionId == '' && styles.error}
                  isError={isError && item.positionId == ''}
                />

                <DropDowns
                  label={'Limit Period*'}
                  data={limitPeriodData}
                  value={item.limitPeriod}
                  disable={isView ? true : false}
                  onChange={item => {
                    onChange('limitPeriod', item, index);
                  }}
                  placeholder="Select Option…"
                  style={isError && item.limitPeriod == '' && styles.error}
                  isError={isError && item.limitPeriod == ''}
                />

                <Text style={styles.userNameTxt}>Limit Amount*</Text>

                <TextInput
                  onChangeText={item => {
                    onChange('limitAmt', item, index);
                  }}
                  value={item.limitAmt.toString()}
                  isError={isError && item.limitAmt == ''}
                  style={[styles.userNameTextInput, styles.bottom]}
                  placeholder={'Enter Limit Amount…'}
                  placeholderTextColor={Colors.lightRed}
                  keyboardType={'numeric'}
                  editable={isView ? false : true}
                  validationPlaceHolder={'Limit Amount'}
                  isValidationError={
                    item.limitAmt != '' &&
                    Validator.validateAmount(item.limitAmt) == false
                      ? true
                      : false
                  }
                />
              </View>
            );
          })}

          {isView == false && (
            <Button
              label={'Add Rules'}
              btnStyle={[
                styles.cancelBtn,
                {backgroundColor: Colors.blackPearl},
              ]}
              labelStyle={{fontSize: scale(11)}}
              onPress={addRuleBtnPress}
            />
          )}
        </Fragment>
      }
    />
  );
};

export default Rules;
