import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import React, { Fragment, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import TbModal from './TbModal';
import Colors from '../../theme';
import DataTable from '../../component/DataTable';
import { useWindowDimensions } from '../../dummyData';

import styles from './style';
import { padNumber } from '../../utility/validator';

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

  const onDelete = item => {
    onDeleteBtnPress(modalData.id);
  };

  const eyeBtnPress = () => {
    eyeIconPress(modalData);
  };

  const onEditBtnPress = () => {
    editBtnPress(modalData);
  };
  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Description</Text>
        </View>
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Limit Period</Text>
        </View>
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Allowance Limit</Text>
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
        <View style={styles.headerDate}>
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.description}
          </Text>
        </View>
        <View style={styles.headerDate}>
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item?.allowanceTypeRules[0]?.limitPeriod}
          </Text>
        </View>
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
              {padNumber(item.allowanceTypeRules[0]?.allowanceLimit)}
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
    <Fragment key={count}>
      <DataTable
        next={next}
        dataArr={data}
        renderItem={renderItem}
        ListHeader={ListHeader}
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        style={styles.tbContainerView}
        onLeftBtnPress={onLeftBtnPress}
        onRightBtnPress={onRightBtnPress}
      />

      <TbModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        modalData={modalData}
        eyeIconPress={eyeBtnPress}
        onDeleteBtnPress={onDelete}
        editBtnPress={onEditBtnPress}
      />
    </Fragment>
  );
};

export default Table;
