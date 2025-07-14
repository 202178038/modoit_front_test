// FeedbackCalendarPage.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './FeedbackCalendarPage.styles';
import BottomTabBar from '../../components/common/BottomTabBar';
import FeedbackModal from '../../components/Modal/FeedbackModal';
import CircularProgressWithIcon from '../../components/Graph/CircularProgressWithIcon';
import { getFeedbackCards } from '../../api/feedbackApi';

const { height } = Dimensions.get('window');

export default function FeedbackCalendarPage({ navigation }) {
  // ─── 1. 오늘(today) 정보 ───
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // ─── 2. 캘린더 관련 state ───
  const [currentDate, setCurrentDate] = useState(
    new Date(todayYear, todayMonth, 1)
  );
  const [selectedDay, setSelectedDay] = useState(todayDate);

  // ─── 3. 모달 가시성 state ───
  const [modalVisible, setModalVisible] = useState(false);

  // ─── 4. 하단 탭바 현재 탭 ───
  const currentTab = 'feedback';

  // ─── 5. 한글 월 배열 ───
  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  // ─── 6. 이번 달의 피드백 카드 목록 ───
  const [feedbackCards, setFeedbackCards] = useState([]);

  // ─── 7. 프로그레스 상태 ───
  const [progress, setProgress] = useState(100);

  // ─── 8. currentDate가 바뀔 때마다 서버에서 해당 연·월 데이터 불러오기 ───
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // JS month 0~11 → 1~12
    getFeedbackCards(year, month)
      .then(({ data }) => {
        setFeedbackCards(data);
      })
      .catch((err) => {
        console.error('피드백 카드 조회 실패:', err);
      });
  }, [currentDate]);

  // ─── 9. selectedDay 또는 feedbackCards 변경 시 progress 업데이트 ───
  useEffect(() => {
    if (selectedDay == null) return;
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(selectedDay).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`; // ex) "2025-06-12"

    const record = feedbackCards.find((item) => item.date === dateStr);
    setProgress(record ? Math.round(record.achievementRate) : 0);
  }, [selectedDay, feedbackCards]);

  // ─── 캘린더 로직 (생략된 getDaysInMonth 포함) ───
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  const generateCalendarArray = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const firstDayIndex = firstOfMonth.getDay();
    const blankCount = (firstDayIndex + 6) % 7;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthLastDate = getDaysInMonth(prevYear, prevMonth);
    const thisMonthLastDate = getDaysInMonth(year, month);

    const arr = [];
    // 이전 달
    for (let i = 0; i < blankCount; i++) {
      const d = prevMonthLastDate - blankCount + 1 + i;
      arr.push({ day: d, current: false });
    }
    // 이번 달
    for (let d = 1; d <= thisMonthLastDate; d++) {
      arr.push({ day: d, current: true });
    }
    return arr;
  };

  // ─── 이전/다음 달 버튼 ───
  const onPrevMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };
  const onNextMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  // ─── 날짜 선택 ───
  const onSelectDay = (day) => {
    setSelectedDay(day);
  };

  // ─── “오늘이 속한 달인지” 검사 ───
  useEffect(() => {
    const viewYear = currentDate.getFullYear();
    const viewMonth = currentDate.getMonth();
    if (viewYear === todayYear && viewMonth === todayMonth) {
      setSelectedDay(todayDate);
    } else {
      setSelectedDay(null);
    }
  }, [currentDate]);

  // ─── 캘린더 주 단위 분할 ───
  const calendarArray = generateCalendarArray();
  const weeks = [];
  for (let i = 0; i < calendarArray.length; i += 7) {
    weeks.push(calendarArray.slice(i, i + 7));
  }

  // ─── 탭바 클릭 시 네비게이션 ───
  const handleTabPress = (tabKey) => {
    if (tabKey === 'feedback') return;
    if (tabKey === 'routine') navigation.navigate('Main');
    else if (tabKey === 'sample') navigation.navigate('SampleRoutine');
  };

  // ─── 선택된 날짜 포맷 (YY.MM.DD) ───
  const formatSelectedDate = () => {
    if (!selectedDay) return '';
    const y = currentDate.getFullYear() % 100;
    const m = currentDate.getMonth() + 1;
    const d = selectedDay;
    const yy = String(y).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${yy}.${mm}.${dd}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: height * 0.1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onPrevMonth}>
            <Text style={styles.navArrowText}>{'< '}</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {monthNames[currentDate.getMonth()]}
          </Text>
          <TouchableOpacity onPress={onNextMonth}>
            <Text style={styles.navArrowText}>{' >'}</Text>
          </TouchableOpacity>
        </View>

        {/* 요일 레이블 */}
        <View style={styles.weekdayContainer}>
          {['월', '화', '수', '목', '금', '토', '일'].map((wd) => (
            <Text key={wd} style={styles.weekdayText}>
              {wd}
            </Text>
          ))}
        </View>

        {/* 날짜 그리드 */}
        <View style={styles.calendarContainer}>
          {weeks.map((week, wIdx) => (
            <View key={wIdx} style={styles.weekRow}>
              {week.map((cell, idx) => {
                const { day, current } = cell;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.dayContainer,
                      current && day === selectedDay
                        ? styles.selectedDayContainer
                        : null,
                    ]}
                    onPress={() => current && onSelectDay(day)}
                    disabled={!current}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        current && day === selectedDay
                          ? styles.selectedDayText
                          : null,
                        !current ? { color: '#C0C0C0' } : null,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Feedback 카드 */}
        <View style={styles.feedbackCard}>
          <View style={styles.titleRow}>
            <Text style={styles.feedbackTitle}>이대로만 하면 돼요!</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.arrowIcon}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centered}>
            <CircularProgressWithIcon
              progress={progress}
              iconSource={require('../../assets/images/emotion_happy.png')}
            />
          </View>
        </View>
      </ScrollView>

      {/* Feedback Modal */}
      <FeedbackModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        // 실제 API 조회에 사용할 ISO 형식 날짜
        selectedDateISO={
          selectedDay
            ? `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
              ).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
            : null
        }
        // 화면에 보여줄 YY.MM.DD 형식
        displayDate={formatSelectedDate()}
      />
      {/* 하단 탭바 */}
      <BottomTabBar currentTab={currentTab} onTabPress={handleTabPress} />
    </View>
  );
}
