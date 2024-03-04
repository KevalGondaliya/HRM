import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  keyboardAwareScrollView: {paddingHorizontal: scale(23)},
  containerView: {flex: 1, backgroundColor: Colors.white},
  labelStyle: {marginLeft: scale(-10), width: '70%'},

  uploadImgView: {
    width: '100%',
    height: scale(205),
    borderWidth: 1,
    borderRadius: scale(20),
    backgroundColor: Colors.grey,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImg: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
  },
  drageTxt: {
    fontSize: scale(16),
    color: Colors.sBlack,
    marginTop: scale(10),
  },
  browseTxt: {
    textDecorationLine: 'underline',
    color: '#4170C7',
  },

  closeIcon: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
  },
  closeIconView: {
    width: '10%',
    justifyContent: 'center',
  },
  uploadingTxt: {
    fontSize: scale(13),
    fontWeight: '600',
    color: Colors.sBlack,
  },
  mbTxt: {
    fontSize: scale(13),
    fontWeight: '600',
    color: Colors.lightRed,
  },
  mbView: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  documentName: {
    fontSize: scale(13),
    color: Colors.sBlack,
    fontWeight: '700',
  },
  progressView: {
    width: '80%',
    paddingLeft: scale(5),
  },
  uploadFileImg: {
    width: scale(45),
    height: scale(45),
    resizeMode: 'contain',
  },
  uploadFileImgView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  midView: {
    width: '100%',
    marginVertical: scale(30),
  },
};
