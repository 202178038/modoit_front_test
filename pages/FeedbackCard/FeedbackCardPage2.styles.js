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
  whiteContainer: {
    // 수정된 부분: MainPage.styles의 whiteContainer 적용
    flex: 1,
  },
  // endButtonWrapper: {
  //   alignSelf: 'center',
  //   width: width * 0.9,
  //   marginVertical: height * 0.02,
  // },
  // endButtonText: {
  //   color: '#FFFFFF', // MainPage 의 endButtonText
  //   fontSize: width * 0.045,
  //   fontWeight: '600',
  //   textAlign: 'center',
  // },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
