import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export const barChatData = {
  labels: ['1-3', '4-10', '11-30', '31-60'],
  datasets: [
    {
      data: [20, 45, 28, 80],
    },
  ],
};
export const dropDownData1 = [
  {label: 'Annual', value: 'Annual'},
  {label: 'Childcare', value: 'Childcare'},
  {label: 'Hospitalisation', value: 'Hospitalisation'},
  {label: 'Medical', value: 'Medical'},
  {label: 'Maternity', value: 'Maternity'},
  {label: 'Paternity', value: 'Paternity'},
  {label: 'Unpaid Parental Leave', value: 'Unpaid Parental Leave'},
  {label: 'Unpaid Instant Care Leave', value: 'Unpaid Instant Care Leave'},
  {label: 'Unpaid Leave', value: 'Unpaid Leave'},
];
export const specificTypeOfClaims = [
  {label: 'Accomodation', value: 'Accomodation'},
  {label: 'Food', value: 'Food'},
  {label: 'Medical', value: 'Medical'},
  {label: 'Transport', value: 'Transport'},
  {label: 'Travel', value: 'Travel'},
];

export const dropDownData = [
  {label: 'Travelling', value: 'Travelling'},
  {label: 'Out of Office - contactable', value: 'OutofOffice-contactable'},
];
export const workingHourType = [
  {label: 'Fixed Working Days', value: 'Fixed Working Days'},
  {label: 'Flexible Working Days', value: 'Flexible Working Days'},
];

export const booleanData = [
  {label: 'Yes', value: 'Yes'},
  {label: 'No', value: 'No'},
];
 
 
export const boolean_Data = [
  {label: 'Yes', value: true},
  {label: 'No', value: false},
];
 
