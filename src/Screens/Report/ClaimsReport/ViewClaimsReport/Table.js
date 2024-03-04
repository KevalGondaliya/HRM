import { Icon } from 'react-native-elements';
import React, { Fragment, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { Text, TouchableOpacity, View } from 'react-native';

import TbModal from './tbModal';
import Colors from '../../../../theme';
import DataTable from '../../../../component/DataTable';
import { useWindowDimensions } from '../../../../dummyData';

import styles from './style';
import { padNumber } from '../../../../utility/validator';

const Table = ({
  prve,
  next,
  data,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
}) => {
  const deviceWidth = useWindowDimensions();
  const [modalData, setDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const itemWidth = deviceWidth > 500 ? styles.width200 : styles.width130;

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const ListHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.emptyView}>
          <View style={[styles.checkBoxView, styles.borderColor]} />
        </View>

        <Text style={styles.userNameTxt}>Claim ID</Text>

        <Text style={styles.userNameTxt}>Name</Text>

        {(deviceWidth < 400 || deviceWidth < 500) && (
          <View style={styles.width90} />
        )}
        {deviceWidth > 500 && (
          <Fragment>
            <Text
              style={[
                styles.userNameTxt,
                {
                  width: itemWidth,
                },
              ]}>
              Organisation
            </Text>

            <Text
              style={[
                styles.userNameTxt,
                {
                  width: itemWidth,
                },
              ]}>
              Department
            </Text>

            <Text
              style={[
                styles.userNameTxt,
                {
                  width: itemWidth,
                },
              ]}>
              Claim Type
            </Text>
          </Fragment>
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
            backgroundColor: index % 2 === 1 ? Colors.grey : Colors.white,
          },
        ]}>
        <View style={styles.emptyView}>
          {/* <View style={styles.checkBoxView} /> */}
        </View>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.id}
        </Text>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.name}
        </Text>

        {(deviceWidth < 400 || deviceWidth < 500) && (
          <TouchableOpacity
            onPress={() => onMoreBtnPress(item)}
            style={styles.width90}>
            <Icon
              name={'plus'}
              type={'entypo'}
              size={scale(23)}
              color={Colors.sBlack}
            />
          </TouchableOpacity>
        )}

        {deviceWidth > 500 && (
          <Fragment>
            <Text
              numberOfLines={1}
              style={[
                styles.userNameTxt,
                {
                  color: Colors.sBlack,
                  width: itemWidth,
                },
              ]}>
              {item.organisation}
            </Text>

            <Text
              numberOfLines={1}
              style={[
                styles.userNameTxt,
                {
                  color: Colors.sBlack,
                  width: itemWidth,
                },
              ]}>
              {item.department}
            </Text>

            <Text
              numberOfLines={1}
              style={[
                styles.userNameTxt,
                {
                  color: Colors.sBlack,
                  width: itemWidth,
                },
              ]}>
              {padNumber(item.amount)}
            </Text>
          </Fragment>
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
    <Fragment>
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

      <TbModal
        isModalVisible={isModalVisible}
        modalData={modalData}
        onCloseModal={onCloseModal}
      />
    </Fragment>
  );
};

export default Table;
