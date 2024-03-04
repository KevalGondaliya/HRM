import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, TouchableOpacity, View } from 'react-native';

import TbModal from './TbModal';
import Colors from '../../../theme';
import eye from '../../../assets/svg/eye.svg';
import DataTable from '../../../component/DataTable';
import { isWidth400, isWidth500, isWidthUnder400 } from '../../../utils';

import styles from './style';

const Table = ({
  prve,
  next,
  data,
  onPress,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
  editIconPress,
  isModalVisible,
  setIsModalVisible,
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
    editIconPress(modalData);
  };

  const ListHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.userNameTxt}>Module Title</Text>
        <Text style={styles.userNameTxt}>End Date</Text>
        {is400 && <Text style={styles.userNameTxt}>Score</Text>}
        {is500 && (
          <>
            <Text style={styles.userNameTxt}>Status</Text>
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
        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, { color: Colors.sBlack }]}>
          {item.elearnModTitle}
        </Text>

        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, { color: Colors.sBlack }]}>
          1st {item.period + ' ' + new Date().getFullYear()}
        </Text>

        {is400 && (
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, { color: Colors.sBlack }]}>
            {item.score || 0} / {item.total || 0}
          </Text>
        )}

        {is500 && (
          <>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, { color: Colors.sBlack }]}>
              {item.status || 'Not Started Yet'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                onPress(item);
              }}
              style={styles.emptyView2}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
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
        onPress={onEditBtnPress}
      />
    </View>
  );
};

export default Table;
