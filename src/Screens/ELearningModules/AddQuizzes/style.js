import { scale } from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  labelStyle: { marginLeft: scale(-10) },

  subContainerView: {
    flex: 0.92,
    paddingHorizontal: scale(15),
  },

  browseBtn: {
    width: '48%',
    paddingHorizontal: scale(25),
    backgroundColor: Colors.blackPearl,
  },

  removeBtn: {
    width: '48%',
    paddingHorizontal: scale(25),
    backgroundColor: Colors.grayishRed,
  },

  browseTxt: { fontSize: scale(11) },

  browseBtnView: {
    flexDirection: 'row',
    marginTop: scale(15),
    paddingHorizontal: scale(10),
    justifyContent: 'space-between',
  },

  dropShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    width: '80%',
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    minHeight: scale(50),
    paddingHorizontal: scale(5),
  },

  textInputView: {
    height: scale(60),
    backgroundColor: Colors.white,
    borderRadius: scale(25),
    textAlign: 'center',
    paddingHorizontal: scale(20),
  },

  questionTextinputMainView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: scale(15),
    justifyContent: 'space-between',
    paddingHorizontal: scale(5),
  },

  dotView: {
    width: scale(50),
    height: scale(60),
    backgroundColor: Colors.white,
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },

  svgMainView: {
    width: '95%',
    borderWidth: 2,
    height: scale(100),
    alignSelf: 'center',
    heightL: scale(100),
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: scale(20),
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
    borderColor: Colors.lightRed,
    marginVertical: scale(25),
  },

  insertTxt: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '400',
    marginTop: scale(5),
  },

  ansBtnView: {
    width: '95%',
    height: scale(50),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: scale(15),
    justifyContent: 'center',
    borderRadius: scale(30),
    backgroundColor: '#D5D5D3',
  },

  ansTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: '600',
  },

  leftBtnView: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomBtnView: {
    width: '100%',
    height: scale(80),
    backgroundColor: Colors.blackPearl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  midBoxView: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxView: {
    flexDirection: 'row',
    height: '100%',
  },

  boxIndexTxt: {
    fontSize: scale(12),
    color: Colors.white,
    paddingLeft: scale(15),
    paddingRight: scale(10),
  },

  qtBox: {
    width: scale(70),
    height: '100%',
    borderWidth: 2,
    borderColor: Colors.white,
    // borderStyle: 'dashed',
    alignItems: 'center',
  },

  qtTxt: {
    fontSize: scale(8),
    color: Colors.white,
    padding: scale(5),
  },

  saveCancelBtnStyle: { marginBottom: scale(15), marginTop: scale(30) },

  fillBox: {
    backgroundColor: Colors.white,
  },

  margintop: { marginTop: scale(5) },

  width20: { width: '20%' },

  flatListStyle: { marginVertical: scale(10) },

  width100: { width: '95%' },

  sBlack: { backgroundColor: Colors.sBlack },

  textBoxbg: { backgroundColor: '#697184' },

  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(120),
    textAlignVertical: 'top',
    paddingVertical: scale(15),
  },
  error: {
    borderColor: 'red',
    borderWidth: 2,
  },
  checkBoxView: {
    width: scale(20),
    height: scale(20),
    borderWidth: 2,
    borderColor: Colors.blackPearl,
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(18),
  },
  checkBoxFill: {
    width: '90%',
    height: '90%',
    backgroundColor: Colors.blackPearl,
    borderRadius: scale(5),
  },

  dashboardBtnStyle: {
    width: '50%',
    height: scale(50),
    borderWidth: 2,
    borderRadius: scale(50 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 0,
  },
  dashboardBtnTxt: {
    fontSize: scale(13),
    color: Colors.blackPearl,
    fontWeight: 'bold',
  },
};
