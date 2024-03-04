import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshControl, PermissionsAndroid, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import { excelDataDownload } from '../../../utility/constant';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function ViewEmployees({ navigation }) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);

  const token = useSelector(state => state.session?.token);
  const employeeReport = useSelector(state => state.employeeReport);
  const isEmployeeReportLoading = useSelector(
    state => state.loading.effects.employeeReport,
  );

  useEffect(() => {
    getEmpData();
  }, []);

  const getEmpData = () => {
    dispatch.employeeReport.get({ token });
  };

  const searchData = e => {
    dispatch.employeeReport.get({ token, e });
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  const exportDataToExcel = () => {
    excelDataDownload(
      employeeReport?.empReportData,
      'AttendanceReport',
      dispatch,
    );
  };

  const handleClick = async () => {
    try {
      if (Platform.OS == 'android') {
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
            dispatch.employeeReport.getSheet({ token });
            exportDataToExcel();
          } else {
          }
        } else {
          dispatch.employeeReport.getSheet({ token });
          exportDataToExcel();
        }
      } else {
        dispatch.employeeReport.getSheet({ token });
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
        label={`Employees'  Report`}
        labelStyle={styles.headerLabel}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getEmpData}
            refreshing={isEmployeeReportLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Download an excel file of all employees.'}
        />

        {/* <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            style={styles.searchInput}
            placeholder={'Search Query…'}
            placeholderTextColor={Colors.lightRed}
            onChangeText={e => debounce_fun(e)}
          />
        </View> */}

        <Button
          btnStyle={styles.btnStyle}
          labelStyle={styles.labelStyle}
          label={'Download'}
          onPress={() => handleClick()}
        />

        <Table
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          pageCurrent={pageCurrent}
          data={employeeReport?.empReportData || []}
          setpageCurrent={setpageCurrent}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ViewEmployees;
