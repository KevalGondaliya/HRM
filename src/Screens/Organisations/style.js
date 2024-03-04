import {scale} from 'react-native-size-matters';

import Colors from '../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },

  cancelBtn: {
    paddingHorizontal: scale(25),
    backgroundColor: Colors.blackPearl,
    top: scale(3),
  },
  cardMainView: {
    backgroundColor: Colors.sBlack,
    padding: scale(15),
    marginTop: scale(18),
    width: '100%',
  },
  dropShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: '100%',
    minHeight: scale(80),
    paddingHorizontal: scale(18),
  },
  orgNameView: {
    width: '100%',
    height: scale(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(5),
  },
  orgName: {
    width: '65%',
    fontSize: scale(12),
    fontWeight: '700',
    color: Colors.white,
  },
  iconMainView: {
    width: '35%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyeIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  idTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '600',
  },
  searchBtnView: {
    width: '100%',
    height: scale(45),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
  },
  searchIconView: {
    flexDirection: 'row',
    width: '53%',
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
  labelStyle: {marginLeft: scale(-10)},
  addOrgTxt: {fontSize: scale(11)},
  editIcon: scale(20),
  keyboardAwareScrollView: {flex: 0.92},
  noFoundTxt: {
    padding: 15,
    fontSize: 18,
    color: Colors.sBlack,
  },
  noFoundTxtView: {
    alignItems: 'center',
    height: scale(250),
    marginTop: scale(20),
  },
};
