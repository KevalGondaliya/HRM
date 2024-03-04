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
    width: scale(150),
  },

  iconMainView: {
    width: '95%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyeIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  idTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '600',
  },
  searchBtnView: {
    width: '100%',
    height: scale(45),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    marginBottom: scale(15),
  },
  searchIconView: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
    borderColor: Colors.lightRed,
  },
  searchInput: {
    width: '93%',
    borderWidth: 0,
    paddingHorizontal: scale(5),
  },
  headerDate: {
    width: scale(110),
    height: '100%',
    justifyContent: 'center',
  },
  headerIcon: {
    width: scale(150),
    height: '100%',
    justifyContent: 'center',
  },
  headerBouns: {
    width: scale(130),
    height: '100%',
    justifyContent: 'center',
  },
  headerStatus: {
    width: scale(165),
    height: '100%',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
  },
  pastTxtView: {
    width: '100%',
    paddingHorizontal: scale(20),
    marginTop: scale(50),
  },
  borderView: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#b7b7b7',
    marginVertical: scale(10),
  },
  downloadTxt: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '600',
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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

  saveBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: scale(25),
  },
  modalSubmitBtn: {
    backgroundColor: Colors.grayishGreen,
    paddingHorizontal: scale(25),
    marginLeft: scale(10),
    width: scale(120),
  },
  modalCancelBtn: {
    paddingHorizontal: scale(25),
    width: scale(120),
  },
  headerMainView: {
    height: scale(50),
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
  labelStyle: {marginLeft: scale(-10)},
  massDelBtn: {
    paddingHorizontal: scale(40),
    backgroundColor: Colors.grayishRed,
  },
  massDelTxt: {fontSize: scale(11)},
  keyboardAwareScrollView: {flex: 0.92},

  mainView: {paddingHorizontal: scale(18), marginTop: scale(12)},
  emptyView: {width: scale(30)},
  emptyView1: {
    width: scale(30),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userNameTxt1: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '55%',
  },

  modalIconMainView: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: scale(60),
    marginTop: scale(15),
  },
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
  },

  tbView: {paddingHorizontal: scale(15), height: scale(50)},
  checkBoxView: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
};
