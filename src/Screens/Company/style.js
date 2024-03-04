import { scale } from 'react-native-size-matters';

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
  dropDownContainerStyle: {
    height: scale(90),
    fontSize: 15,
    borderRadius: 7,
    backgroundColor: Colors.grey,
    padding: 10,
    marginBottom: scale(20),
    borderWidth: 0,
    marginTop: scale(0),
  },
  removeBtn: {
    backgroundColor: Colors.grayishRed,
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
  },
  saveBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  submitBtn: {
    backgroundColor: Colors.grayishGreen,
    paddingHorizontal: scale(25),
    marginLeft: scale(10),
    width: scale(111),
  },
  cancelBtn: {
    paddingHorizontal: scale(25),
    width: scale(111),
  },
  labelStyle: { marginLeft: scale(-10) },
  subContainerView: { flex: 0.92, paddingHorizontal: scale(15) },

  dropDownStyle: {
    paddingHorizontal: scale(10),
    marginBottom: scale(2),
  },
  browseTxt: { fontSize: scale(11) },
  mobileView: { marginRight: 0, width: '75%' },
  containerStyle: { height: scale(200) },
  callingCodeView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
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
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },

  dropDownMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  width48: { width: '48.5%' },

  indTypeDropDown: { marginBottom: scale(2), paddingHorizontal: scale(18) },
  listViews: {
    zIndex: 100,
    borderColor: '#c3c3c3',
    width: '100%',
  },
};
