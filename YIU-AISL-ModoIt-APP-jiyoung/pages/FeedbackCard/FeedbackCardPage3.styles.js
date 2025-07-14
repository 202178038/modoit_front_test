import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  purpleHeader: {
    height: height * 0.25, // 210 / 844 ≈ 0.25
    width: '100%',
    backgroundColor: '#E8E6FF',
  },
  headerText: {
    position: 'absolute',
    width: '100%',
    top: height * 0.09, // 75 / 844 ≈ 0.089
    fontSize: width * 0.067, // 26 / 390 ≈ 0.067
    fontWeight: '700',
    color: '#7A73FF',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  whiteContainer: {
    marginTop: height * -0.094, // 80 / 844 ≈ 0.094
    paddingTop: height * 0.14, // 120 / 844 ≈ 0.14
    paddingHorizontal: height * 0.023, // 20 / 844 ≈ 0.023
    flex: 1,
    alignItems: 'center', // 컨테이너 수평 중앙 정렬
  },
  optionsWrapper: {
    width: '100%',
    marginTop: height * 0.004, // 4 / 844 ≈ 0.004
    alignItems: 'center',
  },
  optionButton: {
    width: width * 0.8,
    height: height * 0.06, // 49 / 844 ≈ 0.058
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ABABAB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.023,
    backgroundColor: '#FFFFFF',
  },
  selectedButton: {
    backgroundColor: '#F0F0FF',
    borderColor: '#7A73FF',
  },
  optionText: {
    fontSize: width * 0.043, // 17 / 390 ≈ 0.043
    fontWeight: '500',
    color: '#ABABAB',
    maxWidth: width * 0.63,
    textAlign: 'center',
  },
  selectedText: {
    color: '#7A73FF',
  },
});
