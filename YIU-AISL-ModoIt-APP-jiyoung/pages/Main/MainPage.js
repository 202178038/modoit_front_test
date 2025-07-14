// MainPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './MainPage.styles';
// 컴포넌트 임포트
import WeeklyHeader from '../../components/WeeklyHeader/WeeklyHeader';
import WhiteRoundedContainer from '../../components/common/WhiteRoundedContainer';
import FloatingActionButton from '../../components/FloatingActionButton/FloatingActionButton';
import BottomTabBar from '../../components/common/BottomTabBar';
import AddRoutineModal from '../../components/Modal/AddRoutineModal';
import EditRoutineModal from '../../components/Modal/EditRoutineModal';
import RoutineSection from '../../components/Routine/RoutineSection';
// 유틸 및 API 함수
import { useRoute } from '@react-navigation/native';
import { fetchRoutinesByDate } from '../../api/routineApi';
import { format } from 'date-fns'; // 날짜 포맷 라이브러리
import { toggleRoutineCheck } from '../../api/routineApi'; // 루틴 체크 상태 토글 API
import {
  addRoutine,
  getRoutineDetail,
  editRoutine,
  finishRoutine,
} from '../../api/routineApi';

export default function MainPage({ navigation }) {
  // ✅ 라우트 파라미터 받기 (예: 추천 루틴)
  const route = useRoute();
  // ✅ 상태값 정의
  // const [selectedTab, setSelectedTab] = useState('routine');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('30');
  const [routineText, setRoutineText] = useState('');
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  // ✅ 시간 문자열("HH:mm") → 분으로 변환
  const toMins = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map((n) => parseInt(n, 10));
    return h * 60 + m;
  };

  // ✅ 루틴 조회 (추천 루틴 + 저장된 루틴 병합)
  useEffect(() => {
    const loadAllRoutines = async () => {
      try {
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        const res = await fetchRoutinesByDate(new Date(todayStr));
        const saved = res.data.map((item) => {
          const rawTime = item.timeSlot ?? item.time_slot;
          const time =
            typeof rawTime === 'string' && rawTime.length >= 5
              ? rawTime.substring(0, 5)
              : '00:00';
          return {
            id: item.id.toString(),
            time,
            title: item.content,
            checked: !!item.completed,
          };
        });

        saved.sort((a, b) => toMins(a.time) - toMins(b.time));
        setRoutines(saved);
        // // 4) 추천 받은 프리셋(route.params) 매핑
        // const recommended = (route.params?.routines || []).map((item, idx) => {
        //   const rawTime = item.timeSlot ?? item.time_slot ?? item.time;
        //   const time =
        //     typeof rawTime === 'string' && rawTime.length >= 5
        //       ? rawTime.substring(0, 5)
        //       : '00:00';
        //   return {
        //     id: `preset-${item.id ?? idx}`,
        //     time,
        //     title: item.content ?? '제목 없음',
        //     checked: false,
        //   };
        // });

        // // 5) 병합 + 중복 제거 + 시간 순 정렬
        // const seen = new Set();
        // const merged = [...recommended, ...saved].filter((r) => {
        //   const key = `${r.title}-${r.time}`;
        //   if (seen.has(key)) return false;
        //   seen.add(key);
        //   return true;
        // });
        // merged.sort((a, b) => toMins(a.time) - toMins(b.time));

        // setRoutines(merged);

      } catch (error) {
        console.error('루틴 불러오기 실패:', error);
      }
    };

    loadAllRoutines();
  }, []);

  // ✅ 루틴 추가 처리 함수
  const handleAddRoutine = async () => {
    const hh = hour.padStart(2, '0');
    const mm = minute.padStart(2, '0');
    const newRoutine = {
      timeSlot: `${hh}:${mm}`,
      content: routineText.trim() || '제목 없음',
    };

    try {
      const res = await addRoutine(newRoutine);
      const returned = res.data || {};
      const idStr =
        returned.id != null ? returned.id.toString() : Date.now().toString();

      const newItem = {
        id: idStr,
        time: returned.timeSlot?.slice(0, 5) ?? newRoutine.timeSlot,
        title: returned.content ?? newRoutine.content,
        checked: !!returned.isCompleted,
      };

      setRoutines((prev) =>
        [...prev, newItem].sort((a, b) => toMins(a.time) - toMins(b.time))
      );
      setHour('07');
      setMinute('30');
      setRoutineText('');
      setAddModalVisible(false);
    } catch (error) {
      console.error('루틴 추가 실패:', error);
    }
  };

  // ✅ 루틴 수정 처리 함수
  const handleSaveEdited = async (updated) => {
    try {
      await editRoutine({
        id: updated.id,
        timeSlot: updated.time,
        content: updated.title,
      });
      setRoutines((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (error) {
      console.error('루틴 수정 실패:', error);
    } finally {
      setSelectedRoutine(null);
      setEditModalVisible(false);
    }
  };

  // ✅ 루틴 체크 상태 토글 함수
  const toggleCheck = async (id) => {
    try {
      const numericId = parseInt(id.toString().replace(/[^0-9]/g, ''), 10);
      const result = await toggleRoutineCheck(numericId); // { id: 60, isCompleted: true }
      console.log('🧾 API 응답 결과:', result); // ✅ 여기에 isCompleted가 true로 오고 있는지 확인
      setRoutines((prev) => {
        const updated = prev.map((item) => {
          const itemNumericId = parseInt(
            item.id.toString().replace(/[^0-9]/g, ''),
            10
          );
          const updatedItem =
            itemNumericId === result.id
              ? { ...item, checked: result.completed }
              : item;
          console.log('🧩 갱신:', item.id, '→', updatedItem.checked);
          return updatedItem;
        });
        return updated;
      });
    } catch (error) {
      console.error('루틴 체크 실패:', error);
    }
  };

  // ✅ 루틴 상세 조회 후 편집 모달 오픈
  const onPressRoutine = async (item) => {
    //체크된 루틴은 수정 모달을 열지 않음
    if (item.checked) return;
    try {
      const res = await getRoutineDetail(item.id);
      const rawTime = res.data.timeSlot ?? res.data.time_slot;
      const time =
        typeof rawTime === 'string' && rawTime.length >= 5
          ? rawTime.substring(0, 5)
          : '00:00';
      setSelectedRoutine({
        id: res.data.id.toString(),
        time,
        title: res.data.content,
      });
      setEditModalVisible(true);
    } catch (error) {
      console.error('상세 조회 실패:', error);
    }
  };

  // ✅ 주간 날짜 리스트 생성 (WeeklyHeader용)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const getStartOfWeek = (d) => {
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(d);
    start.setDate(diff);
    return start;
  };
  const baseDate = getStartOfWeek(today);
  const dateList = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    return d;
  });
  const currentMonth = today.getMonth() + 1;

  // ✅ 시간대별 루틴 분류
  const grouped = { morning: [], lunch: [], evening: [] };
  routines.forEach((item) => {
    const mins = toMins(item.time);
    if (mins <= 720) grouped.morning.push(item);
    else if (mins <= 960) grouped.lunch.push(item);
    else grouped.evening.push(item);
  });

  // ✅ 루틴 탭 렌더링
  const renderRoutineTab = () => (
    <View style={styles.routineWrapper}>
      <WhiteRoundedContainer style={styles.whiteContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <RoutineSection
            title="아침"
            data={grouped.morning}
            onToggle={toggleCheck}
            onPressItem={onPressRoutine}
          />
          <RoutineSection
            title="점심"
            data={grouped.lunch}
            onToggle={toggleCheck}
            onPressItem={onPressRoutine}
          />
          <RoutineSection
            title="저녁"
            data={grouped.evening}
            onToggle={toggleCheck}
            onPressItem={onPressRoutine}
          />
          <TouchableOpacity
            style={styles.endButton}
            onPress={async () => {
              // 1) 완료/미완료 루틴 id와 상태를 DTO 형태로 변환
              const payload = routines.map((r) => ({
                id: parseInt(r.id, 10),
                isCompleted: r.checked,
              }));

              try {
                await finishRoutine(payload); // 2) 서버에 종료 보고
                // 성공 시 Feedback 화면으로 이동
                navigation.navigate('FeedbackCard', {
                  checked: payload.filter((p) => p.isCompleted),
                  unchecked: payload.filter((p) => !p.isCompleted),
                });
              } catch (err) {
                console.error('루틴 종료 보고 실패:', err);
              }
            }}
          >
            <Text style={styles.endButtonText}>끝내기</Text>
          </TouchableOpacity>
        </ScrollView>
      </WhiteRoundedContainer>
    </View>
  );

  // ✅ 화면 렌더링
  return (
    <View style={styles.container}>
      <WeeklyHeader
        dateList={dateList}
        currentMonth={currentMonth}
        today={today}
      />
      {renderRoutineTab()}

      <AddRoutineModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        hour={hour}
        minute={minute}
        setHour={setHour}
        setMinute={setMinute}
        routine={routineText}
        setRoutine={setRoutineText}
        onAdd={handleAddRoutine}
      />

      <EditRoutineModal
        visible={editModalVisible}
        routineItem={selectedRoutine}
        onSave={handleSaveEdited}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedRoutine(null);
        }}
      />

      <FloatingActionButton onPress={() => setAddModalVisible(true)} />

      <BottomTabBar
        currentTab="routine"
        onTabPress={(tab) => {
          if (tab === 'sample') navigation.navigate('SampleRoutine');
          else if (tab === 'feedback') navigation.navigate('FeedbackCalendar');
        }}
      />
    </View>
  );
}
