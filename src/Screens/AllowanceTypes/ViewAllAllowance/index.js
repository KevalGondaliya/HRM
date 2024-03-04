import { Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, SafeAreaView, TextInput, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import { dropDownData } from '../../../dummyData';
import DropDowns from '../../../component/DropDowns';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import _ from 'lodash';

const ViewAllAllowance = ({ navigation }) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [allowanceValue, setAllowanceValue] = useState('');
  const [allowanceArr, setAllowanceArr] = useState(dropDownData);
  const [pageCurrent, setpageCurrent] = useState(1);
  const token = useSelector(state => state.session?.token);
  const isAllownceTransactionsLoading = useSelector(
    state => state.loading.effects.allowanceTransactions,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const allownceTransactionsData = useSelector(
    state => state.allowanceTransactions,
  );

  const onAddTransactionsPress = () => {
    navigation.navigate('AddAllowanceTransactions');
  };

  useEffect(() => {
    getAllowanceTransactionsData();
  }, []);

  const getAllowanceTransactionsData = () => {
    dispatch.allowanceTransactions.get({ token });
    dispatch.employees.get({ token });
  };

  const onDeleteBtnPress = id => {
    dispatch.allowanceTransactions.delete({
      token,
      id: id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddAllowanceTransactions', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AddAllowanceTransactions', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  useEffect(() => {
    if (allownceTransactionsData.isDelAllowanceTransactions) {
      setIsModalVisible(false);
      dispatch.allowanceTransactions.saveDelAllowanceTransactions(false);
    }
  }, [allownceTransactionsData.isDelAllowanceTransactions]);

  const searchData = e => {
    dispatch.allowanceTransactions.get({ token, e });
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Allowance Transactions'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getAllowanceTransactionsData}
            refreshing={isAllownceTransactionsLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ScreenDescription
          description1={'Manage all allowances transacted to'}
          description2={'employees within the company here. Click on the'}
          description3={'respective button to edit or view the details'}
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

        <View style={styles.dropDownView}>
          {/* <View style={{ width: '48%' }}>
            <DropDowns
              data={allowanceArr || []}
              placeholder="By Leave Description…"
              value={allowanceValue}
              onChange={item => {
                setAllowanceValue(item.value);
              }}
            />
          </View> */}
          <View style={{ width: '50%', justifyContent: 'flex-end' }}>
            <Button
              label={'Add Transactions'}
              btnStyle={styles.cancelBtn}
              labelStyle={styles.massDelTxt}
              onPress={onAddTransactionsPress}
            />
          </View>
        </View>

        <Table
          data={allownceTransactionsData?.allowanceTransactionsData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          onDeleteBtnPress={onDeleteBtnPress}
          eyeIconPress={eyeBtnPress}
          editBtnPress={editBtnPress}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ViewAllAllowance;
