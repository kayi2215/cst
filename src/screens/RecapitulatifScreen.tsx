import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { circumstancesMap } from '../utils/circumstances';

type RecapitulatifScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Recapitulatif'
>;

type RecapitulatifScreenRouteProp = RouteProp<RootStackParamList, 'Recapitulatif'>;

type Props = {
  navigation: RecapitulatifScreenNavigationProp;
  route: RecapitulatifScreenRouteProp;
};

export const RecapitulatifScreen: React.FC<Props> = ({ navigation, route }) => {
  const { constat } = route.params;
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>CONSTAT AMIABLE AUTOMOBILE</Text>
        <Text style={styles.subtitle}>Date de l'accident: {constat.accident.date}</Text>
        <Text style={styles.subtitle}>Heure: {constat.accident.time}</Text>
        <Text style={styles.subtitle}>Lieu: {constat.accident.location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>VÉHICULE A</Text>
        
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Preneur d'assurance/assuré</Text>
          <Text style={styles.value}>Nom: {constat.vehicleA.owner.lastName}</Text>
          <Text style={styles.value}>Prénom: {constat.vehicleA.owner.firstName}</Text>
          <Text style={styles.value}>Adresse: {constat.vehicleA.owner.address}</Text>
          <Text style={styles.value}>N° permis de conduire: {constat.vehicleA.owner.licenseNumber}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Véhicule</Text>
          <Text style={styles.value}>Marque: {constat.vehicleA.brand}</Text>
          <Text style={styles.value}>N° d'immatriculation: {constat.vehicleA.licensePlate}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Société d'assurance</Text>
          <Text style={styles.value}>Nom: {constat.vehicleA.insuranceCompany}</Text>
          <Text style={styles.value}>N° de contrat: {constat.vehicleA.insuranceNumber}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Circonstances</Text>
        {constat.accident.circumstances.map((circonstance, index) => (
          <Text key={index} style={styles.circumstance}>
            • {circumstancesMap[circonstance] || circonstance}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Croquis de l'accident</Text>
        {constat.accident.sketch && (
          <Image
            source={{ uri: `data:image/png;base64,${constat.accident.sketch}` }}
            style={styles.sketch}
            resizeMode="contain"
          />
        )}
      </View>

      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('GenerateQR', { constat })}
        style={styles.button}
      >
        Générer QR Code
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2196F3',
  },
  infoBlock: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 8,
  },
  circumstance: {
    fontSize: 16,
    marginBottom: 8,
  },
  sketch: {
    width: '100%',
    height: 300,
    marginTop: 10,
    backgroundColor: '#f5f5f5',
  },
  button: {
    marginVertical: 16,
  },
});

export default RecapitulatifScreen;
