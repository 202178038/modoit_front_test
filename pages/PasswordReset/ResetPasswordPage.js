// ResetPasswordPage.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import styles from './ResetPasswordPage.styles';

// API 함수들 임포트
import {
  sendVerificationEmail,    // 이메일로 인증번호 요청 API
  verifyEmailCode,     // 인증번호 확인 API
  resetPassword,       // 비밀번호 재설정 API
} from '../../api/authApi';

export default function ResetPasswordPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 비밀번호 일치 여부 판단
  const isPasswordMatching =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  // 이메일로 인증번호 요청
  const handleRequestCode = async () => {
    console.log('인증요청 클릭됨 (비밀번호 재설정)');
    try {
      await sendVerificationEmail(email);
      alert('인증번호가 이메일로 전송되었습니다.');
    } catch (error) {
      console.error(error);
      alert('인증 요청 실패: ' + (error.response?.data || '오류 발생'));
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    console.log('인증확인 클릭됨');
    try {
      await verifyEmailCode(email, parseInt(verificationCode, 10));
      alert('인증이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      alert('인증 실패: ' + (error.response?.data || '오류 발생'));
    }
  };
  
  // 새 비밀번호 설정
  const handleSubmitNewPassword = async () => {
    if (!email || !verificationCode || !newPassword || !confirmPassword) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log('설정완료 클릭됨');
    try {
      await resetPassword({
        email,
        authNum: parseInt(verificationCode, 10),
        password: newPassword,
      });
      alert('비밀번호가 성공적으로 재설정되었습니다.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      alert('비밀번호 재설정 실패: ' + (error.response?.data || '오류 발생'));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.header}>비밀번호 재설정</Text>

      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 이메일 입력 + 인증요청 버튼 */}
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
            onPress={handleRequestCode}
          >
            <Text style={styles.buttonSmallText}>인증요청</Text>
          </TouchableOpacity>
        </View>

        {/* 인증번호 입력 + 인증확인 버튼 */}
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

        {/* 새 비밀번호 입력 */}
        <Text style={styles.label}>새 비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="새 비밀번호 입력"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        {/* 새 비밀번호 확인 */}
        <Text style={styles.label}>새 비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          placeholder="새 비밀번호 다시 입력"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* 여기서 비밀번호 일치 여부 메시지를 띄웁니다 */}
        {confirmPassword.length > 0 && (
          <Text
            style={[
              styles.matchMessage,
              isPasswordMatching ? styles.match : styles.noMatch,
            ]}
          >
            {isPasswordMatching
              ? '비밀번호가 일치합니다.'
              : '비밀번호가 일치하지 않습니다.'}
          </Text>
        )}

        {/* 설정완료 버튼 */}
        <TouchableOpacity
          style={styles.buttonLarge}
          onPress={handleSubmitNewPassword}
        >
          <Text style={styles.buttonLargeText}>설정완료</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
