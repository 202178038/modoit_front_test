import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 스케일 함수 정의
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// 카드 설정
export const CARD_WIDTH = width * 0.8;
export const CARD_SPACING = scale(20);
export const SNAP_WIDTH = CARD_WIDTH + CARD_SPACING;

const styles = StyleSheet.create({
  routineCard: {
    width: CARD_WIDTH,
    height: verticalScale(380),
    backgroundColor: '#F0F0FF',
    borderRadius: moderateScale(15),
    paddingTop: verticalScale(24),
    paddingHorizontal: scale(20),
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: CARD_SPACING,
    shadowColor: '#7A73FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  routineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(4),
  },
  routineCardTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#7A73FF',
    flex: 1,
    letterSpacing: -0.2,
  },
  checkCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkImage: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  routineList: {
    width: '100%',
    flex: 1,
  },
  routineItem: {
    width: '100%',
    height: verticalScale(43),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(21.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  routineItemText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
    letterSpacing: -0.1,
    paddingHorizontal: scale(16),
  },
});

export default styles;
