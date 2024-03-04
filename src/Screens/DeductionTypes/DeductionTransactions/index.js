import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { View, SafeAreaView, TextInput, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import { dropDownData } from '../../../dummyData';
import DropDown from '../../../component/DropDown';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import Button from '../../../component/Button';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

const LeaveTransactions = ({ navigation }) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [leaveDesValue, setLeaveDesValue] = useState('');
  const [openLeaveDes, setOpenLeaveDes] = useState(false);
  const [leaveDesArr, setLeaveDesArr] = useState(dropDownData);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const applyNewDeductionsData = useSelector(state => state.applyNewDeductions);
  const isNewDeductionLoading = useSelector(
    state => state.loading.effects.applyNewDeductions,
  );
  const token = useSelector(state => state.session?.token);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch.applyNewDeductions.get({ token });
  };
  const onDeductionTransactions = () => {
    navigation.navigate('ApplyNewDeduction');
  };

  const onDeleteBtnPress = id => {
    dispatch.applyNewDeductions.delete({
      token,
      id: id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('ApplyNewDeduction', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('ApplyNewDeduction', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  useEffect(() => {
    if (applyNewDeductionsData.isDelApplyNewDeductions) {
      setIsModalVisible(false);
      dispatch.applyNewDeductions.saveDelApplyNewDeductions(false);
    }
  }, [applyNewDeductionsData.isDelApplyNewDeductions]);

  const searchData = e => {
    dispatch.applyNewDeductions.get({ token, e });
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Deduction Transactions'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getData}
            refreshing={isNewDeductionLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ScreenDescription
          description1={'Manage all deduction transacted by employees '}
          description2={'within the company here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

        <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            onChangeText={e => debounce_fun(e)}
            style={styles.searchInput}
            placeholder={'Search Query…'}
            placeholderTextColor={Colors.lightRed}
          />
        </View>

        <View style={styles.dropDownView}>
          {/* <View style={{width: '48%'}}>
            <DropDown
              placeholder="By Deduction Description…"
              open={openLeaveDes}
              value={leaveDesValue}
              items={leaveDesArr}
              setOpen={setOpenLeaveDes}
              setValue={setLeaveDesValue}
              setItems={setLeaveDesArr}
              dropDownStyle={styles.dropDownStyle}
            />
          </View> */}
          <View style={{ width: '50%', justifyContent: 'flex-end' }}>
            <Button
              label={'Apply New Deduction'}
              btnStyle={styles.cancelBtn}
              labelStyle={styles.massDelTxt}
              onPress={onDeductionTransactions}
            />
          </View>
        </View>

        <Table
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          pageCurrent={pageCurrent}
          setpageCurrent={setpageCurrent}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          data={applyNewDeductionsData?.applyNewDeductionsData}
          onDeleteBtnPress={onDeleteBtnPress}
          eyeIconPress={eyeBtnPress}
          editBtnPress={editBtnPress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LeaveTransactions;
