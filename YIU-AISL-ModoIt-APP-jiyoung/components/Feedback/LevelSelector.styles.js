import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    marginTop: height * 0.025,
    marginBottom: height * 0.02,
    width: width * 0.9,
    alignSelf: 'center',
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: height * 0.022,
    marginLeft: width * 0.03,
  },
  selectorContainer: {
    alignItems: 'center',
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: width * 0.041,
  },
  circleContainer: {
    alignItems: 'center',
    height: height * 0.065,
    justifyContent: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    alignSelf: 'center',
    paddingHorizontal: width * 0.07,
    marginTop: height * 0.01,
  },
  circle: {
    width: width * 0.10,
    height: width * 0.10,
    borderRadius: (width * 0.10) / 2,
    backgroundColor: '#E8E6FF',
  },
  largeCircle: {
    width: width * 0.14,   
    height: width * 0.14,
    borderRadius: (width * 0.14) / 2,
  },
  activeCircle: {
    backgroundColor: '#7A73FF',
  },
  bottomLabel: {
    fontSize: width * 0.035,
    color: '#ABABAB',
    marginTop: height * 0.01,
  },
  circleWithImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionImage: {
    width: width * 0.055,
    height: width * 0.055,
    position: 'absolute',
  },
});

export default styles;
