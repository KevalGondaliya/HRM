import { Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../theme';
import Button from '../../component/Button';
import Header from '../../component/Header';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';
import _ from 'lodash';

function AllowanceTypes({ navigation }) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const token = useSelector(state => state.session?.token);
  const allowanceTypesData = useSelector(state => state.allowanceTypes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delArr, setDelArr] = useState([]);
  const [count, setCount] = useState(1);

  const isAllowanceTypesLoading = useSelector(
    state => state.loading.effects.allowanceTypes,
  );
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setMassDel,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);

  const addAllowanceBtn = () => {
    navigation.navigate('AddAllowanceTypes', { isEdit: false, isView: false });
  };

  useEffect(() => {
    dispatch.company.get({ token });
    dispatch.position.get({ token });
    // dispatch.organisations.getOrganisations({token});
  }, []);

  useEffect(() => {
    getAllowanceData();
  }, []);

  useEffect(() => {
    if (allowanceTypesData.isDelAllowanceTypes) {
      setIsModalVisible(false);
      dispatch.allowanceTypes.setDelAllowanceTypes(false);
    }
  }, [allowanceTypesData.isDelAllowanceTypes]);

  const getAllowanceData = () => {
    setDelArr([]);
    dispatch.allowanceTypes.get({ token });
  };

  useEffect(() => {
    if (massDelData) {
      getAllowanceData();
      dispatch.massDelete.saveDelete(false);
    }
  }, [massDelData]);

  const searchData = e => {
    dispatch.allowanceTypes.get({ token, e });
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddAllowanceTypes', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddAllowanceTypes', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  const onDeleteBtnPress = id => {
    dispatch.allowanceTypes.delete({
      token,
      id: id,
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
        table: 'allowanceTypes',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({ token, data });
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Allowance Types'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={getAllowanceData}
            refreshing={isAllowanceTypesLoading.get}
          />
        }
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage allowance types within the company'}
          description2={'here. Click on the respective button'}
          description3={'to edit or view the details'}
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

        <View style={[styles.searchBtnView, styles.mBottom]}>
          <Button
            disabled={delArr.length === 0}
            label={'Mass Delete'}
            btnStyle={[styles.cancelBtn, styles.massDelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={handleMassDelete}
            isSpinner={isMassLoading}
          />

          <Button
            label={'Add Allowance Type'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={addAllowanceBtn}
          />
        </View>

        <Table
          data={allowanceTypesData?.allowanceTypesData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          eyeIconPress={eyeBtnPress}
          onDeleteBtnPress={onDeleteBtnPress}
          editBtnPress={editBtnPress}
          handleOnCheckBox={handleOnCheckBox}
          delArr={delArr}
          count={count}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AllowanceTypes;
