import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Payroll from './Payroll';
import QuickLinks from './QuickLinks';
import TodayOverview from './TodayOverview';
import {barChatData} from '../../dummyData';
import Header from '../../component/Header';
import EmploymentUpdates from './EmploymentUpdates';
import DepartmentBreakdown from './DepartmentBreakdown';

import style from './style';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const [totalHeadCount, setTotalHeadCount] = useState('');
  const [totalCheckIn, setTotalCheckIn] = useState('');
  const [totalOnLeave, setTotalOnLeaveCount] = useState('');
  const [labelArr, setLabelArr] = useState([]);
  const [departmentArr, setDepartmentArr] = useState([]);
  const newEmployment = 5;
  const peopleLeaving = 5;
  const workPassExpiring = 5;

  const token = useSelector(state => state.session?.token);
  const empDashboard = useSelector(state => state.empDashboard);
  const isEmpDashboardLoading = useSelector(
    state => state.loading.effects.empDashboard,
  );

  useEffect(() => {
    dispatch.empDashboard.getAdminDashboardOverviewData({token});
    dispatch.empDashboard.getAdminDashboardDepartmentData({token});
    getData;
  }, []);

  const getData = () => {
    // dispatch.organisations.getOrganisations({token});
    dispatch.position.get({token});
    dispatch.company.get({token});
    dispatch.employees.getAllEmplyee();
    dispatch.department.department({token});
    dispatch.claimTypesCategory.get({token});
    dispatch.empDashboard.getAdminDashboardOverviewData({token});
    dispatch.empDashboard.getAdminDashboardDepartmentData({token});
  };

  useEffect(() => {
    if (empDashboard?.adminDashboardOverviewData?.length > 0) {
      setTotalHeadCount(
        empDashboard?.adminDashboardOverviewData?.[0][`Total Headcount`],
      );
      setTotalCheckIn(
        empDashboard?.adminDashboardOverviewData?.[0][`Total Checked In`],
      );
      setTotalOnLeaveCount(
        empDashboard?.adminDashboardOverviewData?.[0][`Total On Leave`],
      );
    }

    if (empDashboard?.adminDashboardDashboardData) {
      let arr = empDashboard?.adminDashboardDashboardData;

      let label = [];
      let department = [];

      for (let i = 0; i < arr.length; i++) {
        label.push(arr[i].department);
        department.push(arr[i].value);
      }

      let data = {
        labels: label,
        datasets: [
          {
            data: department,
          },
        ],
      };

      setLabelArr(data);
    }
  }, [empDashboard]);

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
            onRefresh={getData}
            refreshing={isEmpDashboardLoading.getAdminDashboardOverviewData}
          />
        }
        showsVerticalScrollIndicator={false}
        style={style.keyboardAwareScrollView}>
        <TodayOverview
          totalHeadCount={totalHeadCount || 0}
          totalCheckIn={totalCheckIn || 0}
          totalOnLeave={totalOnLeave || 0}
        />

        <EmploymentUpdates
          newEmployment={newEmployment}
          peopleLeaving={peopleLeaving}
          workPassExpiring={workPassExpiring}
        />

        <DepartmentBreakdown data={labelArr} />

        {/* <Payroll /> */}

        <QuickLinks
          viewAllClaimsPress={() => navigation.navigate('ViewAllClaim')}
          viewAllLeavesPress={() => navigation.navigate('LeaveTypes')}
          viewAllEmpPress={() => navigation.navigate('EmployeeDashboard')}
          onBoardBtnPress={() => navigation.navigate('OnboardEmployees')}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
