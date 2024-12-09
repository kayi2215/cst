import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Checkbox, Button } from 'react-native-paper';
import { CIRCUMSTANCES } from '../constants/circumstances';

const CircumstancesScreen = ({ route, navigation }: any) => {
  const { constat } = route.params;
  const [selectedCircumstances, setSelectedCircumstances] = useState<number[]>([]);

  const toggleCircumstance = (id: number) => {
    setSelectedCircumstances(prev => {
      if (prev.includes(id)) {
        return prev.filter(circId => circId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = () => {
    const updatedConstat = {
      ...constat,
      accident: {
        ...constat.accident,
        circumstances: selectedCircumstances,
      },
    };
    navigation.navigate('Damage', { constat: updatedConstat });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Circonstances</Text>
      <Text style={styles.subtitle}>
        Cochez les cases correspondantes aux circonstances de l'accident
      </Text>

      <View style={styles.circumstancesList}>
        {CIRCUMSTANCES.map((circumstance) => (
          <View key={circumstance.id} style={styles.circumstanceItem}>
            <Checkbox
            status={selectedCircumstances.includes(circumstance.id) ? 'checked' : 'unchecked'}
            onPress={() => toggleCircumstance(circumstance.id)}
            color="#6200ee" // Couleur principale de Material Design
            />
            <View style={styles.circumstanceText}>
              <Text style={styles.frText}>{circumstance.fr}</Text>
              <Text style={styles.arText}>{circumstance.ar}</Text>
            </View>
          </View>
        ))}
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#666',
  },
  circumstancesList: {
    gap: 12,
  },
  circumstanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  circumstanceText: {
    flex: 1,
    marginLeft: 8,
  },
  frText: {
    fontSize: 16,
    marginBottom: 4,
  },
  arText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  button: {
    marginVertical: 24,
    padding: 8,
  },
});

export default CircumstancesScreen;
