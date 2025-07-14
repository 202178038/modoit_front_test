import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './RoutineItem.styles';

export default function RoutineItem({ item, onToggle, onPressItem }) {
  console.log('✅ checked 상태:', item.id, item.checked); // 상태 확인용 로그

  return (
    <View style={styles.itemRow}>
      {/* 루틴 정보 박스 */}
      <TouchableOpacity
        style={[
          styles.routineBox,
          item.checked && styles.routineBoxChecked, // 체크되었을 때 배경색 변경
        ]}
        activeOpacity={0.7}
        onPress={onPressItem} // 루틴 박스 클릭 시 편집 모달 열기
      >
        {/* 왼쪽 라인 */}
        <View style={styles.leftBar} />
        {/* 시간과 제목 */}
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTime}>{item.time}</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>

      {/* 체크박스 */}
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <View
          style={[
            styles.itemCircle,
            item.checked && styles.itemCircleChecked
          ]}
        >
          {/* 체크된 경우에만 체크 아이콘 보여주기 */}
          {item.checked && (
            <Image
              source={require('../../assets/images/whitecheck.png')} // 체크 아이콘 이미지
              style={styles.checkIcon}
              resizeMode="contain"
            />
          )}
        </View>
      </TouchableOpacity>
      {/* // TODO: 체크 리스트 연결하는 점선 추가 */}
    </View>
  );
}
