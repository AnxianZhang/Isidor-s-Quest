import { NavigationContainer } from '@react-navigation/native';//Navigation stack des différent page de l'application
import { createNativeStackNavigator } from '@react-navigation/native-stack';//Navigation Stack des différent page de l'application
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './page/HomeScreen';
import RegisterScreen from './page/RegisterScreen';
import ConnexionScreen from './page/ConnexionScreen';
import UnityCompile from './page/UnityCompilerScreen';
import APropos from './page/APropos';
import { useCallback, useState } from 'react';
import fr from "./language/fr.json"
import PaymentCardScreen from './page/PaymentScreen';
import VerificationScreen from './page/VerificationUserCodeScreen';
import SucessPaymentScreen from './page/SuccessPaymentScreen';
import CancelPaymentScreen from './page/CancelPaymentScreen';
import ContactUsScreen from './page/ContactUsScreen';
import UserDataScreen from './page/UserDataScreen';
import ForgotPass from './page/ForgotPass';
import ChangePwd from './page/ChangePwd';
import ChangePwdSuccess from './page/ChangePwdSuccess';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [selectLanguage, setSelectLanguage] = useState(fr);

  const linking = {

  };

  const [fontsLoaded, fontError] = useFonts({
    pixSanRegular: require('./assets/fonts/PixelifySans-Regular.ttf'),
    // pixSanBold: require('./assets/fonts/PixelifySans-Bold.ttf'),
    // VT323: require('./assets/fonts/VT323-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError)
      await SplashScreen.hideAsync();
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError)
    return null

  return (
    <NavigationContainer linking={linking} onReady={onLayoutRootView}>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>{() => (<HomeScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="APropos" options={{ headerShown: false }}>{() => (<APropos language={selectLanguage}></APropos>)}</Stack.Screen>
        <Stack.Screen name="Connexion" options={{ headerShown: false }}>{() => (<ConnexionScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="ForgotPass" options={{ headerShown: false }}>{() => (<ForgotPass language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="ChangePwd" options={{ headerShown: false }}>{() => (<ChangePwd language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="ChangePwdSuccess" options={{ headerShown: false }}>{() => (<ChangePwdSuccess language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Register" options={{ headerShown: false }}>{() => (<RegisterScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Game" options={{ headerShown: false }}>{()=>(<UnityCompile language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="VerifyCode" options={{ headerShown: false }}>{() => (<VerificationScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="PaymentCard" options={{ headerShown: false }}>{() => (<PaymentCardScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Success" options={{ headerShown: false }}>{() => (<SucessPaymentScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Cancel" options={{ headerShown: false }}>{() => (<CancelPaymentScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="Contact" options={{ headerShown: false }}>{() => (<ContactUsScreen language={selectLanguage} />)}</Stack.Screen>
        <Stack.Screen name="UserData" options={{ headerShown: false }}>{() => (<UserDataScreen language={selectLanguage} />)}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


