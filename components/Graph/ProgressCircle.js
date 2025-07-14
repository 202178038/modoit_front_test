import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const { width } = Dimensions.get('window');
const px = (value) => (width / 390) * value;

export default function ProgressCircle({ value }) {
  const progressValue = Math.round(value); // 백엔드에서 받은 실수

  return (
    <View style={styles.container}>
      {/* 도넛 그래프 */}
      <CircularProgress
        value={progressValue}
        maxValue={100}
        radius={px(73)}
        duration={1000}
        valueSuffix="%"
        showProgressValue={false}
        progressValueColor="#7A73FF"
        activeStrokeColor="#7A73FF"
        inActiveStrokeColor="#E8E6FF"
        inActiveStrokeOpacity={0.3}
        activeStrokeWidth={px(36)}
        inActiveStrokeWidth={px(36)}
      />

      {/* 중앙 하얀 원 */}
      <View style={styles.whiteInnerCircle}>
        <Text style={styles.text}>{progressValue}%</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: px(182),
    height: px(182),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  whiteInnerCircle: {
    position: 'absolute',
    width: px(95),
    height: px(95),
    backgroundColor: '#FFFFFF',
    borderRadius: px(95) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: px(25),
    fontWeight: '700',
    color: '#7A73FF',
  },
});
