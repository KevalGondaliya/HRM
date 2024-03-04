import {scale} from 'react-native-size-matters';

import Colors from '../../theme';

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
    fontSize: scale(10),
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
    fontSize: scale(15),
    marginLeft: scale(10),
    fontWeight: '600',
  },
  tbContainerView: {marginTop: scale(12)},
  width30: {width: scale(30)},
  emptyView1: {width: scale(113), height: '100%', justifyContent: 'center'},
  userNameTxt1: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '500',
    marginRight: scale(10),
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
    alignSelf: 'center',
    marginTop:scale(20)
  },
};
