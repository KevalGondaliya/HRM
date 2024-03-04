import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity} from 'react-native';

import TbModal from './TbModal';
import Colors from '../../../theme';
import DataTable from '../../../component/DataTable';
import {useWindowDimensions} from '../../../dummyData';

import styles from './style';
import moment from 'moment';
import {padNumber} from '../../../utility/validator';

const Table = ({
  next,
  prve,
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
  const deviceWidth = useWindowDimensions();

  const [modalData, setDate] = useState('');

  const onCloseModalBtn = () => {
    setIsModalVisible(false);
  };

  const onMorePress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const onDelete = item => {
    onDeleteBtnPress(modalData.id);
  };

  const onEditBtnPress = () => {
    editBtnPress(modalData);
  };

  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Claim ID</Text>
        </View>
        {/* <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Claim Date</Text>
        </View> */}
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Desciption</Text>
        </View>
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Claim Date</Text>
          </View>
        )}
        {deviceWidth > 500 && (
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Name</Text>
          </View>
        )}
        {deviceWidth > 600 && (
          <>
            <View style={[styles.headerDate]}>
              <Text style={styles.userNameTxt}>Amount</Text>
            </View>

            <View style={styles.emptyView1} />
          </>
        )}
        {(deviceWidth < 400 || deviceWidth < 500) && (
          <View style={styles.emptyView1} />
        )}
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
        <View style={styles.emptyView}>
          {/* <View style={styles.checkBoxView} /> */}
        </View>
        <View style={styles.headerDate}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.id}
          </Text>
        </View>
        <View style={styles.headerDate}>
          {/* <Text
            numberOfLines={1}
            style={[styles.userNameTxt, { color: Colors.sBlack }]}>
            {moment(item.claimDate).format('DD-MM-YYYY')}
          </Text> */}
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.desciption}
          </Text>
        </View>
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, {color: Colors.sBlack}]}>
              {moment(item.claimDate).format('YYYY MMM DD')}
            </Text>
          </View>
        )}
        {deviceWidth > 500 && (
          <View style={styles.headerDate}>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, {color: Colors.sBlack}]}>
              {item.name}
            </Text>
          </View>
        )}
        {deviceWidth > 600 && (
          <>
            <View style={styles.headerDate}>
              <Text
                numberOfLines={1}
                style={[styles.userNameTxt, styles.sBlack]}>
                {padNumber(item.amount)}
              </Text>
            </View>

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
        {(deviceWidth < 400 || deviceWidth < 500) && (
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
        onLeftBtnPress={onLeftBtnPress}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={data}
        next={next}
      />

      <TbModal
        isModalVisible={isModalVisible}
        modalData={modalData}
        onCloseModal={onCloseModalBtn}
        onDeleteBtnPress={onDelete}
        eyeIconPress={() => eyeIconPress(modalData)}
        editBtnPress={onEditBtnPress}
      />
    </View>
  );
};

export default Table;
