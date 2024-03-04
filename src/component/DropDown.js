import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';

import Colors from '../theme';

function DropDown(props) {
  return (
    <>
      {props.label ? (
        <Text style={[styles.userNameTxt, props.labelStyle]}>
          {props.label}
        </Text>
      ) : null}

      <DropDownPicker
        placeholder={props.placeholder}
        placeholderStyle={[
          {
            color: Colors.lightRed,
            fontSize: scale(11),
          },
          props.style,
        ]}
        style={[
          styles.userNameTextInput,
          {
            borderWidth: props.isError && props.value == '' ? 2 : 0,
            borderColor: props.isError && props.value == '' ? 'red' : null,
          },
          props.dropDownStyle,
        ]}
        disabled={props.disabled}
        dropDownContainerStyle={[
          styles.dropDownContainerStyle,
          props.containerStyle,
        ]}
        open={props.open}
        value={props.value}
        items={props.items}
        setOpen={props.setOpen}
        setValue={props.setValue}
        setItems={props.setItems}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        dropDownDirection={props.dropDownDirection}
      />
    </>
  );
}

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
    height: scale(40),
    marginRight: 0,
    paddingHorizontal: scale(12),
  },
  dropDownContainerStyle: {
    height: scale(90),
    fontSize: 15,
    borderRadius: 7,
    backgroundColor: Colors.grey,
    padding: 10,
    borderWidth: 0,
    marginTop: scale(0),
  },
});

export default DropDown;
