import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },

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
  dropDownStyle: {marginBottom: scale(2)},
  gstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(2),
  },

  container: {paddingBottom: scale(13), paddingHorizontal: scale(5)},
  gstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(2),
  },
  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
  },
  browseTxt: {fontSize: scale(11)},
  removeBtn: {
    backgroundColor: Colors.grayishRed,
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
};
