import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import SignatureCanvas from 'react-native-signature-canvas';
import { Constat } from '../types';

type SketchScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Sketch'>;
  route: RouteProp<RootStackParamList, 'Sketch'>;
};

const { width } = Dimensions.get('window');
const CANVAS_HEIGHT = 400;

const SketchScreen: React.FC<SketchScreenProps> = ({ route, navigation }) => {
  const { constat } = route.params;
  const signatureRef = useRef<any>();

  const handleClear = (): void => {
    signatureRef.current?.clearSignature();
  };

  const handleUndo = (): void => {
    signatureRef.current?.undo();
  };

  const handleSubmit = (): void => {
    signatureRef.current?.readSignature()
      .then((base64: string) => {
        const updatedConstat: Constat = {
          ...constat,
          accident: {
            date: constat.accident?.date || '',
            time: constat.accident?.time || '',
            location: constat.accident?.location || '',
            circumstances: constat.accident?.circumstances || [],
            damages: constat.accident?.damages || '',
            sketch: base64.replace('data:image/png;base64,', ''),
          },
          id: constat.id,
          status: constat.status || 'draft',
          initiator: constat.initiator || 'A',
          created: constat.created || new Date().toISOString(),
          modified: new Date().toISOString(),
          vehicleA: constat.vehicleA,
          vehicleB: constat.vehicleB,
        };
        navigation.navigate('GenerateQR', { constat: updatedConstat });
      })
      .catch((error: any) => {
        console.error("Erreur lors de la récupération du croquis:", error);
      });
  };

  // Style pour le canvas de signature
  const webStyle = `.m-signature-pad {
    box-shadow: none; 
    border: none;
  } 
  .m-signature-pad--body {
    border: none;
  }
  .m-signature-pad--footer {
    display: none;
  }`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Croquis de l'accident</Text>
      
      <View style={styles.toolbarContainer}>
        <IconButton
          icon="pencil"
          size={24}
          onPress={() => signatureRef.current?.changePenColor('black')}
        />
        <IconButton
          icon="eraser"
          size={24}
          onPress={() => signatureRef.current?.changePenColor('white')}
        />
        <IconButton
          icon="undo"
          size={24}
          onPress={handleUndo}
        />
        <IconButton
          icon="delete"
          size={24}
          onPress={handleClear}
        />
      </View>

      <View style={styles.canvasContainer}>
        <SignatureCanvas
          ref={signatureRef}
          webStyle={webStyle}
          onOK={handleSubmit}
          backgroundColor="white"
          penColor="black"
          maxWidth={2}
          minWidth={2}
          style={styles.canvas}
        />
      </View>

      <Text style={styles.hint}>Dessinez le croquis de l'accident en indiquant :</Text>
      <View style={styles.instructionsList}>
        <Text>1. La direction des véhicules</Text>
        <Text>2. Le sens de circulation</Text>
        <Text>3. La position des véhicules au moment du choc</Text>
        <Text>4. Les signalisations présentes</Text>
      </View>

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Continuer
      </Button>
    </View>
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
    marginBottom: 16,
  },
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  canvasContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: CANVAS_HEIGHT,
  },
  canvas: {
    width: width - 32,
    height: CANVAS_HEIGHT,
    backgroundColor: 'white',
  },
  hint: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  instructionsList: {
    marginTop: 8,
    marginLeft: 16,
    gap: 4,
  },
  button: {
    marginTop: 24,
    padding: 8,
  },
});

export default SketchScreen;