import React, { Fragment } from 'react';
import { scale } from 'react-native-size-matters';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Colors from '../theme';

function DropDowns(props) {
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <Fragment>
      {props.label ? (
        <Text style={[styles.userNameTxt, props.labelStyle]}>
          {props.label}
        </Text>
      ) : null}

      <Dropdown
        style={[styles.dropdown, props.style, props.isError && styles.error]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.data}
        disable={props.disable}
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        renderItem={renderItem}
        isError={props.isError}

      />
      {props.isError && (
        <Text style={{ fontSize: scale(9), color: 'red' }}>
          Please {props.placeholder}
        </Text>
      )}
    </Fragment>
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
  dropdown: {
    height: scale(45),
    backgroundColor: Colors.grey,
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: scale(20),
  },

  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  placeholderStyle: {
    fontSize: scale(12),
    color: Colors.lightRed,
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
  selectedTextStyle: {
    color: "#000"
  },
  textItem: {
    color: "#000"
  }

});

export default DropDowns;
