import React from 'react';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import {View, StyleSheet, Text} from 'react-native';

import Colors from '../theme';
import {onBoardEmployeesArr} from '../dummyData';
import ScreenDescription from './ScreenDescription';

function OnboardEmployees(props) {
  return (
    <>
      <ScreenDescription
        description1={props.description1 || 'Fill in all mandatory fields to'}
        description2={props.description2 || 'successfully onboard employee.'}
      />
      <View style={style.mappingMainView}>
        {onBoardEmployeesArr.map((data, index) => {
          return (
            <>
              <View key={index}>
                <View
                  style={[
                    style.svgRound,
                    {
                      borderColor:
                        index < props.index
                          ? Colors.blackPearl
                          : Colors.greenWhite,
                    },
                  ]}>
                  <SvgXml
                    xml={index < props.index ? data.image : data.greyImage}
                    width={scale(22)}
                    height={scale(22)}
                  />
                </View>
                <Text
                  style={[
                    style.title,
                    {
                      color:
                        index < props.index ? Colors.sBlack : Colors.greenWhite,
                    },
                  ]}>
                  {data.title}
                </Text>
              </View>
              {index < 3 ? (
                <View
                  style={[
                    style.dashLine,
                    {
                      backgroundColor:
                        index + 1 < props.index
                          ? Colors.blackPearl
                          : Colors.greenWhite,
                    },
                  ]}></View>
              ) : null}
            </>
          );
        })}
      </View>
    </>
  );
}

const style = StyleSheet.create({
  mappingMainView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  svgRound: {
    borderWidth: 4,
    width: scale(50),
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(50 / 2),
  },
  title: {
    fontSize: scale(9.5),
    textAlign: 'center',
    lineHeight: scale(20),
    fontWeight: '600',
  },
  dashLine: {
    width: scale(27),
    height: scale(5),
    marginTop: scale(-18),
  },
});

export default OnboardEmployees;
