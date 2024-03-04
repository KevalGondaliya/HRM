import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import Button from '../../component/Button';
import {dropDownData1, specificTypeOfClaims} from '../../dummyData';
import DropDowns from '../../component/DropDowns';
import {approverType} from '../../utility/constant';

import styles from './style';
import {scale} from 'react-native-size-matters';
import {Icon} from 'react-native-elements';

const Rules = ({
  isError,
  ruleAerr,
  onChange,
  addRuleBtnPress,
  isView,
  isEdit,
  categoryArr,
  approversArr,
  onDelBtnPress,
}) => {
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
                  style={[
                    styles.userNameTxt,
                    styles.tbHeaderTxt,
                    styles.marginTop,
                  ]}>
                  Approved By
                </Text>

                <DropDowns
                  label={'Approver Type*'}
                  data={approverType}
                  value={item.approverType}
                  disable={isView ? true : false}
                  onChange={item => {
                    onChange('approverType', item, index);
                  }}
                  placeholder="Select Approver Type…"
                  style={isError && item.approverType == '' && styles.error}
                  isError={isError && item.approverType == ''}
                />

                <DropDowns
                  label={'Approvers*'}
                  data={approversArr}
                  value={item.userId}
                  disable={isView ? true : false}
                  onChange={item => {
                    onChange('userId', item, index);
                  }}
                  placeholder="Select Approvers…"
                  style={isError && item.approvers == '' && styles.error}
                  isError={isError && item.userId == ''}
                />

                <Text style={[styles.userNameTxt, styles.tbHeaderTxt]}>
                  What should they approve?
                </Text>

                <DropDowns
                  label={'Category*'}
                  data={categoryArr}
                  placeholder="Select Category…"
                  value={item.category}
                  disable={isView ? true : false}
                  onChange={item => {
                    onChange('category', item, index);
                  }}
                  style={isError && item.category == '' && styles.error}
                  isError={isError && item.category == ''}
                />

                <DropDowns
                  label={'Specific Types*'}
                  // data={dropDownData}
                  data={
                    item.category === 'Leaves'
                      ? dropDownData1
                      : specificTypeOfClaims
                  }
                  placeholder="Leave blank to apply all"
                  value={item.specificType}
                  disable={isView ? true : false}
                  onChange={item => {
                    onChange('specificType', item, index);
                  }}
                  style={isError && item.specificType == '' && styles.error}
                  isError={isError && item.specificType == ''}
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
              labelStyle={styles.addRuleLabel}
              onPress={addRuleBtnPress}
            />
          )}
        </Fragment>
      }
    />
  );
};

export default Rules;
