// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

// Définissez les types pour vos routes
export type RootStackParamList = {
  Home: undefined;
  NewConstat: undefined;
  ScanQR: undefined;
  Circumstances: { constat: any };
  Damage: { constat: any };
  Sketch: { constat: any };
  GenerateQR: { constat: any };
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
        {/* Les autres écrans seront ajoutés ici au fur et à mesure */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;