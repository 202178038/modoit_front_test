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
    top: height * 0.2,
    width: width * 0.77,
    fontWeight: '700',
    fontSize: width * 0.08,
    lineHeight: width * 0.09,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  optionsWrapper: {
    position: 'absolute',
    top: height * 0.355,
    width: width * 0.77,
  },

  optionButton: {
    width: width * 0.77,
    height: 47,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ABABAB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
    backgroundColor: '#FFFFFF',
  },
  selectedButton: {
    backgroundColor: '#F0F0FF',
    borderColor: '#7A73FF',
  },
  optionText: {
    fontSize: width * 0.044,
    fontWeight: '500',
    color: '#ABABAB',
  },
  selectedText: {
    color: '#7A73FF',
  },

  skipButton: {
    position: 'absolute',
    top: height * 0.815,
    width: 56,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  skipText: {
    fontSize: width * 0.038,
    lineHeight: width * 0.045,
    fontWeight: '500',
    color: '#ABABAB',
  },

  skipUnderline: {
    position: 'absolute',
    top: height * 0.841,
    width: 62,
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ABABAB',
    alignSelf: 'center',
  },

  nextbutton: {
    position: 'absolute',
    bottom: height * 0.08,
    width: width * 0.77,
    height: 50,
    backgroundColor: '#7A73FF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.049,
    fontWeight: '600',
  },
});

export default styles;
