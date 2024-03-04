import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  searchBtnView: {
    width: '100%',
    paddingHorizontal: scale(12),
    marginTop: scale(15),
    minHeight: scale(40),
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
    height: scale(50),
  },
  dropDownStyle: {
    marginBottom: scale(5),
    marginTop: scale(15),
  },
  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    backgroundColor: Colors.blackPearl,
    width: '60%',
    alignSelf: 'flex-end',
    marginRight: scale(10),
  },
  browseTxt: {fontSize: scale(11)},
  labelStyle: {marginLeft: scale(-10)},
  KeyboardAwareScrollView: {paddingHorizontal: scale(15)},

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

  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
    width: scale(115),
  },
  iconMainView: {
    width: '95%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tbView: {
    paddingHorizontal: scale(15),
    height: scale(50),
  },
  tbContainerView: {
    paddingHorizontal: scale(10),
    marginTop: scale(20),
  },
  editIcon: scale(20),

  emptyView1: {width: scale(35), height: '100%', justifyContent: 'center'},
  emptyView2: {
    width: scale(20),
    height: '100%',
    justifyContent: 'center',
    marginLeft: scale(-18),
  },
  sBlack: {color: Colors.sBlack},
  modalIconMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(18),
  },
  userNameTxt1: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '35%',
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
};
