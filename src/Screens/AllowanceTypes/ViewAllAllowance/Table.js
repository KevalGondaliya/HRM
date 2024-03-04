import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {Text, View, TouchableOpacity} from 'react-native';

import TbModal from './TbModal';
import Colors from '../../../theme';
import {scale} from 'react-native-size-matters';
import DataTable from '../../../component/DataTable';
import {useWindowDimensions} from '../../../dummyData';

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
}) => {
  const deviceWidth = useWindowDimensions();

  const [modalData, setDate] = useState('');

  const onMorePress = item => {
    setIsModalVisible(true);
    setDate(item);
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

        <Text style={styles.userNameTxt}>Allowance ID</Text>

        {/* <Text style={styles.userNameTxt}>Allowance Date</Text> */}
        <Text style={styles.userNameTxt}>Allowance Description</Text>

        {deviceWidth > 400 && (
          <Text style={styles.userNameTxt}>Employee ID</Text>
        )}
        {deviceWidth > 500 && <Text style={styles.userNameTxt}>Name</Text>}
        {deviceWidth > 600 && (
          <>
            {/* <Text style={styles.userNameTxt}>Allowance Description</Text> */}
            <Text style={styles.userNameTxt}>Allowance Date</Text>

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
        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.id || '-'}
        </Text>

        {/* <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.allowanceDate
            ? moment(item.allowanceDate).format('DD-MM-YYYY')
            : '-'}
        </Text> */}
        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.allowDesc || '-'}
        </Text>

        {deviceWidth > 400 && (
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.userId || '-'}
          </Text>
        )}
        {deviceWidth > 500 && (
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.user?.user_name || '-'}
          </Text>
        )}
        {deviceWidth > 600 && (
          <>
            {/* <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
              {item.allowDesc || "-"}
            </Text> */}
            <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
              {item.allowanceDate
                ? moment(item.allowanceDate).format('YYYY MMM DD')
                : '-'}
            </Text>
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
          </>
        )}
        {(deviceWidth < 400 || deviceWidth < 500) && (
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

  const closeModal = () => {
    setIsModalVisible(false);
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
        onCloseModal={closeModal}
        modalData={modalData}
        onDeleteBtnPress={onDelete}
        eyeIconPress={() => eyeIconPress(modalData)}
        editBtnPress={onEditBtnPress}
      />
    </View>
  );
};

export default Table;
