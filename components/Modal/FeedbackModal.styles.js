// FeedbackModal.styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingTop: height * 0.015, // 기존 0.025 → 0.015로 축소
    paddingBottom: height * 0.015, // 기존 0.02  → 0.015로 축소
    paddingHorizontal: width * 0.04, // 기존 0.05 → 0.04로 축소

    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: height * 0.01, // 기존 0.015 → 0.01로 축소
    right: width * 0.03, // 기존 0.04 → 0.03로 축소
    zIndex: 10,
  },
  closeIconText: {
    fontSize: width * 0.08, //
    color: '#ABABAB',
    fontWeight: '500',
  },
  dateText: {
    fontSize: width * 0.03, // 기존 0.035 → 0.03으로 축소
    color: '#888888',
    marginBottom: height * 0.005, // 기존 0.008 → 0.005로 축소
  },
  title: {
    fontSize: width * 0.07, // 기존 0.055 → 0.045로 축소
    fontWeight: '700',
    color: '#7A73FF',
    textAlign: 'center',
    marginTop: height * 0.02, // 기존 0.012 → 0.01로 축소
  },
  progressWrapper: {
    marginTop: height * 0.005, // 기존 0.01 → 0.005로 축소
    marginBottom: height * 0.01, // 기존 0.02 → 0.01로 축소
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorWrapper: {
    width: '100%',
    marginBottom: height * 0.001, // 기존 0.015 → 0.01로 축소
  },
});

export default modalStyles;
