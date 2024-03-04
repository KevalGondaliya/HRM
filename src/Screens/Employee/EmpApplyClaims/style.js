import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  searchBtnView: {
    width: '100%',
    paddingHorizontal: scale(8),
    marginTop: scale(10),
    minHeight: scale(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  browseBtn: {
    paddingHorizontal: scale(15),
    backgroundColor: Colors.blackPearl,
    width: '48%',
  },
  browseTxt: {fontSize: scale(11)},
  labelStyle: {marginLeft: scale(-10)},
  KeyboardAwareScrollView: {paddingHorizontal: scale(15)},
};
