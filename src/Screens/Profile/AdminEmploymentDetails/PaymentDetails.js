import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';

import Box from '../../../component/Box';
import DropDowns from '../../../component/DropDowns';
import TextInput from '../../../component/TextInput';
import {bankDataArr} from '../../../dummyData';
import Colors from '../../../theme';
import Validator from '../../../utility/validator';

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
        <View style={{marginBottom: scale(20)}}>
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
              props.isError && props.paymentMethodValue == '' && styles.error
            }
            isError={props.isError && props.paymentMethodValue === ''}
          />

          {props.paymentMethodValue == 'GIRO' && (
            <>
              <DropDowns
                label={'Bank*'}
                placeholder="Select Bank..."
                data={bankDataArr || []}
                value={props.bank}
                onChange={item => {
                  props.setBank(item.value);
                }}
                disable={props.isView ? true : false}
                style={props.isError && props.bank == '' && styles.error}
              />

              <Text style={styles.userNameTxt}>Account Number*</Text>
              <TextInput
                onChangeText={props.setAccountNumber}
                value={props.accountNumber}
                isError={props.isError && props.accountNumber == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter Account Number…'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isView ? false : true}
                validationPlaceHolder={'Account Number'}
                isValidationError={
                  props.accountNumber != '' &&
                  Validator.validateTextInput(props.accountNumber) == false
                    ? true
                    : false
                }
              />
            </>
          )}

          <View key={count}>
            {props.detailArr?.map((data, index) => {
              return (
                <>
                  <TouchableOpacity
                    disabled={props.isView ? true : false}
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
                  {/* {index == 1 && (
                    <TextInput
                      onChangeText={props.setAmount}
                      value={props.amount}
                      style={[styles.userNameTextInput, styles.mapTextInput]}
                      keyboardType={'numeric'}
                      placeholder={'Enter CDAC Amount……'}
                      editable={props.isView ? false : true}
                      placeholderTextColor={Colors.lightRed}
                      validationPlaceHolder={'CDAC Amount'}
                      isValidationError={
                        props.amount != '' &&
                        Validator.validateAmount(props.amount) == false
                          ? true
                          : false
                      }
                    />
                  )} */}
                </>
              );
            })}
          </View>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },

  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
  },

  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
  },

  removeBtn: {
    backgroundColor: Colors.grayishRed,
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  dropDownStyle: {
    paddingHorizontal: scale(10),
    marginBottom: scale(2),
  },
  browseTxt: {fontSize: scale(11)},
  mobileView: {marginRight: 0, width: '75%'},
  containerStyle: {height: scale(200)},
  callingCodeView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  dobMainView: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(-5),
  },
  dateView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryPickerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  countryPickerView: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(15),
  },
  countryName: {
    fontSize: 14,
    color: Colors.sBlack,
  },
  width28: {width: '28%'},
  width40: {width: '40%'},
  width48: {width: '48.5%'},
  firstNameMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownStyle: {marginBottom: scale(2)},
  mappingView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: scale(18),
    alignItems: 'center',
    paddingRight: scale(30),
  },
  checkBoxView: {
    width: scale(18),
    height: scale(18),
    borderWidth: 1,
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  mapLabelTxt: {fontSize: scale(12), color: Colors.blackPearl},
  error: {borderWidth: 2, borderColor: 'red'},
});
export default PaySchemeDetails;