export const monthData = [
  {label: '1', value: '01'},
  {label: '2', value: '02'},
  {label: '3', value: '03'},
  {label: '4', value: '04'},
  {label: '5', value: '05'},
  {label: '6', value: '06'},
  {label: '7', value: '07'},
  {label: '8', value: '08'},
  {label: '9', value: '09'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
];

export const cardArrData = [
  {
    cmpName: 'HR SIMPLIFY',
    rNumber: '202017813D',
    address: '535 Clementi Rd Block 58, Ngee Ann Polytechnic',
    country: 'Singapore 599489',
    number: '#02-3F',
  },
  {
    cmpName: 'TINK SG #2',
    rNumber: '202017813D',
    address: '535 Clementi Rd Block 58, Ngee Ann Polytechnic',
    country: 'Singapore 599489',
    number: '#02-3F',
  },
];

export const departmentData = [
  {
    department: 'Finance',
    positions: 10,
    noOfEmp: 5,
  },
  {
    department: 'Finance',
    positions: 10,
    noOfEmp: 5,
  },
  {
    department: 'Finance',
    positions: 10,
    noOfEmp: 5,
  },
  {
    department: 'Finance',
    positions: 10,
    noOfEmp: 5,
  },
];

export const viewpostionTbData = [
  {
    positions: 'Head of Department',
    noOfEmp: 5,
  },
  {
    positions: 'Manager',
    noOfEmp: 5,
  },
];

export const viewApprovalGroupTbData = [
  {
    approvalGroup: 'Finance Staff',
    approver: 'Head of Department',
    employees: 'Manager #1, Manager #2',
  },
  {
    approvalGroup: 'Finance Staff',
    approver: 'Head of Department',
    employees: 'Manager #1, Manager #2',
  },
];

export const dayArr = [
  {name: 'Mon'},
  {name: 'Tues'},
  {name: 'Wed'},
  {name: 'Thu'},
  {name: 'Fri'},
  {name: 'Sat'},
  {name: 'Sun'},
];

export const weekDay = [
  {
    dayName: 'MONDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'TUESDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'WEDNESDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'THURSDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'FRIDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'SATURDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'SUNDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
];
export const weekDay1 = [
  {
    dayName: 'MONDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'TUESDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'WEDNESDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'THURSDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'FRIDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'SATURDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
  {
    dayName: 'SUNDAY',
    isHalfDay: false,
    time: {from: '', to: ''},
  },
];

export const viewBranchTbData = [
  {
    branchName: 'branch #1',
    checkInRadius: 100,
    country: 'Singapore',
    postalCode: 50001,
    address: '535 Clementi Rd, Block 27',
  },
];

export const viewAssignEmpTbData = [
  {
    employeeID: 'TM0001',
    name: 'Stanwin Siow',
    organisation: 'HR Simplify',
    department: 'Top Management',
    position: 'CEO',
  },
  {
    employeeID: 'T0001',
    name: 'Koh Pei Ling',
    organisation: 'HR Simplify',
    department: 'Technology',
    position: 'Full-Stack Developer',
  },
];

export const viewPayRollTbData = [
  {
    employeeName: 'Stanwin Siow',
    takeHomePay: 0,
    grossSalary: 0,
    cpf: 0,
    bonus: 0,
  },
  {
    employeeName: 'Koh Pei Ling',
    takeHomePay: 0,
    grossSalary: 0,
    cpf: 0,
    bonus: 0,
  },
];

export const viewPaySlipTbData = [
  {
    templateName: 'Name #1',
    country: 'Singapore',
  },
  {
    templateName: 'Name #2',
    country: 'Singapore',
  },
];

export const payslipTbData = [
  {
    itemName: 'Basic Salary',
    amount: 'Singapore',
  },
  {
    itemName: 'Overtime (Normal Day)',
    amount: 'Singapore',
  },
];

export const payslipHeaderTbData = [
  {
    label: 'Employee Name',
    isCheck: false,
  },
  {
    label: 'Employee Number',
    isCheck: false,
  },
  {
    label: 'Date of Birth',
    isCheck: false,
  },
  {
    label: 'Employee Hire Date',
    isCheck: false,
  },

  {
    label: 'Department',
    isCheck: false,
  },
  {
    label: 'Position',
    isCheck: false,
  },
  // {
  //   label: 'IC Number',
  //   isCheck: false,
  // },
];

export const payslipHeaderTbData1 = [
  {
    label: 'Employee Name',
    isCheck: false,
  },
  {
    label: 'Employee Number',
    isCheck: false,
  },
  {
    label: 'Date of Birth',
    isCheck: false,
  },
  {
    label: 'Employee Hire Date',
    isCheck: false,
  },

  {
    label: 'Department',
    isCheck: false,
  },
  {
    label: 'Position',
    isCheck: false,
  },
  // {
  //   label: 'IC Number',
  //   isCheck: false,
  // },
];

export const appeaisalHeaderTbData = [
  {
    label: 'Employee Name',
    isCheck: false,
  },
  {
    label: 'Employee Number',
    isCheck: false,
  },
  {
    label: 'Date of Birth',
    isCheck: false,
  },
  {
    label: 'Employee Hire Date',
    isCheck: false,
  },
  // {
  //   label: 'Organisation',
  //   isCheck: false,
  // },
  {
    label: 'Department',
    isCheck: false,
  },
  {
    label: 'Position',
    isCheck: false,
  },
  {
    label: 'Number of Years of Service',
    isCheck: false,
  },
];

export const paymentHeaderTbData = [
  {
    label: 'Basic Salary',
    isCheck: false,
  },
  {
    label: 'Gross Salary',
    isCheck: false,
  },
  {
    label: 'CPF Deductions',
    isCheck: false,
  },
  {
    label: 'Employer’s CPF',
    isCheck: false,
  },
  {
    label: 'Bonus',
    isCheck: false,
  },
  {
    label: 'Allowances',
    isCheck: false,
  },
  {
    label: 'Claims',
    isCheck: false,
  },
  {
    label: 'Deductions',
    isCheck: false,
  },
  {
    label: 'CDAC/MBMF/    SINDA',
    isCheck: false,
  },
  {
    label: 'Show Leave Breakdown',
    isCheck: false,
  },
  {
    label: 'Show Overtime Breakdown',
    isCheck: false,
  },
];

export const empTbData = [
  {
    empId: 'TM0001',
    name: 'Stanwin Siow',
    organisation: 'HR Simplify',
    Department: 'Top Management',
  },
];

import briefcase from './assets/svg/briefcase.svg';
import document from './assets/svg/document.svg';
import persone from './assets/svg/person.svg';
import plane from './assets/svg/plane.svg';

import greybriefcase from './assets/svg/greybriefcase.svg';
import greydocument from './assets/svg/greydocument.svg';
import greyplane from './assets/svg/greyplane.svg';

export const onBoardEmployeesArr = [
  {
    title: 'Personal',
    greyImage: persone,
    image: persone,
  },
  {
    title: 'Job',
    greyImage: greybriefcase,
    image: briefcase,
  },
  {
    title: 'Documents',
    greyImage: greydocument,
    image: document,
  },
  {
    title: 'Onboard',
    greyImage: greyplane,
    image: plane,
  },
];

export const maritalStatus = [
  {label: 'Single', value: 'Single'},
  {label: 'Married', value: 'Married'},
  {label: 'Widowed', value: 'Widowed'},
  {label: 'Divorced', value: 'Divorced'},
  // {label: 'Separated', value: 'Separated'},
];

export const identificationTypeData = [
  {label: 'NRIC', value: 'NRIC'},
  {label: 'FIN', value: 'FIN'},
  {
    label: 'Immigration File Reference Number',
    value: 'Immigration File Reference Number',
  },
  {label: 'Work Permit Number', value: 'Work Permit Number'},
  {
    label: 'Malaysian I/C (for non-resident director & seaman only)',
    value: 'Malaysian I/C (for non-resident director & seaman only)',
  },
  {
    label: 'Passport Number (for non-resident director & seaman only)',
    value: 'Passport Number (for non-resident director & seaman only)',
  },
  {
    label: 'Passport No. (for non-resident employee)',
    value: 'Passport No. (for non-resident employee)',
  },
];

export const religion = [
  {label: 'Hindu', value: 'Hindu'},
  {label: 'Shikh', value: 'Shikh'},
  {label: 'Isai', value: 'Isai'},
  {label: 'Christian', value: 'Christian'},
  {label: 'Buddhist', value: 'Buddhist'},
  {label: 'Muslim', value: 'Muslim'},
];

export const raceDataArr = [
  {label: 'Chinese', value: 'Chinese'},
  {label: 'Eurasian', value: 'Eurasian'},
  {label: 'Indain', value: 'Indian'},
  {label: 'Muslim', value: 'Malay'},
];

export const citizenshipArr = [
  {label: 'Singaporean', value: 'Singaporean'},
  {label: 'Malaysian', value: 'Malaysian'},
  {label: 'Indian', value: 'Indian'},
  {label: 'Others', value: 'Others'},
];

export const nationality = [
  {label: 'Singaporean', value: 'Singaporean'},
  {label: 'Malaysian', value: 'Malaysian'},
  {label: 'Indian', value: 'Indian'},
  {label: 'Others', value: 'Others'},
];
export const empStatusArr = [
  {label: 'Active', value: 'Active'},
  {label: 'Retired', value: 'Retired'},
];

export const employeementTypeArr = [
  {label: 'Full-Time', value: 'Full-Time'},
  {label: 'Part-Time', value: 'Part-Time'},
  {label: 'Contract', value: 'Contract'},
  {label: 'Probation', value: 'Probation'},
  {label: 'Internship', value: 'Internship'},
  {label: 'Freelance', value: 'Freelance'},
];

export const bankDataArr = [
  {label: 'DBS/POSB', value: 'DBS/POSB'},
  {label: 'OCBC', value: 'OCBC'},
  {label: 'UOB', value: 'UOB'},
  {label: 'Maybank', value: 'Maybank'},
  {label: 'Citibank', value: 'Citibank'},
  {label: 'Standard Chartered', value: 'Standard Chartered'},
];

export const employeementStatusArr = [
  {label: 'Active', value: 'Active'},
  {label: 'Retired', value: 'Retired'},
];

export const gender = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Other', value: 'Othe'},
];

export const citizenship = [
  {label: 'Citizenship by birth', value: 'Citizenship by birth'},
  {label: 'Citizenship by registration', value: 'Citizenship by registration'},
  {
    label: 'Citizenship by naturalisation',
    value: 'Citizenship by naturalisation',
  },
];
export const nationalityData = [
  {label: 'Singaporean', value: 'Singaporean'},
  {label: 'Malaysian', value: 'Malaysian'},
  {label: 'Indian', value: 'Indian'},
  {label: 'Others', value: 'Others'},
];

export const pendingApplicationsData = [
  {name: 'Transport Claim', price: 100},
  {name: 'Medical Leave', price: 5},
];

export const courseData = [
  {
    id: 1,
    courseName: 'Course Name 1',
    status: 'Completed',
    progress: 10,
  },
  {
    id: 2,
    courseName: 'Course Name 2',
    status: 'Continue Here',
    progress: 5,
  },
];

export const empPayslipTbData = [
  {
    id: 1,
    month: 'January',
    takeHomePay: 0,
    grossSalary: 0,
    cpf: 0,
  },
  {
    id: 2,
    month: 'February',
    takeHomePay: 0,
    grossSalary: 0,
    cpf: 0,
  },
];

export const empAppraisalsTbData = [
  {
    appraisalID: 1,
    reviewer: 'Stanwin Siow',
    startDate: '01 Jan 2022',
    endDate: '25 Jan 2022',
    status: 'Completed',
  },
  {
    appraisalID: 2,
    reviewer: 'Stanwin Siow',
    startDate: '01 Feb 2022',
    endDate: '25 Feb 2022',
    status: 'Completed',
  },
];

export const empLeaveTbData = [
  {
    submittedDate: '01 Apr 2022',
    leaveType: 'Annual',
    leaveStartDate: '01 Jun 2022',
    leaveEndDate: '05 Jun 2022',
    noOfDays: 6,
    status: 'Approved',
  },
];

export const leaveDropDownData = [
  {label: 'Annual', value: 'Annual'},
  {label: 'Medical', value: 'Medical'},
  {label: 'Hospitalisation', value: 'Hospitalisation'},
  {label: 'Child', value: 'Child'},
  {label: 'Maternity', value: 'Maternity'},
  {label: 'Family Care', value: 'Family Care'},
  {label: 'Paternity', value: 'Paternity'},
];

export const empClaimTbData = [
  {
    submittedDate: '01 Apr 2022',
    claimType: 'Food',
    claimCategory: 'Dinner',
    amount: 200,
    expenditureDate: '01 Apr 2022',
    status: 'Approved',
  },
];

export const empViewAttendancesTbData = [
  {
    checkInDate: '01 Apr 2022',
    checkInTime: '09:00',
    checkInLocation: 'Outlet #1',
    checkOutDate: '01 Apr 2022',
    checkOutTime: '18:00',
    checkOutLocation: 'Outlet #1',
  },
];

export const jobPositions = [
  {
    technology: 'Technology',
    position: 'Full-Stack Developer',
    time: 'Full-Time',
    date: '03 October 2022',
    present: 'Present',
  },
  {
    technology: 'Technology',
    position: 'Full-Stack Developer',
    time: 'Full-Time',
    date: '03 October 2022',
    present: 'Present',
  },
];

export const PaymentDetailsArr = [
  {
    label: 'Opt out from Chinese Development Assistance Council (CDAC) scheme',
    isCheck: false,
  },
  {
    label: 'Set a fixed Chinese Development Assistance Council (CDAC) amount',
    isCheck: false,
  },
  {label: 'Opt in to Community Chest contributions', isCheck: false},
  {label: 'Exclude from Skills Development Levy (SDL)', isCheck: false},
  {label: 'Exclude from IRAS Auto-Inclusion Scheme (AIS)', isCheck: false},
  {
    label: 'Exclude from Central Provident Fund (CPF) contributions',
    isCheck: false,
  },
  {label: 'Allow Full Employer CPF', isCheck: false},
  // {label: 'Excluded from SHG Amount', isCheck: false},
  // {label: 'Include CPF in-lieu', isCheck: false},
];

export const uploadDocument = [
  {name: 'Pei Ling’s Resume.pdf'},
  {name: 'Pei Ling’s Resume.pdf'},
];

export const radioButtonsData = [
  {
    id: '1',
    label: 'A',
    value: 'A',
    isChecked: true,
  },
  {
    id: '2',
    label: 'B',
    value: 'B',
    isChecked: true,
  },
  {
    id: '3',
    label: 'C',
    value: 'C',
    isChecked: false,
  },
  {
    id: '4',
    label: 'D',
    value: 'D',
    isChecked: false,
  },
];

export const radioData = [
  {
    id: '1',
    value: 'A',
    isChecked: false,
    ans: '',
  },
  {
    id: '2',
    value: 'B',
    isChecked: false,
    ans: '',
  },
  {
    id: '3',
    value: 'C',
    isChecked: false,
    ans: '',
  },
  {
    id: '4',
    value: 'D',
    isChecked: false,
    ans: '',
  },
];

export const viewElearningTbView = [
  {
    moduleTitle: 'Title #1',
    endDate: '01 Apr 2022',
    score: '10 / 10',
    status: 'Completed',
  },
  {
    moduleTitle: 'Title #1',
    endDate: '01 Apr 2022',
    score: '10 / 10',
    status: 'Not Started Yet',
  },
];

export const PendingReviewApplicationsData = [
  {
    empName: 'Koh Pei Ling',
    applicationName: 'Transport Claim',
    count: 100,
  },
  {
    empName: 'Koh Pei Ling',
    applicationName: 'Medical Leave',
    count: 5,
  },
];

export const ReportingLineData = [
  {
    empName: 'Koh Pei Ling',
    empDepartment: 'Technology',
  },
  {
    empName: 'Kimberly Tan',
    empDepartment: 'Technology',
  },
  {
    empName: 'Keval Gondaliya',
    empDepartment: 'Technology',
  },
];

export const viewApproveLeavesTbData = [
  {
    submittedDate: '01 Apr 2022',
    employeeName: 'Koh Pei Ling',
    leaveType: 'Annual',
    leaveStartDate: '01 Jun 2022',
    leaveEndDate: '05 Jun 2022',
    noOfDays: 6,
    status: 'Approved',
  },
];

export const viewApproveClaimsTbData = [
  {
    submittedDate: '01 Apr 2022',
    employeeName: 'Koh Pei Ling',
    claimType: 'Food',
    claimCategory: 'Dinner',
    expenditureDate: '05 Jun 2022',
    status: 'Pending Approval',
  },
];

export const rmAppraisalsTbData = [
  {
    appraisalID: 1,
    employee: 'Stanwin Siow',
    startDate: '01 Jan 2022',
    endDate: '25 Jan 2022',
    nominee: 'Nominee Name',
  },
  {
    appraisalID: 2,
    employee: 'Stanwin Siow',
    startDate: '01 Jan 2022',
    endDate: '25 Jan 2022',
    nominee: 'Nominee Name',
  },
];

export const useWindowDimensions = () => {
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({window, screen});
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  }, []);
  return dimensions.screen.width;
};

