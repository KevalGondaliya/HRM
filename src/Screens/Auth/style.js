import {scale} from 'react-native-size-matters';
const React = require('react-native');
import Color from '../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(18),
  },
  imagecontainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: scale(250),
    bottom: 15,
  },
  ImageLoader: {
    width: 180,
    height: scale(110),
    marginBottom: scale(30),
  },
  logotext: {
    color: Color.black,
    fontSize: 18,
    textAlign: 'center',
    bottom: 8,
  },
  loginFormTextInputContainer: {
    width: '100%',
    marginBottom: scale(80),
    marginTop: scale(10),
    paddingHorizontal: scale(15),
  },
  forgotPasswordView: {
    width: '100%',
    justifyContent: 'center',
    marginLeft: scale(5),
  },
  forgotPasswordTxt: {
    fontSize: 12,
    color: Color.sBlack,
    fontWeight: '500',
    opacity: 0.5,
    textDecorationLine: 'underline',
  },

  textInput: {
    borderWidth: 2,
    marginBottom: scale(15),
  },

  loginBtn: {height: scale(40), marginTop: 15},
  forgotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(20),
  },
  forgotTxt: {
    // color: Color.grayishGreen,
    color: '#414143',
    textDecorationLine: 'underline',
  },
};
