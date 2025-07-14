// components/Graph/CircularProgressWithIcon.js
import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const { width: screenWidth } = Dimensions.get('window');

// 디자인 기준 390px 너비 대비 실제 기기 비율 계산 헬퍼
const px = (value) => (screenWidth / 390) * value;

export default function CircularProgressWithIcon({
  progress = 100, // 0~100 사이의 퍼센트 값
  iconSource, // 원 내부에 들어갈 아이콘 (require(...) 또는 { uri: '...' })
  size = px(140), // 원 전체 크기 (px)
  strokeWidth = px(30), // 원 테두리 두께 (px)
}) {
  const donutRadius = (size - strokeWidth * 2) / 2;
  const innerBackgroundRadius = donutRadius - strokeWidth / 2;
  const innerDiameter = innerBackgroundRadius * 2;

  return (
    <View style={[styles.wrapper]}>
      {/* ──────────────────────────────────────────── */}
      {/* circleContainer: 도넛과 아이콘(흰 배경)을 이 뷰 안에서 겹쳐 배치 */}
      <View style={[styles.circleContainer, { width: size, height: size }]}>
        {/* Animated CircularProgress */}
        <CircularProgress
          // 애니메이션 지속 시간 (밀리초)
          duration={800}
          // 프로그레스 값 (0~100)
          value={progress}
          // 최대값 (보통 100)
          maxValue={100}
          // 반지름: 내부에서 (size - strokeWidth*2)/2 계산
          radius={donutRadius}
          // 활성화된 스트로크 색상
          activeStrokeColor="#7A73FF"
          // 비활성화된 스트로크 색상
          inActiveStrokeColor="#E8E6FF"
          // 비활성화 스트로크 투명도
          inActiveStrokeOpacity={0.3}
          // 스트로크 두께 (활성/비활성 동일)
          activeStrokeWidth={strokeWidth}
          inActiveStrokeWidth={strokeWidth}
          // 프로그레스 값 텍스트를 원 안에 그리지 않음
          showProgressValue={false}
          // 둥근 모서리로 그리기
          strokeLinecap="round"
          // 이 뷰 전체를 덮도록 설정
          style={StyleSheet.absoluteFill}
        />

        {/* (B) 원 안 중앙에 흰 배경 + 아이콘 */}
        <View
          style={[
            styles.innerIconWrapper,
            {
              width: innerDiameter,
              height: innerDiameter,
              borderRadius: innerBackgroundRadius,
              position: 'absolute',
              top: (size - innerDiameter) / 2, // 도넛의 중심에 맞추기
              left: (size - innerDiameter) / 2, // 도넛의 중심에 맞추기
            },
          ]}
        >
          <Image
            source={iconSource}
            style={{
              width: innerDiameter * 0.4, // 내부 지름의 50% 크기로 조정
              height: innerDiameter * 0.4, // 내부 지름의 50% 크기로 조정
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>

      {/* ──────────────────────────────────────────── */}
      {/* 2) 원 바로 아래 퍼센트 숫자 */}
      <Text style={[styles.percentageText, { marginTop: px(4) }]}>
        {progress}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // 전체 래퍼: 원과 숫자를 세로로 쌓습니다.
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circleContainer: {
    // 도넛과 아이콘을 이 뷰 안에서 겹쳐 렌더링합니다.
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  innerIconWrapper: {
    // 흰 배경 + 아이콘: 절대 위치로 배치하되,
    // circleContainer에서 계산한 top/left로 중앙에 정확히 위치시킵니다.
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: screenWidth * 0.05,
    fontWeight: '700',
    color: '#7A73FF',
    textAlign: 'center',
  },
});
