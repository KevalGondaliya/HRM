import React from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';

const TodayOverview = props => {
  return (
    <Box
      label={`Today's Overview`}
      children={
        <>
          <View style={style.boxContaintView1}>
            <Text style={style.totalHeadCount}>Total Head Count</Text>
            <Text style={[style.totalHeadCount, style.newEmploymentTxt]}>
              {props.totalHeadCount}
            </Text>
          </View>

          <View style={[style.boxContaintView1, {marginTop: scale(10)}]}>
            <Text style={style.totalHeadCount}>Total Check In</Text>
            <Text style={[style.totalHeadCount, style.newEmploymentTxt]}>
              {props.totalCheckIn}
            </Text>
          </View>

          <View style={[style.boxContaintView1, {marginTop: scale(10)}]}>
            <Text style={style.totalHeadCount}>Total On Leave</Text>
            <Text style={[style.totalHeadCount, style.newEmploymentTxt]}>
              {props.totalOnLeave}
            </Text>
          </View>
        </>
      }
    />
  );
};
const style = StyleSheet.create({
  boxContaintView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalHeadCount: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '600',
    width: '80%',
  },
  newEmploymentTxt: {width: '18%', textAlign: 'right'},
});
export default TodayOverview;
