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
  isModalVisible,
  setIsModalVisible,
  onDeleteBtnPress,
  eyeIconPress,
  editBtnPress,
}) => {
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

  const onEditBtnPress = () => {
    editBtnPress(modalData);
  };

  const onDelete = item => {
    onDeleteBtnPress(modalData.id);
  };

  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />
        <Text style={styles.userNameTxt}>Submitted Date</Text>

        <Text style={styles.userNameTxt}>Leave Type</Text>

        {is400 && <Text style={styles.userNameTxt}>Leave Start Date</Text>}

        {is500 && (
          <>
            <Text style={styles.userNameTxt}>Leave End Date</Text>

            <Text style={styles.userNameTxt}>Resson</Text>
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

        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, { color: Colors.sBlack }]}>
          {moment(item.createdAt).format('YYYY MMM DD')}
        </Text>

        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, { color: Colors.sBlack }]}>
          {item.leaveDesc}
        </Text>

        {is400 && (
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, { color: Colors.sBlack }]}>
            {moment(item.leaveStartDate).format('YYYY MMM DD')}
          </Text>
        )}
        {is500 && (
          <>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, { color: Colors.sBlack }]}>
              {moment(item.leaveEndDate).format('YYYY MMM DD')}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, { color: Colors.sBlack }]}>
              {item.reason}
            </Text>

            <TouchableOpacity
              onPress={() => onMoreBtnPress(item)}
              style={styles.emptyView2}>
              <Icon
                name={'plus'}
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
              name={'plus'}
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
        onDeleteBtnPress={onDelete}
        eyeIconPress={() => eyeIconPress(modalData)}
        editBtnPress={onEditBtnPress}
      />
    </View>
  );
};

export default Table;
