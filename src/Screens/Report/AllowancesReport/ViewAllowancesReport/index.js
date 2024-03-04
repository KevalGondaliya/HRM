/* eslint-disable quotes */

import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PermissionsAndroid, Platform, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../../../component/Header';
import ReportHeader from '../../../../component/ReportHeader';
import {excelDataDownload} from '../../../../utility/constant';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';

function ViewAllowancesReport({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const editData = route?.params?.data;
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [allowancesDataArray, setAllowancesDataArray] = useState([]);
  const allowncesReportData = useSelector(state => state.allowncesReport);
  const isLoading = useSelector(state => state.loading.effects.allowncesReport);

  const token = useSelector(state => state.session?.token);

  const cancelBtn = () => {
    navigation.navigate('AllowancesReport');
  };

  const editBtnPress = () => {
    navigation.navigate('AllowancesReport');
  };

  useEffect(() => {
    if (editData) {
      let arr = [];
      arr.push(
        {label: 'Year', description: moment(editData?.year).format('YYYY')},
        {label: 'Month', description: moment(editData?.month).format('MMMM')},
        // {label: 'Organisation', description: editData?.organisationItem},
        {label: 'Department', description: editData?.departmentItem},
        {label: 'Allowance Type', description: editData?.allowanceTypeItem},
      );

      setAllowancesDataArray(arr);
    }
  }, [editData, isFocused]);

  const getAllownceReport = () => {
    let data = {
      year: moment(editData?.year).format('YYYY'),
      month: moment(editData?.month).format('MM'),
      // org: editData?.org,
      department: editData?.department,
      user: editData?.user,
      allowanceType: editData?.allowanceType,
    };
    dispatch.attendanceReport.get({token, data});
  };

  const exportDataToExcel = () => {
    excelDataDownload(
      allowncesReportData?.allowncesReportData,
      'AllowancesReport',
      dispatch,
    );
    navigation.navigate('AllowancesReport');
  };

  const handleClick = async () => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      let data = {
        year: moment(editData?.year).format('YYYY'),
        month: moment(editData?.month).format('MMM'),
        org: editData?.org,
        department: editData?.department,
        user: editData?.user,
        allowanceType: editData?.allowanceType,
      };
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
          dispatch.allowncesReport.getSheet({token, data});
          exportDataToExcel();
        } else {
        }
      } else {
        dispatch.allowncesReport.getSheet({token, data});
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
        label={`Allowances Report`}
        labelStyle={styles.headerLabel}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getAllownceReport}
            refreshing={isLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={`Download an excel file of all employees' allowances.`}
          style={styles.padding0}
        />

        <ReportHeader data={allowancesDataArray} onPress={editBtnPress} />

        {/* <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            style={styles.searchInput}
            placeholder={'Search Query…'}
            placeholderTextColor={Colors.lightRed}
            onChangeText={setSearch}
            value={search}
          />
        </View> */}

        <Table
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          pageCurrent={pageCurrent}
          data={allowncesReportData?.allowncesReportData}
          setpageCurrent={setpageCurrent}
        />

        <SaveCancelBtn
          label={'Download'}
          cancelLabel={'Back'}
          style={styles.top}
          cancelBtn={cancelBtn}
          submitBtn={() => handleClick()}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ViewAllowancesReport;
