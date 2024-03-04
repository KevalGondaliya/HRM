import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  datePickerView: {
    width: '100%',
    height: scale(45),
    backgroundColor: Colors.grey,
    borderRadius: scale(15),
    marginTop: scale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    marginBottom: scale(10),
  },
  labelStyle: {marginLeft: scale(-10)},
  subContainerView: {flex: 0.92, paddingHorizontal: scale(15)},

  labelTxt: {
    color: Colors.blackPearl,
    fontWeight: '800',
    marginTop: 0,
  },
  dateTxt: {fontSize: scale(12)},
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
};
