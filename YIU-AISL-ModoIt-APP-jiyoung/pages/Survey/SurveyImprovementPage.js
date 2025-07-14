import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from './SurveyImprovementPage.styles';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import { useRoute } from '@react-navigation/native';

export default function SurveyImprovementPage({ navigation }) {
  const [selected, setSelected] = useState(null);
  const route = useRoute();
  const emotion = route.params?.emotion;
  const intensity = route.params?.intensity;

  // 필수 params 검증
  React.useEffect(() => {
    if (!emotion || !intensity) {
      Alert.alert('오류', '잘못된 접근입니다.', [
        { text: '확인', onPress: () => navigation.goBack() }
      ]);
    }
  }, [emotion, intensity, navigation]);

  const options = [
    '건강 챙기기',
    '일상 정비하기',
    '감정 다스리기',
    '목표 달성하기',
  ];

  const categoryMap = {
    '건강 챙기기': 1,
    '일상 정비하기': 2,
    '감정 다스리기': 3,
    '목표 달성하기': 4,
  };

  const handleNext = () => {

    if (!selected) {
      Alert.alert('알림', '자기계발 분야를 선택해주세요.');
      return;
    }
    
    const category = categoryMap[selected];
    console.log('전달 전 파라미터 확인:');
    console.log('emotion:', emotion);
    console.log('intensity:', intensity); 
    console.log('category:', category);
    console.log('모든 파라미터:', { emotion, intensity, category });

    navigation.navigate('PreviewRoutine', { emotion, intensity, category });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ProgressIndicator step={3} />
      <Text style={styles.title}>어떠한 자기계발을{'\n'}원하시나요?</Text>
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
        style={styles.skipButton}
        onPress={() => {
          navigation.navigate('Main');
        }}
      >
        <Text style={styles.skipText}>건너뛰기</Text>
      </TouchableOpacity>

      <View style={styles.skipUnderline} />

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
