import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },
  keyboardAwareScrollView: {paddingHorizontal: scale(22)},
  dropShadow: {
    width: '100%',
    minHeight: scale(50),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 5,
    marginBottom: scale(15),
    borderRadius: scale(20),
    marginTop: scale(10),
  },
  videoFrame: {
    width: '100%',
    height: scale(200),
    backgroundColor: '#fff',
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTxt: {
    fontSize: scale(13),
    color: Colors.blackPearl,
    fontWeight: 'bold',
  },
};
