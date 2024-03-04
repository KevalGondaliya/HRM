// export const API_URL =
//   'https://322d-2405-201-200c-c118-f037-5afe-d410-1621.ngrok-free.app';
export const API_URL = 'http://159.223.87.53:8082';
export const SINGAPORE_GOV_URL = 'https://apiservices.iras.gov.sg/iras/prod/';
import XLSX from 'xlsx';
var RNFS = require('react-native-fs');

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

export const limitPeriodData = [
  {label: '1 Month', value: '1 Month'},
  {label: '2 Month', value: '2 Month'},
  {label: '3 Month', value: '3 Month'},
  {label: '4 Month', value: '4 Month'},
  {label: '5 Month', value: '5 Month'},
  {label: '6 Month', value: '6 Month'},
  {label: '7 Month', value: '7 Month'},
  {label: '8 Month', value: '8 Month'},
  {label: '9 Month', value: '9 Month'},
  {label: '10 Month', value: '10 Month'},
  {label: '11 Month', value: '11 Month'},
  {label: '12 Month', value: '12 Month'},
  {label: 'Unlimited', value: 'Unlimited'},
];

export const recurringPeriodArrData = [
  {label: 'Daily', value: 'Daily'},
  {label: 'Monthly', value: 'Monthly'},
  {label: 'Annually', value: 'Annually'},
];

export const businessType = [
  {
    label: 'Sole Proprietorship/ Sole Trader',
    value: 'Sole Proprietorship/ Sole Trader',
  },
  {
    label: 'Ordinary Business Partnership',
    value: 'Ordinary Business Partnership',
  },
  {
    label: 'Limited Partnership (LP)',
    value: 'Limited Partnership (LP)',
  },
  {
    label: 'Limited Liability Partnership (LLP)',
    value: 'Limited Liability Partnership (LLP)',
  },
  {
    label: 'Private Company Limited By Shares',
    value: 'Private Company Limited By Shares',
  },
];

export const industrySectorType = [
  {label: 'Healthcare', value: 'Healthcare'},
  {label: 'Financial Services', value: 'Financial Services'},
  {label: 'Technology', value: 'Technology'},
  {label: 'Industrials', value: 'Industrials'},
  {label: 'Consumer Cyclical', value: 'Consumer Cyclical'},
  {label: 'Energy', value: 'Energy'},
  {label: 'Real Estate', value: 'Real Estate'},
  {label: 'Consumer Defensive', value: 'Consumer Defensive'},
  {label: 'Communication Services', value: 'Communication Services'},
  {label: 'Basic Materials', value: 'Basic Materials'},
  {label: 'Utilities', value: 'Utilities'},
];

export const monthData = [
  {label: 'January', value: 'January'},
  {label: 'February', value: 'February'},
  {label: 'March', value: 'March'},
  {label: 'April', value: 'April'},
  {label: 'May', value: 'May'},
  {label: 'June', value: 'June'},
  {label: 'July', value: 'July'},
  {label: 'August', value: 'August'},
  {label: 'September', value: 'September'},
  {label: 'October', value: 'October'},
  {label: 'November', value: 'November'},
  {label: 'December', value: 'December'},
];

export const approverType = [
  // { label: 'An Employee', value: 'An Employee' },
  // { label: 'An Approval Group', value: 'An Approval Group' },
  {label: 'RM', value: 'RM'},
];
export const category = [
  {label: 'Leave', value: 'Leave'},
  {label: 'Appraisal', value: 'Appraisal'},
];
export const empTypeArr = [
  {label: 'Employee', value: 'Employee'},
  {label: 'RM', value: 'RM'},
];

export const categoryDataArr = [
  // { label: 'Attendance Logs', value: 'Attendance Logs' },
  {label: 'Leaves', value: 'Leaves'},
  {label: 'Claims', value: 'Claims'},
];

export const claimTypeDataArr = [
  {label: 'Food', value: 'Food'},
  {label: 'Transfer', value: 'Transfer'},
  {label: 'Overtime', value: 'Overtime'},
];

export const claimTypeCatagoryDataArr = [
  {label: 'Dinner', value: 'Dinner'},
  {label: 'Taxi', value: 'Taxi'},
  {label: 'Over Time', value: 'Over Time'},
];

export const statusData = [
  {
    label: 'IN OFFICE',
    value: 'IN OFFICE',
  },
  {
    label: 'ON LEAVE — MEDICAL',
    value: 'ON LEAVE — MEDICAL',
  },
  {
    label: 'OUT OF OFFICE — CONTACTABLE',
    value: 'OUT OF OFFICE — CONTACTABLE',
  },
  {
    label: 'OUT OF OFFICE — UNCONTACTABLE',
    value: 'OUT OF OFFICE — UNCONTACTABLE',
  },
];

export const currencyDataArr = [{label: 'SGD', value: 'SGD'}];
export const payTypeDataArr = [
  {label: 'Cash', value: 'cash'},
  {label: 'Net Banking', value: 'net-banking'},
];
export const paymentMethodDataArr = [
  {label: 'GIRO', value: 'GIRO'},
  {label: 'Cheque', value: 'Cheque'},
  {label: 'Others', value: 'Others'},
];

