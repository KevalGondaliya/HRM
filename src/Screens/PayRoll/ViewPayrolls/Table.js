import {Icon} from 'react-native-elements';
import React, {Fragment, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {Text, TouchableOpacity, View} from 'react-native';

import Colors from '../../../theme';
import TableModal from './TableModal';
import DataTable from '../../../component/DataTable';
import {useWindowDimensions} from '../../../dummyData';

import styles from './style';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      <View style={styles.headerMainView}>
        <Text style={styles.headerTxt}>PAYROLL #1</Text>
        <View style={styles.headerStyle}>
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Employee Name</Text>
          </View>

          <Text style={styles.userNameTxt}>Take Home Pay</Text>

          {deviceWidth > 400 && (
            <Text style={styles.userNameTxt}>Gross Salary</Text>
          )}
          {deviceWidth > 500 && <Text style={styles.userNameTxt}>CPF</Text>}
          {deviceWidth > 600 && (
            <>
              <Text style={[styles.userNameTxt, {width: scale(80)}]}>
                Bonus
              </Text>
              <View style={styles.emptyView1} />
            </>
          )}
          {(deviceWidth < 400 || deviceWidth < 500) && (
            <View style={styles.emptyView1} />
          )}
        </View>
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
        <View style={styles.headerDate}>
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.employeeName}
          </Text>
        </View>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.takeHomePay}
        </Text>

        {deviceWidth > 400 && (
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.grossSalary}
          </Text>
        )}
        {deviceWidth > 500 && (
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.cpf}
          </Text>
        )}
        {deviceWidth > 600 && (
          <>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, styles.sBlack, {width: scale(80)}]}>
              {item.bonus}
            </Text>
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
      />
    </Fragment>
  );
};

export default Table;
