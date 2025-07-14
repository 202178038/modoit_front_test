import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from './SurveyStrengthPage.styles';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import { useRoute } from '@react-navigation/native';
import { savePreResearch } from '../../api/recommendationApi';

export default function SurveyStrengthPage({ navigation }) {
  const [selected, setSelected] = useState(null);
  const route = useRoute();

  const emotion = route.params?.emotion;
  // emotion이 없는 경우 처리
  React.useEffect(() => {
    if (!emotion) {
      Alert.alert('오류', '잘못된 접근입니다.', [
        { text: '확인', onPress: () => navigation.goBack() }
      ]);
    }
  }, [emotion, navigation]);

  const options = [
    '조금은 바쁘게 지내고 싶어요',
    '무난했으면 해요',
    '여유로웠으면 해요',
    '많이 여유로웠으면 해요',
    '천천히 시작하고 싶어요',
  ];

  const intensityMap = {
    '천천히 시작하고 싶어요': 1,
    '많이 여유로웠으면 해요': 1,
    '여유로웠으면 해요': 2,
    '무난했으면 해요': 3,
    '조금은 바쁘게 지내고 싶어요': 3,
  };

  const handleNext = async () => {
    if (!selected) {
      Alert.alert('알림', '강도를 선택해주세요.');
      return;
    }

    const intensity = intensityMap[selected];

    try {
      // 사전조사 데이터 서버에 저장
      await savePreResearch({ emotion, intensity });
      // 저장 성공 시 다음 화면으로 이동
      navigation.navigate('SurveyImprovement', { emotion, intensity });
    } catch (error) {
      console.error('사전조사 저장 실패:', error);
      Alert.alert('오류', '감정 상태 저장에 실패했습니다.');
    }
  };

  if (!emotion) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ProgressIndicator step={2} />
      <Text style={styles.title}>루틴의 강도가{'\n'}어땠으면 하나요?</Text>
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
