import React from 'react';
import { scale } from 'react-native-size-matters';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';

const EntitledLeaves = props => {
  return (
    <Box
      label={'Entitled Leaves'}
      children={
        <View style={style.containerView}>
          {props.pendingData?.length > 0 ? props.pendingData?.map((data, index) => {

            return (
              <View style={style.mainView}>
                <Text style={[style.nameTxt, { textTransform: 'capitalize' }]}>
                  {data.entitlement}
                </Text>
                <Text style={style.nameTxt}>
                  {data.remaining} / {data.total} left
                </Text>
              </View>
            );
          }) : <Text style={{ fontSize: scale(15), color: Colors.blackPearl }}>
            No Data Found
          </Text>}
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
    marginBottom: scale(8),
  },
  nameTxt: {
    fontSize: scale(12),
    fontWeight: '700',
    color: Colors.blackPearl,
  },
  containerView: { padding: scale(8) },
});
export default EntitledLeaves;
