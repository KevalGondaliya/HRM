import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  keyboardAwareScrollView: {paddingHorizontal: scale(23)},
  containerView: {flex: 1, backgroundColor: Colors.white},
  labelStyle: {marginLeft: scale(-10), width: '70%'},
  dropDownStyle: {marginBottom: scale(2)},
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },

  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },

  radioMainView: {
    width: scale(19),
    height: scale(19),
    borderWidth: 2,
    borderRadius: scale(19 / 2),
    borderColor: Colors.blackPearl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioFillView: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(12 / 2),
    backgroundColor: Colors.blackPearl,
  },
  radioTxt: {
    fontSize: scale(12),
    fontWeight: '500',
    color: Colors.blackPearl,
    marginLeft: scale(10),
  },
  checkBoxMainView: {flexDirection: 'row', marginTop: scale(5)},
  textInputView: {
    width: '100%',
    marginTop: scale(10),
    alignItems: 'flex-end',
    paddingHorizontal: scale(2),
  },
  bottom: {marginBottom: scale(20)},
  top: {marginTop: scale(10)},
};
