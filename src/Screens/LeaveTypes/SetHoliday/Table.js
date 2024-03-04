import React, {Fragment, useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';

import DataTable from '../../../component/DataTable';
import {useWindowDimensions} from '../../../dummyData';
import Colors from '../../../theme';
import AddMoreDates from './AddMoreDates';
import TableModal from './TableModal';

import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';

const Table = ({
  data,
  setHoliday,
  holiday,
  isError,
  endDate,
  onDatePress,
  addModalClose,
  onAddBtnPress,
  isModalVisible,
  setIsModalVisible,
  isAddModalVisible,
  setIsAddModalVisible,
  setAddData,
  saveLoading,
  onDeleteBtnPress,
  publicLeaveDataArr,
  onDeleteCountryBtnPress,
}) => {
  const dispatch = useDispatch();
  const deviceWidth = useWindowDimensions();
  const isLoading = useSelector(
    state => state.loading.effects.calendarGroup.delete,
  );
  const calendarGroup = useSelector(state => state.calendarGroup);
  const [modalData, setData] = useState('');
  const [delId, setDelId] = useState('');
  const [tbData, setTbData] = useState('');

  useEffect(() => {
    if (calendarGroup.isDelCalendarGroup) {
      dispatch.calendarGroup.saveDelCalendarGroup(false);
      setTbData('');
      setData('');
    }
  }, [calendarGroup.isDelCalendarGroup]);

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setData(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const addMoreBtnPress = item => {
    setAddData(item);
    setIsAddModalVisible(true);
  };

  const delBtnPress = () => {
    onDeleteBtnPress(tbData ? tbData : modalData.id);
  };

  const onDelete = item => {
    delBtnPress();
    setTbData(item);
    setDelId(item);
  };

  const ListHeader = item => {
    return (
      <View style={styles.headerMainView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.headerTxt}>{item.country}</Text>
          <TouchableOpacity
            onPress={() => onDeleteCountryBtnPress(item.id)}
            style={{
              top: scale(8),
              marginRight: scale(20),
              marginTop: scale(8),
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: scale(12),
            }}>
            {/* <Icon name={'close'} type={'antdesign'} color={Colors.white} /> */}

            <Text style={{color: 'white', padding: scale(5)}}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerStyle}>
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Holiday Description</Text>
          </View>
          {(deviceWidth < 400 || deviceWidth < 500) && (
            <View style={styles.emptyView1} />
          )}
          {deviceWidth > 400 && (
            <Fragment>
              <View style={styles.headerBouns}>
                <Text style={styles.userNameTxt}>Date</Text>
              </View>
              <View style={styles.headerBouns} />
              <View style={{width: scale(100)}} />
              <View style={[styles.headerBouns, styles.width30]} />
            </Fragment>
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
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.holidayDesc}
          </Text>
        </View>
        {(deviceWidth < 400 || deviceWidth < 500) && (
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
        {deviceWidth > 400 && (
          <Fragment>
            <View style={styles.headerBouns}>
              <Text
                numberOfLines={1}
                style={[styles.userNameTxt, {color: Colors.sBlack}]}>
                {moment(item.date).format('YYYY MMM DD')}
              </Text>
            </View>
            <View style={styles.headerBouns} />
            <View style={{width: scale(100)}} />
            <TouchableOpacity
              onPress={() => {
                onDelete(item.id);
              }}
              style={[styles.headerBouns, styles.width30]}>
              {isLoading && item.id == delId ? (
                <ActivityIndicator color={Colors.blackPearl} size={'small'} />
              ) : (
                <Icon
                  name={'close'}
                  type={'AntDesign'}
                  size={scale(20)}
                  color={Colors.blackPearl}
                />
              )}
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    );
  };

  return (
    <View style={styles.tbContainerView}>
      {data?.length > 0 ? (
        data?.map((item, index) => {
          return (
            <View style={{marginBottom: scale(25), width: '100%'}}>
              <DataTable
                key={index}
                data={item?.calenderDates}
                renderItem={renderItem}
                ListHeader={() => ListHeader(item)}
                isPaginate={true}
              />
              <TouchableOpacity
                onPress={() => addMoreBtnPress(item)}
                style={styles.addMoreView}>
                <Icon
                  name={'plus'}
                  type={'feather'}
                  size={scale(25)}
                  color={Colors.white}
                />

                <Text style={styles.addMoreTxt}>Add More </Text>
              </TouchableOpacity>
            </View>
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
        onDeleteBtnPress={onDelete}
      />

      <AddMoreDates
        isAddModalVisible={isAddModalVisible}
        setIsAddModalVisible={setIsAddModalVisible}
        setHoliday={setHoliday}
        holiday={holiday}
        endDate={endDate}
        isError={isError}
        onDatePress={onDatePress}
        addModalClose={addModalClose}
        onAddBtnPress={onAddBtnPress}
        saveLoading={saveLoading}
        publicLeaveDataArr={publicLeaveDataArr}
      />
    </View>
  );
};

export default Table;
