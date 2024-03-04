import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../theme';
import time from '../assets/svg/time.svg';
import leave from '../assets/svg/leave.svg';
import logOut from '../assets/svg/logOut.svg';
import report from '../assets/svg/report.svg';
import dollar from '../assets/svg/dollar.svg';
import payRoll from '../assets/svg/payRoll.svg';
import appraisal from '../assets/svg/appraisal.svg';
import eLearning from '../assets/svg/eLearning.svg';

const EmpCustomSidebarMenu = props => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const user = useSelector(state => state.session?.user);
  const token = useSelector(state => state.session?.token);
  const employeeProfile = useSelector(
    state => state.employeeProfile.personalInfo,
  );

  useEffect(() => {
    dispatch.employeeProfile.getPersonalInfo({
      token,
      id: user?.id,
    });
  }, []);

  useEffect(() => {
    if (employeeProfile) {
      setUserName(
        employeeProfile?.staff_personal_infos[0]?.firstName +
        ' ' +
        employeeProfile?.staff_personal_infos[0]?.lastName,
      );
    }
  }, [employeeProfile]);

  const onMenuBtnPress = screenName => {
    props.navigation.closeDrawer();
    props.navigation.navigate(screenName);
  };

  const onLogOutBtnPress = () => {
    dispatch.session.saveUser(null);
    dispatch.session.setToken(null);
  };

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <TouchableOpacity
        onPress={() => onMenuBtnPress('EmpProfile')}
        style={stylesSidebar.headerView}>
        <View style={stylesSidebar.userImageView}>
          <Image
            source={
              employeeProfile?.staff_personal_infos[0]?.photo != null
                ? { uri: employeeProfile?.staff_personal_infos[0]?.photo }
                : require('../assets/empUser.png')
            }
            style={stylesSidebar.userImg}
          />
        </View>
        <View style={stylesSidebar.userNameView}>
          <Text style={stylesSidebar.userNameTxt}>
            {userName || 'user Name'}
          </Text>
        </View>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={stylesSidebar.sideBarItem}>
          <TouchableOpacity
            onPress={() => onMenuBtnPress('Dashboard')}
            style={stylesSidebar.dashboardView}>
            <Icon
              name={'dashboard'}
              type={'material'}
              size={scale(30)}
              color={'#fff'}
            />
            <Text style={stylesSidebar.dashboardTxt}>Dashboard</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => onMenuBtnPress('EmpPaySlip')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={payRoll} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>Payrolls</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => onMenuBtnPress('EmpViewAllClaims')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={dollar} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>Claims</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onMenuBtnPress('EmpLeave')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={leave} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>Leave</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={dollar} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>Allowances</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => onMenuBtnPress('ViewAttendances')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={time} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>Time Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onMenuBtnPress('EmpAppraisal')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={appraisal} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>Appraisal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onMenuBtnPress('ViewELearning')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={eLearning} width={scale(28)} height={scale(28)} />

            <Text style={stylesSidebar.dashboardTxt}>E-Learning</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={report} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>Report</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => onMenuBtnPress('ViewAllDeductions')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={report} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>View All Deductions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onMenuBtnPress('ViewAllAllowances')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={report} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>View All Allowances</Text>
          </TouchableOpacity>
        </View>

        <View style={stylesSidebar.logOutView}>
          <TouchableOpacity
            onPress={onLogOutBtnPress}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={logOut} width={scale(25)} height={scale(25)} />

            <Text style={[stylesSidebar.dashboardTxt, { marginLeft: scale(25) }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmpCustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.blackPearl,
    color: 'white',
    paddingHorizontal: scale(15),
  },
  headerView: {
    width: '100%',
    height: '25%',
    borderBottomWidth: 1,
    borderColor: Colors.lightRed,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    justifyContent: 'space-between',
  },
  userImageView: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(80 / 2),
    backgroundColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: scale(80 / 2),
  },
  userNameView: {
    height: scale(80),
    width: scale(100),
    marginTop: scale(20),
  },
  userNameTxt: {
    fontSize: scale(13),
    color: Colors.white,
    fontWeight: '700',
  },
  dashboardTxt: {
    color: Colors.white,
    fontWeight: '500',
    marginLeft: scale(13),
  },
  dashboardView: {
    width: '100%',
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideBarItem: {
    width: '100%',
    // minHeight: '50%',
    marginVertical: scale(10),
    paddingHorizontal: scale(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightRed,
    paddingBottom: scale(15),
  },
  timeImg: {
    height: scale(28),
    width: scale(28),
    resizeMode: 'contain',
  },

  logOutView: { width: '100%', height: '23%', paddingHorizontal: scale(15) },
});
