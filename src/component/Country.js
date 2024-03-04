import React from 'react';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import CountryPicker from 'react-native-country-picker-modal';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../theme';

function Country(props) {
  return (
    <>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.disable}
        style={[
          styles.userNameTextInput,
          styles.countryPickerMainView,
          props.isError && props.countryName == '' && styles.error,
        ]}>
        <View style={styles.countryPickerView} key={props.key}>
          <CountryPicker
            withCallingCode={false}
            countryCode={props.countryCode}
            withFlag={true}
            withFilter={true}
            withModal={true}
            onSelect={props.onSelect}
            visible={props.visible}
            onClose={props.onClose}
            placeholder={''}
          />

          <Text
            style={[
              styles.countryName,
              {color: props.countryName ? Colors.sBlack : Colors.lightRed},
            ]}>
            {props.countryName ? props.countryName : 'Select Country…'}
          </Text>
        </View>

        <Icon
          name={'chevron-small-down'}
          type={'entypo'}
          color={Colors.lightRed}
          style={{marginLeft: 4.5}}
        />
      </TouchableOpacity>
      {props.isError && props.countryName == '' && (
        <Text style={{fontSize: scale(11), color: 'red'}}>
          Please Enter Country
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
  dropDownStyle: {marginBottom: scale(5)},
  countryStyle: {marginBottom: scale(20)},
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
});

export default Country;
