import React, { useEffect } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import styles from './SplashScreen.styles';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.slogan}>누구나 할 수 있다{'\n'}당신을 위한 맞춤형 루틴</Text>
    </View>
  );
}
