import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 기준: Figma 390 기준
const px = (value) => (width / 390) * value;

export default StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px(20),
  },
  routineBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7A73FF',
    borderRadius: px(12),
    paddingVertical: px(18),
    paddingHorizontal: px(16),
    position: 'relative',
  },
  routineBoxChecked: {
    backgroundColor: '#F0F0FF', // 체크되었을 때 연보라색 배경
  },
  leftBar: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: [{ translateY: px(7) }],
    width: px(4),
    height: px(20),
    backgroundColor: '#7A73FF',
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: px(10), // 왼쪽 바와 간격
  },
  itemTime: {
    fontSize: px(16),
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: px(10),
  },
  itemTitle: {
    fontSize: px(16),
    color: '#1A1A1A',
    fontWeight: '500',
    flexShrink: 1,
  },
  itemCircle: {
    width: px(25),
    height: px(25),
    borderWidth: 1,
    borderColor: '#7A73FF',
    borderRadius: px(20),
    backgroundColor: '#FFFFFF',
    marginLeft: px(12),
    // 아이콘을 중앙에 배치
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCircleChecked: {
    backgroundColor: '#7A73FF',
  },
  checkIcon: {
    width: px(15),
    height: px(15),
  },
});
