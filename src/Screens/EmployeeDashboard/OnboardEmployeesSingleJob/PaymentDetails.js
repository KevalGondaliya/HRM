import React, {Fragment, useState} from 'react';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {View, Text, TouchableOpacity} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import {PaymentDetailsArr} from '../../../dummyData';
import TextInput from '../../../component/TextInput';

import styles from './style';
import DropDowns from '../../../component/DropDowns';

const PaySchemeDetails = props => {
  const [count, setCount] = useState(0);

  const onBtnPress = (item, index) => {
    let arr = props.detailArr;
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i].isCheck = !arr[i].isCheck;
      }
    }
    setCount(count + 1);
    props.setDetailArr(arr);
  };
  return (
    <Box
      label={'Payment Details'}
      children={
        <View style={styles.bottom}>
          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              <DropDowns
                label={'Payment Method*'}
                placeholder="Select Method"
                data={props.paymentMethodArr || []}
                value={props.paymentMethodValue}
                onChange={item => {
                  props.setPaymentMethodValue(item.value);
                }}
                disable={props.isView ? true : false}
                style={
                  props.isError &&
                  props.paymentMethodValue == '' &&
                  styles.error
                }
              />
            </View>

            <View style={styles.width48}>
              <DropDowns
                label={'Bank'}
                placeholder="Select Bank…"
                data={props.bankArr || []}
                value={props.bank}
                onChange={item => {
                  props.setBank(item.value);
                }}
                disable={props.isView ? true : false}
                style={props.isError && props.bank == '' && styles.error}
              />
            </View>
          </View>
          <Text style={styles.userNameTxt}>Account Number*</Text>
          <TextInput
            onChangeText={props.setAccountNumber}
            value={props.accountNumber}
            isError={props.isError && props.accountNumber == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Account Number…'}
            placeholderTextColor={Colors.lightRed}
          />
          <View key={count}>
            {PaymentDetailsArr.map((data, index) => {
              return (
                <Fragment>
                  <TouchableOpacity
                    onPress={() => {
                      onBtnPress(data, index);
                    }}
                    style={styles.mappingView}
                    key={index}>
                    <View style={styles.checkBoxView}>
                      {data.isCheck && (
                        <Icon
                          name={'check'}
                          type={'Entypo'}
                          size={scale(15)}
                          color={Colors.blackPearl}
                        />
                      )}
                    </View>

                    <Text style={styles.mapLabelTxt}>{data.label}</Text>
                  </TouchableOpacity>
                  {index == 1 && (
                    <TextInput
                      onChangeText={props.setAmount}
                      value={props.amount}
                      style={[styles.userNameTextInput, styles.mapTextInput]}
                      keyboardType={'numeric'}
                      placeholder={'Enter CDAC Amount……'}
                      placeholderTextColor={Colors.lightRed}
                    />
                  )}
                </Fragment>
              );
            })}
          </View>
        </View>
      }
    />
  );
};

export default PaySchemeDetails;
