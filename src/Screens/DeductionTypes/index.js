import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
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

function DeductionTypes({ navigation }) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [count, setCount] = useState(1);
  const [delArr, setDelArr] = useState([]);
  const [pageCurrent, setpageCurrent] = useState(1);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const isDelDeductionLoding = useSelector(
    state => state.loading.effects.deduction?.delete,
  );
  const isLoading = useSelector(state => state.loading.effects.deduction.get);
  const token = useSelector(state => state.session?.token);
  const deductionData = useSelector(state => state.deduction?.deductionData);
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setMassDel,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);

  useEffect(() => {
    getDeductionTypesData();
  }, []);

  const getDeductionTypesData = () => {
    setDelArr([]);
    dispatch.deduction.get({ token });
  };

  const addDeductionBtnPress = () => {
    navigation.navigate('AddDeductionTypes');
  };

  const onDelBtnPree = item => {
    dispatch.deduction.delete({ token, id: item.id });
  };

  useEffect(() => {
    if (massDelData) {
      getDeductionTypesData();
      dispatch.massDelete.saveDelete(false);
    }
  }, [massDelData]);

  const editIconPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddDeductionTypes', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeIconPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddDeductionTypes', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  const searchData = e => {
    dispatch.deduction.get({ token, e });
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
        table: 'deduct_types',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({ token, data });
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Deduction Types'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={getDeductionTypesData}
            refreshing={isLoading}
          />
        }>
        <ScreenDescription
          description1={'Manage deduction types within the'}
          description2={'company here. Click on the respective'}
          description3={'button to edit or view the details'}
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

        <View style={[styles.searchBtnView, { marginBottom: scale(0) }]}>
          <Button
            disabled={delArr.length === 0}
            label={'Mass Delete'}
            btnStyle={[styles.cancelBtn, styles.massDelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={handleMassDelete}
            isSpinner={isMassLoading}
          />

          <Button
            label={'Add Deduction Type'}
            btnStyle={[styles.cancelBtn, { paddingHorizontal: scale(15) }]}
            labelStyle={styles.massDelTxt}
            onPress={addDeductionBtnPress}
          />
        </View>

        <Table
          data={deductionData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          onDelBtnPree={onDelBtnPree}
          editIconPress={editIconPress}
          eyeIconPress={eyeIconPress}
          isDelDeductionLoding={isDelDeductionLoding}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          handleOnCheckBox={handleOnCheckBox}
          delArr={delArr}
          count={count}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default DeductionTypes;
