import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },

  labelStyle: {marginLeft: scale(-10)},

  subContainerView: {
    flex: 0.92,
    paddingHorizontal: scale(15),
  },

  submitBtn: {
    backgroundColor: Colors.grayishGreen,
    paddingHorizontal: scale(25),
    marginLeft: scale(10),
    width: scale(111),
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

  firstNameMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  width48: {width: '48%'},

  dropDownStyle: {marginBottom: scale(5)},
  dropDownStyle1: {marginBottom: scale(25)},

  multilineTextInput: {
    height: scale(100),
    textAlignVertical: 'top',
    paddingVertical: scale(15),
  },

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

  periodTxt: {marginTop: 0},

  browseBtnView: {flexDirection: 'row'},

  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
};
