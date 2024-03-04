import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import DropDown from '../../../component/DropDown';
import TextInput from '../../../component/TextInput';

import styles from './style';
import DropDowns from '../../../component/DropDowns';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';

const Overtime = ({
  otRate,
  isError,
  onPress,
  setOTRate,
  otRateValue,
  proRatedArr,
  proRatedValue,
  hasOvertimeArr,
  setOTRateValue,
  otStartFromArr,
  offDayOTRateArr,
  otStartFromValue,
  setProRatedValue,
  hasOvertimeValue,
  restDayOTRateArr,
  holidayOTRateArr,
  offDayOTRateValue,
  restDayOTRateValue,
  holidayOTRateValue,
  setHasOvertimeValue,
  setOTStartFromValue,
  setOffDayOTRateValue,
  setRestDayOTRateValue,
  setHolidayOTRateValue,
}) => {
  return (
    <Box
      label={'Overtime'}
      children={
        <View style={styles.bottom}>
          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              <DropDowns
                label={'Has Overtime?*'}
                placeholder="select Option"
                data={hasOvertimeArr || []}
                value={hasOvertimeValue}
                onChange={item => {
                  setHasOvertimeValue(item.value);
                }}
                style={isError && hasOvertimeValue == '' && styles.error}
              />
            </View>

            <View style={styles.width48}>
              <DropDowns
                label={'Pro-Rated*'}
                placeholder="Pro-Rated"
                data={proRatedArr || []}
                value={proRatedValue}
                onChange={item => {
                  setProRatedValue(item.value);
                }}
                style={isError && proRatedValue == '' && styles.error}
              />
            </View>
          </View>

          <Text style={styles.userNameTxt}>OT Rate*</Text>

          <TextInput
            onChangeText={setOTRate}
            value={otRate}
            isError={isError && otRate == ''}
            style={styles.userNameTextInput}
            keyboardType={'numeric'}
            placeholder={'Enter OT Rate…'}
            placeholderTextColor={Colors.lightRed}
          />

          <Text style={styles.userNameTxt}>Overtime Starts From*</Text>

          <TouchableOpacity
            onPress={onPress}
            style={[
              styles.datePickerView,
              isError && otStartFromValue == '' && styles.error,
            ]}>
            <Text
              style={[
                styles.dateTxt,
                {
                  color: otStartFromValue ? Colors.blackPearl : Colors.lightRed,
                },
              ]}>
              {otStartFromValue
                ? moment(otStartFromValue).format('YYYY MMM DD')
                : 'Select Day…'}
            </Text>

            <Icon
              name={'down'}
              type={'antdesign'}
              size={scale(15)}
              color={Colors.lightRed}
            />
          </TouchableOpacity>

          {/* <DropDowns
            label={'Overtime Starts From*'}
            placeholder="Select Option"
            data={otStartFromArr || []}
            value={otStartFromValue}
            onChange={item => {
              setOTStartFromValue(item.value);
            }}
            style={isError && otStartFromValue == '' && styles.error}
          /> */}

          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              {/* <DropDowns
                label={'Normal Day OT Rate*'}
                placeholder="Select Option"
                data={otRateArr || []}
                value={otRateValue}
                onChange={item => {
                  setOTRateValue(item.value);
                }}
                style={isError && otRateValue == '' && styles.error}
              /> */}
              <Text style={styles.userNameTxt}>Normal Day OT Rate*</Text>
              <TextInput
                onChangeText={setOTRateValue}
                value={otRateValue}
                isError={isError && otRateValue == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter OT Rate…'}
                keyboardType={'numeric'}
                placeholderTextColor={Colors.lightRed}
              />
            </View>

            <View style={styles.width48}>
              {/* <DropDowns
                label={'Off Day OT Rate*'}
                placeholder="Select Option"
                data={offDayOTRateArr || []}
                value={offDayOTRateValue}
                onChange={item => {
                  setOffDayOTRateValue(item.value);
                }}
                style={isError && offDayOTRateValue == '' && styles.error}
              /> */}
              <Text style={styles.userNameTxt}>Off Day OT Rate*</Text>
              <TextInput
                onChangeText={setOffDayOTRateValue}
                value={offDayOTRateValue}
                isError={isError && offDayOTRateValue == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter OT Rate…'}
                keyboardType={'numeric'}
                placeholderTextColor={Colors.lightRed}
              />
            </View>
          </View>

          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              {/* <DropDowns
                label={'Rest Day OT Rate*'}
                placeholder="Select Option"
                data={restDayOTRateArr || []}
                value={restDayOTRateValue}
                onChange={item => {
                  setRestDayOTRateValue(item.value);
                }}
                style={isError && restDayOTRateValue == '' && styles.error}
              /> */}
              <Text style={styles.userNameTxt}>Rest Day OT Rate*</Text>
              <TextInput
                onChangeText={setRestDayOTRateValue}
                value={restDayOTRateValue}
                isError={isError && restDayOTRateValue == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter OT Rate…'}
                keyboardType={'numeric'}
                placeholderTextColor={Colors.lightRed}
              />
            </View>

            <View style={styles.width48}>
              {/* <DropDowns
                label={'Holiday OT Rate*'}
                placeholder="Select Option"
                data={holidayOTRateArr || []}
                value={holidayOTRateValue}
                onChange={item => {
                  setHolidayOTRateValue(item.value);
                }}
                style={isError && holidayOTRateValue == '' && styles.error}
              /> */}
              <Text style={styles.userNameTxt}>Holiday OT Rate*</Text>
              <TextInput
                onChangeText={setHolidayOTRateValue}
                value={holidayOTRateValue}
                isError={isError && holidayOTRateValue == ''}
                style={styles.userNameTextInput}
                keyboardType={'numeric'}
                placeholder={'Enter OT Rate…'}
                placeholderTextColor={Colors.lightRed}
              />
            </View>
          </View>
        </View>
      }
    />
  );
};

export default Overtime;
