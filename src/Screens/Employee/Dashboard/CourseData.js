import React from 'react';
import {scale} from 'react-native-size-matters';
import * as Progress from 'react-native-progress';
import DropShadow from 'react-native-drop-shadow';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../../theme';

const CourseData = props => {
  return (
    <View style={{paddingRight: scale(5)}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={style.tabelMainView}>
            <View style={style.courseIdView}>
              <Text style={style.courseIdTxt}>Course ID</Text>
            </View>

            <View style={[style.courseNameView, {paddingHorizontal: scale(5)}]}>
              <Text style={style.courseIdTxt}>Course Name</Text>
            </View>
            <View
              style={[
                style.courseNameView,
                {width: scale(200), paddingHorizontal: scale(5)},
              ]}>
              <Text style={style.courseIdTxt}>Progress</Text>
            </View>

            <View style={[style.courseIdView, {paddingHorizontal: scale(5)}]}>
              <Text style={style.courseIdTxt}>Score</Text>
            </View>

            <View style={style.emptyView}></View>
          </View>

          <DropShadow style={style.dropShadow}>
            <View style={style.tbView}>
              <FlatList
                data={props.courseData}
                bounces={false}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <View style={style.mappingmainView}>
                      <View style={style.courseIdView}>
                        <Text
                          style={[
                            style.courseIdTxt,
                            {color: Colors.blackPearl},
                          ]}>
                          {index + 1}
                        </Text>
                      </View>

                      <View style={style.courseNameView}>
                        <Text
                          numberOfLines={1}
                          style={[
                            style.courseIdTxt,
                            {color: Colors.blackPearl},
                          ]}>
                          {item.elearnModTitle}
                        </Text>
                      </View>

                      <View style={style.progressMainView}>
                        <View style={style.progressSubView}>
                          <Progress.Bar
                            progress={
                              item.total != 0 && item.score / item.total
                            }
                            height={scale(12)}
                            borderWidth={0}
                            borderRadius={20}
                            color={Colors.greenWhite}
                            width={scale(160)}
                          />
                        </View>
                      </View>

                      <View style={style.courseIdView}>
                        <Text
                          style={[
                            style.courseIdTxt,
                            {color: Colors.blackPearl},
                          ]}>
                          {item.score || 0}/ {item.total}
                        </Text>
                      </View>

                      <View
                        // onPress={() => {
                        //   navigation.navigate('WatchELearningVideo', {
                        //     data: item,
                        //   });
                        // }}
                        style={style.emptyView}>
                        <Text
                          style={[
                            style.statusTxt,
                            {
                              color:
                                item.status == 'Completed'
                                  ? Colors.green
                                  : item.status == 'Continue Here'
                                  ? Colors.sBlack
                                  : Colors.darkRed,
                            },
                          ]}>
                          {item.status || 'Start Now'}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <>
                      <View style={style.noFoundTxtView}>
                        <Text style={style.noFoundTxt}>No Data Found</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          </DropShadow>
        </View>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  tabelMainView: {
    width: '99%',
    height: scale(50),
    backgroundColor: Colors.blackPearl,
    borderRadius: scale(20),
    marginTop: scale(10),
    flexDirection: 'row',
    padding: scale(30),
    paddingVertical: scale(10),
  },
  courseIdView: {
    width: scale(70),
    height: '100%',
    justifyContent: 'center',
  },
  courseIdTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '600',
  },
  courseNameView: {
    width: scale(130),
    height: '100%',
    justifyContent: 'center',
  },
  emptyView: {
    width: scale(90),
    height: '100%',
    justifyContent: 'center',
  },
  mappingmainView: {
    width: '97%',
    height: scale(35),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tbView: {
    width: '98%',
    minHeight: scale(160),
    margin: scale(5),
    backgroundColor: Colors.white,
    borderRadius: scale(20),
    marginTop: scale(10),
    flexDirection: 'row',
    padding: scale(30),
    paddingVertical: scale(15),
  },
  statusTxt: {
    fontSize: scale(12),
    fontWeight: '600',
  },
  dropShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: scale(20),
  },
  progressMainView: {
    width: scale(200),
    height: scale(25),
  },
  progressSubView: {
    width: '90%',
    height: '100%',
    backgroundColor: '#666',
    borderRadius: scale(20),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  noFoundTxt: {
    padding: 15,
    fontSize: 18,
    color: Colors.sBlack,
  },
  noFoundTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default CourseData;
