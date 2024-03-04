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
    justifyContent: 'space-between',
  },

  browseBtn: {
    paddingHorizontal: scale(15),
    backgroundColor: Colors.blackPearl,
    width: '48%',
  },
  browseTxt: {fontSize: scale(11)},
  labelStyle: {marginLeft: scale(-10)},
  KeyboardAwareScrollView: {paddingHorizontal: scale(15)},
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },

  branchNameView: {
    flexDirection: 'row',
    width: '100%',
    height: scale(30),
    alignItems: 'center',
  },
  branchNameTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: '600',
    width: '15%',
  },
  dotView: {
    borderTopWidth: 1,
    borderStyle: 'dotted',
    width: '66%',
    top: scale(2),
    alignSelf: 'center',
  },
  branchNameTxt1: {
    fontSize: scale(12),
    color: '#666',
    fontWeight: '600',
    width: '16%',
    marginLeft: scale(3),
    textAlign: 'right',
  },

  yesTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    marginRight: scale(10),
  },
  radioButtonView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tbContainerView: {paddingBottom: scale(18)},
};
