import React, {Fragment} from 'react';
import {scale} from 'react-native-size-matters';
import {Text, View, StyleSheet} from 'react-native';

import Colors from '../theme';
import TextInput from './TextInput';

function PhoneNumber({
  label,
  mobile,
  isError,
  setMobile,
  callingCode,
  setCallingCode,
  editable,
}) {
  return (
    <Fragment>
      <Text style={[styles.userNameTxt, {marginTop: scale(5)}]}>{label}</Text>

      <View style={styles.callingCodeView}>
        <TextInput
          onChangeText={setCallingCode}
          value={callingCode}
          isError={isError && callingCode == ''}
          style={styles.userNameTextInput}
          keyboardType={'numeric'}
          maxLength={2}
          placeholder={'Ext'}
          placeholderTextColor={Colors.lightRed}
          editable={editable}
        />
        <TextInput
          onChangeText={setMobile}
          editable={editable}
          value={mobile}
          keyboardType={'numeric'}
          isError={isError && mobile == ''}
          style={[styles.userNameTextInput, styles.mobileView]}
          placeholder={'Enter Number...'}
          placeholderTextColor={Colors.lightRed}
        />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  callingCodeView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
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
    height: scale(40),
  },
  mobileView: {marginRight: 0, width: '75%'},
});

export default PhoneNumber;