export const questionArr = [
  {
    id: 1,
    name: 'Question',
  },
  {
    id: 2,
    name: 'Question',
  },
  {
    id: 3,
    name: 'Question',
  },
  {
    id: 4,
    name: 'Question',
  },
];

export const ansArr = [
  {label: 'Answer #1'},
  {label: 'Answer #2'},
  {label: 'Answer #3'},
  {label: 'Answer #4'},
];

export const viewAppraisalCyclesTbData = [
  {
    cycleID: '1',
    flowType: 'Downward',
    template: 'Top Management',
    startDate: '01 Jan 2022',
    endDate: '31 Jan 2022',
    employeeEndDate: '20 Jan 2022',
  },
];

export const claimTypeArr = [
  {
    description: 'Food',
    limitPeriod: 'No Limit',
    claimLimit: 'Unlimited',
    category: 'Breakfast, Lunch, Dinner',
  },
];

export const viewAllClaimsArr = [
  {
    claimID: 1,
    claimDate: '03 May 2022',
    employeeID: 'TM0001',
    name: 'Stanwin Siow',
    claimDescription: 'Food',
    category: 'Dinner',
    amount: 300,
  },
];

export const viewAllallownceArr = [
  {
    allowanceID: 1,
    allowanceDate: '03 May 2022',
    employeeID: 'TM0001',
    name: 'Stanwin Siow',
    allowanceDescription: 'Housing',
    amount: 300,
  },
];

