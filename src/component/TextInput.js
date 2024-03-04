import React from 'react';
import { scale } from 'react-native-size-matters';
import { StyleSheet, Text, TextInput } from 'react-native';

import Colors from '../theme';

function Button({
  ref,
  value,
  style,
  isError,
  editable,
  multiline,
  maxLength,
  placeholder,
  blurOnSubmit,
  keyboardType,
  onChangeText,
  returnKeyType,
  secureTextEntry,
  onSubmitEditing,
  placeholderTextColor,
  isValidationError, validationPlaceHolder
}) {
  return (
    <>
      <TextInput
        ref={ref}
        value={value}
        editable={editable}
        multiline={multiline}
        maxLength={maxLength}
        placeholder={placeholder}
        onChangeText={onChangeText}
        blurOnSubmit={blurOnSubmit}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
        style={[styles.loginFormTextInput, style, isError && styles.error, isValidationError && styles.error]}
      />
      {isError ? (
        <Text style={{ fontSize: scale(9), color: 'red' }}>
          Please  {placeholder}
        </Text>
      ) : isValidationError && <Text style={{ fontSize: scale(9), color: 'red' }}>
        {`Please Enter Valid ${validationPlaceHolder}`}
      </Text>}
    </>
  );
}

const styles = StyleSheet.create({
  loginFormTextInput: {
    height: scale(40),
    fontSize: 13,
    borderRadius: scale(16),
    borderColor: Colors.sBlack,
    paddingHorizontal: scale(20),
    color: '#000',
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',

  },
});

export default Button; 