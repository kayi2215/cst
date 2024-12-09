// src/screens/NewConstatScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Constat } from '../types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import type { RouteProp } from '@react-navigation/native';

type NewConstatScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewConstat'>;
  route: RouteProp<RootStackParamList, 'NewConstat'>;
};

const NewConstatScreen = ({ navigation, route }: NewConstatScreenProps) => {
  const { constatId } = route.params || { constatId: Date.now().toString() };
  
  const [constat, setConstat] = useState<Partial<Constat>>({
    id: constatId,
    status: 'draft',
    vehicleA: {
      brand: '',
      model: '',
      licensePlate: '',
      insuranceCompany: '',
      insuranceNumber: '',
      owner: {
        firstName: '',
        lastName: '',
        address: '',
        licenseNumber: '',
      },
    },
    accident: {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].slice(0, 5),
      location: '',
      circumstances: [],
      damages: '',
      sketch: '',
    },
  });

  const handleSubmit = () => {
    const updatedConstat = {
      ...constat,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      initiator: 'A' // ou une valeur unique pour identifier l'initiateur
    };
    navigation.navigate('Circumstances', { constat: updatedConstat });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nouveau Constat</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations du véhicule</Text>
        <TextInput
          label="Marque"
          value={constat.vehicleA?.brand}
          onChangeText={(text) => 
            setConstat(prev => ({
              ...prev,
              vehicleA: { ...prev.vehicleA!, brand: text }
            }))
          }
          style={styles.input}
        />
        <TextInput
          label="Modèle"
          value={constat.vehicleA?.model}
          onChangeText={(text) =>
            setConstat(prev => ({
              ...prev,
              vehicleA: { ...prev.vehicleA!, model: text }
            }))
          }
          style={styles.input}
        />
        <TextInput
          label="Immatriculation"
          value={constat.vehicleA?.licensePlate}
          onChangeText={(text) =>
            setConstat(prev => ({
              ...prev,
              vehicleA: { ...prev.vehicleA!, licensePlate: text }
            }))
          }
          style={styles.input}
        />
        <TextInput
          label="Compagnie d'assurance"
          value={constat.vehicleA?.insuranceCompany}
          onChangeText={(text) =>
            setConstat(prev => ({
              ...prev,
              vehicleA: { ...prev.vehicleA!, insuranceCompany: text }
            }))
          }
          style={styles.input}
        />
        <TextInput
          label="Numéro d'assurance"
          value={constat.vehicleA?.insuranceNumber}
          onChangeText={(text) =>
            setConstat(prev => ({
              ...prev,
              vehicleA: { ...prev.vehicleA!, insuranceNumber: text }
            }))
          }
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations du conducteur</Text>
        <TextInput
          label="Nom"
          value={constat.vehicleA?.owner.lastName}
          onChangeText={(text) =>
            setConstat(prev => ({
              ...prev,
              vehicleA: { 
                ...prev.vehicleA!, 
                owner: { ...prev.vehicleA!.owner, lastName: text }
              }
            }))
          }
          style={styles.input}
        />
        <TextInput
          label="Prénom"
          value={constat.vehicleA?.owner.firstName}
          onChangeText={(text) =>
            setConstat(prev => ({
              ...prev,
              vehicleA: { 
                ...prev.vehicleA!, 
                owner: { ...prev.vehicleA!.owner, firstName: text }
              }
            }))
          }
          style={styles.input}
        />
        <TextInput
          label="Adresse"
          value={constat.vehicleA?.owner.address}
          onChangeText={(text) =>
            setConstat(prev => ({
              ...prev,
              vehicleA: { 
                ...prev.vehicleA!, 
                owner: { ...prev.vehicleA!.owner, address: text }
              }
            }))
          }
          style={styles.input}
          multiline
        />
        <TextInput
          label="Numéro de permis"
          value={constat.vehicleA?.owner.licenseNumber}
          onChangeText={(text) =>
            setConstat(prev => ({
              ...prev,
              vehicleA: { 
                ...prev.vehicleA!, 
                owner: { ...prev.vehicleA!.owner, licenseNumber: text }
              }
            }))
          }
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lieu et date de l'accident</Text>
        <TextInput
          label="Lieu"
          value={constat.accident?.location}
          onChangeText={(text) =>
            setConstat(prev => ({
              ...prev,
              accident: { ...prev.accident!, location: text }
            }))
          }
          style={styles.input}
        />
      </View>

      <Button 
        mode="contained" 
        onPress={handleSubmit} 
        style={styles.button}
      >
        Continuer
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
    padding: 8,
  },
});

export default NewConstatScreen;
