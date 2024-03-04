import React from 'react';
import { scale } from 'react-native-size-matters';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import moment from 'moment';

const PendingApplications = props => {
  return (
    <Box
      label={'Pending Applications'}
      children={
        <View style={style.containerView}>
          {props.pendingData != null ? (
            props.pendingData?.map((data, index) => {
              return (
                <View style={style.mainView} key={index}>
                  <Text style={style.nameTxt}>{data.name}</Text>
                  <Text style={style.nameTxt}>
                    {moment(data.createdAt).format('YYYY MMM DD')}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text style={{ fontSize: scale(15), color: Colors.blackPearl }}>
              No Data Found
            </Text>
          )}
        </View>
      }
    />
  );
};
const style = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(7),
  },
  nameTxt: {
    fontSize: scale(12),
    fontWeight: '700',
    color: Colors.blackPearl,
  },
  containerView: { padding: scale(8) },
});
export default PendingApplications;
