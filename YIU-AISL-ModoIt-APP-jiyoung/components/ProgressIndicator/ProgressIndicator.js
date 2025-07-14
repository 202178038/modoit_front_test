import React from 'react';
import { View } from 'react-native';
import styles from './ProgressIndicator.styles';

export default function ProgressIndicator({ step = 1 }) {
  const segments = [1, 2, 3];
  return (
    <View style={styles.progressContainer}>
      {segments.map((i) => (
        <View
          key={i}
          style={[
            styles.progressSegment,
            step === i && styles.progressSegmentActive,
            i <= step && styles.progressSegmentActive,
          ]}
        />
      ))}
    </View>
  );
}
