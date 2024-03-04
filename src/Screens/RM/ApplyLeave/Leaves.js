import React from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';

const Leaves = props => {
  return (
    <Box
      label={'Leaves'}
      children={
        <>
          <View style={styles.branchNameView}>
            <Text style={styles.branchNameTxt}>Annual</Text>
            <View style={[styles.dotView, {marginLeft: scale(3)}]}></View>
            <Text style={styles.branchNameTxt1}> 10 / 10</Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, {width: '20%'}]}>Medical</Text>
            <View style={[styles.dotView, {width: '63%'}]}></View>
            <Text style={[styles.branchNameTxt1, {width: '15%'}]}>10 / 10</Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, {width: '35%'}]}>
              Hospitalisation
            </Text>
            <View
              style={[
                styles.dotView,
                {marginLeft: scale(3), width: '46%'},
              ]}></View>
            <Text style={styles.branchNameTxt1}> 10 / 10</Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, {width: '13%'}]}>Child</Text>
            <View style={[styles.dotView, {width: '69%'}]}></View>
            <Text style={[styles.branchNameTxt1]}>10 / 10</Text>
          </View>

          <View style={[styles.branchNameView, {marginBottom: scale(3)}]}>
            <Text style={[styles.branchNameTxt, {width: '20%'}]}>
              Maternity
            </Text>
            <View
              style={[
                styles.dotView,
                {marginLeft: scale(3), width: '61%'},
              ]}></View>
            <Text numberOfLines={1} style={[styles.branchNameTxt1]}>
              10 / 10
            </Text>
          </View>
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
    width: '15%',
  },
  dotView: {
    borderTopWidth: 1,
    borderStyle: 'dotted',
    width: '66%',
    top: scale(2),
    alignSelf: 'center',
  },
  branchNameTxt1: {
    fontSize: scale(12),
    color: '#666',
    fontWeight: '600',
    width: '16%',
    marginLeft: scale(3),
    textAlign: 'right',
  },
});
export default Leaves;
