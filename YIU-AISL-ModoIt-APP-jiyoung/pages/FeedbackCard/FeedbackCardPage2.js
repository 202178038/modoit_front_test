import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { format } from 'date-fns';
import styles from './FeedbackCardPage2.styles';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import NextButton from '../../components/Button/NextButton';
import BottomTabBar from '../../components/common/BottomTabBar';
import ProgressCircle from '../../components/Graph/ProgressCircle';
import routineStyles from '../../components/Routine/RoutineItem.styles';
import sectionStyles from '../../components/Routine/RoutineSection.styles';
import {
  getFeedbackAchievementRate,
  getUncheckedRoutines,
} from '../../api/feedbackApi';

const { width, height } = Dimensions.get('window');

export default function FeedbackCardPage2({ navigation, route }) {
  // 변경된 부분: route.params에서 전달된 체크되지 않은 루틴 가져오기
  const { checked } = route.params;
  const [uncheckedList, setUncheckedList] = useState([]);
  const [achievementRate, setAchievementRate] = useState(0);

  useEffect(() => {
    // 최초 렌더링 시 서버에서 성취율 호출
    const today = format(new Date(), 'yyyy-MM-dd');
    getFeedbackAchievementRate(today)
      .then((res) => {
        setAchievementRate(res.data.achievementRate);
      })
      .catch((err) => {
        console.error('피드백카드 호출 실패', err);
        Alert.alert('오류', '오늘의 루틴 달성률을 불러오지 못했습니다.');
      });

    // 오늘 완료하지 않은 루틴 가져오기
    getUncheckedRoutines()
      .then((res) => setUncheckedList(res.data))
      .catch((err) => console.error('미완료 루틴 조회 실패', err));
  }, []);

  return (
    <View style={styles.container}>
      {/* 상단 연보라색 배경 */}
      <View style={styles.purpleHeader} />
      {/* 상단 텍스트 */}
      <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>

      {/* 아래 카드 영역 */}
      <WhiteRoundedContainer style={styles.whiteContainer}>
        {/* 퍼센트 그래프 추가 */}
        <View style={localStyles.progressWrapper}>
          <ProgressCircle value={achievementRate} />
        </View>

        {/* 진행하지 않은 루틴 헤더 */}
        <Text style={sectionStyles.sectionHeader}>진행하지 않은 루틴</Text>

        {/* 스크롤뷰로 전체 내용을 감싸고, 체크 되지 않은 루틴, NextButton도 포함 */}
        <ScrollView
          style={{ maxHeight: height * 0.37 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* ↓↓ 수정된 부분: 섹션 헤더와 아이템 렌더링 */}
          <View style={sectionStyles.sectionContainer}>
            {/* TODO: 추후 API 연결 할 때 수정할 부분 */}
            {uncheckedList?.map((item) => (
              <View key={item.id} style={routineStyles.itemRow}>
                <View style={routineStyles.routineBox}>
                  <View style={routineStyles.leftBar} />
                  <View style={routineStyles.itemTextContainer}>
                    <Text style={routineStyles.itemTime}>{item.timeSlot}</Text>
                    <Text style={routineStyles.itemTitle}>{item.content}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </WhiteRoundedContainer>

      {/* 다음 버튼 */}
      <NextButton
        onPress={() =>
          navigation.navigate('FeedbackCard3', {
            unchecked: uncheckedList,
            checked,
          })
        }
      ></NextButton>

      <BottomTabBar currentTab="routine" onTabPress={() => {}} />
    </View>
  );
}

//export default function FeedbackCardPage({ navigation }) {
//  return (
//    <View style={styles.container}>
//      {/* 상단 연보라색 배경 */}
//      <View style={styles.purpleHeader} />
//        {/* 상단 텍스트 */}
//        <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>
//      {/* 아래 카드 영역 */}
//      <WhiteRoundedContainer>
//        {/* 퍼센트 그래프 추가 */}
//        <View style={{ marginTop: -px(105), marginBottom: px(15) }}>
//          <ProgressCircle />
//        </View>
//        {/* 카드 안 내용 */}
//        <NextButton onPress={() => navigation.navigate('FeedbackCard3')} />
//      </WhiteRoundedContainer>
//
//      <BottomTabBar currentTab="routine" onTabPress={() => {}} />
//
//    </View>
//  );
//}

const localStyles = StyleSheet.create({
  progressWrapper: {
    marginTop: -height * 0.125, // 약 -105px → 844 기준
    marginBottom: height * 0.018, // 약 15px
  },
});
