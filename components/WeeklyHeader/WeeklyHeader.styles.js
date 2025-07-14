import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const itemWidth = width / 7;
const fontSize = width * 0.035; // 너비 기준으로 반응형 폰트 사이즈 설정
const circleSize = width * 0.07; // 화면 너비의 7%

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.005, // 좌우 여백
    paddingTop: height * 0.082, // 상단 여백,
    paddingBottom: height * 0.05, // 하단 여백
    backgroundColor: '#7A73FF', // 배경색 (피그마 기준)
  },
  monthText: {
    fontSize: width * 0.06,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: height * 0.028,
    marginLeft: width * 0.05,  // 왼쪽 정렬 (피그마 기준)
    },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', // 가로 정렬
  },
  dayText: {
    width: itemWidth,
    textAlign: 'center',
    fontSize: fontSize,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  dayWrapper: {
    width: itemWidth,
    alignItems: 'center',
  },
  dateWrapper: {
    width: itemWidth,
    alignItems: 'center',
    marginTop: height * 0.017,
  },

  highlight: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightText: {
    fontSize: fontSize,
    fontWeight: '500',
    color: '#7A73FF',
    fontFamily: 'Pretendard',
  },
  nonHighlight: {
    width: circleSize,
    height: circleSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: fontSize,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Pretendard',
  },
});

export default styles;
