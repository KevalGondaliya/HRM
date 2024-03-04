import moment from 'moment';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import React, { Fragment, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import {
  isWidth400,
  isWidth500,
  isWidth600,
  isWidthUnder400,
} from '../../../utils';
import TbModal from './TbModal';
import Colors from '../../../theme';
import DataTable from '../../../component/DataTable';

import styles from './style';
import { padNumber } from '../../../utility/validator';

const Table = ({
  next,
  prve,
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
  const is600 = isWidth600();
  const isLess400 = isWidthUnder400();

  const onCloseModalBtn = () => {
    setIsModalVisible(false);
  };

  const onMorePress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />

        <Text style={styles.userNameTxt}>Allowance Date</Text>

        <Text style={styles.userNameTxt}>Allowance Type</Text>

        {is400 && <Text style={styles.userNameTxt}>Amount</Text>}
        {is500 && <View style={styles.userNameTxt} />}
        {is600 && (
          <Fragment>
            <View style={styles.userNameTxt} />

            <View style={styles.emptyView1} />
          </Fragment>
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
          {moment(item.allowanceDate).format('YYYY MMM DD')}
        </Text>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.allowDesc}
        </Text>

        {is400 && (
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {padNumber(item.amount)}
          </Text>
        )}
        {is500 && (
          <TouchableOpacity style={styles.userNameTxt}>
            {/* <SvgXml xml={eye} width={scale(22)} height={scale(22)} /> */}
          </TouchableOpacity>
        )}
        {is600 && (
          <Fragment>
            <View style={[styles.userNameTxt, styles.sBlack]} />

            <View style={styles.emptyView1} />
          </Fragment>
        )}
        {isLess400 && (
          <TouchableOpacity
            onPress={() => onMorePress(item)}
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
    <View style={styles.tbContainerView}>
      <DataTable
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        onRightBtnPress={onRightBtnPress}
        onLeftBtnPress={onLeftBtnPress()}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={data}
        next={next}
      />

      <TbModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModalBtn}
        modalData={modalData}
      />
    </View>
  );
};

export default Table;
