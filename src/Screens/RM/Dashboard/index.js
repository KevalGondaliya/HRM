import React, { useEffect } from 'react';
import { RefreshControl, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import {
  courseData,
  ReportingLineData,
  pendingApplicationsData,
  PendingReviewApplicationsData,
} from '../../../dummyData';
import CourseData from './CourseData';
import ReportingLine from './ReportingLine';
import EntitledLeaves from './EntitledLeaves';
import Header from '../../../component/Header';
import PendingAppraisals from './PendingAppraisals';
import PendingApplications from './PendingApplications';
import PendingReviewApplications from './PendingReviewApplications';

import style from './style';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const empDashboardData = useSelector(state => state.empDashboard);
  const isEmpDashboardLoading = useSelector(
    state => state.loading.effects.empDashboard,
  );
  const token = useSelector(state => state.session?.token);

  useEffect(() => {
    getEmpDashbordData();
  }, []);

  const getEmpDashbordData = () => {
    dispatch.empDashboard.getPendingApplicationData({ token });
    dispatch.empDashboard.getEntitlesLeaveData({ token });
    dispatch.empDashboard.getPendingReviewApplicationsData({ token });
  };


  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Dashboard'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getEmpDashbordData}
            refreshing={isEmpDashboardLoading.getPendingApplicationData}
          />
        }
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={style.keyboardAwareScrollView}>
        {/* <View style={style.reportingTxtView}>
          <Text style={style.reportingTxt}>Reporting Manager</Text>
          <View style={style.reportingNameView}>
            <Text style={style.reportingName}>Stanwin Siow</Text>
          </View>
        </View> */}

        <PendingApplications pendingData={empDashboardData?.leavesReportData} />
        <EntitledLeaves pendingData={empDashboardData?.entitlesLeaveData} />
        <PendingReviewApplications
          data={empDashboardData?.pendingReviewApplicationsData}
        />
        <ReportingLine data={ReportingLineData} />

        {/* <CourseData courseData={courseData} /> */}

        <PendingAppraisals
          onPress={() => {
            navigation.navigate('EmpPaySlip');
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
