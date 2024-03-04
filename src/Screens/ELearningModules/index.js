import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../theme';
import Button from '../../component/Button';
import Header from '../../component/Header';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';
import _ from 'lodash';

function ELearningModules({ navigation }) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [pageCurrent, setpageCurrent] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delArr, setDelArr] = useState([]);
  const [count, setCount] = useState(1);

  const isLoading = useSelector(state => state.loading.effects.elearning.get);
  const token = useSelector(state => state.session?.token);
  const elearnData = useSelector(state => state.elearning?.elearnData);
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setMassDel,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);

  useEffect(() => {
    getElearningData();
  }, []);

  const getElearningData = () => {
    dispatch.elearning.get({ token });
  };

  useEffect(() => {
    if (massDelData) {
      getElearningData();
      dispatch.massDelete.saveDelete(false);
    }
  }, [massDelData]);

  const editIconPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddELearningModules', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeIconPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddELearningModules', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  const onDelBtnPree = item => {
    console.log(item);
    dispatch.elearning.delete({ token, id: item.id });
  };

  const addModules = () => {
    navigation.navigate('AddELearningModules');
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  const searchData = e => {
    dispatch.elearning.get({ token, e });
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
        table: 'elearns',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({ token, data });
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'E-Learning Modules'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={getElearningData} refreshing={isLoading} />
        }
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage E-learning modules within'}
          description2={'the company here. Click on the respective'}
          description3={'button to edit or view the details'}
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
            label={'Add Modules'}
            btnStyle={[styles.cancelBtn, { paddingHorizontal: scale(15) }]}
            labelStyle={styles.massDelTxt}
            onPress={addModules}
          />
        </View>

        <Table
          data={elearnData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          editIconPress={editIconPress}
          eyeIconPress={eyeIconPress}
          onDelBtnPree={onDelBtnPree}
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

export default ELearningModules;