export const viewAllowanceArr = [
  {
    description: 'Housing',
    position: 'CEO',
    limitPeriod: 'Amount per month',
    allowanceLimit: 5000,
  },
];

export const leaveTypeArr = [
  {
    description: 'Annual',
    entitledTo: 'All Employees',
    gender: 'Both',
    paidLeave: 'Yes',
    prorate: 'Yes',
    reasonRequired: 'Yes',
    proofRequired: 'Yes',
  },
];

export const leaveTransactionsArr = [
  {
    leaveID: '1',
    submittedDate: '03 May 2022',
    employeeID: 'TM0001',
    name: 'Stanwin Siow',
    leaveDescription: 'Annual',
    startDate: '03 May 2022',
    endDate: '04 May 2022',
  },
];

export const deductionTypeArr = [
  {
    description: 'Damaged Goods',
    allowInstalments: 'Yes',
    requireDocuments: 'Yes',
  },
];

export const deductionTransactionArr = [
  {
    deductionID: 1,
    description: 'Damaged Goods',
    employeeID: 'TM0001',
    name: 'Stanwin Siow',
    comments: 'Company’s Laptop',
    percentage: '10',
    instalments: 'Yes',
    period: '12',
  },
];

export const eLearningArr = [
  {
    title: 'Damaged Goods',
    department: 'TM0001',
    position: 'Stanwin Siow',
    period: 'Company’s Laptop',
  },
];

