import _ from 'lodash';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, TextInput, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../theme';
import Button from '../../component/Button';
import Header from '../../component/Header';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';

function ViewPaySlip({navigation}) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [count, setCount] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delArr, setDelArr] = useState([]);

  const token = useSelector(state => state.session?.token);
  const claimTypes = useSelector(state => state.claimTypes);
  const isClaimTypesLoading = useSelector(
    state => state.loading.effects.claimTypes,
  );
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setMassDel,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);

  useEffect(() => {
    getClaimData();
  }, []);

  const getClaimData = () => {
    setDelArr([]);
    dispatch.claimTypes.get({token});
    dispatch.claimTypesCategory.get({token});
  };

  useEffect(() => {
    if (massDelData) {
      getClaimData();
      dispatch.massDelete.saveDelete(false);
    }
  }, [massDelData]);

  const onAddClaimBtnPress = () => {
    navigation.navigate('AddClaimTypes', {isEdit: false, isView: false});
  };

  useEffect(() => {
    if (claimTypes.isDelClaimTypes || claimTypes.isEditClaimTypes) {
      setIsModalVisible(false);
      dispatch.claimTypes.setEditClaimTypes(false);
      dispatch.claimTypes.setDelClaimTypes(false);
    }
  }, [claimTypes.isDelClaimTypes || claimTypes.isEditClaimTypes]);

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddClaimTypes', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddClaimTypes', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  const onDeleteBtnPress = id => {
    dispatch.claimTypes.delete({
      token,
      id: id,
    });
  };

  const searchData = e => {
    dispatch.claimTypes.get({token, e});
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
        table: 'claim_types',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({token, data});
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Claim Types'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getClaimData}
            refreshing={isClaimTypesLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage claim types within the company here.'}
          description2={' Click on the respectivebutton to'}
          description3={' edit or view the details'}
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

        <View style={[styles.searchBtnView, {marginBottom: scale(5)}]}>
          <Button
            disabled={delArr.length === 0}
            label={'Mass Delete'}
            btnStyle={[styles.cancelBtn, styles.massDelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={handleMassDelete}
            isSpinner={isMassLoading}
          />

          <Button
            label={'Add Claim Type'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={onAddClaimBtnPress}
          />
        </View>

        <Table
          data={claimTypes.claimTypesData || []}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          editBtnPress={editBtnPress}
          eyeBtnPress={eyeBtnPress}
          onDeleteBtnPress={onDeleteBtnPress}
          handleOnCheckBox={handleOnCheckBox}
          delArr={delArr}
          count={count}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ViewPaySlip;
