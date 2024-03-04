import React, {Fragment} from 'react';
import {View, Text} from 'react-native';

import Box from '../../component/Box';
import {viewBranchTbData} from '../../dummyData';

import styles from './style';

const BranchDetails = props => {
  const data = viewBranchTbData;
  return (
    <Box
      label={'Branch Details'}
      children={
        <Fragment>
          <View style={styles.branchNameView}>
            <Text style={styles.branchNameTxt}>Branch Name</Text>
            <View style={[styles.dotView, styles.left]}></View>
            <Text style={styles.branchNameTxt1}>{data[0].branchName}</Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, styles.width40]}>
              Check-In Radius
            </Text>
            <View style={[styles.dotView, styles.width43]}></View>
            <Text style={[styles.branchNameTxt1, styles.width15]}>
              {data[0].checkInRadius}
            </Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, styles.width20]}>Country</Text>
            <View style={[styles.dotView, styles.left, styles.width53]}></View>
            <Text style={styles.branchNameTxt1}>{data[0].country}</Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, styles.width30]}>
              Postal Code
            </Text>
            <View style={[styles.dotView, styles.width53]}></View>
            <Text style={[styles.branchNameTxt1, styles.width15]}>
              {data[0].postalCode}
            </Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, styles.width20]}>Address</Text>
            <View style={[styles.dotView, styles.left, styles.width30]}></View>
            <Text
              numberOfLines={1}
              style={[styles.branchNameTxt1, styles.width48]}>
              {data[0].address}
            </Text>
          </View>
        </Fragment>
      }
    />
  );
};

export default BranchDetails;
