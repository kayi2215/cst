// src/screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>E-Constat</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('NewConstat')}
          style={styles.button}
        >
          Initier un constat
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ScanQR')}
          style={styles.button}
        >
          Scanner un QR code
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    padding: 8,
  },
});

export default HomeScreen;