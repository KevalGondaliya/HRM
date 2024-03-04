import {useSelector} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import TbModal from './tbModal';
import Colors from '../../theme';
import eye from '../../assets/svg/eye.svg';
import DataTable from '../../component/DataTable';
import {useWindowDimensions} from '../../dummyData';

import styles from './style';

const Table = ({
  prve,
  next,
  data,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
  onEditIconPress,
  onEyeIconPress,
  onDelBtnPree,
  isModalVisible,
  setIsModalVisible,
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
        <View style={[styles.headerDate]}>
          <Text style={styles.userNameTxt}>Branch Name</Text>
        </View>
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Check In Radius</Text>
        </View>
        {(deviceWidth < 400 || deviceWidth < 500) && (
          <View style={styles.emptyView1} />
        )}
        {deviceWidth > 500 && (
          <View style={styles.headerBouns}>
            <Text style={styles.userNameTxt}>Country</Text>
          </View>
        )}
        {deviceWidth > 600 && <View style={styles.headerIcon} />}
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
            {delArr.includes(item.id) && (
              <Icon name={'check'} type={'entypo'} size={scale(13)} />
            )}
          </View>
        </TouchableOpacity>
        <View style={[styles.headerDate]}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.branch_name}
          </Text>
        </View>
        <View style={styles.headerDate}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.checkin_radius}
          </Text>
        </View>
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
        {deviceWidth > 500 && (
          <View style={styles.headerBouns}>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, {color: Colors.sBlack}]}>
              {item.country}
            </Text>
          </View>
        )}
        {deviceWidth > 600 && (
          <View style={styles.headerIcon}>
            <View style={styles.iconMainView}>
              <TouchableOpacity onPress={() => onEditIconPress(modalData)}>
                <Icon
                  name={'edit'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={scale(20)}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onEyeIconPress(modalData)}>
                <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onDelBtnPree(modalData)}>
                <Icon
                  name={'delete'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={scale(20)}
                />
              </TouchableOpacity>
            </View>
          </View>
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
    <View style={styles.mainView} key={count}>
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
        modalData={modalData}
        onCloseModal={onCloseModal}
        onEditIconPress={() => onEditIconPress(modalData)}
        onEyeIconPress={() => onEyeIconPress(modalData)}
        onDelBtnPree={() => onDelBtnPree(modalData)}
      />
    </View>
  );
};

export default Table;
