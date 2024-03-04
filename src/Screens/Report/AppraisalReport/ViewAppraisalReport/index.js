/* eslint-disable quotes */
import moment from 'moment';
import {PermissionsAndroid, Platform, RefreshControl, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../../../component/Header';
import ReportHeader from '../../../../component/ReportHeader';
import {excelDataDownload} from '../../../../utility/constant';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';

function ViewAttendanceReport({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const editData = route?.params?.data;
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [pageCurrent, setpageCurrent] = useState(1);
  const [payslipReportDataArray, setPayslipReportDataArray] = useState('');
  const [reportDataArray, setReportDataArray] = useState('');
  const appraisalReportData = useSelector(state => state.appraisalReport);
  const isLoading = useSelector(state => state.loading.effects.appraisalReport);

  const token = useSelector(state => state.session?.token);

  const cancelBtn = () => {
    navigation.navigate('AppraisalReport', {data: editData});
  };

  useEffect(() => {
    setReportDataArray(appraisalReportData?.appraisalReportData);
  }, [appraisalReportData]);

  useEffect(() => {
    if (editData) {
      let arr = [];
      arr.push(
        {label: 'Year', description: moment(editData?.year).format('YYYY')},
        {label: 'Month', description: moment(editData?.month).format('MMMM')},
        // {label: 'Organisation', description: editData?.organisationItem},
        {label: 'Department', description: editData?.departmentItem},
      );

      setPayslipReportDataArray(arr);
    }
  }, [editData, isFocused]);

  const editBtnPress = () => {
    navigation.navigate('AppraisalReport', {data: editData});
  };

  const getAppraisalReport = () => {
    let data = {
      year: moment(editData?.year).format('YYYY'),
      month: moment(editData?.month).format('MMM'),
      org: editData?.org,
      department: editData?.department,
      user: editData?.user,
    };
    dispatch.appraisalReport.add({token, data});
  };

  const exportDataToExcel = () => {
    excelDataDownload(
      appraisalReportData?.appraisalReportData,
      'AppraisalReport',
      dispatch,
    );
    navigation.navigate('AppraisalReport');
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
          dispatch.appraisalReport.getSheet({token, data});
          exportDataToExcel();
        } else {
        }
      } else {
        exportDataToExcel();
        dispatch.appraisalReport.getSheet({token, data});
      }
    } catch (e) {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={`Appraisal Report`}
        labelStyle={styles.headerLabel}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getAppraisalReport}
            refreshing={isLoading.add}
          />
        }
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={`Download an excel file of all employees' appraisals.`}
          style={styles.padding0}
        />

        <ReportHeader
          data={payslipReportDataArray || []}
          onPress={editBtnPress}
        />

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
          data={reportDataArray || []}
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

export default ViewAttendanceReport;
