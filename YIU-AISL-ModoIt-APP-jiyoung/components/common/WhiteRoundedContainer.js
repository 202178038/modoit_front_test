import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WhiteRoundedContainer({ children }) {
  return <View style={styles.wrapper}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: width * 0.075,
    borderTopRightRadius: width * 0.075,
    marginTop: -height * 0.03,
    paddingTop: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
})
