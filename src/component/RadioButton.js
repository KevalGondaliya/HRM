import React from 'react';
import {scale} from 'react-native-size-matters';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../theme';

function RadioButton({onPress, value, isDisabled}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        disabled={isDisabled || false}
        onPress={() => onPress(!value)}
        style={styles.checkBoxMainView}>
        <View style={styles.radioMainView}>
          {value && <View style={styles.radioFillView} />}
        </View>

        <Text style={styles.radioTxt}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isDisabled || false}
        onPress={() => onPress(!value)}
        style={[styles.checkBoxMainView, {marginLeft: scale(20)}]}>
        <View style={styles.radioMainView}>
          {!value && <View style={styles.radioFillView} />}
        </View>

        <Text style={styles.radioTxt}>No</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  checkBoxMainView: {flexDirection: 'row', marginTop: scale(5)},
  radioMainView: {
    width: scale(19),
    height: scale(19),
    borderWidth: 2,
    borderRadius: scale(19 / 2),
    borderColor: Colors.blackPearl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioFillView: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(12 / 2),
    backgroundColor: Colors.blackPearl,
  },
  radioTxt: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Colors.blackPearl,
    marginLeft: scale(10),
  },
});

export default RadioButton;
