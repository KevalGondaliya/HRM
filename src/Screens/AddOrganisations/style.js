import {scale} from 'react-native-size-matters';

import Colors from '../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },

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
  },
  dropDownContainerStyle: {
    height: scale(90),
    fontSize: 15,
    borderRadius: 7,
    backgroundColor: Colors.grey,
    padding: 10,
    marginBottom: scale(20),
    borderWidth: 0,
    marginTop: scale(0),
  },
  countryPickerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: scale(15),
  },
  countryPickerView: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(15),
    height: scale(45),
  },
  countryName: {
    fontSize: 14,
    color: Colors.sBlack,
  },

  saveBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  submitBtn: {
    backgroundColor: Colors.grayishGreen,
    paddingHorizontal: scale(25),
    marginLeft: scale(10),
    width: scale(111),
  },
  cancelBtn: {
    paddingHorizontal: scale(25),
    width: scale(111),
  },
  labelStyle: {marginLeft: scale(-10)},
  subContainerView: {flex: 0.92, paddingHorizontal: scale(15)},

  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    backgroundColor: Colors.blackPearl,
  },

  removeBtn: {
    backgroundColor: Colors.grayishRed,
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  browseTxt: {fontSize: scale(11)},
  dropDownStyle: {
    marginBottom: scale(4),
    paddingHorizontal: scale(18),
  },
  browseBtnView: {flexDirection: 'row'},

  error: {
    borderWidth: 2,
    borderColor: 'red',
  },

  acmsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(15),
  },

  containerStyle: {marginBottom: scale(-3)},

  width48: {width: '48%'},

  downArrow :{marginLeft: 4.5}
};
