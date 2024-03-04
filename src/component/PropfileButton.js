import React from 'react';
import { scale } from 'react-native-size-matters';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../theme';

function PropfileButton(props) {
  return (
    <View style={styles.containerView}>
      <TouchableOpacity
        onPress={props.personalDeails}
        style={[
          styles.buttonMainView,
          props.isProfile ? null : styles.unfillBtn,
        ]}>
        <Text
          style={[
            styles.btnTxt,
            { color: props.isProfile ? Colors.white : Colors.blackPearl },
          ]}>
          Personal Details
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.employmentDetails}
        style={[
          styles.buttonMainView,
          props.isEmpDetails ? null : styles.unfillBtn,
        ]}>
        <Text
          style={[
            styles.btnTxt,
            { color: props.isEmpDetails ? Colors.white : Colors.blackPearl },
          ]}>
          Employment Details
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.documentBtnPress}
        style={[
          styles.buttonMainView,
          props.isDocument ? null : styles.unfillBtn,
        ]}>
        <Text
          style={[
            styles.btnTxt,
            { color: props.isDocument ? Colors.white : Colors.blackPearl },
          ]}>
          Documents
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.entitlementsBtnPress}
        style={[
          styles.buttonMainView,
          props.isEntitlements ? null : styles.unfillBtn,
        ]}>
        <Text
          style={[
            styles.btnTxt,
            { color: props.isEntitlements ? Colors.white : Colors.blackPearl },
          ]}>
          Entitlements
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonMainView: {
    width: scale(140),
    height: scale(40),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackPearl,
    marginTop: scale(15),
  },
  btnTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '700',
  },
  unfillBtn: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.blackPearl,
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: scale(15),
  },
});

export default PropfileButton;
