import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    width: '100%',
    marginTop: height * 0.1,
    fontSize: width * 0.065,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  whiteContainer: {
    flex: 1,
    paddingTop: height * 0.01,
    paddingLeft: 0,
    paddingRight: 0,
  },
  section: {
    marginTop: height * 0.03,
  },
  sectionHeader: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: height * 0.012,
    paddingLeft: width * 0.12,
  },
  sectionContainer: {
    paddingHorizontal: 0,
  },
  swipeContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
    overflow: 'hidden',
    paddingHorizontal: 0,
  },
  routineBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.035,
    paddingVertical: height * 0.023,
    paddingHorizontal: width * 0.04,
    borderWidth: 1,
    borderColor: '#7A73FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    // 선택되지 않은 루틴은 양쪽 여백을 둠
    marginHorizontal: width * 0.1,
  },
  routineBoxSelected: {
    backgroundColor: '#7A73FF',
    borderColor: '#7A73FF',
    shadowColor: '#7A73FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginLeft: -width * 0.04,
    marginRight: width * 0.05,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemTime: {
    fontSize: width * 0.041,
    fontWeight: '500',
    color: '#1A1A1A',
    marginLeft: width * 0.01,
    marginRight: width * 0.04,
    marginBottom: 0,
  },
  itemTimeSelected: {
    color: '#FFFFFF',
  },
  itemTitle: {
    fontSize: width * 0.041,
    fontWeight: '600',
    color: '#1A1A1A',
    maxWidth: width * 0.57,
  },
  itemTitleSelected: {
    color: '#FFFFFF',
  },
  deleteButton: {
    width: width * 0.08,
    height: width * 0.08, // 정사각형으로 변경하여 완전한 원 만들기
    backgroundColor: '#7A73FF',
    borderRadius: width * 0.06, // 완전한 원형으로 변경 (width의 절반)
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7A73FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: width * 0.1, // 루틴 박스와의 간격
    marginLeft: -width * 0.02, // 선택된 루틴 박스와 겹치도록 조정
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045, // 크기 약간 조정
    fontWeight: '700', // 더 굵게
    textAlign: 'center',
    lineHeight: width * 0.045,
  },
  endButtonWrapper: {
    alignSelf: 'center',
    width: '90%',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  endButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: height * 0.08,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.1,
  },
  emptyText: {
    fontSize: width * 0.041,
    color: '#999999',
    textAlign: 'center',
  },
});
