import React from 'react';
import {View, Text} from 'react-native';

import Colors from '../../theme';
import {dayArr} from '../../utility/constant';

import styles from './style';

const WeekDay = props => {
  return (
    <View style={styles.dayView}>
      {dayArr.map((data, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dayBtnView,
              // {
              //   backgroundColor:
              //     data.name === 'Sat' || data.name === 'Sun'
              //       ? Colors.white
              //       : Colors.blackPearl,
              //   borderWidth: data.name === 'Sat' || data.name === 'Sun' ? 2 : 0,
              // },
            ]}>
            <Text
              style={[
                styles.dayTxt,
                // {
                //   color:
                //     data.name === 'Sat' || data.name === 'Sun'
                //       ? Colors.blackPearl
                //       : Colors.white,
                // },
              ]}>
              {data.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default WeekDay;
