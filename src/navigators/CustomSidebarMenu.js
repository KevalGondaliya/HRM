import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import React, {Fragment, useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../theme';
import leave from '../assets/svg/leave.svg';
import logOut from '../assets/svg/logOut.svg';
import report from '../assets/svg/report.svg';
import dollar from '../assets/svg/dollar.svg';
import payRoll from '../assets/svg/payRoll.svg';
import company from '../assets/svg/company.svg';
import employee from '../assets/svg/employee.svg';
import appraisal from '../assets/svg/appraisal.svg';
import eLearning from '../assets/svg/eLearning.svg';

const CustomSidebarMenu = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);
  const companyData = useSelector(state => state.company?.companyData);
  const token = useSelector(state => state.session?.token);
  const [userName, setUserName] = useState('');
  const [openMenu, setOpenMenu] = useState('');

  const onMenuPress = screenName => {
    setOpenMenu(screenName);
  };

  useEffect(() => {
    dispatch.company.get({token});
  }, []);

  useEffect(() => {
    if (companyData) {
      setUserName(companyData?.company_name);
    }
  }, [companyData]);

  const onSubMenuPress = screenName => {
    props.navigation.closeDrawer();
    props.navigation.navigate(screenName);
  };

  const onLogOutPress = () => {
    dispatch.session.saveUser(null);
    dispatch.session.setToken(null);
  };

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <TouchableOpacity
        onPress={() => onSubMenuPress('Dashboard')}
        style={stylesSidebar.headerView}>
        <View style={stylesSidebar.userImageView}>
          <Image
            source={
              companyData?.logo != null
                ? {uri: companyData?.logo}
                : require('../assets/empUser.png')
            }
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
            onPress={() => onMenuPress('Company')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={company} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Company</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>
          {openMenu === 'Company' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('Company')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Set Company Information
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => onSubMenuPress('Organisations')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View Organisation
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => onSubMenuPress('CompanyWorkHour')}
                style={[stylesSidebar.dashboardView, {paddingLeft: scale(15)}]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Set Working Hours
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewDepartment')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View All Departments
                </Text>
              </TouchableOpacity>
            </Fragment>
          )}
          {/* <TouchableOpacity
            onPress={() => onMenuPress('Branch')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={company} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Branch</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>
          {openMenu === 'Branch' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewBranch')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>View Branches</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('AssignEmployees')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Assign Employees</Text>
              </TouchableOpacity>
            </Fragment>
          )} */}

          <TouchableOpacity
            onPress={() => {
              onMenuPress('Claims');
            }}
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
                onPress={() => onSubMenuPress('ClaimTypes')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Claim Types</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewAllClaim')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>View All Claims</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => onSubMenuPress('ViewClaimTypeCategory')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Claim Type Category
                </Text>
              </TouchableOpacity> */}

              {/* <TouchableOpacity
                onPress={() => onSubMenuPress('ClaimSettings')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Claim Settings</Text>
              </TouchableOpacity> */}
            </Fragment>
          )}

          <TouchableOpacity
            onPress={() => {
              onMenuPress('Leave');
            }}
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
                onPress={() => onSubMenuPress('LeaveTypes')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Leave Types</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('LeaveTransactions')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Leave Transactions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('SetHoliday')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Set Leave Calendar
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => onSubMenuPress('LeaveSettings')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Leave Settings</Text>
              </TouchableOpacity> */}
            </Fragment>
          )}

          <TouchableOpacity
            onPress={() => {
              onMenuPress('Deduction');
            }}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={dollar} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Deduction</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>
          {openMenu === 'Deduction' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('DeductionTypes')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View Deduction Types
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('DeductionTransactions')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Deduction Transactions
                </Text>
              </TouchableOpacity>
            </Fragment>
          )}

          <TouchableOpacity
            onPress={() => onMenuPress('ELearning')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={eLearning} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>E-Learning</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>
          {openMenu === 'ELearning' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('ELearningModules')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View E-Learning Modules
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('AddQuizzes')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Add E-Learning Quizzes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('ELearningProgress')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View E-Learning Progress
                </Text>
              </TouchableOpacity>
            </Fragment>
          )}

          <TouchableOpacity
            onPress={() => {
              onMenuPress('Employees');
            }}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={employee} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Employees</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>
          {openMenu === 'Employees' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('EmployeeDashboard')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>View Employees</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('PositionReassignment')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Position Reassignment
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('SalaryAdjustment')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Salary Adjustment
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => onSubMenuPress('EmployeeSettings')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Employee Setting</Text>
              </TouchableOpacity> */}
            </Fragment>
          )}
          {/* <TouchableOpacity
            onPress={() => {
              onMenuPress('PayRoll');
            }}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={payRoll} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Payrolls</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity> */}
          {openMenu === 'PayRoll' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewPayrolls')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View All PayRolls
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('PayrollSettings')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Payroll Settings</Text>
              </TouchableOpacity>
            </Fragment>
          )}
          <TouchableOpacity
            onPress={() => onMenuPress('Allowances')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={dollar} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Allowances</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>
          {openMenu === 'Allowances' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('AllowanceTypes')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Allowance Types</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewAllAllowance')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Allowance Transactions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('AssignAllowances')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Assign Allowances To Employees
                </Text>
              </TouchableOpacity>
            </Fragment>
          )}
          <TouchableOpacity
            onPress={() => onMenuPress('Payslip')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={report} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Payslip</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>
          {openMenu === 'Payslip' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('PayslipTemplates')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View Payslip Templates
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => onSubMenuPress('Payslip')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  View Individual Payslip
                </Text>
              </TouchableOpacity> */}
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
                onPress={() => onSubMenuPress('Appraisal')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Appraisal Templates
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('AppraisalCycles')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Appraisal Cycles</Text>
              </TouchableOpacity>
            </Fragment>
          )}

          <TouchableOpacity
            onPress={() => {
              onMenuPress('Report');
            }}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={report} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Report</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>
          {openMenu === 'Report' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewEmployeesReport')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Employees' Report
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSubMenuPress('AppraisalReport')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Appraisal Report</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSubMenuPress('AttendanceReport')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Attendance Report
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => onSubMenuPress('ClaimsReport')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Claims Report</Text>
              </TouchableOpacity>*/}
              <TouchableOpacity
                onPress={() => onSubMenuPress('LeavesReport')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Leaves Report</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSubMenuPress('AllowancesReport')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Allowances Report
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => onSubMenuPress('PayslipsReport')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Payslips Report</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('CPFReport')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>CPF Report</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSubMenuPress('IRASReport')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>IRAS Report</Text>
              </TouchableOpacity> */}
            </Fragment>
          )}
          {/* <TouchableOpacity
            onPress={() => onMenuPress('AdministratorAccounts')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={company} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>
                Administrator Account
              </Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity> */}
          {/* {openMenu === 'AdministratorAccounts' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('AdministratorAccounts')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>
                  Administrator Account
                </Text>
              </TouchableOpacity>
            </Fragment>
          )} */}
          <TouchableOpacity
            onPress={() => onMenuPress('ApprovalGroup')}
            style={stylesSidebar.dashboardView}>
            <View style={stylesSidebar.screenNameView}>
              <SvgXml xml={company} width={scale(28)} height={scale(28)} />
              <Text style={stylesSidebar.dashboardTxt}>Approval Group</Text>
            </View>
            <View style={stylesSidebar.downIcon}>
              <Icon name="chevron-down" type="entypo" color={Colors.white} />
            </View>
          </TouchableOpacity>
          {openMenu === 'ApprovalGroup' && (
            <Fragment>
              <TouchableOpacity
                onPress={() => onSubMenuPress('ViewApprovalGroup')}
                style={[
                  stylesSidebar.dashboardView,
                  {paddingHorizontal: scale(15)},
                ]}>
                <Text style={stylesSidebar.dashboardTxt}>Approval Group</Text>
              </TouchableOpacity>
            </Fragment>
          )}
        </View>

        <View style={stylesSidebar.logoutView}>
          <TouchableOpacity
            onPress={onLogOutPress}
            style={stylesSidebar.dashboardView}>
            <SvgXml xml={logOut} width={scale(25)} height={scale(25)} />

            <Text style={[stylesSidebar.dashboardTxt, {marginLeft: scale(25)}]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

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
  downIcon: {width: '20%', alignItems: 'flex-end'},
  logoutView: {width: '100%', height: '23%', paddingHorizontal: scale(15)},
});
