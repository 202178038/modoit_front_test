import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function AddButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.text}>추가하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: width * 0.33,
    width: width * 0.78,
    height: width * 0.13,
    backgroundColor: '#7A73FF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: width * 0.053,
  },
  text: {
    fontSize: width * 0.047,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
