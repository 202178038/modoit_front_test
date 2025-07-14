import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './LoginPage.styles';
import { login } from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await login({ email, password });
      const { name, id, email: userEmail, firstLogin } = response.data;

      // 사용자 정보 저장
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userId', id.toString());
      await AsyncStorage.setItem('userEmail', userEmail);
      await AsyncStorage.setItem('firstLogin', firstLogin.toString());

      // 로그인 성공 시 처리
      console.log('로그인에 성공:', response.data);

      // firstLogin 여부에 따라 이동
      if (firstLogin === 0) {
        navigation.navigate('SurveyIntro'); // 또는 ProfilePage
      } else {
        navigation.navigate('Main'); // 또는 메인 홈 페이지
      }
    } catch (error) {
      console.error('로그인 실패:', error.response?.data || error.message);
      alert('로그인 실패: ' + (error.response?.data || '오류가 발생했습니다.'));
    }
  };


  const handleNavigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleNavigateToResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo2.png')}
        style={styles.logo}
      />

      <Text style={[styles.label, { top: 360 }]}>이메일</Text>
      <TextInput
        style={[styles.input, { top: 377 }]}
        value={email}
        onChangeText={setEmail}
        // placeholder="이메일을 입력하세요"
        // placeholderTextColor="#C2C2C2"
        keyboardType="email-address"
      />

      <Text style={[styles.label, { top: 455 }]}>비밀번호</Text>
      <TextInput
        style={[styles.input, { top: 470 }]}
        value={password}
        onChangeText={setPassword}
        // placeholder="비밀번호를 입력하세요"
        // placeholderTextColor="#C2C2C2"
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleNavigateToSignUp}>
          <Text style={styles.footerText}>회원가입</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity onPress={handleNavigateToResetPassword}>
          <Text style={styles.footerText}>비밀번호 재설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
