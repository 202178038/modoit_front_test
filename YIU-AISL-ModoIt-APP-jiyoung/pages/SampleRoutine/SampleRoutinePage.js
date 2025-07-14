import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';

// ✅ 스타일과 공통 컴포넌트
import styles from './SampleRoutinePage.styles';
import RoutinePreviewCard from '../../components/Card/RoutinePreviewCard';
import AddButton from '../../components/Button/AddButton';
import BottomTabBar from '../../components/common/BottomTabBar';

// ✅ 추천 루틴 API
import {
  fetchEmotionSample,
  fetchDifficultySample,
  saveSampleRoutines,
} from '../../api/recommendationApi';

const { width } = Dimensions.get('window');

// ✅ 상단에 보여질 태그 목록
const TAGS = ['행복', '무난', '우울', '쉬움', '보통', '어려움'];

// ✅ 태그 종류 구분 (emotion 또는 difficulty)
const TAG_TYPE_MAP = {
  행복: 'emotion',
  무난: 'emotion',
  우울: 'emotion',
  쉬움: 'difficulty',
  보통: 'difficulty',
  어려움: 'difficulty',
};

// ✅ 감정 태그에 대응하는 코드 (emotionSamples의 키 값)
const EMOTION_CODE_MAP = {
  행복: '1',
  무난: '2',
  우울: '3',
};

// ✅ 강도 태그에 대응하는 코드 (difficultySamples의 키 값)
const DIFFICULTY_CODE_MAP = {
  쉬움: '1',
  보통: '2',
  어려움: '3',
};

export default function SampleRoutinePage({ navigation }) {
  const [selectedTag, setSelectedTag] = useState(TAGS[0]); // 첫 번째 태그 기본 선택
  const [routines, setRoutines] = useState([]); // 추천 루틴 목록
  const [loading, setLoading] = useState(true); // 로딩 상태

  // ✅ 선택된 태그가 바뀔 때마다 추천 루틴 가져오기
  useEffect(() => {
    fetchRoutinesByTag(selectedTag);
  }, [selectedTag]);

  // ✅ 선택된 태그(emotion/difficulty)에 맞는 추천 루틴 API 호출
  const fetchRoutinesByTag = async (tag) => {
    try {
      setLoading(true);

      const type = TAG_TYPE_MAP[tag];
      const key =
        type === 'emotion' ? EMOTION_CODE_MAP[tag] : DIFFICULTY_CODE_MAP[tag];

      let response;
      if (type === 'emotion') {
        response = await fetchEmotionSample(key);
      } else {
        response = await fetchDifficultySample(key);
      }

      if (response?.data) {
        setRoutines(response.data);
      }
    } catch (error) {
      console.error('❌ 샘플 루틴 불러오기 실패:', error);
      setRoutines([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 카드 컴포넌트에 넘길 데이터 구조
  const routineData = {
    title: selectedTag + ' 추천 루틴',
    routines: routines, // 전체 객체 통째로 넘기기 (id + content)
  };

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <Text style={styles.titleText}>루틴 태그</Text>

      {/* 태그 선택 버튼 리스트 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagListContainer}
      >
        {TAGS.map((tag, index) => {
          const isSelected = selectedTag === tag;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tagButton,
                isSelected ? styles.selectedTag : styles.unselectedTag,
              ]}
              onPress={() => setSelectedTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  isSelected ? styles.selectedText : styles.unselectedText,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 루틴 프리뷰 카드 */}
      {loading ? (
        <View style={{ marginTop: 70, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#7A73FF" />
        </View>
      ) : (
        <View style={styles.routinePreviewContainer}>
          <RoutinePreviewCard item={routineData} index={0} currentIndex={0} />
        </View>
      )}

      {/* 추가하기 버튼 */}
      <AddButton
        onPress={async () => {
          try {
            const presetIdList = routines.map((r) => ({ id: r.id }));
            await saveSampleRoutines(presetIdList);

            Alert.alert('루틴이 추가되었습니다!');
            navigation.navigate('Main');
          } catch (error) {
            console.error('❌ 루틴 저장 실패:', error);
            Alert.alert('저장 실패', '루틴을 추가하는 데 실패했습니다.');
          }
        }}
      />

      {/* 하단 탭 */}
      <BottomTabBar
        currentTab="sample"
        onTabPress={(tab) => {
          if (tab === 'routine') navigation.navigate('Main');
          else if (tab === 'feedback') navigation.navigate('FeedbackCalendar');
        }}
      />
    </View>
  );
}
