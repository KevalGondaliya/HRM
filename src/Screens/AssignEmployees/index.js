import _ from 'lodash';
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import DropShadow from 'react-native-drop-shadow';
// import {LeafletView} from 'react-native-leaflet-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../theme';
import Button from '../../component/Button';
import BranchDetails from './BranchDetails';
import Header from '../../component/Header';
import TextInput from '../../component/TextInput';
import { viewAssignEmpTbData } from '../../dummyData';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';

function AssignEmployees({ navigation }) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const lat = 1.314;
  const lng = 103.84425;

  const isEmployeesLoading = useSelector(
    state => state.loading.effects.employees,
  );
  const employeesData = useSelector(state => state.employees);

  const token = useSelector(state => state.session?.token);

  const searchData = e => {
    dispatch.employees.get({ token, e });
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  useEffect(() => {
    getEmpData();
  }, []);

  const getEmpData = () => {
    dispatch.employees.get({ token });
    dispatch.payslipTemplates.get({ token });
  };

  const addEmployeePress = () => {
    navigation.navigate('AddEmployee');
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  const onDeleteBtnPress = id => {
    // dispatch.leaveType.delete({
    //   token,
    //   id: id,
    // });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AdminProfile', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('AdminProfile', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Assign Employees'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Assign employees to branches within'}
          description2={'the company here. Fill in the respective fields.'}
        />
        <BranchDetails />

        <DropShadow style={styles.mapView}>
          {/* <LeafletView mapCenterPosition={{lat: lat, lng: lng}} /> */}
        </DropShadow>

        <View style={styles.saveBtnView}>
          <Button
            label={'Added Employees'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.addEmpLabelStyle}
          />

          <Button
            label={'Mass Delete'}
            btnStyle={styles.submitBtn}
            labelStyle={styles.massDelTxt}
          />
        </View>

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

          <Button
            onPress={addEmployeePress}
            label={'Add Employee'}
            btnStyle={styles.addPosiBtn}
            labelStyle={styles.massDelTxt}
          />
        </View>

        <Table
          data={employeesData?.userData}
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
}

export default AssignEmployees;
