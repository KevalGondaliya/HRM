import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';

import Colors from '../theme';

const DataTable = props => {
  return (
    <View style={[{minHeight: scale(100)}, props.style]}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <FlatList
          data={props.data}
          renderItem={props.renderItem}
          ListHeaderComponent={props.ListHeader}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <>
                <View style={style.noFoundTxtView}>
                  {props.noData ? (
                    props.noData
                  ) : (
                    <Text style={style.noFoundTxt}>No Data Found</Text>
                  )}
                </View>
              </>
            );
          }}
        />

        {props.isPaginate ? null : (
          <>
            <Text style={style.resultTxt}>
              {props.dataArr ? props.dataArr?.length : 0} results
            </Text>
            <View style={style.paginationBtnView}>
              <TouchableOpacity
                disabled={props.pageCurrent == 1 ? true : false}
                onPress={props.onLeftBtnPress}
                style={[
                  style.paginationBtn,
                  {opacity: props.pageCurrent == 1 ? 0.5 : 1},
                ]}>
                <Icon name={'left'} type={'antdesign'} />
              </TouchableOpacity>

              <View
                style={[style.paginationBtn, {marginHorizontal: scale(15)}]}>
                <Text style={style.pageCurrentTxt}>{props.pageCurrent}</Text>
              </View>

              <TouchableOpacity
                disabled={
                  props.dataArr == null || props.dataArr?.length <= props.next
                    ? true
                    : false
                }
                onPress={props.onRightBtnPress}
                style={[
                  style.paginationBtn,
                  {
                    opacity:
                      props.dataArr == null ||
                      props.dataArr?.length <= props.next
                        ? 0.5
                        : 1,
                  },
                ]}>
                <Icon name={'right'} type={'antdesign'} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(50),
    paddingHorizontal: scale(10),
  },
  headerDate: {
    width: scale(120),
    height: '100%',
    justifyContent: 'center',
  },
  headerBouns: {
    width: scale(130),
    height: '100%',
    justifyContent: 'center',
  },
  headerStatus: {
    width: scale(100),
    height: '100%',
    justifyContent: 'center',
  },
  paginationBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: Colors.sBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationBtnView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: scale(15),
  },
  resultTxt: {
    textAlign: 'center',
    color: Colors.sBlack,
    marginTop: scale(15),
    fontSize: scale(13),
    fontWeight: '600',
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
  },
  noFoundTxt: {
    padding: 15,
    fontSize: 18,
    color: Colors.sBlack,
  },
  noFoundTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pageCurrentTxt: {
    fontSize: scale(15),
    color: Colors.sBlack,
  },
});
export default DataTable;
