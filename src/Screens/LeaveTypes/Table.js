import {Icon} from 'react-native-elements';
import React, {Fragment, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {Text, TouchableOpacity, View} from 'react-native';

import TbModal from './TbModal';
import Colors from '../../theme';
import DataTable from '../../component/DataTable';
import {isWidth400, isWidth500, isWidthUnder400} from '../../utils';

import styles from './style';

const Table = ({
  prve,
  next,
  data,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
  onDeleteBtnPress,
  isModalVisible,
  setIsModalVisible,
  eyeIconPress,
  editBtnPress,
  handleOnCheckBox,
  delArr,
  count,
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

        <Text style={styles.userNameTxt}>Description</Text>

        <Text style={styles.userNameTxt}>Entitled To</Text>

        {is400 && <Text style={styles.userNameTxt}>Gender</Text>}
        {is500 && (
          <>
            <Text style={styles.userNameTxt}>Paid Leave</Text>
            <Text style={styles.userNameTxt}>Prorate</Text>

            <View style={styles.emptyView2} />
          </>
        )}

        {isLess400 && <View style={styles.emptyView1} />}
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
        <TouchableOpacity
          onPress={() => handleOnCheckBox(item.id)}
          style={styles.emptyView}>
          <View style={styles.checkBoxView}>
            {delArr?.includes(item.id) && (
              <Icon name={'check'} type={'entypo'} size={scale(13)} />
            )}
          </View>
        </TouchableOpacity>

        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, {color: Colors.sBlack}]}>
          {item.leaveDesc}
        </Text>

        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, {color: Colors.sBlack}]}>
          {item.entitled_to}
        </Text>

        {is400 && (
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.gender}
          </Text>
        )}
        {is500 && (
          <>
            <Text
              numberOfLines={1}
              style={[
                styles.userNameTxt,
                {color: Colors.sBlack, textTransform: 'capitalize'},
              ]}>
              {item.paid_leave.toString()}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, {color: Colors.sBlack}]}>
              {item.prorateBy}
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
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        onRightBtnPress={onRightBtnPress}
        onLeftBtnPress={onLeftBtnPress}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={data}
        next={next}
        style={styles.tbContainerView}
      />
      <TbModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        modalData={modalData}
        onDeleteBtnPress={onDelete}
        eyeIconPress={eyeBtnPress}
        editBtnPress={onEditBtnPress}
      />
    </Fragment>
  );
};

export default Table;
