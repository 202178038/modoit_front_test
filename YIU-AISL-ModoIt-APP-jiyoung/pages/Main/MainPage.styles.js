// MainPage.styles.js
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  pageText: {
    fontSize: width * 0.045,
    fontWeight: '700',
    textAlign: 'center',
  },
  routineWrapper: {
    flex: 1,
    padding: width * 0.0003,
  },
  whiteContainer: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    paddingTop: height * 0.02,
  },
  endButton: {
    alignSelf: 'center',
    width: width * 0.9,
    height: height * 0.065,
    backgroundColor: '#7A73FF',
    borderRadius: (height * 0.065) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  endButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
