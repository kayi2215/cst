import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
 Canvas,
 Path,
 useCanvasRef,
 SkPath,
 Skia,
} from '@shopify/react-native-skia';
import { Constat } from '../types';

type SketchScreenProps = {
 navigation: NativeStackNavigationProp<RootStackParamList, 'Sketch'>;
 route: RouteProp<RootStackParamList, 'Sketch'>;
};

const { width } = Dimensions.get('window');
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 20;

const SketchScreen: React.FC<SketchScreenProps> = ({ route, navigation }) => {
 const { constat } = route.params;
 const canvasRef = useCanvasRef();
 const [paths, setPaths] = useState<SkPath[]>([]);
 const [currentPath, setCurrentPath] = useState<SkPath | null>(null);
 const [currentTool, setCurrentTool] = useState<'pen' | 'eraser'>('pen');

 const createGrid = (): SkPath => {
   const gridPath = Skia.Path.Make();
   for (let i = 0; i <= CANVAS_HEIGHT; i += GRID_SIZE) {
     gridPath.moveTo(0, i);
     gridPath.lineTo(width - 32, i);
   }
   for (let i = 0; i <= width - 32; i += GRID_SIZE) {
     gridPath.moveTo(i, 0);
     gridPath.lineTo(i, CANVAS_HEIGHT);
   }
   return gridPath;
 };

 const handleTouchStart = (event: GestureResponderEvent): void => {
   const touch = event.nativeEvent.touches[0];
   const path = Skia.Path.Make();
   path.moveTo(touch.locationX, touch.locationY);
   setCurrentPath(path);
 };

 const handleTouchMove = (event: GestureResponderEvent): void => {
   if (currentPath) {
     const touch = event.nativeEvent.touches[0];
     currentPath.lineTo(touch.locationX, touch.locationY);
     setCurrentPath(currentPath.copy());
   }
 };

 const handleTouchEnd = (): void => {
   if (currentPath) {
     setPaths([...paths, currentPath]);
     setCurrentPath(null);
   }
 };

 const handleUndo = (): void => setPaths(paths.slice(0, -1));
 const handleClear = (): void => setPaths([]);

 const handleSubmit = (): void => {
  const snapshot = canvasRef.current?.makeImageSnapshot();
  if (snapshot) {
    const base64 = snapshot.encodeToBase64();
    const updatedConstat: Constat = {
      ...constat,
      accident: {
        date: constat.accident?.date || '',
        time: constat.accident?.time || '',
        location: constat.accident?.location || '',
        circumstances: constat.accident?.circumstances || [],
        damages: constat.accident?.damages || '',
        sketch: base64,
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
  }
};

 return (
   <View style={styles.container}>
     <Text style={styles.title}>Croquis de l'accident</Text>
     
     <View style={styles.toolbarContainer}>
       <IconButton
         icon={currentTool === 'pen' ? 'pencil' : 'pencil-outline'}
         size={24}
         onPress={() => setCurrentTool('pen')}
       />
       <IconButton
         icon={currentTool === 'eraser' ? 'eraser' : 'eraser-variant'}
         size={24}
         onPress={() => setCurrentTool('eraser')}
       />
       <IconButton
         icon="undo"
         size={24}
         onPress={handleUndo}
         disabled={paths.length === 0}
       />
       <IconButton
         icon="delete"
         size={24}
         onPress={handleClear}
         disabled={paths.length === 0}
       />
     </View>

     <View style={styles.canvasContainer}>
       <Canvas
         ref={canvasRef}
         style={styles.canvas}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
       >
         <Path
           path={createGrid()}
           color="#E0E0E0"
           style="fill"
           strokeWidth={1}
         />
         {paths.map((path, index) => (
           <Path
             key={index}
             path={path}
             color={currentTool === 'eraser' ? 'white' : '#000000'}
             style="stroke"
             strokeWidth={currentTool === 'eraser' ? 20 : 2}
           />
         ))}
         {currentPath && (
           <Path
             path={currentPath}
             color={currentTool === 'eraser' ? 'white' : '#000000'}
             style="stroke"
             strokeWidth={currentTool === 'eraser' ? 20 : 2}
           />
         )}
       </Canvas>
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