import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Company from '../Screens/Company';
import Payslip from '../Screens/Payslip';
import AddBranch from '../Screens/AddBranch';
import Appraisal from '../Screens/Appraisal';
import Dashboard from '../Screens/Dashboard';
import ViewBranch from '../Screens/ViewBranch';
import LeaveTypes from '../Screens/LeaveTypes';
import ClaimTypes from '../Screens/ClaimTypes';
import AddEmployee from '../Screens/AddEmployee';
import ViewPosition from '../Screens/ViewPosition';
import CustomSidebarMenu from './CustomSidebarMenu';
import Organisations from '../Screens/Organisations';
import ViewDepartment from '../Screens/ViewDepartment';
import AllowanceTypes from '../Screens/AllowanceTypes';
import DeductionTypes from '../Screens/DeductionTypes';
import AssignEmployees from '../Screens/AssignEmployees';
import CompanyWorkHour from '../Screens/CompanyWorkHour';
import SetHoliday from '../Screens/LeaveTypes/SetHoliday';
import AddOrganisations from '../Screens/AddOrganisations';
import ViewPayrolls from '../Screens/PayRoll/ViewPayrolls';
import AdminProfile from '../Screens/Profile/AdminProfile';
import Onboard from '../Screens/EmployeeDashboard/Onboard';
import ELearningModules from '../Screens/ELearningModules';
import SalaryAdjustment from '../Screens/SalaryAdjustment';
import ViewApprovalGroup from '../Screens/ViewApprovalGroup';
import AddApprovalGroups from '../Screens/AddApprovalGroups';
import EmployeeDashboard from '../Screens/EmployeeDashboard';
import CPFReport from '../Screens/Report/CPFReport/CPFReport';
import PayslipTemplates from '../Screens/Payslip/ViewPaySlip';
import ViewAllClaim from '../Screens/ClaimTypes/ViewAllClaim';
import AdminDocuments from '../Screens/Profile/AdminDocuments';
import LeaveSettings from '../Screens/LeaveTypes/LeaveSettings';
import AddClaimTypes from '../Screens/ClaimTypes/AddClaimTypes';
import AddLeaveTypes from '../Screens/LeaveTypes/AddLeaveTypes';
import AddQuizzes from '../Screens/ELearningModules/AddQuizzes';
import ClaimSettings from '../Screens/ClaimTypes/ClaimSettings';
import IRASReport from '../Screens/Report/IRASReport/IRASReport';
import PayrollSettings from '../Screens/PayRoll/PayrollSettings';
import ViewEmployeesReport from '../Screens/Report/ViewEmployees';
import AppraisalCycles from '../Screens/Appraisal/AppraisalCycles';
import PositionReassignment from '../Screens/PositionReassignment';
import AdminEntitlements from '../Screens/Profile/AdminEntitlements';
import AddCalendarGroup from '../Screens/LeaveTypes/AddCalendarGroup';
import ViewCPFReport from '../Screens/Report/CPFReport/ViewCPFReport';
import LeavesReport from '../Screens/Report/LeavesReport/LeavesReport';
import ClaimsReport from '../Screens/Report/ClaimsReport/ClaimsReport';
import LeaveTransactions from '../Screens/LeaveTypes/LeaveTransactions';
import ClaimTypeCategory from '../Screens/ClaimTypes/ClaimTypeCategory';
import AddPayslipTemplates from '../Screens/Payslip/AddPayslipTemplates';
import ViewIRASReport from '../Screens/Report/IRASReport/ViewIRASReport';
import AssignAllowances from '../Screens/AllowanceTypes/AssignAllowances';
import ViewAllAllowance from '../Screens/AllowanceTypes/ViewAllAllowance';
import OnboardDocument from '../Screens/EmployeeDashboard/OnboardDocument';
import AddDeductionTypes from '../Screens/DeductionTypes/AddDeductionTypes';
import AddAllowanceTypes from '../Screens/AllowanceTypes/AddAllowanceTypes';
import ApplyNewDeduction from '../Screens/DeductionTypes/ApplyNewDeduction';
import PayslipsReport from '../Screens/Report/PayslipsReport/PayslipsReport';
import EmployeeSettings from '../Screens/EmployeeDashboard/EmployeeSettings';
import OnboardEmployees from '../Screens/EmployeeDashboard/OnboardEmployees';
import ELearningProgress from '../Screens/ELearningModules/ELearningProgress';
import AdminEmploymentDetails from '../Screens/Profile/AdminEmploymentDetails';
import ViewLeavesReport from '../Screens/Report/LeavesReport/ViewLeavesReport';
import ViewClaimsReport from '../Screens/Report/ClaimsReport/ViewClaimsReport';
import AddAppraisalTemplates from '../Screens/Appraisal/AddAppraisalTemplates';
import AppraisalReport from '../Screens/Report/AppraisalReport/AppraisalReport';
import AddAdministrator from '../Screens/AdministratorAccounts/AddAdministrator';
import AddELearningModules from '../Screens/ELearningModules/AddELearningModules';
import AllowancesReport from '../Screens/Report/AllowancesReport/AllowancesReport';
import AttendanceReport from '../Screens/Report/AttendanceReport/AttendanceReport';
import DeductionTransactions from '../Screens/DeductionTypes/DeductionTransactions';
import ViewPayslipsReport from '../Screens/Report/PayslipsReport/ViewPayslipsReport';
import ViewAppraisalReport from '../Screens/Report/AppraisalReport/ViewAppraisalReport';
import AddAppraisalCycles from '../Screens/Appraisal/AppraisalCycles/AddAppraisalCycles';
import OnboardEmployeesSingle from '../Screens/EmployeeDashboard/OnboardEmployeesSingle';
import ViewAllowancesReport from '../Screens/Report/AllowancesReport/ViewAllowancesReport';
import ViewAttendanceReport from '../Screens/Report/AttendanceReport/ViewAttendanceReport';
import AdministratorAccounts from '../Screens/AdministratorAccounts/AdministratorAccounts';
import OnboardEmployeesSingleJob from '../Screens/EmployeeDashboard/OnboardEmployeesSingleJob';
import AddLeaveTransactions from '../Screens/LeaveTypes/LeaveTransactions/AddLeaveTransactions';
import AddClaimTransactions from '../Screens/ClaimTypes/ViewAllClaim/AddClaimTransactions';
import ELearningProgressIndividual from '../Screens/ELearningModules/ELearningProgressIndividual';
import ViewClaimTypeCategory from '../Screens/ClaimTypes/ClaimTypeCategory/ViewClaimTypeCategory';
import AddAllowanceTransactions from '../Screens/AllowanceTypes/ViewAllAllowance/AddAllowanceTransactions';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigatorRoutes = () => {
  return (
    <Drawer.Navigator
      backBehavior={'history'}
      drawerContentOptions={{
        activeTintColor: 'rgba(8,10,37,0.5)',
        color: '#080a25',
        fontSize: 18,
        fontWeight: 'bold',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#080a25',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="Payslip"
        component={Payslip}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="Appraisal"
        component={Appraisal}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="EmployeeDashboard"
        component={EmployeeDashboard}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="Company"
        component={Company}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="Organisations"
        component={Organisations}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddOrganisations"
        component={AddOrganisations}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewDepartment"
        component={ViewDepartment}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewPosition"
        component={ViewPosition}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewApprovalGroup"
        component={ViewApprovalGroup}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddApprovalGroups"
        component={AddApprovalGroups}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="CompanyWorkHour"
        component={CompanyWorkHour}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewBranch"
        component={ViewBranch}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddBranch"
        component={AddBranch}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AssignEmployees"
        component={AssignEmployees}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="PayrollSettings"
        component={PayrollSettings}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewPayrolls"
        component={ViewPayrolls}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="PayslipTemplates"
        component={PayslipTemplates}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddPayslipTemplates"
        component={AddPayslipTemplates}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="OnboardEmployees"
        component={OnboardEmployees}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="OnboardEmployeesSingle"
        component={OnboardEmployeesSingle}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="OnboardEmployeesSingleJob"
        component={OnboardEmployeesSingleJob}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="OnboardDocument"
        component={OnboardDocument}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="Onboard"
        component={Onboard}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AdminProfile"
        component={AdminProfile}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AdminEmploymentDetails"
        component={AdminEmploymentDetails}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AdminDocuments"
        component={AdminDocuments}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AdminEntitlements"
        component={AdminEntitlements}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="PositionReassignment"
        component={PositionReassignment}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ClaimTypes"
        component={ClaimTypes}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ClaimTypeCategory"
        component={ClaimTypeCategory}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddClaimTypes"
        component={AddClaimTypes}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewAllClaim"
        component={ViewAllClaim}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AllowanceTypes"
        component={AllowanceTypes}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddAllowanceTypes"
        component={AddAllowanceTypes}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewAllAllowance"
        component={ViewAllAllowance}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="LeaveTypes"
        component={LeaveTypes}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddLeaveTypes"
        component={AddLeaveTypes}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="LeaveTransactions"
        component={LeaveTransactions}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="DeductionTypes"
        component={DeductionTypes}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddDeductionTypes"
        component={AddDeductionTypes}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="DeductionTransactions"
        component={DeductionTransactions}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ELearningModules"
        component={ELearningModules}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddELearningModules"
        component={AddELearningModules}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddQuizzes"
        component={AddQuizzes}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ELearningProgress"
        component={ELearningProgress}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ELearningProgressIndividual"
        component={ELearningProgressIndividual}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddAppraisalTemplates"
        component={AddAppraisalTemplates}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AppraisalCycles"
        component={AppraisalCycles}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddAppraisalCycles"
        component={AddAppraisalCycles}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="SalaryAdjustment"
        component={SalaryAdjustment}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewEmployeesReport"
        component={ViewEmployeesReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewIRASReport"
        component={ViewIRASReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="IRASReport"
        component={IRASReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewCPFReport"
        component={ViewCPFReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="CPFReport"
        component={CPFReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="PayslipsReport"
        component={PayslipsReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewPayslipsReport"
        component={ViewPayslipsReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AllowancesReport"
        component={AllowancesReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewAllowancesReport"
        component={ViewAllowancesReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="LeavesReport"
        component={LeavesReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewLeavesReport"
        component={ViewLeavesReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ClaimsReport"
        component={ClaimsReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewClaimsReport"
        component={ViewClaimsReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AttendanceReport"
        component={AttendanceReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewAttendanceReport"
        component={ViewAttendanceReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AppraisalReport"
        component={AppraisalReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewAppraisalReport"
        component={ViewAppraisalReport}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="SetHoliday"
        component={SetHoliday}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddCalendarGroup"
        component={AddCalendarGroup}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ApplyNewDeduction"
        component={ApplyNewDeduction}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="LeaveSettings"
        component={LeaveSettings}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AssignAllowances"
        component={AssignAllowances}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="EmployeeSettings"
        component={EmployeeSettings}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ClaimSettings"
        component={ClaimSettings}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AdministratorAccounts"
        component={AdministratorAccounts}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddAdministrator"
        component={AddAdministrator}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewClaimTypeCategory"
        component={ViewClaimTypeCategory}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddEmployee"
        component={AddEmployee}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddLeaveTransactions"
        component={AddLeaveTransactions}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddAllowanceTransactions"
        component={AddAllowanceTransactions}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="AddClaimTransactions"
        component={AddClaimTransactions}
        options={{title: '', headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
