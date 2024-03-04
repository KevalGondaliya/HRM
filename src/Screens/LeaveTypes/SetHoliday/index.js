import React, {useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';

import Button from '../../../component/Button';
import Header from '../../../component/Header';
import ScreenDescription from '../../../component/ScreenDescription';
import TextInput from '../../../component/TextInput';
import Colors from '../../../theme';
import Table from './Table';

import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';

function SetHoliday({navigation}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [endDate, setEndDate] = useState('');
  const [holiday, setHoliday] = useState('');
  const [addData, setAddData] = useState('');
  const [publicLeaveDataArr, setPublicLeaveData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const calendarGroup = useSelector(state => state.calendarGroup);
  const publicLeaveData = useSelector(
    state => state.leaveType?.publicLeaveData,
  );
  const isCalendarGroupLoading = useSelector(
    state => state.loading.effects.calendarGroup,
  );
  const token = useSelector(state => state.session?.token);

  useEffect(() => {
    getHolidayData();
  }, []);

  const getHolidayData = () => {
    dispatch.calendarGroup.get({token});
    dispatch.company.get({token});
    dispatch.leaveType.getLeaveType();
  };

  useEffect(() => {
    if (publicLeaveData) {
      let arr = publicLeaveData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].Name, value: arr[i].Name});
      }

      setPublicLeaveData(dropDownArr);
    }
  }, [publicLeaveData]);

  const addCalendarBtnPress = () => {
    navigation.navigate('AddCalendarGroup');
  };

  const handleConfirm = date => {
    setEndDate(date);
    hideDatePicker();
  };

  const onDatePress = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onAddBtnPress = () => {
    if (endDate != '' && holiday != '') {
      setIsError(false);
      let data = {
        date: endDate,
        holidayDesc: holiday,
        calenderGroupId: addData?.id,
      };
      dispatch.calendarGroup.addDate({token, data});
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (calendarGroup.calendarDateData || calendarGroup.isDelCalendarGroup) {
      dispatch.calendarGroup.setCalenderDateData(null);
      dispatch.calendarGroup.saveDelCalendarGroup(false);
      addModalClose();
    }
  }, [calendarGroup.calendarDateData || calendarGroup.isDelCalendarGroup]);

  const addModalClose = () => {
    setIsAddModalVisible(false);
    setIsModalVisible(false);
    setHoliday('');
    setEndDate('');
    setAddData('');
  };

  const onDeleteBtnPress = id => {
    dispatch.calendarGroup.delete({
      token,
      id: id,
    });
    setVisible(true);
  };

  const searchData = e => {
    dispatch.calendarGroup.get({token, e});
  };
  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  const onDeleteCountryBtnPress = id => {
    dispatch.calendarGroup.deleteCountry({
      token,
      id: id,
    });
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Set Holiday/Block Leaves'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getHolidayData}
            refreshing={isCalendarGroupLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage all holiday/block leaves calendars'}
          description2={'for different countries.'}
          style={styles.padding0}
        />

        <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            style={styles.searchInput}
            placeholder={'Search Query…'}
            placeholderTextColor={Colors.lightRed}
            onChangeText={e => debounce_fun(e)}
            // value={search}
          />
        </View>

        <Button
          btnStyle={styles.btnStyle}
          labelStyle={styles.labelStyle}
          label={'Add Calendar Group'}
          onPress={addCalendarBtnPress}
        />

        <Table
          data={calendarGroup?.calendarGroupData}
          holiday={holiday}
          setHoliday={setHoliday}
          endDate={endDate}
          onDatePress={onDatePress}
          setEndDate={setEndDate}
          onAddBtnPress={onAddBtnPress}
          isError={isError}
          isAddModalVisible={isAddModalVisible}
          setIsAddModalVisible={setIsAddModalVisible}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setAddData={setAddData}
          addModalClose={addModalClose}
          saveLoading={isCalendarGroupLoading?.addDate}
          onDeleteBtnPress={onDeleteBtnPress}
          onDeleteCountryBtnPress={onDeleteCountryBtnPress}
          publicLeaveDataArr={publicLeaveDataArr}
        />
      </KeyboardAwareScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}

export default SetHoliday;
