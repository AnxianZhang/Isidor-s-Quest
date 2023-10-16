import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';//Navigation des différent page de l'application
import { createNativeStackNavigator } from '@react-navigation/native-stack';//Navigation des différent page de l'application
import HomeScreen from './page/HomeScreen';
import RegisterScreen from './page/RegisterScreen';
import ConnexionScreen from './page/ConnexionScreen';
import UnityCompile from './page/UnityCompilerScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Connexion" component={ConnexionScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Game" component={UnityCompile} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


