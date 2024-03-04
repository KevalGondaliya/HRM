import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity} from 'react-native';

import Colors from '../../theme';
import TableModal from './tbModal';
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
  onDeleteBtnPress,
  isModalVisible,
  setIsModalVisible,
  eyeIconPress,
  editBtnPress,
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

  const eyeBtnPress = () => {
    eyeIconPress(modalData);
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
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Employee ID</Text>
        </View>
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Name</Text>
        </View>
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Organisation</Text>
          </View>
        )}
        {deviceWidth > 500 && (
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Department</Text>
          </View>
        )}
        {deviceWidth > 600 && (
          <>
            <View style={[styles.headerDate]}>
              <Text style={styles.userNameTxt}>Postition</Text>
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
          <View style={styles.checkBoxView} />
        </View>
        <View style={styles.headerDate}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.empId}
          </Text>
        </View>
        <View style={styles.headerDate}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.user_name}
          </Text>
        </View>
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, {color: Colors.sBlack}]}>
              {item?.org_name}
            </Text>
          </View>
        )}
        {deviceWidth > 500 && (
          <View style={styles.headerDate}>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, {color: Colors.sBlack}]}>
              {item?.department}
            </Text>
          </View>
        )}
        {deviceWidth > 600 && (
          <>
            <View style={styles.headerDate}>
              <Text
                numberOfLines={1}
                style={[styles.userNameTxt, {color: Colors.sBlack}]}>
                {item.position}
              </Text>
            </View>
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

      <TableModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        modalData={modalData}
        onDeleteBtnPress={onDelete}
        eyeIconPress={eyeBtnPress}
        editBtnPress={onEditBtnPress}
      />
    </View>
  );
};

export default Table;
