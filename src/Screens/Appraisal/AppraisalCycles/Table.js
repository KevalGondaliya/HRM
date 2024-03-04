import {Icon} from 'react-native-elements';
import React, {Fragment, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {Text, TouchableOpacity, View} from 'react-native';

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
import moment from 'moment';

const Table = ({
  prve,
  next,
  data,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
  onDeleteBtnPress,
  eyeIconPress,
  editBtnPress,
  isModalVisible,
  setIsModalVisible,
  handleOnCheckBox,
  delArr,
  count,
}) => {
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
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />

        <Text style={styles.userNameTxt}>Cycle ID</Text>

        {/* <Text style={styles.userNameTxt}>Flow Type</Text> */}
        <Text style={styles.userNameTxt}>Template</Text>

        {is400 && <Text style={styles.userNameTxt}>Flow Type</Text>}
        {is500 && <Text style={styles.userNameTxt}>Start Date</Text>}
        {is600 && (
          <>
            <Text style={styles.userNameTxt}>End Date</Text>

            <View style={styles.emptyView1} />
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
          style={[styles.userNameTxt, styles.sBlackColor]}>
          {item.id || '-'}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, styles.sBlackColor]}>
          {item.appraisalTemplate?.appraisalTempName || '-'}
        </Text>
        {is400 && (
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, styles.sBlackColor]}>
            {item.flowType || '-'}
          </Text>
        )}
        {is500 && (
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, styles.sBlackColor]}>
            {moment(item.appraisalStartDate).format('YYYY MMM DD') || '-'}
          </Text>
        )}
        {is600 && (
          <>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, styles.sBlackColor]}>
              {moment(item.appraisalEndDate).format('YYYY MMM DD') || '-'}
            </Text>

            <TouchableOpacity
              onPress={() => onMorePress(item)}
              style={styles.emptyView1}>
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
            onPress={() => onMorePress(item)}
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
        onCloseModal={onCloseModalBtn}
        modalData={modalData}
        onDeleteBtnPress={() => onDeleteBtnPress(modalData.id)}
        eyeIconPress={() => eyeIconPress(modalData)}
        editBtnPress={() => editBtnPress(modalData)}
      />
    </Fragment>
  );
};

export default Table;
