import {scale} from 'react-native-size-matters';
import Color from '../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(15),
  },
  ImageContainer: {
    alignItems: 'center',
  },
  ImageLoader: {
    width: 180,
    height: scale(110),
    marginBottom: scale(30),
  },
  ForgetPasswordTxt: {
    textAlign: 'center',
    color: '#414143',
    fontSize: 25,
    fontWeight: 'bold',
  },
  SubTxt: {
    color: Color.black,
    fontSize: 15,
    textAlign: 'center',
    bottom: 8,
  },
  emailTxt: {},
  or: {
    fontSize: 13,
    marginVertical: 15,
    marginLeft: 20,
  },
  phoneTxt: {
    height: 55,
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.green,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  TextInputContainer: {
    margin: 15,
    marginBottom: 15,
  },

  gradientLoginButton: {
    borderRadius: 30,
    backgroundColor: '#414143',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(40),
    width: '100%',
  },
  loginBtn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotImgContainer: {
    height: scale(300),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainerMainView: {
    height: '65%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: scale(70),
  },
  forgotTxtView: {
    height: '35%',
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
  textinputView: {
    height: scale(300),
    width: '100%',
  },
};
