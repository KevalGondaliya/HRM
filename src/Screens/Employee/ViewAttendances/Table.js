import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, TouchableOpacity, View } from 'react-native';

import TbModal from './TbModal';
import Colors from '../../../theme';
import DataTable from '../../../component/DataTable';
import { isWidth400, isWidth500, isWidthUnder400 } from '../../../utils';

import styles from './style';
import moment from 'moment';

const Table = ({
  prve,
  next,
  data,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setDate] = useState('');
  const is400 = isWidth400();
  const is500 = isWidth500();
  const isLess400 = isWidthUnder400();

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
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

  const ListHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.emptyView} />
        <Text style={styles.userNameTxt}>Check In Date</Text>

        <Text style={styles.userNameTxt}>Check In Time</Text>

        {is400 && <Text style={styles.userNameTxt}>Check In Location</Text>}

        {is500 && (
          <>
            <Text style={styles.userNameTxt}>Check Out Date</Text>

            <Text style={styles.userNameTxt}>Check Out Time</Text>
            <View style={styles.emptyView2} />
          </>
        )}
        {isLess400 && <View style={styles.emptyView1} />}
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          styles.headerStyle,
          styles.tbView,
          {
            backgroundColor: index % 2 == 1 ? Colors.grey : Colors.white,
          },
        ]}>
        <View style={styles.emptyView} />

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.check_in ? moment(item.check_in).format('YYYY MMM DD') : '-'}
        </Text>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.check_in ? moment(item.check_in).format('hh:mm A') : '-'}
        </Text>

        {is400 && (
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.check_in_location}
          </Text>
        )}
        {is500 && (
          <>
            <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
              {item.check_out
                ? moment(item.check_out).format('YYYY MMM DD')
                : '-'}
            </Text>
            <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
              {item.check_out ? moment(item.check_out).format('hh:mm A') : '-'}
            </Text>

            <TouchableOpacity
              onPress={() => onMoreBtnPress(item)}
              style={styles.emptyView2}>
              <Icon
                name={'eye'}
                type={'entypo'}
                size={scale(23)}
                color={Colors.sBlack}
              />
            </TouchableOpacity>
          </>
        )}
        {isLess400 && (
          <TouchableOpacity
            onPress={() => onMoreBtnPress(item)}
            style={styles.emptyView1}>
            <Icon
              name={'eye'}
              type={'entypo'}
              size={scale(23)}
              color={Colors.sBlack}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <DataTable
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        onRightBtnPress={onRightBtnPress}
        onLeftBtnPress={onLeftBtnPress}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={data}
        next={next}
      />

      <TbModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        modalData={modalData}
      />
    </View>
  );
};

export default Table;
