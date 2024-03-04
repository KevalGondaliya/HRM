import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
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
  subContainerView: {
    flex: 0.92,
    paddingHorizontal: scale(20),
  },
  btnStyle: {
    width: scale(140),
    alignSelf: 'flex-end',
    marginTop: scale(15),
    backgroundColor: Colors.blackPearl,
  },
  labelStyle: {fontSize: scale(12)},

  headerLabel: {marginLeft: scale(-10)},

  headerTxt: {
    fontSize: scale(13),
    fontWeight: '700',
    color: Colors.white,
    top: scale(8),
  },
  headerStyle: {
    height: scale(60),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
    width: scale(110),
  },

  tbView: {paddingHorizontal: scale(15), height: scale(50)},
  editIcon: scale(20),
  tbMainView: {marginTop: scale(12)},
  sBlack: {color: Colors.sBlack},
  emptyView1: {width: scale(45), height: '100%', justifyContent: 'center'},
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

  checkBoxView: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderRadius: scale(5),
  },
  emptyView: {width: scale(30)},
};
