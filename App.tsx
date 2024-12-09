// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;