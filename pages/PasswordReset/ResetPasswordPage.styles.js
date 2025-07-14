// ResetPasswordPage.styles.js

import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const inputHeight = height * 0.05;
const fontSize = width * 0.04;
const labelFontSize = width * 0.042;
const smallButtonFontSize = width * 0.04;
const largeButtonHeight = height * 0.06;
const sidePadding = width * 0.11;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    marginTop: height * 0.12,
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },

  formContainer: {
    paddingHorizontal: sidePadding,
    paddingTop: height * 0.07,
    paddingBottom: height * 0.08,
  },

  label: {
    fontSize: labelFontSize,
    color: '#ABABAB',
    marginBottom: height * 0.008,
  },

  input: {
    height: inputHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
    fontSize: fontSize,
    marginBottom: height * 0.035,
    paddingHorizontal: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: height * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
    paddingBottom: height * 0.01,
  },

  flexInput: {
    flex: 1,
    marginRight: width * 0.02,
    marginBottom: -height * 0.011,
    height: inputHeight,
    fontSize: fontSize,
    paddingHorizontal: 3,
    paddingVertical: 5,
  },

  buttonSmall: {
    backgroundColor: '#7A73FF',
    paddingHorizontal: width * 0.044,
    paddingVertical: height * 0.012,
    borderRadius: 100,
    marginTop: -height * 0.05,
  },

  buttonSmallText: {
    color: '#fff',
    fontSize: smallButtonFontSize,
    fontWeight: '500',
  },

  buttonLarge: {
    backgroundColor: '#7A73FF',
    borderRadius: 100,
    height: largeButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.15,
  },

  buttonLargeText: {
    color: '#fff',
    fontSize: width * 0.048,
    fontWeight: '500',
  },
  // 일치/불일치 메시지 텍스트 기본
  matchMessage: {
    fontSize: fontSize,
    marginTop: -height * 0.025, // input과 겹치지 않도록 위쪽 여백 조정
    marginBottom: height * 0.03, // 메시지 아래에 충분한 여백
  },
  // 비밀번호가 일치할 때 (초록색)
  match: {
    color: '#28A745', // 예: 성공을 나타내는 초록색
  },
  // 비밀번호가 불일치할 때 (빨간색)
  noMatch: {
    color: '#DC3545', // 예: 오류를 나타내는 빨간색
  },
});
