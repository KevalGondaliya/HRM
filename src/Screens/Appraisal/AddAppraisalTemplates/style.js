import {scale} from 'react-native-size-matters';

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(18),
  },
  dateTxt: {fontSize: scale(12)},
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
  marginTopEmpName: {marginTop: 0},
  firstNameMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(25),
  },

  width48: {width: '48%'},

  browseBtnView: {
    flexDirection: 'row',
    marginTop: scale(5),
    justifyContent: 'space-between',
  },

  browseTxt: {fontSize: scale(11)},

  removeBtn: {
    width: '48%',
    backgroundColor: Colors.blackPearl,
  },

  tbHeaderView: {
    borderWidth: 1,
    padding: scale(12),
    marginTop: scale(5),
    marginBottom: scale(20),
    borderColor: '#D5D5D3',
    borderRadius: scale(15),
    paddingHorizontal: scale(18),
    paddingBottom: scale(25),
  },

  tbHeaderTxt: {color: Colors.blackPearl, fontWeight: '800'},
  saveCancelBtnStyle: {marginVertical: scale(10)},
  marginBottom: {marginBottom: scale(15)},
  modalMainView: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(30),
    paddingVertical: scale(30),
  },
  modalLabel: {
    fontSize: scale(16),
    color: Colors.sBlack,
    textAlign: 'center',
    marginBottom: scale(0),
  },
  padiView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalBtnStyle: {
    marginTop: scale(25),
  },
  cancelBtn: {
    paddingHorizontal: scale(25),
    width: scale(149),
    height: scale(35),
    marginTop: scale(15),
  },
  addRuleLabel: {fontSize: scale(11)},
};
