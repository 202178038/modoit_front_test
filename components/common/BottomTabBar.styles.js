import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 하단 고정 푸터 탭 스타일 정의
const styles = StyleSheet.create({
  container: {
    position: 'absolute',  // 화면 하단 고정
    bottom: 0,
    width: width,
    height: 105,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',  // 가로 정렬
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    paddingBottom: 20,
  },
  tabItem: {
    alignItems: 'center',
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginBottom: 6,
  },
  label: {
    fontSize: width * 0.038,
    fontWeight: '500',
  },
  icon: {
    width: 26,
    height: 26,
    marginBottom: 6,
    resizeMode: 'contain',
  },
});

export default styles;
