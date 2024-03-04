import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import DropDown from '../../../component/DropDown';
import TextInput from '../../../component/TextInput';
import DateButton from '../../../component/DateButton';

import styles from './style';
import {employeementTypeArr} from '../../../dummyData';

const EmploymentDetails = ({
  setIsCheck,
  isCheck,
  password,
  setIsPassword,
  isError,
  openPayType,
  payTypeValue,
  payTypeArr,
  setOpenPayType,
  setPayTypeValue,
  setPayTypeArr,
  startDate,
  onStartBtnPress,
}) => {
  return (
    <Box
      label={'Employment Details'}
      children={
        <View style={styles.bottom}>
          <Text style={styles.userNameTxt}>Method to Onboarding</Text>

          <TouchableOpacity
            onPress={() => setIsCheck(!isCheck)}
            style={styles.checkBoxMainView}>
            <View style={styles.radioMainView}>
              {isCheck && <View style={styles.radioFillView}></View>}
            </View>

            <Text style={styles.radioTxt}>Send Invitation to Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsCheck(!isCheck)}
            style={[styles.checkBoxMainView, styles.top]}>
            <View style={styles.radioMainView}>
              {!isCheck && <View style={styles.radioFillView}></View>}
            </View>

            <Text style={styles.radioTxt}>Set Password</Text>
          </TouchableOpacity>

          {isCheck == false && (
            <View style={styles.textInputView}>
              <TextInput
                value={password}
                onChangeText={setIsPassword}
                secureTextEntry={true}
                isError={isError && password == '' && isCheck == false}
                style={[
                  styles.userNameTextInput,
                  {
                    width: '90%',
                  },
                ]}
                placeholder={'Enter Password…'}
                placeholderTextColor={Colors.lightRed}
              />
            </View>
          )}

          <DropDown
            label={'Employment Type*'}
            placeholder="Select Employment Type…"
            open={openPayType}
            value={payTypeValue}
            items={employeementTypeArr}
            setOpen={setOpenPayType}
            setValue={setPayTypeValue}
            setItems={setPayTypeArr}
            dropDownDirection={'BOTTOM'}
            isError={isError}
            dropDownStyle={styles.dropDownStyle}
          />

          <DateButton
            date={startDate}
            isError={isError}
            onPress={onStartBtnPress}
            label={'Employment Start Date*'}
          />
        </View>
      }
    />
  );
};

export default EmploymentDetails;
