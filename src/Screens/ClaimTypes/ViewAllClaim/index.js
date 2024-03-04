import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { View, SafeAreaView, TextInput, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import DropDown from '../../../component/DropDown';
import { dropDownData, viewAllClaimsArr } from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import Button from '../../../component/Button';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

const EmployeeDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [empValue, setEmpValue] = useState('');
  const [openEmp, setOpenEmp] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [empArr, setEmpArr] = useState(dropDownData);
  const [departmentValue, setDepartmentValue] = useState('');
  const [openDepartment, setOpenDepartment] = useState(false);
  const [departmentArr, setDepartmentArr] = useState(dropDownData);
  const token = useSelector(state => state.session?.token);
  const isClaimTransactionsLoading = useSelector(
    state => state.loading.effects.claimTransactions,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const claimTransactionsData = useSelector(state => state.claimTransactions);

  useEffect(() => {
    getClaimTransactionsData();
  }, []);

  const getClaimTransactionsData = () => {
    dispatch.claimTransactions.get({ token });
    dispatch.employees.get({ token });
  };

  const onDeleteBtnPress = id => {
    dispatch.claimTransactions.delete({
      token,
      id: id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddClaimTransactions', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddClaimTransactions', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  const onAddClaimTransactionsPress = () => {
    navigation.navigate('AddClaimTransactions');
  };

  useEffect(() => {
    if (claimTransactionsData.isDelClaimTransactions) {
      setIsModalVisible(false);
      dispatch.claimTransactions.saveDelClaimTransactions(false);
    }
  }, [claimTransactionsData.isDelClaimTransactions]);

  const searchData = e => {
    dispatch.claimTransactions.get({ token, e });
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'View All Claims'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getClaimTransactionsData}
            refreshing={isClaimTransactionsLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ScreenDescription
          description1={'Add claim types within the company'}
          description2={'here. Fill in the respective fields.'}
        />

        <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            onChangeText={e => debounce_fun(e)}
            style={styles.searchInput}
            placeholder={'Search Query…'}
            placeholderTextColor={Colors.lightRed}
          />
        </View>


        <View style={styles.addClmBtn}>

          <Button
            label={'Add Claim Transactions'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.massDelTxt}
            onPress={onAddClaimTransactionsPress}
          />
        </View>

        <Table
          data={claimTransactionsData?.claimTransactionsData}
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
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmployeeDashboard;
