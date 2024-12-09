// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CircumstancesScreen from '../screens/CircumstancesScreen';
import NewConstatScreen from '../screens/NewConstatScreen';
import GenerateQRScreen from '../screens/GenerateQRScreen';
//import ScanQRScreen from '../screens/ScanQRScreen';
import DamageScreen from '../screens/DamageScreen';

// Définissez les types pour vos routes
export type RootStackParamList = {
    Home: undefined;
    NewConstat: { constatId: string };  // Modifié pour inclure constatId
    ScanQR: undefined;
    Circumstances: { constat: any };
    GenerateQR: { constat: any };
    GenerateQRInitial: undefined;

    Damage: { 
      constat: {
        accident: {
          damages?: string;
        };
      }; 
    };
    Sketch: {
      constat: any; // Vous pouvez typer ceci plus précisément selon vos besoins
    };
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
          options={{ title: 'E-Constat' }}
        />
                <Stack.Screen 
          name="NewConstat" 
          component={NewConstatScreen}
          options={{ title: 'Nouveau Constat' }}
        />

        <Stack.Screen 
          name="Circumstances" 
          component={CircumstancesScreen}
          options={{ title: 'Circonstances' }}
        />
        <Stack.Screen 
          name="GenerateQRInitial" 
          component={GenerateQRScreen}
          options={{ title: 'Code du constat' }}
        />
        <Stack.Screen 
          name="Damage" 
          component={DamageScreen}
          options={{ title: 'Dégâts Apparents' }}
        />
        {/* Les autres écrans seront ajoutés ici au fur et à mesure */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;