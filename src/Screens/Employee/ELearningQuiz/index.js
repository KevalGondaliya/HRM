import {scale} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import DropShadow from 'react-native-drop-shadow';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, RefreshControl, TouchableOpacity} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {RadioButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../component/Header';
import {EditMultiCheckData, radioButtonsData} from '../../../dummyData';
import TextInput from '../../../component/TextInput';
import RadioButtons from '../../../component/RadioButton';
import SaveCancelBtn from '../../../component/SaveCancelBtn';

import styles from './style';
import Colors from '../../../theme';

function ELearningQuiz({route, navigation}) {
  const dispatch = useDispatch();
  const editData = route?.params?.data;
  const [questionArr, setQuestionArr] = useState([]);

  const isLoading = useSelector(
    state => state.loading.effects.eLearningQuestion,
  );
  const eLearningQuestionData = useSelector(state => state.eLearningQuestion);
  const token = useSelector(state => state.session?.token);

  useEffect(() => {
    getQuestionData();
  }, []);

  const getQuestionData = () => {
    dispatch.eLearningQuestion.getQuestionElearnId({
      token,
      id: editData.elearnId,
    });
  };

  useEffect(() => {
    if (eLearningQuestionData?.isAnsELearningQuestionData) {
      dispatch.eLearningQuestion.setQuestionIdData(false);
      navigation.navigate('ViewELearning');
    }
  }, [eLearningQuestionData]);

  useEffect(() => {
    if (eLearningQuestionData?.questionIdData) {
      let arr = eLearningQuestionData?.questionIdData;

      arr.forEach(element => {
        if (element.qnType == 'Multiple-Check') {
          element.answer = JSON.stringify([]);
          element.isMultiChecked1 = false;
          element.isMultiChecked2 = false;
          element.isMultiChecked3 = false;
          element.isMultiChecked4 = false;
        } else element.answer = '';

        element.elearnQuizId = element.id;
        element.isChecked = false;
      });

      setQuestionArr([...arr]);
    }
  }, [eLearningQuestionData?.questionIdData]);

  const onChange = (key, item, index) => {
    let rule = questionArr;
    rule[index] = {...rule[index], [key]: item};
    setQuestionArr([...rule]);
  };

  const onChanges = (key, item, index) => {
    let rule = questionArr;
    rule[index] = {...rule[index], [key]: item};
    console.log('rule', rule);
    setQuestionArr([...rule]);
  };

  const onCheckBoxChanges = (key, item, index, value) => {
    let rule = questionArr;
    rule[index] = {...rule[index], [key]: item};
    let ans = JSON.parse(rule[index].answer);

    if (ans?.includes(value)) {
      const index = ans.indexOf('A' || 'B' || 'C' || 'D');
      console.log(index);
      ans.splice(index, 1);
    } else {
      ans.push(value);
    }

    rule[index].answer = JSON.stringify(ans);

    setQuestionArr([...rule]);
  };

  const submitBtn = () => {
    // navigation.navigate('QuizAns');
    let data = {
      elearnId: questionArr[0].elearnId,
      quizs: questionArr,
    };
    console.log('data', data);

    dispatch.eLearningQuestion.addQuestionAns({token, data});
  };

  const cancelBtn = () => {
    navigation.goBack();
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
            onRefresh={getQuestionData}
            refreshing={isLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        {questionArr?.length > 0 ? (
          questionArr?.map((data, index) => {
            return (
              <DropShadow style={[styles.dropShadow]}>
                <View style={styles.videoFrame}>
                  <Text style={styles.questionTxt}>Question {index + 1}</Text>
                  <Text style={[styles.questionTxt, styles.question1Txt]}>
                    {data.qnTitle}
                  </Text>

                  {data.qnType == 'Text-Box' ? (
                    <TextInput
                      value={data.ans}
                      onChangeText={item => {
                        onChange('answer', item, index);
                      }}
                      placeholder={`Answer…`}
                      style={styles.userNameTextInput}
                    />
                  ) : data.qnType == 'True-False' ? (
                    <RadioButton.Group
                      onValueChange={newValue => {
                        onChange('answer', newValue, index);
                        onChanges('isChecked', newValue, index);
                      }}
                      value={data.isChecked}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton color={Colors.blackPearl} value="true" />
                        <Text style={styles.optionTxt}>Yes</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton color={Colors.blackPearl} value="false" />
                        <Text style={styles.optionTxt}>No</Text>
                      </View>
                    </RadioButton.Group>
                  ) : data.qnType == 'Multiple-Check' ? (
                    <>
                      <View style={styles.flex}>
                        <TouchableOpacity
                          onPress={() => {
                            let value = 'A';
                            onCheckBoxChanges(
                              'isMultiChecked1',
                              !data.isMultiChecked1,
                              index,
                              value,
                            );
                          }}
                          style={styles.checkBoxView}>
                          {data.isMultiChecked1 && (
                            <View style={styles.checkBoxFill}></View>
                          )}
                        </TouchableOpacity>
                        <Text
                          style={[styles.optionTxt, {marginLeft: scale(10)}]}>
                          {data?.option1}
                        </Text>
                      </View>

                      <View style={styles.flex}>
                        <TouchableOpacity
                          onPress={() => {
                            let value = 'B';
                            onCheckBoxChanges(
                              'isMultiChecked2',
                              !data.isMultiChecked2,
                              index,
                              value,
                            );
                          }}
                          style={styles.checkBoxView}>
                          {data.isMultiChecked2 && (
                            <View style={styles.checkBoxFill}></View>
                          )}
                        </TouchableOpacity>
                        <Text
                          style={[styles.optionTxt, {marginLeft: scale(10)}]}>
                          {data?.option2}
                        </Text>
                      </View>

                      <View style={styles.flex}>
                        <TouchableOpacity
                          onPress={() => {
                            let value = 'C';
                            onCheckBoxChanges(
                              'isMultiChecked3',
                              !data.isMultiChecked3,
                              index,
                              value,
                            );
                          }}
                          style={styles.checkBoxView}>
                          {data.isMultiChecked3 && (
                            <View style={styles.checkBoxFill}></View>
                          )}
                        </TouchableOpacity>
                        <Text
                          style={[styles.optionTxt, {marginLeft: scale(10)}]}>
                          {data?.option3}
                        </Text>
                      </View>

                      <View style={styles.flex}>
                        <TouchableOpacity
                          onPress={() => {
                            let value = 'D';
                            onCheckBoxChanges(
                              'isMultiChecked4',
                              !data.isMultiChecked4,
                              index,
                              value,
                            );
                          }}
                          style={styles.checkBoxView}>
                          {data.isMultiChecked4 && (
                            <View style={styles.checkBoxFill}></View>
                          )}
                        </TouchableOpacity>
                        <Text
                          style={[styles.optionTxt, {marginLeft: scale(10)}]}>
                          {data?.option4}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <RadioButton.Group
                        onValueChange={newValue => {
                          onChange('answer', newValue, index);
                          onChanges('isChecked', newValue, index);
                        }}
                        value={data.isChecked}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <RadioButton color={Colors.blackPearl} value="A" />
                          <Text style={styles.optionTxt}>{data.option1}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <RadioButton color={Colors.blackPearl} value="B" />
                          <Text style={styles.optionTxt}>{data.option2}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <RadioButton color={Colors.blackPearl} value="C" />
                          <Text style={styles.optionTxt}>{data.option3}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <RadioButton color={Colors.blackPearl} value="D" />
                          <Text style={styles.optionTxt}>{data.option4}</Text>
                        </View>
                      </RadioButton.Group>
                    </>
                  )}
                </View>
              </DropShadow>
            );
          })
        ) : (
          <Text
            style={{
              fontSize: scale(15),
              color: Colors.blackPearl,
              textAlign: 'center',
            }}>
            No Data Found
          </Text>
        )}

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={questionArr?.length > 0 ? submitBtn : cancelBtn}
          label={'Submit'}
          saveLoading={isLoading?.addQuestionAns}
          style={{marginVertical: scale(20)}}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ELearningQuiz;
