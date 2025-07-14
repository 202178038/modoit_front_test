import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  progressContainer: {
    position: 'absolute',
    top: height * 0.08,
    width: width * 0.77,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: width * 0.01,
    backgroundColor: '#D9D9D9',
  },
  progressSegmentActive: {
    backgroundColor: '#7A73FF',
  },
});