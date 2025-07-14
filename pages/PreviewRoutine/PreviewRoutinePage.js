import React, { useEffect, useState, useRef } from 'react';
import { Dimensions } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import styles from './PreviewRoutinePage.styles';
import RoutinePreviewCard from '../../components/Card/RoutinePreviewCard';
import { SNAP_WIDTH } from '../../components/Card/RoutinePreviewCard.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import {
  fetchRecommendedRoutines,
  saveRecommendedRoutines,
} from '../../api/recommendationApi';

const { width } = Dimensions.get('window');

export default function PreviewRoutinePage({ navigation }) {
  const route = useRoute();
  // console.log('받은 route.params:', route.params); // 디버깅용
  // const { emotion, intensity, category } = route.params;
  const emotion = route.params?.emotion;
  const intensity = route.params?.intensity;
  const category = route.params?.category;
  // console.log('구조분해할당 후:', { emotion, intensity, category }); // 디버깅용

  const [routineCards, setRoutineCards] = useState([]); // 루틴 카드 배열
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [userName, setUserName] = useState('회원'); // 사용자 이름
  const [currentIndex, setCurrentIndex] = useState(1); // 현재 카드 인덱스
  const flatListRef = useRef(null); // FlatList 참조

  // 사용자 이름 불러오기
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const fullName = await AsyncStorage.getItem('userName');
        if (fullName) {
          // 성을 제외한 이름만 추출: 2글자 이상일 경우 뒤쪽 2글자 사용
          const trimmedName =
            fullName.length > 1 ? fullName.slice(-2) : fullName;
          setUserName(trimmedName);
        } else {
          setUserName('회원');
        }
      } catch (e) {
        console.error('이름 불러오기 실패:', e);
        setUserName('회원');
      }
    };

    loadUserName();
  }, []);

  // 추천 루틴 불러오기
  useEffect(() => {
    const fetchData = async () => {
      // 파라미터 검증을 먼저 실행
      if (!emotion || !intensity || !category) {
        console.log('파라미터 누락 - API 호출 중단:', {
          emotion,
          intensity,
          category,
        });
        setLoading(false);
        return;
      }

      try {
        // console.log('API 호출 파라미터:', { emotion, intensity, category }); // 디버깅용

        const response = await fetchRecommendedRoutines({
          emotion,
          intensity,
          category,
        });

        const data = response.data; // [{ id, content, ... }, ...]
        console.log('백엔드에서 받은 data:', data);

        // content만 뽑아서 카드에 넣기 (카드 3장 생성)
        const formatted = data.map((routineGroup, idx) => ({
          id: `${idx}`,
          title: '추천 루틴',
          routines: routineGroup.map((item) => ({
            id: item.id,
            content: item.content,
            time_slot: item.time_slot || '07:30', // 기본값 제공
          })),
        }));

        setRoutineCards(formatted);
        setLoading(false);
      } catch (error) {
        console.error('루틴 불러오기 실패:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [emotion, intensity, category]);

  const handleStart = async () => {
    if (!routineCards[currentIndex]) return;

    // 현재 선택된 카드에서 루틴 리스트 추출
    const selected = routineCards[currentIndex];
    const selectedRoutines = selected.routines;

    try {
      // AsyncStorage에서 로그인된 사용자 ID 불러오기
      const userId = await AsyncStorage.getItem('userId');

      // 루틴 데이터를 서버에 보낼 수 있는 형태로 변환
      const payload = selectedRoutines.map((routine) => ({
        id: routine.id,
        emotion: parseInt(emotion),
        difficulty: parseInt(intensity),
        category: parseInt(category),
        content: routine.content,
        time_slot: routine.time_slot,
        // user_id: parseInt(userId),
      }));

      console.log('서버로 보낼 payload:', payload);

      // 추천 루틴을 서버에 저장 (POST /start API 호출)
      await saveRecommendedRoutines(payload);
      console.log('추천 루틴 저장 완료');

      // ✅ MainPage에 넘길 때 시간 포함해서 보내기
      const routinesForMain = selectedRoutines.map((routine, index) => ({
        id: routine.id ?? `preset-${Date.now()}-${index}`,
        content: routine.content,
        time:
          typeof routine.time_slot === 'string' && routine.time_slot.length >= 5
            ? routine.time_slot.substring(0, 5)
            : '07:30',
        checked: false,
      }));

      navigation.navigate('Main', { routines: routinesForMain });
    } catch (error) {
      console.error('추천 루틴 저장 실패:', error);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Main');
  };

  // FlatList에서 현재 보이는 카드 감지
  const viewConfigRef = { viewAreaCoveragePercentThreshold: 50 };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  // 스크롤 끝났을 때 스냅 효과
  const onMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_WIDTH);

    if (flatListRef.current && index >= 0 && index < routineCards.length) {
      flatListRef.current.scrollToOffset({
        offset: index * SNAP_WIDTH,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Text style={styles.titleText}>
        {userName}님을 위한{'\n'}맛보기 루틴이 준비되었어요!{'\n'}이제
        시작해볼까요?
      </Text>

      {loading ? (
        <View style={{ marginTop: 80, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#7A73FF" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={routineCards}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RoutinePreviewCard
              item={item}
              index={index}
              currentIndex={currentIndex}
            />
          )}
          contentContainerStyle={styles.cardList}
          initialScrollIndex={1}
          getItemLayout={(data, index) => ({
            length: SNAP_WIDTH,
            offset: SNAP_WIDTH * index,
            index,
          })}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef}
          onMomentumScrollEnd={onMomentumScrollEnd}
          decelerationRate="fast"
          snapToInterval={SNAP_WIDTH}
          snapToAlignment="start"
        />
      )}

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>건너뛰기</Text>
      </TouchableOpacity>

      <View style={styles.skipUnderline} />

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}
