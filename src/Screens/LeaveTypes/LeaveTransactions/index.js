import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {View, SafeAreaView, TextInput, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import {dropDownData} from '../../../dummyData';
import DropDown from '../../../component/DropDown';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

const LeaveTransactions = ({navigation}) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [leaveDesValue, setLeaveDesValue] = useState('');
  const [openLeaveDes, setOpenLeaveDes] = useState(false);
  const [leaveDesArr, setLeaveDesArr] = useState(dropDownData);
  const [pageCurrent, setpageCurrent] = useState(1);
  const token = useSelector(state => state.session?.token);
  const isLeaveTransactionsLoading = useSelector(
    state => state.loading.effects.leaveTransactions,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const leaveTransactionsData = useSelector(state => state.leaveTransactions);

  const onAddLeaveTransactionsPress = () => {
    navigation.navigate('AddLeaveTransactions');
  };

  useEffect(() => {
    getLeaveTransactionsData();
  }, []);

  const getLeaveTransactionsData = () => {
    dispatch.leaveTransactions.get({token});
    dispatch.employees.get({token});
  };

  const onDeleteBtnPress = id => {
    dispatch.leaveTransactions.delete({
      token,
      id: id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddLeaveTransactions', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddLeaveTransactions', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  useEffect(() => {
    if (leaveTransactionsData.isDelLeaveTransactions) {
      setIsModalVisible(false);
      dispatch.leaveTransactions.saveDelLeaveTransactions(false);
    }
  }, [leaveTransactionsData.isDelLeaveTransactions]);

  const searchData = e => {
    dispatch.leaveTransactions.get({token, e});
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Leave Transactions'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getLeaveTransactionsData}
            refreshing={isLeaveTransactionsLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ScreenDescription
          description1={'Manage all leaves transacted by employees within'}
          description2={'the company here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

        <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            onChangeText={e => debounce_fun(e)}
            style={styles.searchInput}
            placeholder={'Search Leave Description...'}
            placeholderTextColor={Colors.lightRed}
          />
        </View>

        <View style={styles.dropDownView}>
          {/* <View style={{ width: '48%', justifyContent: 'center' }}> */}
          <Button
            label={'Add Leave Transactions'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={onAddLeaveTransactionsPress}
          />
          {/* </View> */}
        </View>

        <Table
          data={leaveTransactionsData?.leaveTransactionsData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onDeleteBtnPress={onDeleteBtnPress}
          eyeIconPress={eyeBtnPress}
          editBtnPress={editBtnPress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LeaveTransactions;
