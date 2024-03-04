import React from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';

import Button from './Button';
import Colors from '../theme';

function SaveCancelBtn(props) {

  return (
    <View style={[styles.saveBtnView, props.style]}>
      <Button
        label={props.cancelLabel || 'Cancel'}
        btnStyle={styles.cancelBtn}
        labelStyle={styles.labelStyle}
        onPress={props.cancelBtn}
        isSpinner={props.cancelSpin}
      />

      {!props.isView && <Button
        label={props.label ? props.label : 'Submit'}
        btnStyle={styles.submitBtn}
        labelStyle={styles.labelStyle}
        onPress={props.submitBtn}
        isSpinner={props.saveLoading}
      />}
    </View>

  );
}

const styles = StyleSheet.create({
  saveBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  submitBtn: {
    backgroundColor: Colors.grayishGreen,
    paddingHorizontal: scale(25),
    marginLeft: scale(10),
    width: scale(111),
  },
  cancelBtn: {
    paddingHorizontal: scale(25),
    width: scale(111),
  },
  labelStyle: { fontSize: scale(11) },
});

export default SaveCancelBtn;