export const unusedLeaveDaysArr = [
  {label: 'Forfeit All', value: 'Forfeit All'},
  {label: 'Carry Forward', value: 'Carry Forward'},
  {label: 'Encash', value: 'Encash'},
];

export const employeeOffboardsDaysArr = [
  {label: 'Forfeit All', value: 'Forfeit All'},
  {label: 'Encash', value: 'Encash'},
];

export const prorateByArr = [
  {label: 'Days', value: 'Days'},
  {label: 'Months', value: 'Months'},
];

export const roundingByArr = [
  {label: 'Round Up', value: 'Round Up'},
  {label: 'Round Down', value: 'Round Down'},
];

export const roundingToArr = [
  {label: 'Nearest Whole Number', value: 'Nearest Whole Number'},
  {label: 'Nearest Half 0.5', value: 'Nearest Half 0.5'},
];

export const entitledToArr = [
  {label: 'All Employees', value: 'All Employees'},
  {label: 'Specific Positions', value: 'Specific Positions'},
];

export const eLearningTypeArr = [
  {label: 'Customise', value: 'Customise'},
  {label: 'Upload Modules', value: 'Upload Modules'},
];
export const scoreData = [
  {label: 'Above Expectations', value: 'Above Expectations'},
  {label: 'Meets Expectations', value: 'Meets Expectations'},
  {
    label: 'Partially Meets Expectations',
    value: 'Partially Meets Expectations',
  },
  {label: 'Did not meet Expectations', value: 'Did not meet Expectations'},
];

export const completedMonthData = [
  {label: 'No Limit', value: 'No Limit'},
  {label: '1 month from joined date', value: '1 month from joined date'},
  {label: '2 month from joined date', value: '2 month from joined date'},
  {label: '3 month from joined date', value: '3 month from joined date'},
  {label: '4 month from joined date', value: '4 month from joined date'},
  {label: '5 month from joined date', value: '5 month from joined date'},
  {label: '6 month from joined date', value: '6 month from joined date'},
  {label: '7 month from joined date', value: '7 month from joined date'},
  {label: '8 month from joined date', value: '8 month from joined date'},
  {label: '9 month from joined date', value: '9 month from joined date'},
  {label: '10 month from joined date', value: '10 month from joined date'},
  {label: '11 month from joined date', value: '11 month from joined date'},
  {label: '1 year from joined date', value: '1 year from joined date'},
];

export const claimLimitTypeData = [
  {label: 'No Limit', value: 'No Limit'},
  {label: 'Each Claim Amount', value: 'Each Claim Amount'},
  {label: 'Amount Per Day', value: 'Amount Per Day'},
  {label: 'Amount Per Week', value: 'Amount Per Week'},
  {label: 'Amount Per Month', value: 'Amount Per Month'},
  {label: 'Amount Per Calendar Year', value: 'Amount Per Calendar Year'},
  {label: 'Amount Per Financial Year', value: 'Amount Per Financial Year'},
];

export const salaryArrData = [
  {label: 'By Amount', value: 'By Amount'},
  {label: 'By Percentage', value: 'By Percentage'},
];

export const workingHrArr = [
  {label: 'Fixed Working Days', value: 'Fixed Working Days'},
  {label: 'Flexible Working Days', value: 'Flexible Working Days'},
];

