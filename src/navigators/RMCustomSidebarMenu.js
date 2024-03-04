import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import React, { Fragment, useEffect, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../theme';
import time from '../assets/svg/time.svg';
import leave from '../assets/svg/leave.svg';
import logOut from '../assets/svg/logOut.svg';
import dollar from '../assets/svg/dollar.svg';
import payRoll from '../assets/svg/payRoll.svg';
import appraisal from '../assets/svg/appraisal.svg';

const EmpCustomSidebarMenu = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);
  const token = useSelector(state => state.session?.token);
  const employeeProfile = useSelector(
    state => state.employeeProfile.personalInfo,
  );
  const [userName, setUserName] = useState('');
  const [openMenu, setOpenMenu] = useState('');

  const onMenuPress = screenName => {
    setOpenMenu(screenName);
  };

  useEffect(() => {
    dispatch.employeeProfile.getPersonalInfo({
      token,
      id: user?.id,
    });
  }, []);

  useEffect(() => {
    if (employeeProfile) {
      setUserName(employeeProfile?.user_name);
    }
  }, [employeeProfile]);

  const onSubMenuPress = screenName => {
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
        onPress={() => onSubMenuPress('EmpProfile')}
        style={stylesSidebar.headerView}>
        <View style={stylesSidebar.userImageView}>
          <Image
            source={require('../assets/empUser.png')}
            style={stylesSidebar.userImg}
          />
        </View>
        <View style={stylesSidebar.userNameView}>
          <Text style={stylesSidebar.userNameTxt}>
            {userName || 'User Name'}
          </Text>
        </View>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={stylesSidebar.sideBarItem}>
          <TouchableOpacity
            onPress={() => onSubMenuPress('Dashboard')}
            style={stylesSidebar.dashboardView}>
            <Icon
              name={'dashboard'}
              type={'material'}
              size={scale(30)}
              color={'#fff'}
            />
            <Text style={stylesSidebar.dashboardTxt}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSubMenuPress('EmpPaySlip')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={payRoll} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>Payrolls</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSubMenuPress('ViewAttendances')}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={time} width={scale(28)} height={scale(28)} />
            <Text style={stylesSidebar.dashboardTxt}>Time Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onMenuPress('Claims')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={dollar} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Claims</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>

          {openMenu === 'Claims' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewAllClaims')}
                style={[
                  stylesSidebar.dashboardView,
                  { paddingHorizontal: scale(15) },
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>View All Claims</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewApproveClaims')}
                style={[
                  stylesSidebar.dashboardView,
                  { paddingHorizontal: scale(15) },
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View Approve Claims
                </Text>
              </TouchableOpacity>
            </Fragment>
          )}

          <TouchableOpacity
            onPress={() => onMenuPress('Leave')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={leave} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Leave</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>

          {openMenu === 'Leave' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewLeave')}
                style={[
                  stylesSidebar.dashboardView,
                  { paddingHorizontal: scale(15) },
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>View All Leave</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewApproveLeaves')}
                style={[
                  stylesSidebar.dashboardView,
                  { paddingHorizontal: scale(15) },
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View Approve Leaves
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('CreateAdditionalLeaves')}
                style={[
                  stylesSidebar.dashboardView,
                  { paddingHorizontal: scale(15) },
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Create Additional Leaves
                </Text>
              </TouchableOpacity>
            </Fragment>
          )}

          <TouchableOpacity
            onPress={() => onMenuPress('Appraisal')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={appraisal} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Appraisal</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>

          {openMenu === 'Appraisal' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewAppraisal')}
                style={[
                  stylesSidebar.dashboardView,
                  { paddingHorizontal: scale(15) },
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View All Appraisals
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewReviewAppraisal')}
                style={[
                  stylesSidebar.dashboardView,
                  { paddingHorizontal: scale(15) },
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Review Appraisals
                </Text>
              </TouchableOpacity>
            </Fragment>
          )}
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
  screenNameView: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  downIcon: { width: '20%', alignItems: 'flex-end' },

  logOutView: { width: '100%', height: '23%', paddingHorizontal: scale(15) },
});
