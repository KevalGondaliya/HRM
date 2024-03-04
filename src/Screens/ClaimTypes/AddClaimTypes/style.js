import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    width: '100%',
    backgroundColor: Colors.white,
    flex: 1,
  },
  labelStyle: {marginLeft: scale(-10)},
  KeyboardAwareScrollView: {paddingHorizontal: scale(15)},

  labelStyles: {
    color: Colors.lightRed,
    marginBottom: scale(3),
  },
  dropDownStyle: {
    marginBottom: scale(5),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },

  firstNameMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(45),
  },

  width48: {width: '48%'},

  style: {marginTop: scale(8)},
  cancelBtn: {
    paddingHorizontal: scale(15),
    backgroundColor: Colors.blackPearl,
    width: scale(150),
    marginTop: scale(12),
    marginBottom: scale(18),
  },
  massDelTxt: {fontSize: scale(11)},
  lightRed: {color: Colors.lightRed},
  error: {borderWidth: 2, borderColor: 'red'},
};
