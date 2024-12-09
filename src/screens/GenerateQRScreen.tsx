// src/screens/GenerateQRScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GenerateQR'>;
  route: RouteProp<RootStackParamList, 'GenerateQR'>;
};

const GenerateQRScreen = ({ navigation, route }: Props) => {
  const { constatId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Code du constat</Text>
      <View style={styles.qrContainer}>
        <QRCode
          value={constatId}
          size={200}
        />
      </View>
      <Text style={styles.instructions}>
        Scannez ce QR code pour accéder au constat
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  instructions: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
});

export default GenerateQRScreen;