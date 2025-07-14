import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { format } from 'date-fns';
import styles from './FeedbackCardPage.styles';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import NextButton from '../../components/Button/NextButton';
import BottomTabBar from '../../components/common/BottomTabBar';
import ProgressCircle from '../../components/Graph/ProgressCircle';
import LevelSelector from '../../components/Feedback/LevelSelector';
import {
  getFeedbackAchievementRate,
  submitFeedback,
} from '../../api/feedbackApi';

const { width, height } = Dimensions.get('window');

export default function FeedbackCardPage({ navigation, route }) {
  // 수정된 부분: MainPage에서 전달된 체크되지 않은 루틴 받기
  const { unchecked, checked } = route.params;
  const [achievementRate, setAchievementRate] = useState(0);
  const [emotionLevel, setEmotionLevel] = useState(null);
  const [situationLevel, setSituationLevel] = useState(null);

  // 최초 렌더링 시 서버에서 성취율 호출
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    console.log('📅 오늘 날짜:', today); // 확인용
    getFeedbackAchievementRate(today)
      .then((res) => {
        console.log('✅ 서버 응답:', res.data); // 응답 구조 확인
        setAchievementRate(res.data.achievementRate);
      })
      .catch((err) => {
        console.error('피드백카드 호출 실패', err);
        Alert.alert('오류', '오늘의 루틴 달성률을 불러오지 못했습니다.');
      });
  }, []);

  const handleSubmit = () => {
    if (!emotionLevel || !situationLevel) {
      return Alert.alert('알림', '감정과 상황을 모두 선택해주세요');
    }
    submitFeedback({ emotion: emotionLevel, intensity: situationLevel })
      .then(() => navigation.navigate('FeedbackCard2', { unchecked, checked }))
      .catch((err) => {
        console.error(err);
        Alert.alert('오류', '피드백 제출에 실패했습니다');
      });
  };

  return (
    <View style={styles.container}>
      {/* 상단 연보라색 배경 */}
      <View style={styles.purpleHeader} />
      {/* 상단 텍스트 */}
      <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>

      {/* 아래 카드 영역 */}
      <WhiteRoundedContainer>
        {/* 퍼센트 그래프 추가 */}
        <View style={{ marginTop: -110, marginBottom: 15 }}>
          <ProgressCircle value={achievementRate} />
        </View>
        {/* 카드 안 내용 */}
        <Text style={styles.feedbackTitle}>
          오늘 루틴을 진행할 때 어땠나요?
        </Text>

        {/* 감정 선택 */}
        <LevelSelector
          title="감정"
          selectedLevel={emotionLevel}
          onSelect={setEmotionLevel}
        />

        {/* 상황 선택 */}
        <LevelSelector
          title="상황"
          selectedLevel={situationLevel}
          onSelect={setSituationLevel}
        />
      </WhiteRoundedContainer>
      {/* 다음 버튼
        <NextButton
          onPress={() =>
            // 수정된 부분: 체크되지 않은 루틴을 다음 화면으로 전달
            navigation.navigate('FeedbackCard2', { unchecked, checked })
          }
        /> */}
      <NextButton onPress={handleSubmit} />

      <BottomTabBar currentTab="routine" onTabPress={() => {}} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  progressWrapper: {
    marginTop: -height * 0.125, // 약 -105px → 844 기준
    marginBottom: height * 0.018, // 약 15px
  },
});
