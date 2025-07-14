import React from 'react';
import { View, Text } from 'react-native';
import styles from './WeeklyHeader.styles';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export default function WeeklyHeader({ dateList, currentMonth, today }) {
  return (
    <View style={styles.container}>
      <Text style={styles.monthText}>{currentMonth}월</Text>

      <View style={styles.row}>
        {DAYS.map((day, idx) => (
          <View key={idx} style={styles.dayWrapper}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.row}>
        {dateList.map((dateObj, index) => {
          const isToday =
            dateObj.getFullYear() === today.getFullYear() &&
            dateObj.getMonth() === today.getMonth() &&
            dateObj.getDate() === today.getDate();

          return (
            <View key={index} style={styles.dateWrapper}>
              {isToday ? (
                <View style={styles.highlight}>
                  <Text style={styles.highlightText}>{dateObj.getDate()}</Text>
                </View>
              ) : (
                <View style={styles.nonHighlight}>
                  <Text style={styles.dateText}>{dateObj.getDate()}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
