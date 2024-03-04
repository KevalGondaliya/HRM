import React from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import DataTable from '../../../component/DataTable';

const JobPositions = props => {
  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.headerStyle,
          styles.tbView,
          {
            backgroundColor: index % 2 == 1 ? Colors.grey : Colors.white,
          },
        ]}>
        <View style={[styles.headerDate, {width: scale(90)}]}>
          <Text numberOfLines={1} style={[styles.userNameTxt]}>
            {item.technology}
          </Text>
        </View>
        <View style={styles.headerDate}>
          <Text numberOfLines={1} style={[styles.userNameTxt]}>
            {item.position}
          </Text>
        </View>
        <View style={[styles.headerBouns,{width:scale(80)}]}>
          <Text numberOfLines={1} style={[styles.userNameTxt]}>
            {item.time}
          </Text>
        </View>
        <View style={styles.headerBouns}>
          <Text numberOfLines={1} style={[styles.userNameTxt]}>
            {item.date}
          </Text>
        </View>
        <View style={[styles.headerBouns,{width:scale(50)}]}>
          <Text numberOfLines={1} style={[styles.userNameTxt]}>
            {item.present}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Box
      label={'Job Positions'}
      children={
        <DataTable
          data={props.data?.slice(props.prve, props.next)}
          renderItem={renderItem}
          isPaginate
        />
      }
      childrenStyle={{paddingHorizontal: 0, paddingVertical: 0}}
    />
  );
};
const styles = StyleSheet.create({
  headerMainView: {
    height: scale(60),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(15),
    justifyContent: 'center',
  },
  headerTxt: {
    fontSize: scale(13),
    fontWeight: '700',
    color: Colors.white,
    top: scale(8),
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDate: {
    width: scale(120),
    height: '100%',
    justifyContent: 'center',
  },
  headerIcon: {
    width: scale(150),
    height: '100%',
    justifyContent: 'center',
  },
  headerBouns: {
    width: scale(120),
    height: '100%',
    justifyContent: 'center',
  },
  headerStatus: {
    width: scale(165),
    height: '100%',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
  },
  iconMainView: {
    width: '95%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyeIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  tbView: {
    paddingHorizontal: scale(15),
    height: scale(40),
  },
  containerView: {
    paddingHorizontal: scale(10),
    marginTop: scale(20),
  },
  editIcon: scale(20),
});
export default JobPositions;
