import React from 'react';
import {scale} from 'react-native-size-matters';
import {View, StyleSheet, Text, FlatList} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';

const ReportingLine = props => {
  const renderItem = ({item, index}) => {
    return (
      <View style={style.mappingMainView}>
        <View style={style.empNameView}>
          <Text style={style.empName}>{item.empName}</Text>
        </View>
        <View style={style.priceView}>
          <Text style={[style.empName, {fontWeight: '500'}]}>
            {item.empDepartment}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <Box
      label={'Reporting Line'}
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
  containerView: {padding: scale(8)},
  mappingMainView: {
    flexDirection: 'row',
    width: '100%',
    height: scale(30),
    justifyContent: 'center',
  },
  empNameView: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
  },
  empName: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '600',
  },
  priceView: {
    width: '55%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
export default ReportingLine;
