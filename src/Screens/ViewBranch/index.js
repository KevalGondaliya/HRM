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
import _ from 'lodash';

function ViewBranch({navigation}) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delArr, setDelArr] = useState([]);
  const [count, setCount] = useState(0);

  const token = useSelector(state => state.session?.token);
  const viewBranch = useSelector(state => state.branch?.getBranch);
  const isLoading = useSelector(state => state.loading.effects.branch.Branch);
  const delBranch = useSelector(state => state.branch?.delBranch);
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setBranch,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);
  useEffect(() => {
    getbranchData();
  }, []);

  const getbranchData = () => {
    setDelArr([]);
    dispatch.branch.Branch({token});
  };

  const addBranch = () => {
    navigation.navigate('AddBranch');
  };

  const onEditIconPress = item => {
    navigation.navigate('AddBranch', {
      data: item,
      isEdit: true,
    });
  };

  const onEyeIconPress = item => {
    navigation.navigate('AddBranch', {
      data: item,
      isView: true,
    });
  };

  const onDelBtnPree = item => {
    dispatch.branch.deleteBranch({token, id: item.id});
  };

  const searchData = e => {
    dispatch.branch.Branch({token, e});
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  useEffect(() => {
    setIsModalVisible(false);
  }, [delBranch]);

  useEffect(() => {
    if (massDelData) {
      getbranchData();
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
        table: 'branches',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({token, data});
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Branches'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl onRefresh={getbranchData} refreshing={isLoading} />
        }
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage branches within'}
          description2={'the company here. Click on the '}
          description3={'respective button to edit or view the details'}
        />

        <View style={styles.searchBtnView}>
          <View style={styles.searchIconView}>
            <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
            <TextInput
              style={styles.searchInput}
              placeholder={'Search Query…'}
              placeholderTextColor={Colors.lightRed}
              // value={search}
              onChangeText={e => debounce_fun(e)}
            />
          </View>
        </View>

        <View style={[styles.searchBtnView, {marginBottom: scale(5)}]}>
          <Button
            label={'Mass Delete'}
            btnStyle={[styles.cancelBtn, styles.massDelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={handleMassDelete}
            isSpinner={isMassLoading}
          />

          <Button
            label={'Add Branches'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={addBranch}
          />
        </View>

        <Table
          data={viewBranch}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          onEditIconPress={modalData => {
            setIsModalVisible(false);
            onEditIconPress(modalData);
          }}
          onEyeIconPress={modalData => {
            setIsModalVisible(false);
            onEyeIconPress(modalData);
          }}
          onDelBtnPree={modalData => {
            onDelBtnPree(modalData);
          }}
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

export default ViewBranch;
