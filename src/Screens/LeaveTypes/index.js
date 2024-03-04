import _ from 'lodash';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, TextInput, RefreshControl, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../theme';
import Button from '../../component/Button';
import Header from '../../component/Header';
import AddDeletModal from '../../models/deletModal';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';

function LeaveTypes({navigation}) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const token = useSelector(state => state.session?.token);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [count, setCount] = useState(1);
  const [delArr, setDelArr] = useState([]);

  const isLeaveTypeLoading = useSelector(
    state => state.loading.effects.leaveType,
  );
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setMassDel,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);
  const leaveTypeData = useSelector(state => state.leaveType);

  useEffect(() => {
    getLeaveTypeData();
  }, []);

  useEffect(() => {
    if (leaveTypeData.isDelleaveType) {
      setIsModalVisible(false);
      dispatch.leaveType.setDelLeaveType(false);
    }
  }, [leaveTypeData.isDelleaveType]);

  const getLeaveTypeData = () => {
    setDelArr([]);
    dispatch.leaveType.get({token});
  };

  useEffect(() => {
    if (massDelData) {
      getLeaveTypeData();
      dispatch.massDelete.saveDelete(false);
    }
  }, [massDelData]);

  const onAddLeavePress = () => {
    navigation.navigate('AddLeaveTypes');
  };

  const onDeleteBtnPress = id => {
    dispatch.leaveType.delete({
      token,
      id: id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddLeaveTypes', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddLeaveTypes', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  const searchData = e => {
    dispatch.leaveType.get({token, e});
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  const handleOnCheckBox = id => {
    if (delArr.includes(id)) {
      const index = delArr.indexOf(id);
      if (index > -1) {
        delArr.splice(index, 1);
      }
    } else {
      delArr.push(id);
    }
    setDelArr(delArr);
    setCount(count + 1);
  };

  const handleMassDelete = () => {
    if (delArr.length > 0) {
      let data = {
        table: 'LeaveTypes',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({token, data});
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Leave Types'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={getLeaveTypeData}
            refreshing={isLeaveTypeLoading.get}
          />
        }
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage leave types within the company here.'}
          description2={'Click on the respective button to'}
          description3={' edit or view the details.'}
        />

        <View style={styles.searchBtnView}>
          <View style={styles.searchIconView}>
            <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
            <TextInput
              style={styles.searchInput}
              placeholder={'Search Query…'}
              placeholderTextColor={Colors.lightRed}
              onChangeText={e => debounce_fun(e)}
            />
          </View>
        </View>

        <View style={[styles.searchBtnView, {marginBottom: scale(0)}]}>
          <Button
            disabled={delArr.length === 0}
            label={'Mass Delete'}
            btnStyle={[styles.cancelBtn, styles.massDelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={() => {
              handleMassDelete();
            }}
            isSpinner={isMassLoading}
          />

          <Button
            label={'Add Leave Type'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={onAddLeavePress}
          />
        </View>

        <Table
          data={leaveTypeData?.leaveTypeData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setpageCurrent={setpageCurrent}
          onDeleteBtnPress={onDeleteBtnPress}
          eyeIconPress={eyeBtnPress}
          editBtnPress={editBtnPress}
          handleOnCheckBox={handleOnCheckBox}
          delArr={delArr}
          count={count}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default LeaveTypes;
