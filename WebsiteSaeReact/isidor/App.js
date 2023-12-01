import { NavigationContainer } from '@react-navigation/native';//Navigation des différent page de l'application
import { createNativeStackNavigator } from '@react-navigation/native-stack';//Navigation des différent page de l'application
import HomeScreen from './page/HomeScreen';
import RegisterScreen from './page/RegisterScreen';
import ConnexionScreen from './page/ConnexionScreen';
import UnityCompile from './page/UnityCompilerScreen';
import APropos from './page/APropos';
import { useState} from 'react';
import fr from "./language/fr.json"
import PaymentCardScreen from './page/PaymentCardScreen';
import VerificationScreen from './page/VerificationUserCodeScreen';
import SucessPaymentScreen from './page/SuccessPaymentScreen';
import CancelPaymentScreen from './page/CancelPaymentScreen';
import ContactUsScreen from './page/ContactUsScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  const [selectLanguage,setSelectLanguage] = useState(fr);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}}>{() => (<HomeScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="APropos" options={{headerShown: false}}>{()=>(<APropos language={selectLanguage}></APropos>)}</Stack.Screen>
        <Stack.Screen name="Connexion" options={{headerShown: false}}>{() => (<ConnexionScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Register" options={{headerShown: false}}>{() => (<RegisterScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Game" component={UnityCompile} />
        <Stack.Screen name="VerifyCode" options={{headerShown: false}}>{()=>(<VerificationScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="PaymentCard" options={{headerShown: false}}>{()=>(<PaymentCardScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Success" options={{headerShown: false}}>{()=>(<SucessPaymentScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Cancel" options={{headerShown: false}}>{()=>(<CancelPaymentScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Contact" options={{headerShown: false}}>{()=>(<ContactUsScreen language={selectLanguage} />)}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


