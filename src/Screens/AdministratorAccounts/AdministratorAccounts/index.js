import { RefreshControl, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import TextInput from '../../../component/TextInput';
import { ViewEmployeesReport } from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

function AdministratorAccounts({ navigation }) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [pageCurrent, setpageCurrent] = useState(1);

  const token = useSelector(state => state.session?.token);
  const userData = useSelector(state => state.employees);
  const isLoading = useSelector(
    state => state.loading.effects.employees.getAdminUser,
  );


  const onMenuPress = () => {
    navigation.openDrawer();
  };

  const onAddAdminBtnPress = () => {
    navigation.navigate('AddAdministrator');
  };

  useEffect(() => {
    getAdminUser();
  }, []);

  const getAdminUser = () => {
    dispatch.employees.getAdminUser({ token });
  };

  const handleSearch = e => {
    dispatch.employees.getAdminUser({ token, e });
  };

  const debounce_fun = _.debounce(function (response) {
    handleSearch(response);
  }, 400);



  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={`Administrator Accounts`}
        labelStyle={styles.headerLabel}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl onRefresh={getAdminUser} refreshing={isLoading} />
        }
        showsVerticalScrollIndicator={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={
            'Manage all admin accounts within the company here. Click on the respective button to edit or view the details'
          }
          style={{ paddingHorizontal: 0 }}
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

        <Button
          onPress={onAddAdminBtnPress}
          btnStyle={styles.btnStyle}
          labelStyle={styles.labelStyle}
          label={'Add Admin Account'}
        />

        <Table
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          pageCurrent={pageCurrent}
          data={userData?.adminData}
          setpageCurrent={setpageCurrent}
          navigation={navigation}

        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AdministratorAccounts;
