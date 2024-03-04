import { scale } from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },

  cancelBtn: {
    backgroundColor: Colors.blackPearl,
    width: scale(150),
  },
  cardMainView: {
    backgroundColor: Colors.sBlack,
    padding: scale(15),
    marginTop: scale(18),
    width: '100%',
  },

  searchBtnView: {
    width: '100%',
    height: scale(45),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    marginBottom: scale(15),
  },
  searchIconView: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
    borderColor: Colors.lightRed,
  },
  searchInput: {
    width: '93%',
    borderWidth: 0,
    paddingHorizontal: scale(5),
  },

  labelStyle: { marginLeft: scale(-10) },
  massDelBtn: {
    paddingHorizontal: scale(40),
    backgroundColor: Colors.grayishRed,
  },
  massDelTxt: { fontSize: scale(11) },
  keyboardAwareScrollView: { flex: 0.92 },

  tbContainerView: {
    paddingHorizontal: scale(18),
    marginTop: scale(12),
  },

  iconMainView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalIconMainView: {
    width: scale(150),
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerDate: {
    width: scale(120),
    height: '100%',
    justifyContent: 'center',
  },

  headerBouns: {
    width: scale(95),
    height: '100%',
    justifyContent: 'center',
  },

  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyView: { width: scale(30) },
  editIcon: scale(20),
  emptyView1: { width: scale(38), height: '100%', justifyContent: 'center' },

  userNameTxt1: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '500',
    marginRight: scale(10),
  },
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
    alignSelf: 'center',
    marginTop: scale(20),
  },

  width250: scale(250),
  width160: scale(120),
  width200: scale(165),
  width130: scale(95),
};
