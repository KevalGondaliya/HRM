import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity} from 'react-native';

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

        <Text style={styles.userNameTxt}>Deduction ID</Text>

        <Text style={styles.userNameTxt}>Description</Text>

        {is400 && <Text style={styles.userNameTxt}>Employee Name</Text>}
        {is500 && <Text style={styles.userNameTxt}>Installments</Text>}
        {is600 && (
          <>
            <Text style={styles.userNameTxt}>Installments Period</Text>

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
        <View style={styles.emptyView} />
        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.id}
        </Text>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.deduct_type?.description}
        </Text>

        {is400 && (
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.user?.user_name}
          </Text>
        )}
        {is500 && (
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.instalment ? 'Yes' : 'No'}
          </Text>
        )}
        {is600 && (
          <>
            <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
              {item.instalmentPeriod || '-'}
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
        onDeleteBtnPress={() => {
          onDeleteBtnPress(modalData.id);
        }}
        eyeIconPress={() => eyeIconPress(modalData)}
        editBtnPress={() => editBtnPress(modalData)}
      />
    </View>
  );
};

export default Table;
