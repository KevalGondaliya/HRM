import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../../component/Button';
import Header from '../../component/Header';
import ScreenDescription from '../../component/ScreenDescription';
import TextInput from '../../component/TextInput';
import Colors from '../../theme';
import Table from './Table';

import styles from './style';

function ViewApprovalGroup({navigation}) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [count, setCount] = useState(0);
  const [delId, setDelId] = useState('');
  const [delArr, setDelArr] = useState([]);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const approvalGroupsData = useSelector(state => state.approvalGroups);
  const isLoading = useSelector(state => state.loading.effects.approvalGroups);
  const token = useSelector(state => state.session?.token);
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setMassDel,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);

  useEffect(() => {
    getApprovalGroupData();
  }, []);

  useEffect(() => {
    setIsModalVisible(false);
    setDelId('');
    dispatch.approvalGroups.saveDelApprovalGroups(false);
  }, [approvalGroupsData?.isDelApprovalGroups]);

  const getApprovalGroupData = () => {
    setDelArr([]);
    dispatch.approvalGroups.get({token});
    dispatch.employees.getRmsUser({token});
    dispatch.employees.get({token});
  };

  const searchData = e => {
    dispatch.approvalGroups.get({token, e});
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  const addApprovalBtn = () => {
    navigation.navigate('AddApprovalGroups', {isEdit: false, isView: false});
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddApprovalGroups', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddApprovalGroups', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  const onDeleteBtnPress = id => {
    setDelId(id);
    dispatch.approvalGroups.delete({
      token,
      id: id,
    });
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    if (massDelData) {
      getApprovalGroupData();
      dispatch.massDelete.saveDelete(false);
    }
  }, [massDelData]);

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
        table: 'approvalGroups',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({token, data});
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Approval Group'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getApprovalGroupData}
            refreshing={isLoading?.get}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage approval groups within the company here.'}
          description2={' Click on the respective button to'}
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

        <View style={[styles.searchBtnView, {marginTop: scale(15)}]}>
          <Button
            disabled={delArr.length === 0}
            label={'Mass Delete'}
            btnStyle={[styles.cancelBtn, styles.massDelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={handleMassDelete}
            isSpinner={isMassLoading}
          />

          <Button
            label={'Add Approval Group'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={addApprovalBtn}
          />
        </View>

        <Table
          data={approvalGroupsData?.approvalGroupsData || []}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          delId={delId}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          editIconPress={editBtnPress}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          eyeIconPress={eyeBtnPress}
          onDeleteBtnPress={onDeleteBtnPress}
          handleOnCheckBox={handleOnCheckBox}
          delArr={delArr}
          count={count}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ViewApprovalGroup;