export const eLearningIndiArr = [
  {
    eLearningID: 1,
    moduleTitle: 'Module #1',
    progress: 80,
    score: 10,
  },
];

export const appraisalTemplatesArr = [
  {
    appraisalID: 'Module #1',
    templateName: 'Name #1',
    department: 'Top Management',
    positions: 'All Positions',
  },
];

export const ViewEmployeesReport = [
  {
    employeeID: 'TM0001',
    name: 'Stanwin Siow',
    organisation: 'HR Simplify',
    department: 'Top Management',
    position: 'CEO',
  },
  {
    employeeID: 'TM0001',
    name: 'Stanwin Siow',
    organisation: 'HR Simplify',
    department: 'Top Management',
    position: 'CEO',
  },
];

export const ViewIRASReportData = [
  {
    transacted_Date: '2022',
    organisation: 'HR Simplify',
  },
  {
    transacted_Date: '2022',
    organisation: 'HR Simplify',
  },
];
export const ViewCPFReportData = [
  {
    date: '31 January 2022',
    organisation: 'HR Simplify',
    amount: 2000,
  },
  {
    date: '31 January 2022',
    organisation: 'HR Simplify',
    amount: 2000,
  },
];

export const irasDataArray = [
  {label: 'Year', description: '2022'},
  {label: 'Month', description: 'January'},
  {label: 'Organisation', description: 'HR Simplify'},
];

export const payslipReportDataArray = [
  {label: 'Year', description: '2022'},
  {label: 'Month', description: 'January'},
  {label: 'Organisation', description: 'HR Simplify'},
  {label: 'Department', description: 'Technology'},
];

export const AllowancesReportDataArray = [
  {label: 'Year', description: '2022'},
  {label: 'Month', description: 'January'},
  {label: 'Organisation', description: 'HR Simplify'},
  {label: 'Department', description: 'Technology'},
  {label: 'Allowance Type', description: 'Housing'},
];

export const LeaveReportDataArray = [
  {label: 'Year', description: '2022'},
  {label: 'Month', description: 'January'},
  {label: 'Organisation', description: 'HR Simplify'},
  {label: 'Department', description: 'Technology'},
  {label: 'Leave Type', description: 'Medical'},
];

export const ClaimTypeDataArray = [
  {label: 'Year', description: '2022'},
  {label: 'Month', description: 'January'},
  {label: 'Organisation', description: 'HR Simplify'},
  {label: 'Department', description: 'Technology'},
  {label: 'Claim Type', description: 'Medical'},
];

export const AttendanceReportDataArray = [
  {label: 'Year', description: '2022'},
  {label: 'Month', description: 'January'},
  {label: 'Organisation', description: 'HR Simplify'},
  {label: 'Department', description: 'Technology'},
  {label: 'Branch', description: 'Branch #1'},
];

export const ViewPaySlipsReportData = [
  {
    id: 1,
    name: 'Stanwin Siow',
    organisation: 'HR Simplify',
    department: 'Technology',
    amount: 2000,
  },
  {
    id: 2,
    name: 'Stanwin Siow',
    organisation: 'HR Simplify',
    department: 'Technology',
    amount: 2000,
  },
];

export const holidayTbData = [
  {
    itemName: 'New Year’s',
    date: '01 Jan 2022',
  },
  {
    itemName: 'Chinese New Year Day 1',
    date: '01 Feb 2022',
  },
];

export const statusArrData = [
  {
    label: 'Approve',
    value: 'Approve',
  },
  {value: 'Reject', label: 'Reject'},
];

export const multiChoiceData = [
  {
    id: '1',
    value: 'A',
    isChecked: false,
    ans: '',
  },
  {
    id: '2',
    value: 'B',
    isChecked: false,
    ans: '',
  },
  {
    id: '3',
    value: 'C',
    isChecked: false,
    ans: '',
  },
  {
    id: '4',
    value: 'D',
    isChecked: false,
    ans: '',
  },
];

export const EditMultiChoiceData = [
  {
    id: '1',
    value: 'A',
    isChecked: false,
    ans: '',
  },
  {
    id: '2',
    value: 'B',
    isChecked: false,
    ans: '',
  },
  {
    id: '3',
    value: 'C',
    isChecked: false,
    ans: '',
  },
  {
    id: '4',
    value: 'D',
    isChecked: false,
    ans: '',
  },
];

export const multiCheckData = [
  {
    id: '1',
    value: 'A',
    isChecked: false,
    ans: '',
  },
  {
    id: '2',
    value: 'B',
    isChecked: false,
    ans: '',
  },
  {
    id: '3',
    value: 'C',
    isChecked: false,
    ans: '',
  },
  {
    id: '4',
    value: 'D',
    isChecked: false,
    ans: '',
  },
];

export const EditMultiCheckData = [
  {
    id: '1',
    value: 'A',
    isChecked: false,
    ans: '',
  },
  {
    id: '2',
    value: 'B',
    isChecked: false,
    ans: '',
  },
  {
    id: '3',
    value: 'C',
    isChecked: false,
    ans: '',
  },
  {
    id: '4',
    value: 'D',
    isChecked: false,
    ans: '',
  },
];

export const radioButtonArr = [
  {
    id: '1',
    value: 'A',
    isChecked: false,
  },
  {
    id: '2',
    value: 'B',
    isChecked: false,
  },
  {
    id: '3',
    value: 'C',
    isChecked: false,
  },
  {
    id: '4',
    value: 'D',
    isChecked: false,
  },
];

