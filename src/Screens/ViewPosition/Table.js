import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import Colors from '../../theme';
import TableModal from './tbModal';
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
  onDelBtnPree,
  eyeIconPress,
  editBtnPress,
  editIconPress,
  setpageCurrent,
}) => {
  const deviceWidth = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setDate] = useState('');

  const isLoading = useSelector(state => state.loading.effects.position.delete);
  const editPosition = useSelector(state => state.position?.isEditPosition);
  const delPosition = useSelector(state => state.position?.isDeletePosition);

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setIsModalVisible(false);
  }, [editPosition, delPosition]);

  const onEditBtnPress = () => {
    setIsModalVisible(false);
    editIconPress(modalData);
  };
  const delBtnPress = () => {
    setIsModalVisible(false);
    onDelBtnPree(modalData);
  };
  const eyeBtnPress = () => {
    setIsModalVisible(false);
    eyeIconPress(modalData);
  };

  const ListHeader = item => {
    return (
      <View style={styles.headerMainView}>
        <Text style={styles.headerTxt}>{item}</Text>
        <View style={[styles.headerStyle]}>
          <View
            style={[
              styles.headerDate,
              {width: deviceWidth > 500 ? styles.width250 : styles.width160},
            ]}>
            <Text style={styles.userNameTxt}>Positions </Text>
          </View>
          {(deviceWidth < 400 || deviceWidth < 500) && (
            <View style={styles.emptyView1} />
          )}
          {deviceWidth > 500 && (
            <>
              <View
                style={[
                  styles.headerBouns,
                  {
                    width:
                      deviceWidth > 500 ? styles.width200 : styles.width130,
                  },
                ]}>
                <Text style={styles.userNameTxt}>No. of Employees</Text>
              </View>
              <View style={styles.iconMainView} />
            </>
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
        <View
          style={[
            styles.headerDate,
            {width: deviceWidth > 500 ? styles.width250 : styles.width160},
          ]}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.position}
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
          <>
            <View
              style={[
                styles.headerBouns,
                {width: deviceWidth > 500 ? styles.width200 : styles.width130},
              ]}>
              <Text
                numberOfLines={1}
                style={[styles.userNameTxt, {color: Colors.sBlack}]}>
                {item.noOfEmp}
              </Text>
            </View>

            <View style={styles.iconMainView}>
              <TouchableOpacity onPress={onEditBtnPress}>
                <Icon
                  name={'edit'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={styles.editIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={eyeBtnPress}>
                <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
              </TouchableOpacity>

              <TouchableOpacity onPress={delBtnPress}>
                {isLoading ? (
                  <ActivityIndicator color={'#fff'} size={'small'} />
                ) : (
                  <Icon
                    name={'delete'}
                    type={'materialicons'}
                    color={Colors.blackPearl}
                    size={styles.editIcon}
                  />
                )}
              </TouchableOpacity>
            </View>
          </>
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
      {data?.length > 0 ? (
        data?.map((item, index) => {
          return (
            item?.positions.length > 0 && (
              <DataTable
                key={index}
                pageCurrent={pageCurrent}
                data={item?.positions.slice(prve, next)}
                onRightBtnPress={onRightBtnPress}
                onLeftBtnPress={onLeftBtnPress}
                renderItem={renderItem}
                ListHeader={() => ListHeader(item.department)}
                dataArr={item?.positions}
                next={next}
              />
            )
          );
        })
      ) : (
        <View style={styles.noFoundTxtView}>
          <Text style={styles.noFoundTxt}>No Data Found</Text>
        </View>
      )}

      <TableModal
        isModalVisible={isModalVisible}
        modalData={modalData}
        onCloseModal={onCloseModal}
        editBtnPress={editBtnPress}
        editIconPress={onEditBtnPress}
        eyeIconPress={eyeBtnPress}
        onDelBtnPree={delBtnPress}
      />
    </View>
  );
};

export default Table;
