import { scale } from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },

  searchIconView: {
    flexDirection: 'row',
    width: '90%',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: scale(15),
    alignSelf: 'center',
    paddingHorizontal: scale(15),
    height: scale(45),
    justifyContent: 'space-between',
    borderColor: Colors.lightRed,
    paddingHorizontal: scale(18),
    marginTop: scale(5),
  },
  searchInput: {
    width: '90%',
    borderWidth: 0,
    paddingHorizontal: scale(5),
  },
  addClmBtn: {
    marginTop: scale(20)
  },

  dropDownStyle: { marginBottom: scale(20) },
  dropDownView: {
    width: '90%',
    minHeight: scale(50),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: scale(5),
  },
  dropDownSubView: { width: '48%' },
  labelTxt: { fontSize: scale(9.5) },
  labelStyle: { marginLeft: scale(-10) },
  tbContainerView: {
    paddingHorizontal: scale(18),
    marginTop: scale(12),
  },
  iconMainView: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: scale(60),
    marginTop: scale(15),
  },
  headerDate: {
    width: scale(100),
    height: '100%',
    justifyContent: 'center',
  },

  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
  },
  userNameTxt1: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '35%',
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerMainView: {
    height: scale(50),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(15),
    justifyContent: 'center',
  },
  tbView: { paddingHorizontal: scale(15), height: scale(50) },
  checkBoxView: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderRadius: scale(5),
  },
  emptyView: { width: scale(30) },
  editIcon: scale(20),
  modalView: {
    flexDirection: 'row',
    width: '100%',
    height: scale(25),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editIconView: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: Colors.blackPearl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIconMainView: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: scale(60),
    marginTop: scale(15),
  },
  emptyView1: { width: scale(50), height: '100%', justifyContent: 'center' },
  moreBtnView: {
    width: scale(50),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreTxt: { color: Colors.blackPearl, textDecorationLine: 'underline' },
  sBlack: { color: Colors.sBlack },
  cancelBtn: {
    // paddingHorizontal: scale(35),
    // paddinRight: scale(40),
    marginRight: scale(15),
    backgroundColor: Colors.blackPearl,
    width: '40%',
    alignSelf: 'flex-end',
  },
  massDelTxt: { fontSize: scale(10) },
};
