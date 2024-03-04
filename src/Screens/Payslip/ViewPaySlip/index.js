import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { View, TextInput, RefreshControl } from 'react-native';
import { scale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Button from '../../../component/Button';
import Header from '../../../component/Header';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

function ViewPaySlip({ navigation }) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [delArr, setDelArr] = useState([]);
  const [delId, setDelId] = useState('');
  const [count, setCount] = useState(0);

  const payslipTemplatesData = useSelector(state => state.payslipTemplates);
  const isMassLoading = useSelector(
    state => state.loading.effects.massDelete.setMassDel,
  );
  const massDelData = useSelector(state => state.massDelete?.massDeleteData);

  const isLoading = useSelector(
    state => state.loading.effects.payslipTemplates,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = useSelector(state => state.session?.token);

  useEffect(() => {
    getApprovalGroupData();
  }, []);

  useEffect(() => {
    setIsModalVisible(false);
    setDelId('');
    dispatch.payslipTemplates.saveDelPayslipTemplates(false);
  }, [payslipTemplatesData.isDelPayslipTemplates]);

  const getApprovalGroupData = () => {
    setDelArr([]);
    dispatch.company.get({ token });
    dispatch.payslipTemplates.get({ token });
  };

  const searchData = e => {
    dispatch.payslipTemplates.get({ token, e });
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  const addPayslipBtn = () => {
    navigation.navigate('AddPayslipTemplates');
  };

  useEffect(() => {
    if (massDelData) {
      getApprovalGroupData();
      dispatch.massDelete.saveDelete(false);
    }
  }, [massDelData]);

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddPayslipTemplates', {
      data: delId ? delId : item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddPayslipTemplates', {
      data: delId ? delId : item,
      isEdit: false,
      isView: true,
    });
  };

  const onDeleteBtnPress = id => {
    setDelId(id);
    dispatch.payslipTemplates.delete({
      token,
      id: delId ? delId : id,
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
        table: 'payslips',
        ids: delArr,
      };
      dispatch.massDelete.setMassDel({ token, data });
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Payslip Templates'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={getApprovalGroupData}
            refreshing={isLoading?.get}
          />
        }
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage all payslip templates within'}
          description2={'the company here. Click on the'}
          description3={'respective button to edit or view the details'}
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

        <View style={[styles.searchBtnView, { marginBottom: scale(5) }]}>
          <Button
            disabled={delArr.length === 0}
            label={'Mass Delete'}
            btnStyle={[styles.cancelBtn, styles.massDelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={handleMassDelete}
            isSpinner={isMassLoading}
          />

          <Button
            label={'Add Payslip Template'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={addPayslipBtn}
          />
        </View>

        <Table
          data={payslipTemplatesData?.payslipTemplatesData}
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
          editIconPress={editBtnPress}
          delId={delId}
          handleOnCheckBox={handleOnCheckBox}
          delArr={delArr}
          count={count}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ViewPaySlip;
