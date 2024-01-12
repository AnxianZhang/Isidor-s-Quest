import { render, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react-native";
import ConnexionScreen from "../page/ConnexionScreen";
import { changeLanguage, getLanguage } from "../function/languageSelect"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "react-native";
import React from 'react';

const Stack = createNativeStackNavigator();

const MockNavigation = ({ children }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Connexion">{() => children}</Stack.Screen>
                <Stack.Screen name="Home">{() => <Text>Home page</Text>}</Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

afterEach(() => {
    jest.clearAllMocks(); // Réinitialise tous les mocks avant chaque test
});

describe('<ConnexionScreen>', () => {
    it('should connect successfully, go to home page', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                text: () => Promise.resolve("reussi")
            })
        )

        const { getByPlaceholderText, getByTestId, getByText } = render(<MockNavigation><ConnexionScreen language={getLanguage()}></ConnexionScreen></MockNavigation>)
        const pseudoInput = getByPlaceholderText('Pseudo')
        const passWordInput = getByPlaceholderText('Mot de passe')

        const sendButton = getByTestId('ConnexionScreen:Send:Button')

        fireEvent.changeText(pseudoInput, "^(xt)^")
        fireEvent.changeText(passWordInput, "toto")
        fireEvent.press(sendButton)

        await waitFor(() => {
            const HomePage = getByText('Home page')
            expect(HomePage.children[0]).toEqual('Home page');
        })
    })
});

it('should return username/password is incorrect', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 401,
            text: () => Promise.resolve("user peseudo null")
        })
    )

    const { getByPlaceholderText, getByTestId, getByText } = render(<MockNavigation><ConnexionScreen language={getLanguage()}></ConnexionScreen></MockNavigation>)
    const pseudoInput = getByPlaceholderText('Pseudo')
    const passWordInput = getByPlaceholderText('Mot de passe')

    const sendButton = getByTestId('ConnexionScreen:Send:Button')

    fireEvent.changeText(pseudoInput, "^(00)^")
    fireEvent.changeText(passWordInput, "123")
    fireEvent.press(sendButton)

    await waitFor(() => {
        expect(pseudoInput.props.placeholder).toEqual('Nom d\'utilisateur/Mot de passe incorrect');
    })
});

it('should return username/password is incorrect', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 402,
            text: () => Promise.resolve("password is incorrect")
        })
    )

    const { getByPlaceholderText, getByTestId, getByText } = render(<MockNavigation><ConnexionScreen language={getLanguage()}></ConnexionScreen></MockNavigation>)
    const pseudoInput = getByPlaceholderText('Pseudo')
    const passWordInput = getByPlaceholderText('Mot de passe')

    const sendButton = getByTestId('ConnexionScreen:Send:Button')

    fireEvent.changeText(pseudoInput, "^(xt)^")
    fireEvent.changeText(passWordInput, "789")
    fireEvent.press(sendButton)

    await waitFor(() => {
        expect(pseudoInput.props.placeholder).toEqual('Nom d\'utilisateur/Mot de passe incorrect');
    })
});