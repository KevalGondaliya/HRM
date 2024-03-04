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
  bottom: {marginBottom: scale(15)},
  error: {borderWidth: 2, borderColor: 'red'},
  cancelBtn: {
    paddingHorizontal: scale(25),
    width: scale(149),
    height: scale(35),
    marginTop: scale(15),
    marginBottom: scale(15),
  },
  tbHeaderView: {
    borderWidth: 1,
    padding: scale(12),
    borderColor: '#D5D5D3',
    borderRadius: scale(15),
    marginTop: scale(10),
  },
  tbHeaderTxt: {color: Colors.blackPearl, fontWeight: '800'},
  top: {marginTop: 0},
  dropDownStyle: {
    marginBottom: scale(15),
  },
};
