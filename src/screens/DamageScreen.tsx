// src/screens/DamageScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Svg, { Path, Circle } from 'react-native-svg';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type DamageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Damage'>;
type DamageScreenRouteProp = RouteProp<RootStackParamList, 'Damage'>;

type Props = {
  navigation: DamageScreenNavigationProp;
  route: DamageScreenRouteProp;
};

interface DamageState {
  description: string;
  selectedPoints: string[];
}

const CarSchema: React.FC = () => (
  <Svg height={200} width={300} viewBox="0 0 300 200">
    {/* Contour de la voiture - vue de dessus */}
    <Path
      d="M50,100 L100,60 L200,60 L250,100 L250,140 L200,180 L100,180 L50,140 Z"
      stroke="black"
      strokeWidth="2"
      fill="none"
    />
    {/* Toit */}
    <Path
      d="M100,60 L100,180"
      stroke="black"
      strokeWidth="1"
      strokeDasharray="5,5"
    />
    <Path
      d="M200,60 L200,180"
      stroke="black"
      strokeWidth="1"
      strokeDasharray="5,5"
    />
    {/* Points de repère */}
    <Circle cx={50} cy={120} r={5} fill="black" />
    <Circle cx={250} cy={120} r={5} fill="black" />
    <Circle cx={150} cy={60} r={5} fill="black" />
    <Circle cx={150} cy={180} r={5} fill="black" />
  </Svg>
);

const DamageScreen: React.FC<Props> = ({ route, navigation }) => {
  const { constat } = route.params;
  const [damages, setDamages] = useState<DamageState>({
    description: constat.accident?.damages || '',
    selectedPoints: [],
  });

  const handlePointSelection = (point: string): void => {
    setDamages(prev => ({
      ...prev,
      selectedPoints: prev.selectedPoints.includes(point)
        ? prev.selectedPoints.filter(p => p !== point)
        : [...prev.selectedPoints, point],
    }));
  };

  const handleSubmit = (): void => {
    const updatedConstat = {
      ...constat,
      accident: {
        ...constat.accident,
        damages: JSON.stringify({
          points: damages.selectedPoints,
          description: damages.description,
        }),
        sketch: '' // Ajout du champ sketch
      },
    };
    navigation.navigate('Sketch', { constat: updatedConstat });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dégâts apparents</Text>
      
      <View style={styles.schemaContainer}>
        <Text style={styles.subtitle}>
          Indiquez les points d'impact sur le schéma
        </Text>
        <View style={styles.carContainer}>
          <CarSchema />
          <View style={styles.pointsContainer}>
            {/* Points d'impact cliquables */}
            <TouchableOpacity
              style={[
                styles.impactPoint,
                damages.selectedPoints.includes('front') && styles.selectedPoint,
                { top: '30%', left: '10%' } as const,
              ]}
              onPress={() => handlePointSelection('front')}
            />
            <TouchableOpacity
              style={[
                styles.impactPoint,
                damages.selectedPoints.includes('back') && styles.selectedPoint,
                { top: '30%', right: '10%' } as const,
              ]}
              onPress={() => handlePointSelection('back')}
            />
            <TouchableOpacity
              style={[
                styles.impactPoint,
                damages.selectedPoints.includes('left') && styles.selectedPoint,
                { top: '50%', left: '5%' } as const,
              ]}
              onPress={() => handlePointSelection('left')}
            />
            <TouchableOpacity
              style={[
                styles.impactPoint,
                damages.selectedPoints.includes('right') && styles.selectedPoint,
                { top: '50%', right: '5%' } as const,
              ]}
              onPress={() => handlePointSelection('right')}
            />
          </View>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.subtitle}>Description des dégâts</Text>
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={4}
          value={damages.description}
          onChangeText={(text) => setDamages(prev => ({ ...prev, description: text }))}
          placeholder="Décrivez les dégâts apparents sur votre véhicule..."
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

// ... Le début du code reste le même ...

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 8,
      color: '#666',
    },
    schemaContainer: {
      marginVertical: 16,
    },
    carContainer: {
      position: 'relative',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      padding: 16,
    },
    pointsContainer: {
      ...StyleSheet.absoluteFillObject,
    },
    impactPoint: {
      position: 'absolute',
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
      borderWidth: 1,
      borderColor: 'red',
    },
    selectedPoint: {
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
    },
    descriptionContainer: {
      marginVertical: 16,
    },
    input: {
      backgroundColor: '#fff',
    },
    button: {
      marginVertical: 24,
      padding: 8,
    },
    legendContainer: {
      marginTop: 16,
      padding: 8,
    },
    legendRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    legendItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
    },
    legendPointNormal: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
      borderWidth: 1,
      borderColor: 'red',
      marginRight: 8,
    },
    legendPointSelected: {
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
    },
    legendText: {
      fontSize: 14,
      color: '#666',
    },
  } as const);
  
export default DamageScreen;