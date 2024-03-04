import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {View, TextInput, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Button from '../../../component/Button';
import Header from '../../../component/Header';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

function AppraisalCycles({navigation}) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [delArr, setDelArr] = useState([]);
  const [count, setCount] = useState(1);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = useSelector(state => state.session?.token);
  const isAppraisalCyclesLoading = useSelector(
    state => state.loading.effects.addAppraisalCycles,
  );
  const appraisalCyclesData = useSelector(state => state.addAppraisalCycles);
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setMassDel,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);

  const onAddAppraisalCycles = () => {
    navigation.navigate('AddAppraisalCycles');
  };

  useEffect(() => {
    getAppraisalCyclesData();
  }, []);

  useEffect(() => {
    if (massDelData) {
      getAppraisalCyclesData();
      dispatch.massDelete.saveDelete(false);
    }
  }, [massDelData]);

  useEffect(() => {
    if (appraisalCyclesData.isDelAddAppraisalCycles) {
      setIsModalVisible(false);
      dispatch.addAppraisalCycles.saveDelAddAppraisalCycles(false);
    }
  }, [appraisalCyclesData.isDelAddAppraisalCycles]);

  const getAppraisalCyclesData = () => {
    setDelArr([]);
    dispatch.addAppraisalCycles.get({token});
    dispatch.employees.get({token});
  };

  const searchData = e => {
    dispatch.addAppraisalCycles.get({token, e});
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  const onDeleteBtnPress = id => {
    dispatch.addAppraisalCycles.delete({
      token,
      id: id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddAppraisalCycles', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddAppraisalCycles', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

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
        table: 'appraisalCycles',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({token, data});
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Appraisal Cycles'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getAppraisalCyclesData}
            refreshing={isAppraisalCyclesLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage Appraisal Cycles within the Company Here.'}
          description2={'Click on the respective button to '}
          description3={'to edit or view the details'}
        />

        <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            style={styles.searchInput}
            placeholder={'Search Query…'}
            placeholderTextColor={Colors.lightRed}
            onChangeText={e => debounce_fun(e)}
          />
        </View>

        <View style={[styles.searchBtnView]}>
          <Button
            disabled={delArr.length === 0}
            label={'Mass Delete'}
            btnStyle={[styles.cancelBtn, styles.massDelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={handleMassDelete}
            isSpinner={isMassLoading}
          />
          <Button
            label={'Add Appraisal Cycle'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={onAddAppraisalCycles}
          />
        </View>

        <Table
          data={appraisalCyclesData.addAppraisalCyclesData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          onDeleteBtnPress={onDeleteBtnPress}
          eyeIconPress={eyeBtnPress}
          editBtnPress={editBtnPress}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleOnCheckBox={handleOnCheckBox}
          delArr={delArr}
          count={count}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AppraisalCycles;
