import moment from 'moment';
import React, { Fragment } from 'react';
import { scale } from 'react-native-size-matters';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../theme';

function DateButton({ isError, date, onPress, label, disabled, isView }) {
  return (
    <Fragment>
      <Text style={styles.userNameTxt}>{label || "-"}</Text>
      <View style={styles.dobMainView}>


        <TouchableOpacity
          disabled={disabled}
          isView={isView}
          style={[
            styles.userNameTextInput1,
            styles.dateView,
            styles.width28,
            isError && date == '' && styles.error,
          ]}
          onPress={onPress}>
          <Text style={{ color: date ? '#000' : Colors.lightRed, fontSize: 13, }}>
            {date ? moment(date).format('YYYY') : 'Year'}
          </Text>

        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          isView={isView}
          style={[
            styles.userNameTextInput,
            styles.dateView,
            styles.width40,
            isError && date == '' && styles.error,
          ]}
          onPress={onPress}>
          <Text style={{ color: date ? '#000' : Colors.lightRed, fontSize: 13, }}>
            {date ? moment(date).format('MMMM') : "Month"}
          </Text>

        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          isView={isView}
          style={[
            styles.userNameTextInput,
            styles.dateView,
            styles.width28,
            isError && date == '' && styles.error,
          ]}
          onPress={onPress}>
          <Text style={{ color: date ? '#000' : Colors.lightRed, fontSize: 13, }}>
            {date ? moment(date).format('DD') : 'Day'}
          </Text>

        </TouchableOpacity>

      </View>
      {isError && date == '' && <Text style={{ fontSize: scale(9), color: 'red', marginTop: 3 }}>
        Please Enter {label?.substring(0, label.length - 1)}...
      </Text>}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  dobMainView: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(-5),
  },
  dateView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    // marginTop: scale(2),
    zIndex: 10,
    height: scale(38),
    justifyContent: "center",
    alignItems: "center"
  },
  width28: { width: '28%' },
  width40: { width: '40%' },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    // lineHeight: scale(25),
    marginTop: scale(8),
  },
  error: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
    borderWidth: 2,
    borderColor: 'red'
  },
  userNameTextInput1: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    zIndex: 10,
    height: scale(38),
    justifyContent: "center",
    alignItems: "center"

  },
  btnStyle: { width: '100%', height: '100%', marginTop: scale(12) }

});

export default DateButton;
