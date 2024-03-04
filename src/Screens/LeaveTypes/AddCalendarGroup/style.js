import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

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

  countryPickerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: scale(15),
  },
  countryPickerView: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(15),
  },
  countryName: {
    fontSize: 14,
    color: Colors.sBlack,
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
};
