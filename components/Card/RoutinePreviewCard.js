import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './RoutinePreviewCard.styles';

export default function RoutinePreviewCard({ item, index, currentIndex }) {
  return (
    <View style={styles.routineCard}>
      <View style={styles.routineCardHeader}>
        <Text style={styles.routineCardTitle}>{item.title}</Text>

        <View style={styles.checkCircle}>
          {index === currentIndex && (
            <Image
              source={require('../../assets/images/check.png')}
              style={styles.checkImage}
            />
          )}
        </View>
      </View>

      <View style={styles.routineList}>
        {item.routines.map((routine, idx) => (
          <View key={idx} style={styles.routineItem}>
            <Text style={styles.routineItemText}>{routine.content}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}