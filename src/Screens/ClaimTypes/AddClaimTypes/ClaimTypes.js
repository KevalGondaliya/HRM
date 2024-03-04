import moment from 'moment';
import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import Colors from '../../../theme';
import Box from '../../../component/Box';
import Button from '../../../component/Button';
import TextInput from '../../../component/TextInput';
import DropDowns from '../../../component/DropDowns';
import {Icon} from 'react-native-elements';
import {
  claimLimitTypeData,
  entitledToArr,
  limitPeriodData,
} from '../../../utility/constant';
import YearDropDown from '../../../component/YearDropDown';

import styles from './style';
import Validator from '../../../utility/validator';
import {useDispatch, useSelector} from 'react-redux';
import RadioButton from '../../../component/RadioButton';

const ClaimTypes = ({
  isView,
  isEdit,
  isError,
  onPress,
  onChange,
  claimLimit,
  limitPeriod,
  setClaimLimit,
  claimDesValue,
  categoryNameArr,
  categoryDataArr,
  setClaimDesValue,
  addCategoryBtnPress,
  applyLimitToValue,
  setApplyLimitToValue,
  departmentValue,
  departmentArr,
  setDepartmentValue,
  positionArr,
  positionValue,
  setPositionValue,
  isNewEmployess,
  setIsNewEmployess,
  isReciptRequired,
  setIsReciptRequired,
  onDelBtnPress,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  const onDepartmentChange = item => {
    dispatch.relationValue.getDepartmentPosition({token, id: item.value});
    setPositionValue('');
  };

  return (
    <Box
      label={'Claim Types'}
      style={styles.style}
      children={
        <Fragment>
          <Text style={[styles.userNameTxt, styles.lightRed]}>
            Claim Description*
          </Text>

          <TextInput
            onChangeText={setClaimDesValue}
            value={claimDesValue}
            isError={isError && claimDesValue == ''}
            style={styles.userNameTextInput}
            editable={isView ? false : true}
            placeholder={'Enter Claim Description'}
            placeholderTextColor={Colors.lightRed}
            validationPlaceHolder={'Claim Description'}
            isValidationError={
              claimDesValue != '' &&
              Validator.validateTextInput(claimDesValue) == false
                ? true
                : false
            }
          />

          <Text style={[styles.userNameTxt, styles.lightRed]}>
            Claim Limit Period*
          </Text>

          <YearDropDown
            isError={isError}
            date={limitPeriod && moment(limitPeriod).format('YYYY MMM DD')}
            onPress={isView ? null : onPress}
            placeHolder={'Select Period…'}
            style={styles.userNameTextInput}
          />

          <DropDowns
            label={'Claim Limit Type*'}
            data={claimLimitTypeData}
            value={claimLimit}
            disable={isView ? true : false}
            onChange={item => {
              setClaimLimit(item.value);
            }}
            placeholder={'Enter Limit…'}
            labelStyle={{marginTop: 0}}
            style={isError && claimLimit == '' && styles.error}
            isError={isError && claimLimit == ''}
          />

          <DropDowns
            label={'Apply Limit To*'}
            data={entitledToArr || []}
            placeholder="Select Apply Limit To..."
            value={applyLimitToValue}
            onChange={item => {
              setApplyLimitToValue(item.value);
            }}
            disable={isView ? true : false}
            style={isError && applyLimitToValue == '' && styles.error}
            isError={isError && applyLimitToValue == ''}
          />

          {applyLimitToValue == 'Specific Positions' && (
            <>
              <DropDowns
                label={'Department*'}
                data={departmentArr || []}
                placeholder="Select Department..."
                value={departmentValue}
                onChange={item => {
                  onDepartmentChange(item);
                  setDepartmentValue(item.value);
                }}
                disable={isView ? true : false}
                style={isError && departmentValue == '' && styles.error}
                isError={isError && departmentValue == ''}
              />
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
                isError={isError && positionValue == ''}
              />
            </>
          )}

          <Text style={[styles.userNameTxt, styles.lightRed]}>
            New Employees will be Entitled to this Claim*
          </Text>
          <RadioButton
            value={isNewEmployess}
            onPress={setIsNewEmployess}
            isDisabled={isView ? true : false}
          />

          <Text style={[styles.userNameTxt, styles.lightRed]}>
            Recipt Required*
          </Text>
          <RadioButton
            value={isReciptRequired}
            onPress={setIsReciptRequired}
            isDisabled={isView ? true : false}
          />

          <Text style={[styles.userNameTxt]}>Category</Text>

          {categoryNameArr?.map((item, index) => {
            return (
              <View>
                {index >= 1 && isView == false && (
                  <TouchableOpacity
                    onPress={() => onDelBtnPress(item, index)}
                    disabled={isView ? true : false}
                    style={{
                      marginTop: scale(10),
                      alignSelf: 'flex-end',
                      marginBottom: scale(-10),
                    }}>
                    <Icon
                      name={'minuscircleo'}
                      type={'antdesign'}
                      color={'red'}
                    />
                  </TouchableOpacity>
                )}
                <DropDowns
                  key={index}
                  label={'Category Name*'}
                  data={categoryDataArr}
                  value={item.claimType}
                  disable={isView ? true : false}
                  onChange={item => {
                    onChange('claimType', item, index);
                  }}
                  placeholder="Select Category Name…"
                  style={isError && item.id == '' && styles.error}
                  isError={isError && item.claimType == ''}
                />
              </View>
            );
          })}

          {isView == false && (
            <Button
              label={'Add Category'}
              btnStyle={styles.cancelBtn}
              labelStyle={styles.massDelTxt}
              onPress={addCategoryBtnPress}
            />
          )}
        </Fragment>
      }
    />
  );
};

export default ClaimTypes;
