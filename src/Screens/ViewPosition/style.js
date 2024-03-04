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
    top: scale(5),
  },

  searchBtnView: {
    width: '100%',
    height: scale(45),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
  },
  searchIconView: {
    flexDirection: 'row',
    width: '57%',
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

  labelStyle: {marginLeft: scale(-10)},
  addPosiTxt: {fontSize: scale(11)},
  keyboardAwareScrollView: {flex: 0.92},
  userNameTxt1: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '35%',
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
    width: scale(160),
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

  editIcon: scale(20),
  tbContainerView: {paddingHorizontal: scale(18), marginTop: scale(12)},
  tbView: {paddingHorizontal: scale(15), height: scale(50)},
  emptyView1: {
    width: scale(123),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  width250: scale(250),
  width160: scale(160),
  width200: scale(200),
  width130: scale(130),

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
    marginBottom: scale(15),
  },

  modalMainView: {
    width: '100%',
    minHeight: scale(50),
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(20),
  },
  modalLabelView: {
    fontSize: scale(16),
    color: Colors.sBlack,
    textAlign: 'center',
    marginBottom: scale(15),
  },
  modalLabelStyle: {color: Colors.lightRed, marginBottom: scale(3)},
  positionTxt: {
    color: Colors.lightRed,
    marginBottom: scale(5),
    fontSize: scale(12),
    marginTop: scale(10),
  },

  dropDownStyle: {
    marginBottom: scale(18),
  },

  top: {marginTop: scale(25)},
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
