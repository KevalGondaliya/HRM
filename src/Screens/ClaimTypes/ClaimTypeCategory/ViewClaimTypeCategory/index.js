import {Icon} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, TextInput, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../../theme';
import Button from '../../../../component/Button';
import Header from '../../../../component/Header';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';
import _ from 'lodash';

function ViewClaimTypeCategory({navigation}) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [delId, setDelId] = useState('');
  const token = useSelector(state => state.session?.token);
  const categoryData = useSelector(state => state.claimTypesCategory);
  const isCategoryLoading = useSelector(
    state => state.loading.effects.claimTypesCategory,
  );

  const onAddClaimBtnPress = () => {
    navigation.navigate('ClaimTypeCategory');
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = () => {
    dispatch.claimTypesCategory.get({token});
  };

  const editIconPress = item => {
    navigation.navigate('ClaimTypeCategory', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeIconPress = item => {
    navigation.navigate('ClaimTypeCategory', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  const onDelBtnPree = item => {
    setDelId(item.id);
    dispatch.claimTypesCategory.delete({token, id: item.id});
  };

  const searchData = e => {
    dispatch.claimTypesCategory.get({token, e});
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Claim Type Category'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getCategoryData}
            refreshing={isCategoryLoading?.get}
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

        <View style={[styles.searchBtnView, styles.bottom]}>
          <Button
            label={'Mass Delete'}
            btnStyle={[styles.cancelBtn, styles.massDelBtn]}
            labelStyle={styles.massDelTxt}
          />

          <Button
            label={'Add Category'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={onAddClaimBtnPress}
          />
        </View>

        <Table
          delId={delId}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          pageCurrent={pageCurrent}
          setpageCurrent={setpageCurrent}
          data={categoryData.claimTypesCategoryData}
          editIconPress={editIconPress}
          eyeIconPress={eyeIconPress}
          onDelBtnPree={onDelBtnPree}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ViewClaimTypeCategory;
