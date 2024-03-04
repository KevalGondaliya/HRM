import {scale} from 'react-native-size-matters';

import Colors from '../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },

  cancelBtn: {
    paddingHorizontal: scale(28),
    backgroundColor: Colors.blackPearl,
  },

  dropShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: '100%',
    minHeight: scale(80),
    paddingHorizontal: scale(18),
  },

  searchBtnView: {
    width: '100%',
    height: scale(45),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
  },

  labelStyle: {marginLeft: scale(-10)},
  btnLabelStyle: {fontSize: scale(11)},
  keyboardAwareScrollView: {flex: 0.92},

  userNameTextInput1: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: 5,
    marginBottom: 0,
    borderWidth: 0,
    marginRight: scale(10),
    marginRight: 0,
    width: '100%',
    height: '100%',
    backgroundColor: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  dropDownContainerStyle: {
    height: scale(90),
    fontSize: 15,
    borderRadius: 7,
    backgroundColor: Colors.grey,
    padding: 10,
    marginBottom: scale(20),
    borderWidth: 0,
    marginTop: scale(0),
  },

  modalMainView: {
    width: '100%',
    minHeight: scale(50),
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(20),
  },
  modalLabel: {
    fontSize: scale(16),
    color: Colors.sBlack,
    textAlign: 'center',
    marginBottom: scale(15),
  },
  DropDownLabelStyle: {
    color: Colors.lightRed,
    marginBottom: scale(3),
  },
  departmentTxt: {
    color: Colors.lightRed,
    marginBottom: scale(5),
    marginTop: scale(10),
  },
  saveBtn: {marginTop: scale(25)},
  dropDownStyle: {
    marginBottom: scale(15),
    paddingHorizontal: scale(20),
  },
  departmentNameTxt: {
    color: Colors.lightRed,
    marginBottom: scale(5),
    marginTop: scale(10),
  },

  headerMainView: {
    height: scale(60),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(15),
    justifyContent: 'center',
  },
  headerTxt: {
    fontSize: scale(13),
    fontWeight: '700',
    color: Colors.white,
    top: scale(8),
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDate: {
    width: scale(120),
    height: '100%',
    justifyContent: 'center',
  },
  headerBouns: {
    width: scale(130),
    height: '100%',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '600',
  },
  iconMainView: {
    width: scale(150),
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalIconMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tbView: {
    paddingHorizontal: scale(15),
    height: scale(50),
  },
  tbContainerView: {
    paddingHorizontal: scale(18),
    marginTop: scale(12),
  },
  editIcon: scale(20),

  sBlack: {color: Colors.sBlack},

  emptyView1: {width: scale(44), height: '100%', justifyContent: 'center'},

  modalView: {
    flexDirection: 'row',
    width: '100%',
    height: scale(25),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editIconView: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: Colors.blackPearl,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
  },
  userNameTxt1: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '35%',
  },
  noFoundTxt: {
    padding: 15,
    fontSize: 18,
    color: Colors.sBlack,
  },
  noFoundTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
};
