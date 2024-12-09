// src/screens/GenerateQRScreen.tsx
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type GenerateQRScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GenerateQRInitial'>;
};

const GenerateQRScreen = ({ navigation }: GenerateQRScreenProps) => {
  const constatId = Date.now().toString();

  // Créer un objet avec les informations pertinentes
  const qrData = {
    constatId: constatId,
    type: 'e-constat',
    initiator: true,
    created: new Date().toISOString(),
    status: 'pending'
  };
  const handleContinue = () => {
    navigation.navigate('NewConstat', { constatId });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Votre code de constat
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Partagez ce QR code avec l'autre conducteur pour qu'il puisse rejoindre le constat
      </Text>
      
      <View style={styles.qrContainer}>
        <QRCode
          value={JSON.stringify(qrData)}  // Convertir l'objet en string JSON
          size={200}
          backgroundColor="white"
          color="black"
        />
      </View>
      
      <Text variant="bodyMedium" style={styles.idText}>
        ID: {constatId}
      </Text>
      
      <Button 
        mode="contained" 
        onPress={handleContinue}
        style={styles.button}
      >
        Continuer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    paddingHorizontal: 20,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
    marginBottom: 20,
  },
  idText: {
    marginBottom: 30,
    color: '#666',
  },
  button: {
    width: '100%',
    padding: 8,
  },
});

export default GenerateQRScreen;