import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },

  submitBtn: {
    backgroundColor: Colors.grayishGreen,
    paddingHorizontal: scale(25),
    marginLeft: scale(10),
    width: scale(111),
  },
  cancelBtn: {
    paddingHorizontal: scale(25),
    width: scale(149),
    height: scale(35),
    marginTop: scale(15),
  },
  labelStyle: {marginLeft: scale(-15), width: '70%'},
  subContainerView: {
    flex: 0.92,
    paddingHorizontal: scale(15),
  },

  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },

  mainView: {paddingBottom: scale(20)},

  indTypeDropDown: {marginBottom: scale(5), paddingHorizontal: scale(18)},

  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },

  padiView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: scale(5),
  },
};
