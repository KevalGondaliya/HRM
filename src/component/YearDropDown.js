import React from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../theme';

function YearDropDown({ date, style, onPress, isError, placeHolder, disabled }) {

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.datePickerView,
          isError && date === '' && styles.error,
          style,
        ]}>
        <Text
          style={[
            styles.dateTxt,
            {
              color: date ? Colors.blackPearl : Colors.lightRed,
            },
          ]}>
          {date ? date : placeHolder}
        </Text>

        <Icon
          name={'down'}
          type={'antdesign'}
          size={scale(15)}
          color={Colors.lightRed}
        />
      </TouchableOpacity>
      <View>

        {isError && date === '' && (
          <Text style={{ fontSize: scale(9), color: 'red' }}>
            Please {placeHolder}
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: scale(10),
  },

  dateTxt: { fontSize: scale(12) },

  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default YearDropDown;
