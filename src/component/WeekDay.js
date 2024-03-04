import React from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../theme';
import {dayArr} from '../utility/constant';

const WeekDay = props => {
  return (
    <View style={styles.dayView}>
      {dayArr.map((data, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dayBtnView,
              {
                backgroundColor:
                  data.name === 'Sat' || data.name === 'Sun'
                    ? Colors.white
                    : Colors.blackPearl,
                borderWidth: data.name === 'Sat' || data.name === 'Sun' ? 2 : 0,
              },
            ]}>
            <Text
              style={[
                styles.dayTxt,
                {
                  color:
                    data.name === 'Sat' || data.name === 'Sun'
                      ? Colors.blackPearl
                      : Colors.white,
                },
              ]}>
              {data.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  dayBtnView: {
    width: scale(60),
    height: scale(48),
    borderRadius: scale(15),
    backgroundColor: Colors.blackPearl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(15),

    borderColor: Colors.blackPearl,
  },
  dayTxt: {
    fontSize: scale(12),
    fontWeight: '700',
    color: Colors.white,
  },
  dayView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: scale(20),
    paddingHorizontal: scale(10),
  },
});
export default WeekDay;
