import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { format } from 'date-fns';
import styles from './FeedbackCardPage3.styles';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import NextButton from '../../components/Button/NextButton';
import BottomTabBar from '../../components/common/BottomTabBar';
import ProgressCircle from '../../components/Graph/ProgressCircle';
import sectionStyles from '../../components/Routine/RoutineSection.styles';
import {
  getFeedbackAchievementRate,
  getRecommendations,
  saveRecommendedRoutines,
} from '../../api/feedbackApi';

const { width, height } = Dimensions.get('window');

export default function FeedbackCardPage3({ navigation, route }) {
  const { unchecked, checked } = route.params;
  const [achievementRate, setAchievementRate] = useState(0);

  const [options, setOptions] = useState([]); // 추천 목록
  const [selected, setSelected] = useState([]); // 선택한 id 배열
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 성취율 조회
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    getFeedbackAchievementRate(today)
      .then((res) => setAchievementRate(res.data.achievementRate))
      .catch((err) => console.error('피드백카드 호출 실패', err));
  }, []);

  // 추천 루틴 조회
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await getRecommendations();
        setOptions(response.data);
      } catch (error) {
        console.error('추천 루틴 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  // 선택 토글
  const toggleOption = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  // “다음” → 선택 항목 저장 & 다음 화면
  const handleNext = async () => {
    setSubmitting(true);
    try {
      // 선택한 루틴이 있을 때만 저장 호출
      if (selected.length) {
        await saveRecommendedRoutines(selected.map((id) => ({ id })));
      }
      navigation.navigate('RoutineDelete', { unchecked, checked, selected });
    } catch (error) {
      console.error('추천 루틴 저장 실패:', error);
      Alert.alert(
        '저장 실패',
        '루틴을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.purpleHeader} />
      <Text style={styles.headerText}>오늘 너무 잘했어요!</Text>

      <WhiteRoundedContainer>
        <View style={localStyles.progressWrapper}>
          <ProgressCircle value={achievementRate} />
        </View>

        <Text style={sectionStyles.sectionHeader}>다른 루틴 추천</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#7A73FF"
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={styles.optionsWrapper}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionButton,
                  selected.includes(opt.id) && styles.selectedButton,
                ]}
                onPress={() => toggleOption(opt.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected.includes(opt.id) && styles.selectedText,
                  ]}
                >
                  {opt.content}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </WhiteRoundedContainer>

      <NextButton onPress={handleNext} disabled={loading || submitting}>
        {submitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.endButtonText}>다음</Text>
        )}
      </NextButton>

      <BottomTabBar currentTab="routine" onTabPress={() => {}} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  progressWrapper: {
    marginTop: -height * 0.125,
    marginBottom: height * 0.018,
  },
});
