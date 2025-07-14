import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './AddRoutineModal.styles';

export default function AddRoutineModal({
  visible,
  onClose,
  hour,
  minute,
  setHour,
  setMinute,
  routine,
  setRoutine,
  onAdd,
}) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* 헤더 */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>새 루틴 추가</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 시간 입력 */}
          <Text style={styles.modalLabel}>시간</Text>
          <View style={styles.timePicker}>
            <TextInput
              value={hour}
              onChangeText={(t) => {
                const n = t.replace(/[^0-9]/g, '');
                if (n.length <= 2 && (n === '' || +n <= 23)) setHour(n);
              }}
              keyboardType="number-pad"
              maxLength={2}
              style={[
                styles.timeBox,
                styles.timeBoxSelected,
                styles.timeText,
                styles.timeTextSelected,
              ]}
              textAlign="center"
            />
            <Text style={styles.timeColon} pointerEvents="none">
              :
            </Text>
            <TextInput
              value={minute}
              onChangeText={(t) => {
                const n = t.replace(/[^0-9]/g, '');
                if (n.length <= 2 && (n === '' || +n <= 59)) setMinute(n);
              }}
              keyboardType="number-pad"
              maxLength={2}
              style={[
                styles.timeBox,
                styles.timeBoxUnselected,
                styles.timeText,
                styles.timeTextUnselected,
              ]}
              textAlign="center"
            />
          </View>

          {/* 루틴 텍스트 입력 */}
          <Text style={styles.modalLabel}>루틴</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="루틴 입력"
            value={routine}
            onChangeText={setRoutine}
          />

          {/* 추가하기 버튼 */}
          <TouchableOpacity style={styles.modalAddButton} onPress={onAdd}>
            <Text style={styles.modalAddButtonText}>추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
