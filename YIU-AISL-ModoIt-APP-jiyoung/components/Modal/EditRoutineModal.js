import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './AddRoutineModal.styles';

export default function EditRoutineModal({
  visible,
  onClose,
  routineItem,
  onSave,
}) {
  // Local state for editing
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [title, setTitle] = useState('');

  // Initialize inputs when modal opens
  useEffect(() => {
    if (routineItem) {
      const [h, m] = routineItem.time.split(':');
      setHour(h);
      setMinute(m);
      setTitle(routineItem.title);
    }
  }, [routineItem]);

  // Handle save
  const handleSave = () => {
    const hh = hour.padStart(2, '0');
    const mm = minute.padStart(2, '0');
    onSave({
      ...routineItem,
      time: `${hh}:${mm}`,
      title: title.trim() || '제목 없음',
    });
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>루틴 수정</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Time Input */}
          <Text style={styles.modalLabel}>시간</Text>
          <View style={styles.timePicker}>
            <TextInput
              value={hour}
              onChangeText={(text) => {
                const num = text.replace(/[^0-9]/g, '');
                if (num.length <= 2 && (num === '' || +num <= 23)) {
                  setHour(num);
                }
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
              onChangeText={(text) => {
                const num = text.replace(/[^0-9]/g, '');
                if (num.length <= 2 && (num === '' || +num <= 59)) {
                  setMinute(num);
                }
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

          {/* Title Input */}
          <Text style={styles.modalLabel}>루틴</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="루틴 입력"
            value={title}
            onChangeText={setTitle}
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.modalAddButton} onPress={handleSave}>
            <Text style={styles.modalAddButtonText}>수정하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
