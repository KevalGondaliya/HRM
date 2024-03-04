import {scale} from 'react-native-size-matters';

import Colors from '../../theme';

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
  departMentTxt: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Colors.blackPearl,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentTxtView: {width: '48%'},
  firstNameMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fTxt: {
    width: '20%',
    textAlign: 'right',
    fontSize: scale(12),
    fontWeight: '600',
    color: Colors.blackPearl,
  },
  fTxtView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(45),
  },

  width28: {width: '28%'},
  width40: {width: '40%'},
  width48: {width: '48%'},
  dobMainView: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(-5),
  },
  dateView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};
