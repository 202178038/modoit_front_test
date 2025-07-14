import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import styles from './SurveyIntroPage.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SurveyIntroPage({ navigation }) {
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
    navigation.navigate('SurveyEmotion');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Text style={styles.title}>안녕하세요!</Text>
      <Text style={styles.description}>
        지금부터 {userName}님에게 맞는{'\n'}최적의 루틴을 찾기 위한{'\n'}몇 가지
        질문을 드릴게요!
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}
