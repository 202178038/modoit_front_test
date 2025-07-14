import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
  feedbackTitle: {
    fontSize: width * 0.053,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: width * 0.04, // 20 / 390 ≈ 0.051
  },
});

export default styles;
