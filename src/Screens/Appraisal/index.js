import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {View, TextInput, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../theme';
import Button from '../../component/Button';
import Header from '../../component/Header';
import {appraisalTemplatesArr} from '../../dummyData';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

function Appraisal({navigation}) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [delArr, setDelArr] = useState([]);
  const [count, setCount] = useState(1);
  const token = useSelector(state => state.session?.token);
  const isAppraisalTemplatesLoading = useSelector(
    state => state.loading.effects.appraisalTemplates,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setMassDel,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);
  const appraisalTemplatesData = useSelector(state => state.appraisalTemplates);

  useEffect(() => {
    getAllowanceTransactionsData();
  }, []);

  const getAllowanceTransactionsData = () => {
    setDelArr([]);
    dispatch.appraisalTemplates.get({token});
    dispatch.company.get({token});
    dispatch.position.get({token});
    // dispatch.organisations.getOrganisations({token});
  };

  useEffect(() => {
    if (massDelData) {
      getAllowanceTransactionsData();
      dispatch.massDelete.saveDelete(false);
    }
  }, [massDelData]);

  const onAddBtnPress = () => {
    navigation.navigate('AddAppraisalTemplates', {
      isView: false,
      isEdit: false,
    });
  };

  const onDeleteBtnPress = id => {
    dispatch.appraisalTemplates.delete({
      token,
      id: id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddAppraisalTemplates', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddAppraisalTemplates', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  useEffect(() => {
    if (appraisalTemplatesData.isDelAppraisalTemplates) {
      setIsModalVisible(false);
      dispatch.appraisalTemplates.saveDelAppraisalTemplates(false);
    }
  }, [appraisalTemplatesData.isDelAppraisalTemplates]);

  const searchData = e => {
    dispatch.appraisalTemplates.get({token, e});
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
        table: 'appraisalTemplates',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({token, data});
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Appraisal Templates'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getAllowanceTransactionsData}
            refreshing={isAppraisalTemplatesLoading.get}
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
            label={'Add Appraisal Template'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={onAddBtnPress}
          />
        </View>

        <Table
          data={appraisalTemplatesData?.appraisalTemplatesData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
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

export default Appraisal;
