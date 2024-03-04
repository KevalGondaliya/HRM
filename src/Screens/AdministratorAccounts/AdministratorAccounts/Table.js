import { Icon } from 'react-native-elements';
import React, { Fragment, useEffect, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { Text, TouchableOpacity, View } from 'react-native';

import {
  isWidth400,
  isWidth500,
  isWidth600,
  isWidthUnder400,
} from '../../../utils';
import Colors from '../../../theme';
import TableModal from './TableModal';
import eye from '../../../assets/svg/eye.svg';
import DataTable from '../../../component/DataTable';

import styles from './style';
import { SvgXml } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';

const Table = ({
  prve,
  next,
  data,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
  navigation
}) => {
  const dispatch = useDispatch();
  const is400 = isWidth400();
  const is500 = isWidth500();
  const is600 = isWidth600();
  const isUnder400 = isWidthUnder400();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setDate] = useState('');
  const token = useSelector(state => state.session?.token);
  const employeesData = useSelector(state => state.employees);
  const isEmployeesLoading = useSelector(
    state => state.loading.effects.employees,
  );

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddAdministrator', {
      data: modalData,
      isEdit: true,
      isView: false,
    });
  };

  useEffect(() => {
    if (employeesData?.isDeleteEmployee) {
      setIsModalVisible(false);
      dispatch.employees.setDeleteEmployee(false);
      dispatch.employees.get({ token });

    }
  }, [employeesData.isDeleteEmployee])

  const onDeleteBtnPress = id => {
    dispatch.employees.deleteUserProfile({ token, id: modalData?.id })
  };

  const ListHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.emptyView} />

        <Text style={styles.userNameTxt}>Account ID</Text>

        <Text style={styles.userNameTxt}>Username</Text>

        {is400 && <Text style={styles.userNameTxt} />}
        {is500 && <Text style={styles.userNameTxt} />}
        {is600 && <Text style={[styles.userNameTxt, { width: scale(120) }]} />}
        {isUnder400 && <View style={styles.emptyView1} />}
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
        <View style={styles.emptyView}>
          {/* <View style={styles.checkBoxView} /> */}
        </View>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.id || "-"}
        </Text>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.user_name || "-"}
        </Text>

        {is400 && (
          <View style={[styles.userNameTxt, styles.sBlack]}>
            <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
              {item.email || "-"}
            </Text>
          </View>
        )}
        {is500 && (
          <View
            style={[styles.userNameTxt, styles.sBlack, { width: scale(120) }]}
          />
        )}
        {is600 && <View style={styles.iconMainView} />}
        {isUnder400 && (
          <TouchableOpacity
            onPress={() => onMoreBtnPress(item)}
            style={styles.emptyView1}>
            <Icon
              name={'eye'}
              type={'entypo'}
              size={scale(20)}
              color={Colors.blackPearl}
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

      <TableModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        modalData={modalData}
        editBtnPress={editBtnPress}
        onDeleteBtnPress={onDeleteBtnPress}
        isLoading={isEmployeesLoading?.deleteUserProfile}
      />
    </Fragment>
  );
};

export default Table;
