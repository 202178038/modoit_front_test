import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: height * 0.33,
    fontWeight: '700',
    fontSize: width * 0.082,
    lineHeight: width * 0.09,
    color: '#1A1A1A',
  },
  description: {
    position: 'absolute',
    top: height * 0.45,
    width: width * 0.77,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: width * 0.055,
    lineHeight: width * 0.08,
    color: '#7E7E7E',
  },
  button: {
    position: 'absolute',
    top: height * 0.85,
    width: width * 0.77,
    height: height * 0.06,
    backgroundColor: '#7A73FF',
    borderRadius: width * 0.256,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.051,
    fontWeight: '600',
  },
});

export default styles;
