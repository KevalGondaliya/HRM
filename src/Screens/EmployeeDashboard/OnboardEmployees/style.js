import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  midView: {
    paddingHorizontal: scale(25),
  },
  labelStyle: {marginLeft: scale(-10)},

  dropDownStyle: {marginBottom: scale(5)},

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
    marginTop: scale(10),
  },

  massOnboardTxt: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '800',
    marginTop: scale(5),
  },
  cancelBtn: {
    paddingHorizontal: scale(18),
    backgroundColor: '#666',
    width: scale(203),
    height: scale(50),
    borderRadius: scale(10),
    marginVertical: scale(20),
  },
  massDelTxt: {fontSize: scale(12)},
  top: {marginTop: scale(35)},
  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    backgroundColor: Colors.blackPearl,
  },
  removeBtn: {
    backgroundColor: Colors.grayishRed,
    paddingHorizontal: scale(30),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  browseTxt: {fontSize: scale(11)},
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
  saveCancelBtn: {marginTop: scale(35)},
  error: {borderWidth: 2, borderColor: 'red'},
};
