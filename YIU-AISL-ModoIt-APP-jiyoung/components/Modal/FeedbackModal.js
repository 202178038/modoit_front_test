// FeedbackModal.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './FeedbackModal.styles';
import LevelSelector from '../../components/Feedback/LevelSelector';
import CircularProgressWithIcon from '../../components/Graph/CircularProgressWithIcon';
import { getFeedbackCards } from '../../api/feedbackApi';

export default function FeedbackModal({
  visible,
  onClose,
  selectedDateISO, // YYYY-MM-DD
  displayDate, // YY.MM.DD
}) {
  const [emotionLevel, setEmotionLevel] = useState(null);
  const [situationLevel, setSituationLevel] = useState(null);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (!visible || !selectedDateISO) return;

    // YYYY, MM 분리
    const [year, month] = selectedDateISO.split('-');
    getFeedbackCards(year, month)
      .then(({ data }) => {
        const record = data.find((item) => item.date === selectedDateISO);
        if (record) {
          setEmotionLevel(record.emotion);
          setSituationLevel(record.intensity);
          setProgressValue(Math.round(record.achievementRate));
        } else {
          setEmotionLevel(null);
          setSituationLevel(null);
          setProgressValue(0);
        }
      })
      .catch((err) => console.error('피드백 기록 조회 실패:', err));
  }, [visible, selectedDateISO]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* 닫기 */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeIconText}>×</Text>
          </TouchableOpacity>

          {/* 날짜 */}
          <Text style={styles.dateText}>{displayDate || ''}</Text>

          {/* 타이틀 */}
          <Text style={styles.title}>이대로만 하면 돼요!</Text>

          {/* 달성률 */}
          <View style={styles.progressWrapper}>
            <CircularProgressWithIcon
              progress={progressValue}
              iconSource={require('../../assets/images/emotion_happy.png')}
            />
          </View>

          {/* 감정 선택 */}
          <View style={styles.selectorWrapper} pointerEvents="none">
            <View style={{ transform: [{ scale: 0.8 }] }}>
              <LevelSelector title="감정" selectedLevel={emotionLevel} />
            </View>
          </View>

          {/* 상황(Intensity) 선택 */}
          <View style={styles.selectorWrapper} pointerEvents="none">
            <View style={{ transform: [{ scale: 0.8 }] }}>
              <LevelSelector title="상황" selectedLevel={situationLevel} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
