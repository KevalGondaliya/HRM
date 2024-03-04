import {scale} from 'react-native-size-matters';

import Colors from '../../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },

  headerLabel: {marginLeft: scale(-10)},

  top: {marginTop: scale(25)},
  subContainerView: {flex: 0.92, paddingHorizontal: scale(15)},

  DropDownLabelStyle: {
    color: Colors.lightRed,
    marginBottom: scale(3),
    marginTop: scale(-3),
  },

  dropDownStyle: {
    marginBottom: scale(15),
    paddingHorizontal: scale(20),
  },

  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '500',
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

  dateTxt: {fontSize: scale(12)},
  error: {borderWidth: 2, borderColor: 'red'},
  padding0: {paddingHorizontal: scale(0)},
};
