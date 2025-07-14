import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const size = width * 0.15; // 버튼 크기: 기기 너비의 15%

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: height * 0.15, // 화면 높이의 12% 정도 (푸터 위 여유)
    right: width * 0.06,   // 화면 너비의 6% 우측 여백
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#7A73FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    fontSize: size * 0.8,     // 버튼 내 기호 크기
    color: '#fff',
    lineHeight: size * 0.8,   // 수직 중앙 정렬 보정
  },
});

export default styles;
