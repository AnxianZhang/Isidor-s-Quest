import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';//Navigation des différent page de l'application
import { createNativeStackNavigator } from '@react-navigation/native-stack';//Navigation des différent page de l'application
import HomeScreen from './page/HomeScreen';
import RegisterScreen from './page/RegisterScreen';
import ConnexionScreen from './page/ConnexionScreen';
import UnityCompile from './page/UnityCompilerScreen';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getLanguage } from './function/languageSelect';
import fr from "./language/fr.json"
const Stack = createNativeStackNavigator();
export default function App() {
  const [selectLanguage,setSelectLanguage] = useState(fr);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}}>{() => (<HomeScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Connexion" options={{headerShown: false}}>{() => (<ConnexionScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Register" options={{headerShown: false}}>{() => (<RegisterScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Game" component={UnityCompile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


