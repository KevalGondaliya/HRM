import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },
  labelStyle: {marginLeft: scale(-10)},
  keyboardAwareScrollView: {
    flex: 0.92,
    paddingHorizontal: scale(18),
  },
  padding0: {paddingHorizontal: scale(0)},
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
    width: scale(170),
    height: '100%',
    justifyContent: 'center',
  },
  headerBouns: {
    width: scale(150),
    height: '100%',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '500',
  },
  tbView: {paddingHorizontal: scale(15), height: scale(50)},
  amountView: {
    width: scale(130),
    height: scale(30),
    backgroundColor: Colors.blackPearl,
    borderRadius: scale(5),
  },
  addMoreView: {
    width: '100%',
    height: scale(50),
    backgroundColor: '#666666',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
  },
  addMoreTxt: {
    color: Colors.white,
    fontSize: scale(13),
    marginLeft: scale(10),
    fontWeight: '600',
  },
  tbContainerView: {marginTop: scale(12)},
  width30: {width: scale(30)},
  emptyView1: {
    width: scale(113),
    height: '100%',
    justifyContent: 'center',
    marginLeft: scale(12),
  },
  userNameTxt1: {
    // fontSize: scale(12),
    // color: Colors.sBlack,
    // fontWeight: '500',
    // marginRight: scale(10),
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '50%',
    paddingLeft: scale(15),
  },
  userNameTxt2: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '50%',
  },
  modalView: {
    flexDirection: 'row',
    width: '100%',
    height: scale(25),
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  editIconView: {
    width: scale(70),
    height: scale(40),
    borderRadius: scale(15),
    backgroundColor: Colors.blackPearl,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scale(20),
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
    paddingHorizontal: scale(15),
  },

  btnStyle: {
    width: '50%',
    alignSelf: 'flex-end',
    marginTop: scale(15),
    backgroundColor: Colors.blackPearl,
  },
  labelStyle: {fontSize: scale(12)},
  modalMainView: {
    width: '100%',
    minHeight: scale(50),
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(30),
    paddingVertical: scale(45),
  },
  modalLabel: {
    fontSize: scale(16),
    color: Colors.sBlack,
    textAlign: 'center',
    marginBottom: scale(0),
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(8),
    zIndex: 10,
    height: scale(40),
  },

  saveBtn: {marginTop: scale(25)},
  leaveTxt: {color: Colors.lightRed, marginTop: scale(15)},
  noFoundTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noFoundTxt: {
    padding: 15,
    fontSize: 18,
    color: Colors.sBlack,
  },
};
