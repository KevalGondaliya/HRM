import React, {Fragment} from 'react';
import {Text} from 'react-native';

import Box from '../../component/Box';
import DropDowns from '../../component/DropDowns';
import TextInput from '../../component/TextInput';
import Validator from '../../utility/validator';
import RadioButton from '../../component/RadioButton';
import {AMCSAmountDataArray, AMCSDataArray, booleanData} from '../../dummyData';

import styles from './style';
import Colors from '../../theme';

const AMCS = props => {
  return (
    <Box
      label={'AMCS'}
      children={
        <Fragment>
          <Text style={styles.userNameTxt}>AMCS*</Text>
          <RadioButton value={props.isAMCS} onPress={props.setIsAMCS} />

          {props.isAMCS && (
            <Fragment>
              <DropDowns
                label={'AMCS Frequency of Contribution'}
                data={AMCSDataArray || []}
                placeholder="AMCS Frequency of Contribution..."
                value={props.amcsTypeValue}
                onChange={item => {
                  props.setAmcsTypeValue(item.value);
                }}
              />

              <DropDowns
                label={'AMCS Amount Type'}
                data={AMCSAmountDataArray || []}
                placeholder="Select AMCS Amount Type..."
                value={props.amcsAmountTypeValue}
                onChange={item => {
                  props.setAmcsAmountTypeValue(item.value);
                }}
              />

              {props.amcsAmountTypeValue != '' && (
                <>
                  <Text style={styles.userNameTxt}>
                    {`AMCS Contribution ${
                      props.amcsAmountTypeValue == 'Fixed Amount'
                        ? 'Amount'
                        : 'Percentage'
                    }`}
                  </Text>

                  <TextInput
                    onChangeText={props.setContributionAmount}
                    value={props.contributionAmount}
                    isError={props.isError && props.contributionAmount == ''}
                    style={styles.userNameTextInput}
                    placeholder={`Enter AMCS Contribution ${
                      props.amcsAmountTypeValue == 'Fixed Amount'
                        ? 'Amount'
                        : 'Percentage'
                    }…`}
                    placeholderTextColor={Colors.lightRed}
                    keyboardType={'numeric'}
                    validationPlaceHolder={'AMCS Contribution'}
                    isValidationError={
                      props.contributionAmount != '' &&
                      Validator.validateAmount(props.contributionAmount) ==
                        false
                        ? true
                        : false
                    }
                  />
                </>
              )}
              <DropDowns
                label={'Prorate AMCS Amount for new employees'}
                data={booleanData || []}
                placeholder="Select option..."
                value={props.isNewEmployees}
                onChange={item => {
                  props.setIsNewEmployees(item.value);
                }}
              />
            </Fragment>
          )}
        </Fragment>
      }
    />
  );
};
export default AMCS;
