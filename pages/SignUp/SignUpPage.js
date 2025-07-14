import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './SignUpPage.styles';

import {
  sendVerificationEmail,
  verifyEmailCode,
  signup,
} from '../../api/authApi.js';
/*
console.log('▶︎ sendVerificationEmail:', sendVerificationEmail);
console.log('▶︎ verifyEmailCode:', verifyEmailCode);
console.log('▶︎ signup:', signup);
*/

export default function SignUpPage({ navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRequestVerification = async () => {
    console.log('인증요청 클릭됨');
    try {
      const res = await sendVerificationEmail(email);
      alert('인증번호가 이메일로 전송되었습니다.');
    } catch (error) {
      console.error(error);
      alert('인증 요청 실패: ' + (error.response?.data || '오류 발생'));
    }
  };

  const handleVerifyCode = async () => {
    try {
      await verifyEmailCode(email, parseInt(verificationCode));
      alert('인증이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      alert('인증 실패: ' + (error.response?.data || '오류 발생'));
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signup({ name, email, password });
      alert('회원가입이 완료되었습니다!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      alert('회원가입 실패: ' + (error.response?.data || '오류 발생'));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.header}>회원가입</Text>

      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력하세요"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>이메일</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.flexInput}
            placeholder="이메일을 입력하세요"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={handleRequestVerification}
          >
            <Text style={styles.buttonSmallText}>인증요청</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>인증번호</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.flexInput}
            placeholder="인증번호 입력"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={handleVerifyCode}
          >
            <Text style={styles.buttonSmallText}>인증확인</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 입력"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 다시 입력"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonLarge} onPress={handleSignUp}>
          <Text style={styles.buttonLargeText}>가입하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
