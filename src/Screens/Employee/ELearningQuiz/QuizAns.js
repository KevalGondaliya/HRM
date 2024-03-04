import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import DropShadow from 'react-native-drop-shadow';
import {RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../component/Header';
import Button from '../../../component/Button';
import rightAns from '../../../assets/svg/rightAns.svg';
import wrongAns from '../../../assets/svg/wrongAns.svg';
import TextInput from '../../../component/TextInput';

import styles from './style';
import Colors from '../../../theme';
import {useDispatch, useSelector} from 'react-redux';

function ELearningQuizAns({route, navigation}) {
  const editData = route?.params?.data;
  const dispatch = useDispatch();

  const token = useSelector(state => state.session?.token);
  const questionAnsData = useSelector(
    state => state.eLearningQuestion?.questionAnsData,
  );
  const isLoading = useSelector(
    state => state.loading.effects.eLearningQuestion,
  );
  useEffect(() => {
    getQuestionAnsData();
  }, []);

  const getQuestionAnsData = () => {
    console.log('e', editData);
    dispatch.eLearningQuestion.getAns({
      token,
      id: editData?.elearnId,
    });
  };

  const onPress = () => {
    navigation.navigate('ViewELearning');
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={`Module ${editData?.elearnModTitle} Quiz`}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getQuestionAnsData}
            refreshing={isLoading.getAns}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        {questionAnsData?.list?.map((data, index) => {
          return (
            <DropShadow style={[styles.dropShadow]} key={index}>
              <View style={styles.videoFrame}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '90%'}}>
                    <Text style={styles.questionTxt}>Question {index + 1}</Text>
                    <Text style={[styles.questionTxt, styles.question1Txt]}>
                      {data.elearn_quiz.qnTitle}
                    </Text>
                  </View>

                  <SvgXml
                    xml={
                      data.answer === data?.elearn_quiz.answer
                        ? rightAns
                        : wrongAns
                    }
                    width={scale(20)}
                    height={scale(20)}
                  />
                </View>

                {data?.elearn_quiz.qnType == 'Text-Box' ? (
                  <TextInput
                    value={data.answer}
                    editable={false}
                    placeholder={`Answer…`}
                    style={styles.userNameTextInput}
                  />
                ) : data?.elearn_quiz?.qnType == 'True-False' ? (
                  <RadioButton.Group value={data.answer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        disabled
                        color={Colors.blackPearl}
                        value="true"
                      />
                      <Text style={styles.optionTxt}>Yes</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        disabled
                        color={Colors.blackPearl}
                        value="false"
                      />
                      <Text style={styles.optionTxt}>No</Text>
                    </View>
                  </RadioButton.Group>
                ) : data?.elearn_quiz?.qnType == 'Multiple-Check' ? (
                  <>
                    <View style={styles.flex}>
                      <TouchableOpacity disabled style={styles.checkBoxView}>
                        {data?.answer?.includes('A') && (
                          <View style={styles.checkBoxFill} />
                        )}
                      </TouchableOpacity>
                      <Text style={[styles.optionTxt, {marginLeft: scale(10)}]}>
                        {data?.elearn_quiz.option1}
                      </Text>
                    </View>

                    <View style={styles.flex}>
                      <TouchableOpacity disabled style={styles.checkBoxView}>
                        {data.answer?.includes('B') && (
                          <View style={styles.checkBoxFill} />
                        )}
                      </TouchableOpacity>
                      <Text style={[styles.optionTxt, {marginLeft: scale(10)}]}>
                        {data?.elearn_quiz.option2}
                      </Text>
                    </View>

                    <View style={styles.flex}>
                      <TouchableOpacity disabled style={styles.checkBoxView}>
                        {data.answer?.includes('C') && (
                          <View style={styles.checkBoxFill} />
                        )}
                      </TouchableOpacity>
                      <Text style={[styles.optionTxt, {marginLeft: scale(10)}]}>
                        {data?.elearn_quiz.option3}
                      </Text>
                    </View>

                    <View style={styles.flex}>
                      <TouchableOpacity disabled style={styles.checkBoxView}>
                        {data.answer?.includes('D') && (
                          <View style={styles.checkBoxFill} />
                        )}
                      </TouchableOpacity>
                      <Text style={[styles.optionTxt, {marginLeft: scale(10)}]}>
                        {data?.elearn_quiz.option4}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <RadioButton.Group value={data.answer}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                          disabled
                          color={Colors.blackPearl}
                          value="A"
                        />
                        <Text style={styles.optionTxt}>
                          {data.elearn_quiz.option1}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                          disabled
                          color={Colors.blackPearl}
                          value="B"
                        />
                        <Text style={styles.optionTxt}>
                          {data.elearn_quiz.option2}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                          disabled
                          color={Colors.blackPearl}
                          value="C"
                        />
                        <Text style={styles.optionTxt}>
                          {data.elearn_quiz.option3}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                          disabled
                          color={Colors.blackPearl}
                          value="D"
                        />
                        <Text style={styles.optionTxt}>
                          {data.elearn_quiz.option4}
                        </Text>
                      </View>
                    </RadioButton.Group>
                  </>
                )}
              </View>
            </DropShadow>
          );
        })}

        <Text style={styles.totalTxt}>
          Total Score : {questionAnsData?.score || 0} /{' '}
          {questionAnsData?.total || 0}
        </Text>

        <View style={styles.searchBtnView}>
          <Button
            label={'Back to Modules'}
            btnStyle={styles.browseBtn}
            labelStyle={styles.browseTxt}
            onPress={() => onPress()}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ELearningQuizAns;
