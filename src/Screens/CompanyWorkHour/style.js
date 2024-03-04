import {scale} from 'react-native-size-matters';

import Colors from '../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },

  saveBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginVertical: scale(20),
  },
  submitBtn: {
    backgroundColor: Colors.grayishGreen,
    paddingHorizontal: scale(25),
    marginLeft: scale(10),
    width: scale(111),
  },
  cancelBtn: {
    paddingHorizontal: scale(25),
    width: scale(149),
    height: scale(35),
    marginTop: scale(15),
  },
  labelStyle: {marginLeft: scale(-10)},
  subContainerView: {flex: 0.92, paddingHorizontal: scale(15)},
  saveBtnStyle: {
    marginVertical: scale(20),
    backgroundColor: '#69846E',
    borderRadius: scale(20),
    paddingVertical: scale(10),
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '30%',
  },

  dayBtnView: {
    width: scale(60),
    height: scale(48),
    borderRadius: scale(15),
    backgroundColor: Colors.blackPearl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(15),

    borderColor: Colors.blackPearl,
  },
  dayTxt: {
    fontSize: scale(12),
    fontWeight: '700',
    color: Colors.white,
  },
  dayView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(15),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: scale(30),
  },

  cardMainView: {
    width: '100%',
    minHeight: scale(50),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(18),
    paddingVertical: scale(10),
    alignSelf: 'center',
  },
  cardDayTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '700',
    letterSpacing: 2,
  },
  halfDayTxtView: {
    height: scale(47),
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIconView: {
    width: scale(25),
    height: scale(25),
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfDayTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '600',
    marginLeft: scale(20),
  },
  timeView: {
    height: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(8),
    alignItems: 'center',
  },
  timeFromBtn: {
    width: scale(120),
    height: scale(40),
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
  toTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '600',
  },
  dropShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    padding: scale(5),
    marginBottom: scale(5),
  },
  timeTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: 'bold',
  },
  orgView: {
    width: '90%',
    height: scale(60),
    backgroundColor: Colors.blackPearl,
    alignSelf: 'center',
    marginBottom: scale(15),
    paddingHorizontal: scale(15),
    justifyContent: 'center',
  },
};
