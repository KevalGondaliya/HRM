import moment from 'moment';
import React, {Fragment} from 'react';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, TouchableOpacity} from 'react-native';

import Colors from '../../../theme';
import styles from './style';

const DateDropDown = props => {
  return (
    <Fragment>
      <Text style={[styles.userNameTxt, styles.labelTxt]}>{props.label}</Text>

      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles.datePickerView,
          props.isError && props.date == '' && styles.error,
          props.style,
        ]}>
        <Text
          style={[
            styles.dateTxt,
            {
              color: props.date ? Colors.blackPearl : Colors.lightRed,
            },
          ]}>
          {props.date
            ? moment(props.date).format('YYYY MMM DD')
            : 'Select Day…'}
        </Text>

        <Icon
          name={'down'}
          type={'antdesign'}
          size={scale(15)}
          color={Colors.lightRed}
        />
      </TouchableOpacity>
    </Fragment>
  );
};

export default DateDropDown;
