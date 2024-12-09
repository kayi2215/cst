// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CircumstancesScreen from '../screens/CircumstancesScreen';
import NewConstatScreen from '../screens/NewConstatScreen';
import GenerateQRScreen from '../screens/GenerateQRScreen';
import DamageScreen from '../screens/DamageScreen';
import SketchScreen from '../screens/SketchScreen';
import RecapitulatifScreen from '../screens/RecapitulatifScreen';
import { Accident, Constat } from '../types';

// Définissez les types pour vos routes

 
export type RootStackParamList = {
  Home: undefined;
  GenerateQR: { constatId: string };
  NewConstat: undefined;
  ScanQR: undefined;
  Circumstances: { constat: Partial<Constat> };
  Damage: { constat: Constat };
  Sketch: { constat: Constat };
  Recapitulatif: { constat: Constat };
 };

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Accueil' }}
        />
        <Stack.Screen 
          name="GenerateQR" 
          component={GenerateQRScreen}
          options={{ title: 'Code du constat' }}
        />
        <Stack.Screen 
          name="NewConstat" 
          component={NewConstatScreen}
          options={{ title: 'Nouveau constat' }}
        />

        <Stack.Screen 
          name="Circumstances" 
          component={CircumstancesScreen}
          options={{ title: 'Circonstances' }}
        />
        <Stack.Screen 
          name="Damage" 
          component={DamageScreen}
          options={{ title: 'Dommages' }}
        />
        <Stack.Screen 
         name="Sketch" 
         component={SketchScreen}
         options={{ title: 'Croquis' }}
        />
        <Stack.Screen 
         name="Recapitulatif" 
         component={RecapitulatifScreen}
         options={{ title: 'Récapitulatif' }}
        />
        {/* Les autres écrans seront ajoutés ici au fur et à mesure */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;