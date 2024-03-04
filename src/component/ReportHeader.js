import React from 'react';
import {scale} from 'react-native-size-matters';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../theme';

function ReportHeader({onPress, data}) {
  return (
    <View style={styles.reportMainView}>
      <View style={styles.mappingMainView}>
        {data?.map((item, index) => {
          return (
            <View style={styles.orgNameView} key={index}>
              <Text style={styles.orgNameTxt} numberOfLines={1}>
                {item.label}
              </Text>
              <Text style={styles.orgNameTxt} numberOfLines={1}>
                {item.description}
              </Text>
            </View>
          );
        })}
      </View>
      <TouchableOpacity style={styles.editBtnView} onPress={onPress}>
        <Text style={styles.editTxt}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  reportMainView: {
    width: '100%',
    minHeight: scale(150),
    backgroundColor: Colors.blackPearl,
    borderRadius: scale(30),
    marginBottom: scale(18),
  },

  orgNameView: {
    width: '100%',
    height: scale(40),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(30),
    justifyContent: 'space-between',
  },

  editBtnView: {
    width: '100%',
    height: scale(50),
    alignItems: 'center',
  },

  editTxt: {
    color: Colors.white,
    fontSize: scale(18),
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationColor: Colors.white,
  },
  orgNameTxt: {
    fontSize: scale(13),
    color: Colors.white,
    fontWeight: '600',
    width: '40%',
    textTransform: 'capitalize',
  },

  mappingMainView: {
    minHeight: scale(150),
    justifyContent: 'center',
    paddingTop: scale(15),
  },
});

export default ReportHeader;
