import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';

import Color from '../theme';

function Button(props) {

  return (
    <TouchableOpacity
      disabled={
        props.isSpinner
          ? props.isSpinner
            ? true
            : false
          : props.disabled
            ? props.disabled
              ? true
              : false
            : false
      }
      {...props}
      style={[styles.loginBtn, props.btnStyle]}
      onPress={props.onPress}
      pointerEvents={props.isSpinner ? 'none' : 'auto'}>
      {props.isSpinner ? (
        <ActivityIndicator
          color={props.loadingColor ? props.loadingColor : '#fff'}
          size={'small'}
        />
      ) : (
        <Text
          style={[
            { color: '#fff', fontSize: 19, fontWeight: 'bold' },
            props.labelStyle,
          ]}>
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    borderRadius: 5,
    height: scale(35),
    borderRadius: scale(50),
    marginBottom: scale(8),
    backgroundColor: Color.sBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
