import {scale} from 'react-native-size-matters';

import Colors from '../../theme';

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
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },

  labelStyle: {marginLeft: scale(-10)},
  subContainerView: {
    flex: 0.92,
    paddingHorizontal: scale(15),
  },

  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  countryPickerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
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
  dropDownStyle: {marginBottom: scale(20)},

  cancelBtn: {
    paddingHorizontal: scale(25),
    width: scale(149),
    height: scale(35),
    marginTop: scale(15),
  },
  tbHeaderView: {
    borderWidth: 1,
    padding: scale(10),
    borderColor: '#D5D5D3',
    borderRadius: scale(15),
    marginBottom: scale(15),
    paddingBottom: scale(25),
  },
  tbHeaderTxt: {color: Colors.blackPearl, fontWeight: '800'},
  marginBottom: {
    marginBottom: scale(15),
  },
  addRuleLabel: {fontSize: scale(11)},
  marginTop: {marginTop: 0},
  error: {borderWidth: 2, borderColor: 'red'},
  bottom: {paddingBottom: scale(15)},
};
