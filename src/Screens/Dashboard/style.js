import {scale} from 'react-native-size-matters';

import Colors from '../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },

  totalHeadCount: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '600',
    width: '80%',
  },
  labelStyle: {marginLeft: scale(-10)},
  keyboardAwareScrollView: {paddingHorizontal: scale(15)},
  graphStyle: {
    backgroundColor: 'red',
  },
  boxContaintView1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(5),
  },
  totalHeadCount: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '600',
    width: '80%',
  },
  newEmploymentTxt: {width: '18%', textAlign: 'right'},
  bottom: {marginBottom: scale(10)},
  totalHeadCount: {
    fontSize: scale(12),
    fontWeight: '600',
    width: '80%',
    marginBottom: scale(8),
    textDecorationLine: 'underline',
    color: '#697184',
  },
};
