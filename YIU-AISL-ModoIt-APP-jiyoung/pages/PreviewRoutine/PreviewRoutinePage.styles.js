import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 직접 스케일 함수 정의
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const styles = StyleSheet.create({
  container: {
    width,
    height: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    position: 'relative',
  },
  titleText: {
    marginTop: verticalScale(114),
    width: width * 0.85,
    textAlign: 'center',
    fontSize: moderateScale(26),
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: verticalScale(32),
    letterSpacing: -0.3,
  },
  cardList: {
    paddingTop: verticalScale(32),
    paddingLeft: (width - width * 0.8) / 2,
    paddingRight: (width - width * 0.8) / 2,
  },
  startButton: {
    position: 'absolute',
    bottom: verticalScale(65),
    width: width * 0.8,
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: '#7A73FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#7A73FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  skipButton: {
    position: 'absolute',
    bottom: verticalScale(130),
    height: verticalScale(24),
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  skipText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#ABABAB',
    letterSpacing: -0.1,
  },
  skipUnderline: {
    position: 'absolute',
    bottom: verticalScale(125),
    width: scale(56),
    height: 1,
    backgroundColor: '#ABABAB',
    alignSelf: 'center',
  },
});

export default styles;
