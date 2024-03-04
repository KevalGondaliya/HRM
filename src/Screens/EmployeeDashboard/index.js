import {
  View,
  SafeAreaView,
  TextInput,
  RefreshControl,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../theme';
import Header from '../../component/Header';
import Button from '../../component/Button';
import {dropDownData} from '../../dummyData';
import DropDowns from '../../component/DropDowns';
import {excelDataDownload} from '../../utility/constant';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';

const EmployeeDashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [count, setCount] = useState(0);

  const [pageCurrent, setpageCurrent] = useState(1);

  const [departmentValue, setDepartmentValue] = useState('');

  const [departmentArr, setDepartmentArr] = useState(dropDownData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const employeeReport = useSelector(state => state.employeeReport);
  const isEmployeesLoading = useSelector(
    state => state.loading.effects.employees,
  );

  const employeesData = useSelector(state => state.employees);
  const departmentData = useSelector(state => state.department?.getDepartment);
  const token = useSelector(state => state.session?.token);

  useEffect(() => {
    getEmpData();
  }, []);

  const getEmpData = () => {
    setDepartmentValue('');
    dispatch.employees.getAllEmplyee({token});
    dispatch.employeeReport.get({token});
    dispatch.department.department({token});
  };

  useEffect(() => {
    if (employeesData?.isDeleteEmployee) {
      dispatch.employees.get({token});
      dispatch.employees.getAllEmplyee({token});
      setIsModalVisible(false);
      dispatch.employees.setDeleteEmployee(false);
      setCount(count + 1);
    }
  }, [employeesData.isDeleteEmployee]);
  const onBoardEmpBtnPress = () => {
    navigation.navigate('OnboardEmployees');
  };

  const searchData = e => {
    dispatch.employees.get({token, e});
    dispatch.employees.getAllEmplyee({token});
  };

  const onDropDownChange = item => {
    setDepartmentValue(item.value);
    dispatch.employees.get({token, e: item.value});
    dispatch.employees.getAllEmplyee({token});
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  const onDeleteBtnPress = item => {
    let data = {
      status: item?.status ? false : true,
    };
    dispatch.employees.deleteUserProfile({
      token,
      data,
      id: item.userId,
    });
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

  const addEmployeePress = () => {
    navigation.navigate('AddEmployee');
  };

  useEffect(() => {
    if (departmentData) {
      let arr = departmentData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].department, value: arr[i].department});
      }
      setDepartmentArr(dropDownArr);
    }
  }, [departmentData]);

  const exportDataToExcel = () => {
    excelDataDownload(
      employeeReport?.empReportData,
      'EmployeesReport',
      dispatch,
    );
  };

  const handleClick = async () => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          dispatch.employeeReport.getSheet({token});
          exportDataToExcel();
        }
      } else {
        dispatch.employeeReport.getSheet({token});
        exportDataToExcel();
      }
    } catch (e) {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Employees'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getEmpData}
            refreshing={isEmployeesLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ScreenDescription
          description1={'Manage employees within each organisation'}
          description2={' here. Click on the respective button'}
          description3={' to edit or view the details'}
        />

        <View style={[styles.searchBtnView, styles.bottom]}>
          <View btnStyle={[styles.cancelBtn]} />
          <Button
            label={'Download All'}
            btnStyle={[styles.cancelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={() => {
              handleClick();
            }}
          />

          {/* <Button
            label={'Onboard Employees'}
            btnStyle={[styles.cancelBtn]}
            labelStyle={styles.massDelTxt}
            onPress={onBoardEmpBtnPress}
          /> */}
        </View>

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
          <View style={styles.dropDownSubView}>
            <Button
              label={'Add Employees'}
              btnStyle={[styles.cancelBtn, {width: '100%', marginTop: 10}]}
              labelStyle={styles.addEmpLabelStyle}
              onPress={addEmployeePress}
            />
          </View>
          {/* <View style={styles.dropDownSubView}>
            <DropDowns
              data={departmentArr}
              placeholder="By Department"
              value={departmentValue}
              onChange={item => {
                onDropDownChange(item);
              }}
            />
          </View> */}
        </View>

        <Table
          key={count}
          data={employeesData?.allEmployee}
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
