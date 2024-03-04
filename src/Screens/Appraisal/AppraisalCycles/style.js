import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },

  cancelBtn: {
    paddingHorizontal: scale(15),
    backgroundColor: Colors.blackPearl,
    width: scale(150),
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
    width: '90%',
    height: scale(45),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    marginBottom: scale(15),
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: scale(15),
    borderColor: Colors.lightRed,
  },
  searchInput: {
    width: '93%',
    borderWidth: 0,
    paddingHorizontal: scale(5),
  },

  labelStyle: {marginLeft: scale(-10)},
  massDelBtn: {
    paddingHorizontal: scale(40),
    backgroundColor: Colors.grayishRed,
  },
  massDelTxt: {fontSize: scale(11)},
  keyboardAwareScrollView: {flex: 0.92},
  tbContainerView: {
    paddingHorizontal: scale(18),
    marginTop: scale(12),
  },
  iconMainView: {
    width: scale(160),
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: scale(15),
  },
  headerDate: {
    width: scale(90),
    height: '100%',
    justifyContent: 'center',
  },
  headerIcon: {
    width: scale(160),
    height: '100%',
    justifyContent: 'center',
  },
  headerBouns: {
    width: scale(120),
    height: '100%',
    justifyContent: 'center',
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(50),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(15),
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
  emptyView: {width: scale(30)},
  editIcon: scale(20),
  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
    width: scale(110),
  },

  sBlackColor: {color: Colors.sBlack, width: scale(100)},
  userNameTxt1: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '40%',
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
  emptyView1: {width: scale(34), height: '100%', justifyContent: 'center'},
  emptyView2: {width: scale(20), height: '100%', justifyContent: 'center'},
  modalIconMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(18),
  },
};
