import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#fff',
    position: 'relative',
  },

  logo: {
    position: 'absolute',
    top: height * 0.15,
    width: width * 0.31,
    height: width * 0.31 * (195.53 / 148), // 원본 비율 유지
    alignSelf: 'center', // 가운데 정렬
  },

  label: {
    position: 'absolute',
    top: height * 0.32,
    left: width * 0.11,
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#ABABAB',
  },

  input: {
    position: 'absolute',
    top: height * 0.36,
    left: width * 0.11,
    width: width * 0.78,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
    fontSize: width * 0.04,
    color: '#000',
  },

  loginButton: {
    position: 'absolute',
    top: height * 0.68,
    width: width * 0.8,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#7A73FF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.048,
    fontWeight: '600',
  },

  footer: {
    position: 'absolute',
    top: height * 0.77,
    // left: width * 0.32,
    width: width * 0.43,
    height: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  
  footerText: {
    fontSize: width * 0.042,
    color: '#ABABAB',
    marginHorizontal: 12,
  },

  divider: {
    width: 1,
    height: 14,
    backgroundColor: '#ABABAB',
  },
});

export default styles;