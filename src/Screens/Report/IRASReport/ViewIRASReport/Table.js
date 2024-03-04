import React from 'react';
import {Text, View} from 'react-native';

import Colors from '../../../../theme';
import DataTable from '../../../../component/DataTable';

import styles from './style';

const Table = ({
  prve,
  next,
  data,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
}) => {
  const ListHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.emptyView}>
          <View style={[styles.checkBoxView, styles.borderColor]} />
        </View>

        <Text style={styles.userNameTxt}>Transacted Date</Text>

        <Text style={styles.userNameTxt}>Organisation</Text>
      </View>
    );
  };

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
        <View style={styles.emptyView}>
          {/* <View style={styles.checkBoxView} /> */}
        </View>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.transacted_Date}
        </Text>
        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.organisation}
        </Text>
      </View>
    );
  };

  const onLeftBtnPress = () => {
    if (pageCurrent > 1) {
      setPrve(prve - 5);
      setNext(next - 5);
      setpageCurrent(pageCurrent - 1);
    }
  };

  const onRightBtnPress = () => {
    setPrve(prve + 5);
    setNext(next + 5);
    setpageCurrent(pageCurrent + 1);
  };

  return (
    <DataTable
      pageCurrent={pageCurrent}
      data={data?.slice(prve, next)}
      onRightBtnPress={onRightBtnPress}
      onLeftBtnPress={onLeftBtnPress}
      renderItem={renderItem}
      ListHeader={ListHeader}
      dataArr={data}
      next={next}
      style={styles.tbMainView}
    />
  );
};

export default Table;
