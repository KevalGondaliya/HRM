import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {scale} from 'react-native-size-matters';
import Box from '../../../component/Box';
import DropDowns from '../../../component/DropDowns';
import TextInput from '../../../component/TextInput';
import Colors from '../../../theme';
import Validator from '../../../utility/validator';
const Overtime = props => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState('');

  const handleConfirm = date => {
    let time = `${date.getHours()}:${date.getMinutes()}`;
    console.log('--', time);
    setTime(props.otStartFromValue);
    hideDatePicker();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <Box
      label={'Overtime'}
      children={
        <View style={{marginBottom: scale(20)}}>
          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              <DropDowns
                label={'Has Overtime?*'}
                placeholder="select Option"
                data={props.hasOvertimeArr || []}
                value={props.hasOvertimeValue === true ? 'Yes' : 'No'}
                disable={props.isView ? true : false}
                onChange={item => {
                  props.setHasOvertimeValue(item.value);
                }}
                style={
                  props.isError && props.hasOvertimeValue == '' && styles.error
                }
                isError={props.isError && props.hasOvertimeValue === ''}
              />
            </View>
            {props.hasOvertimeValue == 'Yes' && (
              <>
                <View style={styles.width48}>
                  <DropDowns
                    label={'Pro-Rated*'}
                    placeholder="Pro-Rated"
                    data={props.proRatedArr || []}
                    value={props.proRatedValue}
                    disable={props.isView ? true : false}
                    onChange={item => {
                      props.setProRatedValue(item.value);
                    }}
                    style={
                      props.isError && props.proRatedValue == '' && styles.error
                    }
                    isError={props.isError && props.proRatedValue === ''}
                  />
                </View>
              </>
            )}
          </View>
          {props.hasOvertimeValue == 'Yes' && (
            <>
              <Text style={styles.userNameTxt}>OT Rate*</Text>
              <TextInput
                onChangeText={props.setOTRate}
                value={props.otRate}
                isError={props.isError && props.otRate == ''}
                style={styles.userNameTextInput}
                keyboardType={'numeric'}
                placeholder={'Enter OT Rate…'}
                placeholderTextColor={Colors.lightRed}
                editable={props.isView ? false : true}
                validationPlaceHolder={'OT Rate'}
                isValidationError={
                  props.otRate != '' &&
                  Validator.validateAmount(props.otRate) == false
                    ? true
                    : false
                }
              />

              <Text style={styles.userNameTxt}>Overtime Starts From*</Text>

              <TouchableOpacity
                disabled={props.isView ? true : false}
                onPress={props.onPress}
                style={[
                  styles.datePickerView,
                  props.isError && props.otStartFromValue == '' && styles.error,
                ]}
                isError={props.isError && props.otStartFromValue === ''}>
                <Text
                  style={[
                    styles.dateTxt,
                    {
                      color: props.otStartFromValue
                        ? Colors.blackPearl
                        : Colors.lightRed,
                    },
                  ]}>
                  {props.otStartFromValue
                    ? moment(props.otStartFromValue).format('YYYY MMM DD')
                    : 'Select Day…'}
                </Text>

                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={scale(15)}
                  color={Colors.lightRed}
                />
              </TouchableOpacity>

              {/* <Text style={styles.userNameTxt}>Overtime Starts From*</Text>
             
                <TouchableOpacity
                  disabled={props.isView ? true : false}
                  onPress={showDatePicker}
                  style={[
                    styles.datePickerView,
                    props.isError &&
                      props.otStartFromValue == '' &&
                      styles.error,
                  ]}
                  isError={props.isError && props.otStartFromValue === ''}>
                  <Text
                    style={[
                      styles.dateTxt,
                      {
                        color: props.otStartFromValue
                          ? Colors.blackPearl
                          : Colors.lightRed,
                      },
                    ]}>
                    {props.otStartFromValue
                    ? moment(props.otStartFromValue).format('YYYY MMM DD')
                  : 'Select Day…'}
                    {props.otStartFromValue
                      ? moment(
                          props.otStartFromValue,
                          'HH  :  mm  :  ss ',
                        ).format('LT')
                      : 'Select Time '}
                  </Text>
                </TouchableOpacity> */}

              <View style={styles.firstNameMainView}>
                <View style={styles.width48}>
                  <Text style={styles.userNameTxt}>Normal Day OT Rate*</Text>
                  <TextInput
                    onChangeText={props.setOTRateValue}
                    value={props.otRateValue}
                    isError={props.isError && props.otRateValue == ''}
                    style={styles.userNameTextInput}
                    placeholder={'Enter OT Rate…'}
                    keyboardType={'numeric'}
                    placeholderTextColor={Colors.lightRed}
                    editable={props.isView ? false : true}
                    validationPlaceHolder={'Normal Day OT Rate'}
                    isValidationError={
                      props.otRateValue != '' &&
                      Validator.validateAmount(props.otRateValue) == false
                        ? true
                        : false
                    }
                  />
                </View>

                <View style={styles.width48}>
                  <Text style={styles.userNameTxt}>Off Day OT Rate*</Text>
                  <TextInput
                    onChangeText={props.setOffDayOTRateValue}
                    value={props.offDayOTRateValue}
                    isError={props.isError && props.offDayOTRateValue == ''}
                    style={styles.userNameTextInput}
                    placeholder={'Enter OT Rate…'}
                    keyboardType={'numeric'}
                    placeholderTextColor={Colors.lightRed}
                    editable={props.isView ? false : true}
                    validationPlaceHolder={'Off Day OT Rate'}
                    isValidationError={
                      props.offDayOTRateValue != '' &&
                      Validator.validateAmount(props.offDayOTRateValue) == false
                        ? true
                        : false
                    }
                  />
                </View>
              </View>

              <View style={styles.firstNameMainView}>
                <View style={styles.width48}>
                  <Text style={styles.userNameTxt}>Rest Day OT Rate*</Text>

                  <TextInput
                    onChangeText={props.setRestDayOTRateValue}
                    value={props.restDayOTRateValue}
                    isError={props.isError && props.restDayOTRateValue == ''}
                    style={styles.userNameTextInput}
                    placeholder={'Enter OT Rate…'}
                    keyboardType={'numeric'}
                    placeholderTextColor={Colors.lightRed}
                    editable={props.isView ? false : true}
                    validationPlaceHolder={'Rest Day OT Rate'}
                    isValidationError={
                      props.restDayOTRateValue != '' &&
                      Validator.validateAmount(props.restDayOTRateValue) ==
                        false
                        ? true
                        : false
                    }
                  />
                </View>

                <View style={styles.width48}>
                  <Text style={styles.userNameTxt}>Holiday OT Rate*</Text>
                  <TextInput
                    onChangeText={props.setHolidayOTRateValue}
                    value={props.holidayOTRateValue}
                    isError={props.isError && props.holidayOTRateValue == ''}
                    style={styles.userNameTextInput}
                    keyboardType={'numeric'}
                    placeholder={'Enter OT Rate…'}
                    placeholderTextColor={Colors.lightRed}
                    editable={props.isView ? false : true}
                    validationPlaceHolder={'Holiday OT Rate'}
                    isValidationError={
                      props.holidayOTRateValue != '' &&
                      Validator.validateAmount(props.holidayOTRateValue) ==
                        false
                        ? true
                        : false
                    }
                  />
                </View>
              </View>
            </>
          )}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            // is24Hour={true}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            value={time}
          />
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
    height: scale(45),
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
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
  datePickerView: {
    width: '100%',
    height: scale(45),
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(18),
  },
});
export default Overtime;
