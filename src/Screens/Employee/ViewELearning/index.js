import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { RefreshControl, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../../component/Header';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';

const ViewELearning = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const elearning = useSelector(
    state => state.elearning?.elearnProgressDataById,
  );
  const isLoading = useSelector(
    state => state.loading.effects.elearning?.getProgressDataById,
  );

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate(
      item?.status == 'Completed' ? 'QuizAns' : 'WatchELearningVideo',
      {
        data: item,
      },
    );
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    dispatch.elearning.getProgressDataById({ token, id: user?.id });
  };

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'View E-Learning'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl onRefresh={getData} refreshing={isLoading} />
        }
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'View all of your registered'}
          description2={'attendance here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

        <Table
          data={elearning}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          editIconPress={editBtnPress}
          onPress={item => editBtnPress(item)}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ViewELearning;
