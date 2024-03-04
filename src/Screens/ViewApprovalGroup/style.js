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
    paddingHorizontal: scale(30),
    backgroundColor: Colors.blackPearl,
  },

  searchBtnView: {
    width: '100%',
    height: scale(40),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
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

  labelStyle: {marginLeft: scale(-25), width: '70%'},
  massDelBtn: {
    paddingHorizontal: scale(40),
    backgroundColor: Colors.grayishRed,
  },
  massDelTxt: {fontSize: scale(11)},
  keyboardAwareScrollView: {flex: 0.92},

  headerMainView: {
    height: scale(60),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(15),
    justifyContent: 'center',
  },

  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDate: {
    width: scale(100),
    height: '100%',
    justifyContent: 'center',
    marginRight: scale(30),
  },
  headerIcon: {
    width: scale(150),
    height: '100%',
    justifyContent: 'center',
  },
  headerBouns: {
    width: scale(180),
    height: '100%',
    justifyContent: 'center',
  },

  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
  },
  iconMainView: {
    width: '95%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  mainView: {paddingHorizontal: scale(18), marginTop: scale(12)},
  emptyView: {width: scale(30)},
  emptyView1: {
    width: scale(20),
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

  headerTxt: {
    fontSize: scale(13),
    fontWeight: '700',
    color: Colors.white,
    top: scale(8),
    marginLeft: scale(30),
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
};
