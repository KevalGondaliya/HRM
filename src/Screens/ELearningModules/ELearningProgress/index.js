import _ from 'lodash';
import { Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TextInput, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import { useDispatch, useSelector } from 'react-redux';

const ELearningProgress = ({ navigation }) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [pageCurrent, setpageCurrent] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const token = useSelector(state => state.session?.token);
  const elearningProgressData = useSelector(state => state.elearning);
  const isLoading = useSelector(state => state.loading.effects.elearning);

  const onUserBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('ELearningProgressIndividual', { data: item });
  };

  useEffect(() => {
    getElearnProgressData();
  }, []);

  const getElearnProgressData = () => {
    dispatch.elearning.getProgressData({ token });
  };

  const searchData = e => {
    dispatch.elearning.getProgressData({ token, e });
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'E-Learning Progress'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getElearnProgressData}
            refreshing={isLoading.getProgressData}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ScreenDescription
          description1={'View all e-learning progress of all employees.'}
          description2={' Click on the respective button to'}
          description3={' edit or view the details'}
        />

        <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            style={styles.searchInput}
            placeholder={'Search Query…'}
            onChangeText={e => debounce_fun(e)}
            placeholderTextColor={Colors.lightRed}
          />
        </View>

        <Table
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          data={elearningProgressData?.elearnProgressData}
          pageCurrent={pageCurrent}
          setpageCurrent={setpageCurrent}
          onPress={onUserBtnPress}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ELearningProgress;
