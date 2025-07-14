// FeedbackCalendarPage.styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const daySize = width / 7.3;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: height * 0.05,
  },
  scrollContent: {
    paddingBottom: height * 0.1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: height * 0.05,
    marginTop: height * 0.03,
    marginLeft: width * 0.03,
  },
  navArrowText: {
    fontSize: width * 0.06,
    color: '#000000',
    paddingHorizontal: width * 0.05,
  },
  monthText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000000',
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: width * 0.02,
    marginBottom: height * 0.005,
  },
  weekdayText: {
    width: daySize,
    textAlign: 'center',
    fontSize: width * 0.035,
    color: '#333333',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  calendarContainer: {
    flexDirection: 'column',
    paddingHorizontal: width * 0.02,
  },
  dayContainer: {
    width: daySize,
    height: daySize,
    maxHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.001,
    marginHorizontal: width * 0.001,
    borderRadius: daySize / 2,
  },
  dayText: {
    fontSize: width * 0.035,
    color: '#333333',
  },
  selectedDayContainer: {
    backgroundColor: '#7A73FF',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },
  feedbackCard: {
    marginTop: height * 0.03,
    marginHorizontal: width * 0.08,
    backgroundColor: '#F0F0FF',
    borderRadius: width * 0.04,
    alignItems: 'center',
    paddingVertical: height * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: height * 0.03,
  },
  // ─── 타이틀을 카드 내에서 완전히 가운데 정렬 ───
  titleRow: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
    position: 'relative', // arrow를 절대 위치로 배치하기 위해
  },
  feedbackTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#7A73FF',
    textAlign: 'center',
    width: '100%',
  },
  arrowIcon: {
    fontSize: width * 0.07,
    color: '#7A73FF',
    position: 'absolute',
    right: -(width * 0.35), // 카드 우측 패딩만큼 떨어뜨려서 표시
    top: -32,
  },
});