export const currencyArrData = [
  {label: 'ALL', value: 'ALL'},
  {label: 'AFN', value: 'AFN'},
  {label: 'ARS', value: 'ARS'},
  {label: 'AWG', value: 'AWG'},
  {label: 'AUD', value: 'AUD'},
  {label: 'AZN', value: 'AZN'},
  {label: 'BSD', value: 'BSD'},
  {label: 'BBD', value: 'BBD'},
  {label: 'BYN', value: 'BYN'},
  {label: 'BZD', value: 'BZD'},
  {label: 'BMD', value: 'BMD'},
  {label: 'BOB', value: 'BOB'},
  {label: 'BAM', value: 'BAM'},
  {label: 'BAM', value: 'BAM'},
  {label: 'BGN', value: 'BGN'},
  {label: 'BRL', value: 'BRL'},
  {label: 'BND', value: 'BND'},
  {label: 'KHR', value: 'KHR'},
  {label: 'CAD', value: 'CAD'},
  {label: 'KYD', value: 'KYD'},
  {label: 'CLP', value: 'CLP'},
  {label: 'CNY', value: 'CNY'},
  {label: 'COP', value: 'COP'},
  {label: 'CRC', value: 'CRC'},
  {label: 'HRK', value: 'HRK'},
  {label: 'CUP', value: 'CUP'},
  {label: 'CZK', value: 'CZK'},
  {label: 'DKK', value: 'DKK'},
  {label: 'DOP', value: 'DOP'},
  {label: 'XCD', value: 'XCD'},
  {label: 'EGP', value: 'EGP'},
  {label: 'SVC', value: 'SVC'},
  {label: 'EUR', value: 'EUR'},
  {label: 'FKP', value: 'FKP'},
  {label: 'FJD', value: 'FJD'},
  {label: 'GHS', value: 'GHS'},
  {label: 'GIP', value: 'GIP'},
  {label: 'GTQ', value: 'GTQ'},
  {label: 'GGP', value: 'GGP'},
  {label: 'GYD', value: 'GYD'},
  {label: 'HNL', value: 'HNL'},
  {label: 'HKD', value: 'HKD'},
  {label: 'HUF', value: 'HUF'},
  {label: 'ISK', value: 'ISK'},
  {label: 'INR', value: 'INR'},
  {label: 'IDR', value: 'IDR'},
  {label: 'IRR', value: 'IRR'},
  {label: 'IMP', value: 'IMP'},
  {label: 'ILS', value: 'ILS'},
  {label: 'JMD', value: 'JMD'},
  {label: 'JPY', value: 'JPY'},
  {label: 'JEP', value: 'JEP'},
  {label: 'KZT', value: 'KZT'},
  {label: 'KPW', value: 'KPW'},
  {label: 'KRW', value: 'KRW'},
  {label: 'KGS', value: 'KGS'},
  {label: 'LAK', value: 'LAK'},
  {label: 'LBP', value: 'LBP'},
  {label: 'LRD', value: 'LRD'},
  {label: 'MKD', value: 'MKD'},
  {label: 'MYR', value: 'MYR'},
  {label: 'MUR', value: 'MUR'},
  {label: 'MXN', value: 'MXN'},
  {label: 'MNT', value: 'MNT'},
  {label: 'MNT', value: 'MNT'},
  {label: 'MZN', value: 'MZN'},
  {label: 'NAD', value: 'NAD'},
  {label: 'NPR', value: 'NPR'},
  {label: 'ANG', value: 'ANG'},
  {label: 'NZD', value: 'NZD'},
  {label: 'NIO', value: 'NIO'},
  {label: 'NGN', value: 'NGN'},
  {label: 'NOK', value: 'NOK'},
  {label: 'OMR', value: 'OMR'},
  {label: 'PKR', value: 'PKR'},
  {label: 'PAB', value: 'PAB'},
  {label: 'PYG', value: 'PYG'},
  {label: 'PEN', value: 'PEN'},
  {label: 'PHP', value: 'PHP'},
  {label: 'PLN', value: 'PLN'},
  {label: 'QAR', value: 'QAR'},
  {label: 'RON', value: 'RON'},
  {label: 'RUB', value: 'RUB'},
  {label: 'SHP', value: 'SHP'},
  {label: 'SAR', value: 'SAR'},
  {label: 'RSD', value: 'RSD'},
  {label: 'SCR', value: 'SCR'},
  {label: 'SGD', value: 'SGD'},
  {label: 'SBD', value: 'SBD'},
  {label: 'SOS', value: 'SOS'},
  {label: 'KRW', value: 'KRW'},
  {label: 'ZAR', value: 'ZAR'},
  {label: 'LKR', value: 'LKR'},
  {label: 'SEK', value: 'SEK'},
  {label: 'CHF', value: 'CHF'},
  {label: 'SRD', value: 'SRD'},
  {label: 'SYP', value: 'SYP'},
  {label: 'TWD', value: 'TWD'},
  {label: 'THB', value: 'THB'},
  {label: 'TTD', value: 'TTD'},
  {label: 'TRY', value: 'TRY'},
  {label: 'TVD', value: 'TVD'},
  {label: 'UAH', value: 'UAH'},
  {label: 'AED', value: 'AED'},
  {label: 'GBP', value: 'GBP'},
  {label: 'USD', value: 'USD'},
  {label: 'UYU', value: 'UYU'},
  {label: 'UZS', value: 'UZS'},
  {label: 'VEF', value: 'VEF'},
  {label: 'VND', value: 'VND'},
  {label: 'YER', value: 'YER'},
  {label: 'ZWD', value: 'ZWD'},
  {label: 'TTD', value: 'TTD'},
];

export const excelDataDownload = (reportData, reportDataName, dispatch) => {
  console.log('reportData', reportData);

  if (reportData?.length > 0) {
    let sample_data_to_export = reportData;
    console.log('sample_data_to_export', sample_data_to_export);
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    RNFS.writeFile(
      (Platform.OS == 'ios'
        ? RNFS.DocumentDirectoryPath
        : RNFS.ExternalStorageDirectoryPath) + `/${reportDataName}.xlsx`,
      wbout,
      'ascii',
    )
      .then(r => {
        dispatch.alerts.success({
          domain: 'Download sucess',
          message: `${reportDataName} Report Download`,
        });
        // navigation.navigate('AttendanceReport');
      })
      .catch(e => {
        console.log('Error', e);
      });
  } else {
    dispatch.alerts.error({
      domain: 'Download sucess',
      message: `${reportDataName} Report Not Downloaded`,
    });
  }
};
