import React from 'react';
import { scale } from 'react-native-size-matters';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import moment from 'moment';

const PendingReviewApplications = props => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={style.mappingMainView}>
        <View style={style.empNameView}>
          <Text style={style.empName}>{item.leaveDesc}</Text>
        </View>
        <View style={style.priceView}>
          <Text style={style.empName}>{item.user_name}</Text>
        </View>
        <View style={[style.applicationNameView, { alignItems: 'flex-end' }]}>
          <Text numberOfLines={1} style={style.empName}>
            {moment(item.LeaveDate).format('YYYY MMM DD')}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <Box
      label={'Pending Review Applications'}
      children={
        <View style={style.containerView}>
          <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <>
                  <View style={style.noFoundTxtView}>
                    <Text style={style.noFoundTxt}>No Data Found</Text>
                  </View>
                </>
              );
            }}
          />
        </View>
      }
    />
  );
};
const style = StyleSheet.create({
  containerView: { padding: scale(8) },
  mappingMainView: {
    flexDirection: 'row',
    width: '100%',
    height: scale(30),
    justifyContent: 'center',
  },
  empNameView: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
  },
  empName: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '600',
  },
  applicationNameView: {
    width: '35%',
    height: '100%',
    justifyContent: 'center',
  },
  priceView: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  noFoundTxt: {
    padding: 15,
    fontSize: 18,
    color: Colors.sBlack,
    fontWeight: '600',
  },
  noFoundTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default PendingReviewApplications;
