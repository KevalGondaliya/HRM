import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  keyboardAwareScrollView: {paddingHorizontal: scale(23)},
  containerView: {flex: 1, backgroundColor: Colors.white},
  labelStyle: {marginLeft: scale(-10), width: '70%'},
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
    height: scale(45),
  },

  dropDownStyle: {
    paddingHorizontal: scale(10),
    marginBottom: scale(2),
  },

  width48: {width: '48%'},
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
  dropbottom: {marginBottom: scale(30)},
  bottom: {marginBottom: scale(20)},

  mappingView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: scale(18),
    alignItems: 'center',
    paddingRight: scale(30),
  },
  checkBoxView: {
    width: scale(18),
    height: scale(18),
    borderWidth: 1,
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  mapLabelTxt: {fontSize: scale(12), color: Colors.blackPearl},
  mapTextInput: {
    width: '85%',
    alignSelf: 'center',
    marginTop: scale(10),
    borderWidth: 0,
  },

  dropDownBottom: {marginBottom: scale(25)},

  childrenStyle: {paddingHorizontal: 0, paddingVertical: 0},
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
  datePickerView: {
    width: '100%',
    height: scale(45),
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    marginBottom: scale(10),
  },
};
