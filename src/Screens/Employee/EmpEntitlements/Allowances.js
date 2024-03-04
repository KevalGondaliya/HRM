import React from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';

const Leaves = props => {
  return (
    <Box
      label={'Allowances'}
      style={{marginTop: scale(8)}}
      children={
        <>
          {props.empDashboardData?.map((data, index) => {
            return (
              <View style={styles.branchNameView}>
                <Text style={[styles.branchNameTxt, {width: '25%'}]}>
                  {data.entitlement}
                </Text>
                <View style={[styles.dotView, {marginLeft: scale(3)}]}></View>
                <Text style={styles.branchNameTxt1}>{data.total} / month</Text>
              </View>
            );
          })}
        </>
      }
    />
  );
};
const styles = StyleSheet.create({
  branchNameView: {
    flexDirection: 'row',
    width: '100%',
    height: scale(30),
    alignItems: 'center',
  },
  branchNameTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: '600',
    width: '20%',
  },
  dotView: {
    borderTopWidth: 1,
    borderStyle: 'dotted',
    width: '45%',
    top: scale(2),
    alignSelf: 'center',
  },
  branchNameTxt1: {
    fontSize: scale(12),
    color: '#666',
    fontWeight: '600',
    marginLeft: scale(5),
  },
});
export default Leaves;
