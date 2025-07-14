import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from './SurveyEmotionPage.styles';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SurveyEmotionPage({ navigation }) {
  const [selected, setSelected] = useState(null);

  const options = [
    '너무 행복해요',
    '행복해요',
    '그냥 그래요',
    '힘들어요',
    '너무 힘들어요',
  ];

  const emotionMap = {
    '너무 행복해요': 1,
    '행복해요': 1,
    '그냥 그래요': 2,
    '힘들어요': 3,
    '너무 힘들어요': 3,
  };

  const [userName, setUserName] = useState('');

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

  const handleNext = () => {
    if (!selected) {
      Alert.alert('알림', '감정을 선택해주세요.');
      return;
    }
    
    const emotionValue = emotionMap[selected];
    navigation.navigate('SurveyStrength', { emotion: emotionValue });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ProgressIndicator step={1} />
      <Text style={styles.title}>{userName}님의 요즘 감정은{'\n'}어떤가요?</Text>
      <View style={styles.optionsWrapper}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selected === option && styles.selectedButton,
            ]}
            onPress={() => setSelected(option)}
          >
            <Text
              style={[
                styles.optionText,
                selected === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.nextbutton}
        onPress={handleNext}
        disabled={!selected}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}
