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
    paddingHorizontal: scale(8),
    marginTop: scale(10),
    minHeight: scale(40),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  browseBtn: {
    paddingHorizontal: scale(15),
    backgroundColor: Colors.blackPearl,
    width: '48%',
    alignSelf: 'flex-end',
  },
  browseTxt: {fontSize: scale(11)},
  labelStyle: {marginLeft: scale(-10)},
  KeyboardAwareScrollView: {paddingHorizontal: scale(15)},
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(60),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(15),
  },
  headerIcon: {
    width: scale(30),
    height: '100%',
    justifyContent: 'center',
  },

  userNameTxt: {
    fontSize: scale(11),
    color: Colors.white,
    fontWeight: '500',
    width: scale(100),
  },
  iconMainView: {
    width: '95%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tbView: {paddingHorizontal: scale(15), height: scale(50)},
  emptyView1: {width: scale(74), height: '100%', justifyContent: 'center'},
  emptyView2: {
    width: scale(190),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {paddingHorizontal: scale(8), marginTop: scale(12)},
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
  modalIconMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(18),
  },
  userNameTxt1: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '40%',
  },
};
