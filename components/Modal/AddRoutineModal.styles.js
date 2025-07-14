// AddRoutineModal.styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const inputHeight = height * 0.06;
const fontSize = width * 0.05;
const labelFontSize = width * 0.042;
const buttonHeight = height * 0.06;
const sidePadding = width * 0.08;
const modalRadius = width * 0.06;
const boxRadius = width * 0.04;
const colonFontSize = width * 0.085;
// 타임박스 간격: 두 박스 사이 여백
const boxSpacing = width * 0.05;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sidePadding,
  },

  modalContainer: {
    minHeight: height * 0.45,
    maxHeight: height * 0.6,
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: modalRadius,
    padding: sidePadding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.025,
    paddingTop: height * 0.01,
  },
  modalTitle: {
    fontSize: fontSize,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: -0.2,
  },
  modalClose: {
    fontSize: fontSize + 5,
    color: '#999999',
    fontWeight: '300',
    padding: height * 0.01,
  },
  modalLabel: {
    fontSize: labelFontSize,
    color: '#333333',
    marginBottom: height * 0.02,
    fontWeight: '500',
  },

  // 시간 선택 영역: 박스와 콜론을 중앙 정렬
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7A73FF',
    borderRadius: boxRadius,
    width: '100%',
    height: height * 0.12,
    marginBottom: height * 0.04,
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.015,
  },
  // 타임박스 스타일
  timeBox: {
    width: width * 0.23,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.02,
  },
  timeBoxSelected: {
    backgroundColor: '#7A73FF',
    borderRadius: boxRadius,
  },
  timeBoxUnselected: {
    backgroundColor: '#F0F0FF',
    borderRadius: boxRadius,
  },

  // 콜론: 두 박스 사이 중앙에 고정
  timeColon: {
    fontSize: colonFontSize,
    fontWeight: '700',
    color: '#7A73FF',
    includeFontPadding: false,
    marginHorizontal: boxSpacing,
  },

  // 박스 안 텍스트 원래 스타일로 복원
  timeText: {
    fontSize: width * 0.1,
    fontWeight: '400',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  timeTextSelected: {
    color: '#FFFFFF',
  },

  timeTextUnselected: {
    color: '#7A73FF',
  },

  modalInput: {
    width: '100%',
    height: inputHeight,
    borderWidth: 1,
    borderColor: '#7A73FF',
    backgroundColor: '#FFFFFF',
    borderRadius: boxRadius,
    paddingHorizontal: sidePadding,
    marginBottom: height * 0.04,
    fontSize: width * 0.04,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  modalAddButton: {
    width: '90%',
    backgroundColor: '#7A73FF',
    height: buttonHeight,
    borderRadius: buttonHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: height * 0.01,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  modalAddButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
});

export default styles;
