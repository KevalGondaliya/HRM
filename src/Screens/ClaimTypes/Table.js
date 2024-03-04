import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity } from 'react-native';

import TbModal from './TbModal';
import Colors from '../../theme';
import DataTable from '../../component/DataTable';
import { useWindowDimensions } from '../../dummyData';

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
  editBtnPress,
  eyeBtnPress,
  onDeleteBtnPress,
  handleOnCheckBox,
  delArr,
  count,
}) => {
  const deviceWidth = useWindowDimensions();

  const [modalData, setDate] = useState('');

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />
        <View style={[styles.headerDate, { width: scale(90) }]}>
          <Text style={styles.userNameTxt}>Description</Text>
        </View>
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Limit Period</Text>
        </View>
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Claim Limit</Text>
          </View>
        )}
        {deviceWidth > 500 && (
          <>
            <View style={styles.headerDate} />

            <View style={styles.emptyView2} />
          </>
        )}

        {(deviceWidth < 400 || deviceWidth < 500) && (
          <View style={styles.emptyView1} />
        )}
      </View>
    );
  };

  const onEditBtnPress = () => {
    editBtnPress(modalData);
  };
  const delBtnPress = () => {
    onDeleteBtnPress(modalData.id);
  };
  const onEyeBtnPress = () => {
    eyeBtnPress(modalData);
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
        <TouchableOpacity
          onPress={() => handleOnCheckBox(item.id)}
          style={styles.emptyView}>
          <View style={styles.checkBoxView}>
            {delArr?.includes(item.id) && (
              <Icon name={'check'} type={'entypo'} size={scale(13)} />
            )}
          </View>
        </TouchableOpacity>
        <View style={[styles.headerDate, { width: scale(90) }]}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, { color: Colors.sBlack }]}>
            {item.description}
          </Text>
        </View>
        <View style={styles.headerDate}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, { color: Colors.sBlack }]}>
            {item.limit_period
              ? moment(item.limit_period).format('YYYY MMM DD')
              : '-'}
          </Text>
        </View>
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, { color: Colors.sBlack }]}>
              {item.limit_amount}
            </Text>
          </View>
        )}
        {deviceWidth > 500 && (
          <>
            <View style={styles.headerDate} />

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
        {(deviceWidth < 400 || deviceWidth < 500) && (
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
    <View style={styles.tbContainerView} key={count}>
      <DataTable
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        onRightBtnPress={onRightBtnPress}
        onLeftBtnPress={onLeftBtnPress}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={data || []}
        next={next}
      />

      <TbModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        modalData={modalData}
        editBtnPress={onEditBtnPress}
        eyeBtnPress={onEyeBtnPress}
        onDeleteBtnPress={delBtnPress}
      />
    </View>
  );
};

export default Table;
