import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },

  labelStyle: {marginLeft: scale(-10)},

  keyboardAwareScrollView: {paddingHorizontal: scale(18)},
  reportingTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    marginBottom: scale(15),
    marginTop: scale(8),
  },
  reportingTxt: {
    fontSize: scale(11),
    color: Colors.blackPearl,
    fontWeight: '800',
  },
  reportingNameView: {
    width: scale(175),
    height: scale(45),
    borderRadius: scale(10),
    backgroundColor: Colors.blackPearl,
    marginLeft: scale(15),
    justifyContent: 'center',
    paddingHorizontal: scale(25),
  },
  reportingName: {
    fontSize: scale(11),
    color: Colors.white,
    fontWeight: '700',
  },
};
