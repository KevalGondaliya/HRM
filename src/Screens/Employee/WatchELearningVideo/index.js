import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';

function WatchELearningVideo({route, navigation}) {
  const dispatch = useDispatch();
  const editData = route?.params?.data;
  const token = useSelector(state => state.session?.token);

  useEffect(() => {
    if (editData) {
      dispatch.eLearningQuestion.getQuestionElearnId({
        token,
        id: editData.elearnId,
      });
    }
  }, [editData]);

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
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.keyboardAwareScrollView}>
        <DropShadow style={[styles.dropShadow]}>
          <View style={styles.videoFrame}>
            <Text style={styles.videoTxt}>
              Video or Document will be embedded here
            </Text>
          </View>
        </DropShadow>

        <SaveCancelBtn
          cancelBtn={() => {
            navigation.goBack();
          }}
          submitBtn={() => {
            navigation.navigate('ELearningQuiz', {data: editData});
          }}
          label={'Start Quiz'}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default WatchELearningVideo;
