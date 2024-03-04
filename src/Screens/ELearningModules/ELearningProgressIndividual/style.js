import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  searchIconView: {
    width: '90%',
    borderWidth: 1,
    height: scale(45),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(15),
    marginVertical: scale(5),
    paddingHorizontal: scale(18),
    paddingHorizontal: scale(15),
    borderColor: Colors.lightRed,
    justifyContent: 'space-between',
  },
  searchInput: {
    width: '90%',
    borderWidth: 0,
    paddingHorizontal: scale(5),
  },

  labelStyle: {marginLeft: scale(-10)},

  tbContainerView: {
    marginTop: scale(12),
    paddingHorizontal: scale(18),
  },

  headerDate1: {
    width: scale(180),
    height: scale(25),
    flexDirection: 'row',
    alignItems: 'center',
  },

  userNameTxt: {
    fontWeight: '500',
    fontSize: scale(10),
    color: Colors.white,
    width: scale(115),
  },

  headerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerMainView: {
    height: scale(50),
    justifyContent: 'center',
    paddingHorizontal: scale(15),
    backgroundColor: Colors.blackPearl,
  },
  tbView: {paddingHorizontal: scale(15), height: scale(50)},

  progressSubView: {
    width: '90%',
    height: '100%',
    backgroundColor: '#666',
    borderRadius: scale(20),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },

  progressTxt: {
    fontSize: scale(10),
    color: Colors.sBlack,
    marginLeft: scale(5),
  },

  sBlack: {color: Colors.sBlack},

  dropDownView: {
    width: '90%',
    minHeight: scale(50),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(8),
    marginBottom: scale(15),
  },

  checkBoxView: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderRadius: scale(5),
  },
  sBlack: {color: Colors.sBlack},
  emptyView: {width: scale(30)},
  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
    width: scale(110),
  },

  userNameTxt1: {
    fontSize: scale(10),
    color: Colors.sBlack,
    fontWeight: '500',
    width: '50%',
  },

  sBlack: {color: Colors.sBlack},

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
  emptyView1: {width: scale(35), height: '100%', justifyContent: 'center'},
  emptyView2: {width: scale(20), height: '100%', justifyContent: 'center'},
  modalIconMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(18),
  },
  iconMainView: {
    width: scale(130),
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  left:{paddingHorizontal:scale(20)},
  progress:{justifyContent: 'center', left: scale(10)}
};
