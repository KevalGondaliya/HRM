import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import Colors from '../../../theme';
import roundRightBtn from '../../../assets/svg/roundRightBtn.svg';
import roundLeftArrow from '../../../assets/svg/roundLeftArrow.svg';

import styles from './style';

const QuestionBoxSlider = ({questionArr, onQuestionPress}) => {
  const flatListRef = useRef();
  const [current, setCurrent] = useState(0);

  const goNextSlide = () => {
    setCurrent(current < questionArr.length - 1 ? current + 1 : 0);
  };
  const goPrevSlide = () => {
    if (current != 0)
      setCurrent(
        current <= questionArr.length - 1 && current >= 0 ? current - 1 : 0,
      );
  };

  useEffect(() => {
    if (current != 0) {
      flatListRef.current.scrollToIndex({index: current, animated: true});
    }
  }, [current]);

  return (
    <View style={styles.bottomBtnView}>
      <TouchableOpacity
        disabled={questionArr?.length > 0 ? false : true}
        onPress={goPrevSlide}
        style={styles.leftBtnView}>
        <SvgXml xml={roundLeftArrow} width={scale(30)} height={scale(30)} />
      </TouchableOpacity>

      <View style={styles.midBoxView}>
        <FlatList
          horizontal
          ref={flatListRef}
          data={questionArr}
          style={styles.flatListStyle}
          keyExtractor={index => index.toString()}
          showsHorizontalScrollIndicatorr={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onQuestionPress(item);
                }}
                style={styles.boxView}
                key={index}>
                <Text style={styles.boxIndexTxt}>{index + 1}</Text>
                <View style={[styles.qtBox, styles.fillBox]}>
                  <Text style={[styles.qtTxt, {color: Colors.blackPearl}]}>
                    {item.qnTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <TouchableOpacity
        disabled={questionArr?.length > 0 ? false : true}
        onPress={goNextSlide}
        style={styles.leftBtnView}>
        <SvgXml xml={roundRightBtn} width={scale(30)} height={scale(30)} />
      </TouchableOpacity>
    </View>
  );
};

export default QuestionBoxSlider;