export const editRadioButtonArr = [
  {
    id: '1',
    label: 'A',
    value: 'A',
    isChecked: false,
  },
  {
    id: '2',
    value: 'B',
    label: 'B',
    isChecked: false,
  },
  {
    id: '3',
    value: 'C',
    label: 'C',
    isChecked: false,
  },
  {
    id: '4',
    value: 'D',
    label: 'D',
    isChecked: false,
  },
];

export const AMCSDataArray = [
  {label: 'Yearly', value: 'Yearly'},
  {label: 'Monthly', value: 'Monthly'},
];

export const AMCSAmountDataArray = [
  {label: 'Fixed Amount', value: 'Fixed Amount'},
  {label: 'Percentage', value: 'Percentage'},
];
export const addressType = [
  {label: 'Foreign', value: 'Foreign'},
  {label: 'National', value: 'National'},
];

export const citizenshipCode = [
  {label: '351 - AFGHAN', value: '351'},
  {label: '201 - ALBANIAN', value: '201'},
  {label: '401 - ALGERIAN', value: '401'},
  {label: '503 - AMERICAN', value: '503'},
  {label: '721 - AMERICAN SAMOA', value: '721'},
  {label: '153 - ANDORRAN', value: '153'},
  {label: '451 - ANGOLAN', value: '451'},
  {label: '670 - ANGUILLA', value: '670'},
  {label: '673 - ANTARCTICA', value: '673'},
  {label: '641 - ANTIGUA', value: '641'},
  {label: '601 - ARGENTINIAN', value: '601'},
  {label: '217 - ARMENIAN', value: '217'},
  {label: '625 - ARUBA', value: '625'},
  {label: '701 - AUSTRALIAN', value: '701'},
  {label: '131 - AUSTRIAN', value: '131'},
  {label: '218 - AZERBAIJANI', value: '218'},
  {label: '642 - BAHAMAS', value: '642'},
  {label: '371 - BAHRAINI', value: '371'},
  {label: '352 - BANGLADESHI', value: '352'},
  {label: '643 - BARBADOS', value: '643'},
  {label: '211 - BELARUSSIAN', value: '211'},
  {label: '101 - BELGIAN', value: '101'},
  {label: '644 - BELIZE', value: '644'},
  {label: '452 - BENIN', value: '452'},
  {label: '645 - BERMUDAN', value: '645'},
  {label: '353 - BHUTAN', value: '353'},
  {label: '646 - BOLIVIAN', value: '646'},
  {label: '994 - BOSNIAN', value: '994'},
  {label: '453 - BOTSWANA', value: '453'},
  {label: '139 - BOUVET ISLAND', value: '139'},
  {label: '738 - BR NAT. OVERSEAS', value: '738'},
  {label: '995 - BR OVERSEAS CIT.', value: '995'},
  {label: '996 - BR PROTECTED PERS.', value: '996'},
  {label: '602 - BRAZILIAN', value: '602'},
  {label: '110 - BRITISH', value: '110'},
  {label: '675 - BRITISH DEPENDENT TERR CITIZEN', value: '675'},
  {label: '708 - BRITISH INDIAN OCEAN', value: '708'},
  {label: '886 - BRITISH SUBJECT', value: '886'},
  {label: '671 - BRITISH VIRGIN ISLND', value: '671'},
  {label: '302 - BRUNEIAN', value: '302'},
  {label: '202 - BULGARIAN', value: '202'},
  {label: '454 - BURKINA FASO', value: '454'},
  {label: '455 - BURUNDI', value: '455'},
  {label: '312 - CAMBODIAN', value: '312'},
  {label: '456 - CAMEROON', value: '456'},
  {label: '501 - CANADIAN', value: '501'},
  {label: '457 - CAPE VERDE', value: '457'},
  {label: '647 - CAYMANESE', value: '647'},
  {label: '458 - CENTRAL AFRICAN REP', value: '458'},
  {label: '459 - CHADIAN', value: '459'},
  {label: '603 - CHILEAN', value: '603'},
  {label: '336 - CHINESE', value: '336'},
  {label: '709 - CHRISTMAS ISLANDS', value: '709'},
  {label: '710 - COCOS KEELING ISLAND', value: '710'},
  {label: '604 - COLOMBIAN', value: '604'},
  {label: '460 - COMOROS', value: '460'},
  {label: '461 - CONGO', value: '461'},
  {label: '722 - COOK ISLANDS', value: '722'},
  {label: '648 - COSTA RICAN', value: '648'},
  {label: '232 - CROATIAN', value: '232'},
  {label: '621 - CUBAN', value: '621'},
  {label: '372 - CYPRIOT', value: '372'},
  {label: '234 - CZECH', value: '234'},
  {label: '203 - CZECHOSLOVAK', value: '203'},
  {label: '102 - DANISH', value: '102'},
  {label: '674 - DEMOCRATIC REP OF THE CONGO', value: '674'},
  {label: '407 - DJIBOUTI', value: '407'},
  {label: '649 - DOMINICA', value: '649'},
  {label: '622 - DOMINICAN REPUBLIC', value: '622'},
  {label: '991 - DUTCH', value: '991'},
  {label: '887 - EAST TIMORESE', value: '887'},
  {label: '605 - ECUADORIAN', value: '605'},
  {label: '402 - EGYPTIAN', value: '402'},
  {label: '462 - EQUATORIAL GUINEA', value: '462'},
  {label: '410 - ERITREA', value: '410'},
  {label: '213 - ESTONIAN', value: '213'},
  {label: '408 - ETHIOPIAN', value: '408'},
  {label: '141 - FAEROE ISLANDS', value: '141'},
  {label: '651 - FALKLAND IS', value: '651'},
  {label: '702 - FIJIAN', value: '702'},
  {label: '305 - FILIPINO', value: '305'},
  {label: '132 - FINNISH', value: '132'},
  {label: '103 - FRENCH', value: '103'},
  {label: '652 - FRENCH GUIANA', value: '652'},
  {label: '723 - FRENCH POLYNESIA', value: '723'},
  {label: '711 - FRENCH SOUTHERN TERR', value: '711'},
  {label: '463 - GABON', value: '463'},
  {label: '464 - GAMBIAN', value: '464'},
  {label: '216 - GEORGIA', value: '216'},
  {label: '104 - GERMAN', value: '104'},
  {label: '421 - GHANAIAN', value: '421'},
  {label: '154 - GIBRALTAR', value: '154'},
  {label: '105 - GREEK', value: '105'},
  {label: '142 - GREENLAND', value: '142'},
  {label: '653 - GRENADIAN', value: '653'},
  {label: '654 - GUADELOUPE', value: '654'},
  {label: '724 - GUAM', value: '724'},
  {label: '655 - GUATEMALA', value: '655'},
  {label: '465 - GUINEA', value: '465'},
  {label: '466 - GUINES BISSAU', value: '466'},
  {label: '656 - GUYANA', value: '656'},
  {label: '657 - HAITIAN', value: '657'},
  {label: '712 - HEARD MCDONALD ISLND', value: '712'},
  {label: '658 - HONDURAN', value: '658'},
  {label: '332 - HONG KONG', value: '332'},
  {label: '205 - HUNGARIAN', value: '205'},
  {label: '133 - ICELAND', value: '133'},
  {label: '303 - INDONESIAN', value: '303'},
  {label: '373 - IRANIAN', value: '373'},
  {label: '374 - IRAQI', value: '374'},
  {label: '106 - IRISH', value: '106'},
  {label: '672- ISLE OF MAN', value: '672'},
  {label: '375 - ISRAELI', value: '375'},
  {label: '107 - ITALIAN', value: '107'},
  {label: '422 - IVORY COAST', value: '422'},
  {label: '659 - JAMAICAN', value: '659'},
  {label: '331 - JAPANESE', value: '331'},
  {label: '376 - JORDANIAN', value: '376'},
  {label: '676 - KAMPUCHEAN', value: '676'},
  {label: '221 - KAZAKH', value: '221'},
  {label: '423 - KENYAN', value: '423'},
  {label: '219 - KIRGHIZ', value: '219'},
  {label: '725 - KIRIBATI', value: '725'},
  {label: '337 - KOREAN, NORTH', value: '337'},
  {label: '333 - KOREAN, SOUTH', value: '333'},
  {label: '677 - KOSOVAR', value: '677'},
  {label: '377 - KUWAITI', value: '377'},
  {label: '990 - KYRGHIS', value: '990'},
  {label: '894 - KYRGYZSTAN', value: '894'},
  {label: '313 - LAOTIAN', value: '313'},
  {label: '214 - LATVIAN', value: '214'},
  {label: '378 - LEBANESE', value: '378'},
  {label: '467 - LESOTHO', value: '467'},
  {label: '424 - LIBERIAN', value: '424'},
  {label: '403 - LIBYAN', value: '403'},
  {label: '138 - LIECHTENSTEIN', value: '138'},
  {label: '215 - LITHUANIA', value: '215'},
  {label: '108 - LUXEMBOURG', value: '108'},
  {label: '335 - MACAO', value: '335'},
  {label: '210 - MACEDONIA', value: '210'},
  {label: '425 - MADAGASCAR', value: '425'},
  {label: '468 - MALAWI', value: '468'},
  {label: '355 - MALDIVIAN', value: '355'},
  {label: '469 - MALI', value: '469'},
  {label: '155 - MALTESE', value: '155'},
  {label: '735 - MARSHELLES', value: '735'},
  {label: '661 - MARTINIQUE', value: '661'},
  {label: '470 - MAURITANEAN', value: '470'},
  {label: '426 - MAURITIAN', value: '426'},
  {label: '606 - MEXICAN', value: '606'},
  {label: '736 - MICRONESIAN', value: '736'},
  {label: '222 - MOLDOVIAN', value: '222'},
  {label: '143 - MONACO', value: '143'},
  {label: '338 - MONGOLIAN', value: '338'},
  {label: '678 - MONTENEGRIN', value: '678'},
  {label: '662 - MONTSERRAT', value: '662'},
  {label: '404 - MOROCCAN', value: '404'},
  {label: '427 - MOZAMBIQUE', value: '427'},
  {label: '311 - MYANMAR', value: '311'},
  {label: '471 - NAMIBIA', value: '471'},
  {label: '703 - NAURUAN', value: '703'},
  {label: '356 - NEPALESE', value: '356'},
  {label: '109 - NETHERLANDS', value: '109'},
  {label: '623 - NETHERLANDS ANTIL.', value: '623'},
  {label: '704 - NEW CALEDONIA', value: '704'},
  {label: '705 - NEW ZEALANDER', value: '705'},
  {label: '660 - NICARAGUAN', value: '660'},
  {label: '472 - NIGER', value: '472'},
  {label: '428 - NIGERIAN', value: '428'},
  {label: '726 - NIUE ISLAND', value: '726'},
  {label: '713 - NORFOLK ISLAND', value: '713'},
  {label: '734 - NORTHERN MARIANA ISL', value: '734'},
  {label: '134 - NORWEGIAN', value: '134'},
  {label: '699 - OC CTRL STH AMERICA', value: '699'},
  {label: '499 - OC IN OTHER AFRICA', value: '499'},
  {label: '319 - OC IN S E ASIA', value: '319'},
  {label: '509 - OC NORTH AMERICA', value: '509'},
  {label: '799 - OC OCEANIA', value: '799'},
  {label: '379 - OMAN', value: '379'},
  {label: '999 - OTHERS', value: '999'},
  {label: '357 - PACIFIC IS TRUST T', value: '357'},
  {label: '737 - PAKISTANI', value: '737'},
  {label: '386 - PALAU', value: '386'},
  {label: '624 - PALESTINIAN', value: '624'},
  {label: '706 - PANAMANIAN', value: '706'},
  {label: '607 - PAPUA NEW GUINEA', value: '607'},
  {label: '336 - PARAGUAY', value: '336'},
  {label: '608 - PERUVIAN', value: '608'},
  {label: '305 - PITCAIRN', value: '305'},
  {label: '727 - PITCAIRN', value: '727'},
  {label: '206- POLISH', value: '206'},
  {label: '111 - PORTUGUESE', value: '111'},
  {label: '502 - PUERTO RICAN', value: '502'},
  {label: '380 - QATAR', value: '380'},
  {label: '429 - REUNION', value: '429'},
  {label: '207 - ROMANIAN', value: '207'},
  {label: '223 - RUSSIAN', value: '223'},
  {label: '473 - RWANDA', value: '473'},
  {label: '663 - SAINT KITTS NEVIS', value: '663'},
  {label: '650 - SALVADORAN', value: '650'},
  {label: '707 - SAMOAN', value: '707'},
  {label: '144 - SAN MARINO', value: '144'},
  {label: '474 - SAO TOME PRINCI', value: '474'},
  {label: '381 - SAUDI ARABIAN', value: '381'},
  {label: '475 - SENEGALESE', value: '475'},
  {label: '679 - SERBIAN', value: '679'},
  {label: '476 - SEYCHELLES', value: '476'},
  {label: '477 - SIERRA LEONE', value: '477'},
  {label: '235 - SLOVAK', value: '235'},
  {label: '233 - SLOVENIAN', value: '233'},
  {label: '728 - SOLOMON ISLANDS', value: '728'},
  {label: '409 - SOMALI', value: '409'},
  {label: '478 - SOUTH AFRICAN', value: '478'},
  {label: '112 - SPANISH', value: '112'},
  {label: '358 - SRI LANKAN', value: '358'},
  {label: '484 - ST HELENA', value: '484'},
  {label: '664 - ST LUCIA', value: '664'},
  {label: '505 - ST PIERRE MIQUELON', value: '505'},
  {label: '665 - ST VINCENT', value: '665'},
  {label: '405 - SUDANESE', value: '405'},
  {label: '666 - SURINAME', value: '666'},
  {label: '135 - SVALBARD JAN MAYEN', value: '135'},
  {label: '480 - SWAZI', value: '480'},
  {label: '136 - SWEDISH', value: '136'},
  {label: '137 - SWISS', value: '137'},
  {label: '382 - SYRIAN', value: '382'},
  {label: '224 - TADZHIK', value: '224'},
  {label: '334 - TAIWANESE', value: '334'},
  {label: '992 - TAJIKISTANI', value: '992'},
  {label: '430 - TANZANIAN', value: '430'},
  {label: '306 - THAI', value: '306'},
  {label: '307 - TIMORENSE', value: '307'},
  {label: '481 - TOGO', value: '481'},
  {label: '729 - TOKELAU ISLANDS', value: '729'},
  {label: '730 - TONGA', value: '730'},
  {label: '667 - TRINIDAD AND TOBAGO', value: '667'},
  {label: '406 - TUNISIA', value: '406'},
  {label: '152 - TURK', value: '152'},
  {label: '225 - TURKMEN', value: '225'},
  {label: '668 - TURKS AND CAICOS IS', value: '668'},
  {label: '731 - TUVALU', value: '731'},
  {label: '504 - U S MINOR ISLANDS', value: '504'},
  {label: '431 - UGANDIAN', value: '431'},
  {label: '212 - UKRAINIAN', value: '212'},
  {label: '383 - UNITED ARAB EM.', value: '383'},
  {label: '889 - UNKNOWN', value: '889'},
  {label: '993 - UPPER VOLTA', value: '993'},
  {label: '609 - URUGUAY', value: '609'},
  {label: '226 - UZBEK', value: '226'},
  {label: '732 - VANUATU', value: '732'},
  {label: '145 - VATICAN CITY STATE', value: '145'},
  {label: '610 - VENEZUELAN', value: '610'},
  {label: '314 - VIETNAMESE', value: '314'},
  {label: '669 - VIRGIN ISLANDS US', value: '669'},
  {label: '733 - WALLIS AND FUTUNA', value: '733'},
  {label: '479 - WESTERN SAHARA', value: '479'},
  {label: '388 - YEMEN ARAB REP', value: '388'},
  {label: '387 - YEMEN, SOUTH', value: '387'},
  {label: '384 - YEMENI', value: '384'},
  {label: '209 - YUGOSLAV', value: '209'},
  {label: '482 - ZAIRAN', value: '482'},
  {label: '432 - ZAMBIAN', value: '432'},
  {label: '483 - ZIMBABWEAN', value: '483'},
];
