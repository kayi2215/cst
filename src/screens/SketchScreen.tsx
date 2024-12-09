import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Button, Text, IconButton, Snackbar } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import SignatureCanvas from 'react-native-signature-canvas';
import { Constat } from '../types';

type SketchScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Sketch'>;
  route: RouteProp<RootStackParamList, 'Sketch'>;
};

const { width, height } = Dimensions.get('window');

const SketchScreen: React.FC<SketchScreenProps> = ({ route, navigation }) => {
  const { constat } = route.params;
  const signatureRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedConstat, setConstat] = useState(constat);

  const handleClear = (): void => {
    signatureRef.current?.clearSignature();
  };

  const handleUndo = (): void => {
    signatureRef.current?.undo();
  };

  // Appelé après la fin du trait
  const handleEnd = () => {
    console.log("Fin du trait");
    if (signatureRef.current) {
      signatureRef.current.readSignature();
    }
  };

  // Appelé quand readSignature() lit une signature valide
  const handleOK = async (signature: string) => {
    console.log("Signature valide reçue");
    try {
      const base64Data = signature;
      const updatedConstat = {
        ...constat,
        accident: {
          ...constat.accident,
          sketch: base64Data
        }
      };
      setConstat(updatedConstat);
    } catch (err) {
      console.error("Erreur lors du traitement de la signature:", err);
      setError("Une erreur est survenue lors de la validation du croquis");
    }
  };

  const handleSubmit = () => {
    // La navigation se fait uniquement lors de la validation
    if (updatedConstat.accident.sketch) {
      navigation.navigate('Recapitulatif', { constat: updatedConstat });
    } else {
      setError("Veuillez dessiner un croquis avant de continuer");
    }
  };

  // Appelé quand readSignature() lit une signature vide
  const handleEmpty = () => {
    console.log("Signature vide détectée");
    setError("Le croquis ne peut pas être vide");
    setIsLoading(false);
  };

  const webStyle = `.m-signature-pad {
    box-shadow: none; 
    border: none;
    width: 100%;
    height: 100%;
  } 
  .m-signature-pad--body {
    border: none;
    width: 100%;
    height: 100%;
  }
  .m-signature-pad--footer {
    display: none;
  }
  body, html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Croquis de l'accident</Text>
        <View style={styles.toolbarContainer}>
          <IconButton
            icon="lead-pencil"
            size={24}
            onPress={() => signatureRef.current?.changePenColor('black')}
          />
          <IconButton
            icon="eraser"
            size={24}
            onPress={() => signatureRef.current?.changePenColor('white')}
          />
          <IconButton
            icon="undo-variant"
            size={24}
            onPress={handleUndo}
          />
          <IconButton
            icon="delete-outline"
            size={24}
            onPress={handleClear}
          />
        </View>
      </View>

      <View style={styles.canvasContainer}>
        <SignatureCanvas
          ref={signatureRef}
          webStyle={webStyle}
          onEnd={handleEnd}
          onOK={handleOK}
          onEmpty={handleEmpty}
          backgroundColor="white"
          penColor="black"
          maxWidth={2}
          minWidth={2}
          style={styles.canvas}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.instructionsContainer}>
          <Text style={styles.hint}>Dessinez le croquis de l'accident en indiquant :</Text>
          <Text style={styles.instructionText}>• La direction des véhicules</Text>
          <Text style={styles.instructionText}>• Le sens de circulation</Text>
          <Text style={styles.instructionText}>• La position des véhicules au moment du choc</Text>
          <Text style={styles.instructionText}>• Les signalisations présentes</Text>
        </View>

        <Button 
          mode="contained" 
          onPress={handleSubmit}
          style={styles.button}
          icon="check"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Validation en cours...' : 'Valider le croquis'}
        </Button>
      </View>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        action={{
          label: 'OK',
          onPress: () => setError(null),
        }}
        duration={3000}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  canvas: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
  },
  instructionsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  hint: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#495057',
  },
  button: {
    padding: 8,
  }
});

export default SketchScreen;