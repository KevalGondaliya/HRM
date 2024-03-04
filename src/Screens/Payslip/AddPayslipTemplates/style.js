import { scale } from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  keyboardAwareScrollView: {
    flex: 0.92,
    paddingHorizontal: scale(18),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  countryPickerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: scale(10),
  },
  countryPickerView: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(15),
  },
  countryName: {
    fontSize: 14,
    color: Colors.sBlack,
    left: scale(5),
  },
  error: { borderWidth: 2, borderColor: 'red', },

  checkIconView: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: Colors.blackPearl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    marginLeft: scale(15),
  },
  mappingMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: scale(10),
  },
  headerLabelView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  borderView: {
    borderTopWidth: 2,
    marginHorizontal: scale(-15),
    marginVertical: scale(15),
  },

  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  datePickerView: {
    width: '100%',
    height: scale(43),
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(3),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  dateTxt: { fontSize: scale(12) },

  paymentMappingMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginBottom: scale(13),
  },

  paymentTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: '800',
    letterSpacing: scale(1),
    marginBottom: scale(10),
  },
  branchNameView: {
    flexDirection: 'row',
    width: '100%',
    height: scale(30),
    alignItems: 'center',
  },
  branchNameTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: '600',
    width: '30%',
  },
  dotView: {
    borderTopWidth: 1,
    borderStyle: 'dotted',
    width: '43%',
    top: scale(2),
    alignSelf: 'center',
    left: 5,
  },
  branchNameTxt1: {
    fontSize: scale(12),
    color: '#666',
    fontWeight: '600',
    width: '24%',
    marginLeft: scale(3),
    textAlign: 'right',
  },
  salaryBoxView: {
    width: '100%',
    minHeight: scale(50),
    borderWidth: 2,
    borderColor: Colors.blackPearl,
    marginVertical: scale(15),
    padding: scale(15),
  },
  annualTxt: {
    fontSize: scale(11),
    color: Colors.blackPearl,
    fontWeight: '700',
    lineHeight: scale(25),
  },
  labelView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceView: {
    width: '65%',
    flexDirection: 'row',
  },
  enntitledTxtView: {
    width: '33%',
    alignItems: 'center',
  },
  takenTxtView: {
    width: '32%',
    alignItems: 'center',
    right: 2,
  },
  remainingTxtView: {
    width: '35%',
    alignItems: 'center',
  },
  width15: { width: '15%' },
  width17: { width: '17%' },
  width68: { width: '68%' },
};
