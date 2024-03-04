import {scale} from 'react-native-size-matters';

import Colors from '../../../../theme';

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

  headerLabel: {marginLeft: scale(-10)},
  borderColor: {borderColor: Colors.white},
  headerStyle: {
    width: '100%',
    height: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    justifyContent: 'space-between',
    backgroundColor: Colors.blackPearl,
  },

  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
    width: scale(123),
  },

  tbView: {paddingHorizontal: scale(15), height: scale(50)},

  tbMainView: {marginTop: scale(12)},
  sBlack: {color: Colors.sBlack},

  checkBoxView: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderRadius: scale(5),
  },

  emptyView: {width: scale(30)},

  top: {marginTop: scale(25)},
};
