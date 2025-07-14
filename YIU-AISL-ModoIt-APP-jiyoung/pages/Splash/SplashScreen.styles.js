import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#7A73FF',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: width * 0.4, // 40% 너비
    height: (width * 0.4) * (195.53 / 148), // 원본 비율 유지 (비율 = 높이 / 너비)
    marginBottom: height * 0.05, // 로고 아래 여백
  },

  slogan: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.12,
    fontWeight: '700',
    fontSize: width * 0.073,
    lineHeight: width * 0.09,
    color: '#FFFFFF',
    textAlign: 'left',
  },
});

export default styles;