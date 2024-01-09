import { render, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react-native";
import RegisterScreen from "../page/RegisterScreen";
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
                <Stack.Screen name="Register">{() => children}</Stack.Screen>
                <Stack.Screen name="VerifyCode">{() => <Text>VerifyCode page</Text>}</Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

afterEach(() => {
    jest.clearAllMocks(); // Réinitialise tous les mocks avant chaque test
});

describe('<RegisterScreen>', () => {
    it('should create an account, and go to VerifyCode page', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                text: () => Promise.resolve("false")
            })
        )

        const { getByPlaceholderText, getByTestId, getByText } = render(<MockNavigation><RegisterScreen language={getLanguage()}></RegisterScreen></MockNavigation>)
        const lastNameInput = getByPlaceholderText('Nom de famille')
        const firstNameInput = getByPlaceholderText('Prénom')
        const emailInput = getByPlaceholderText('Adresse e-mail')
        const pseudoInput = getByPlaceholderText('Pseudo')
        const passWordInput = getByPlaceholderText('Mot de passe')
        const confirmPassWordInput = getByPlaceholderText('Confirmer mot de passe')

        const sendButton = getByTestId('RegiesterScreen:Send:Button')

        fireEvent.changeText(lastNameInput, "toto")
        fireEvent.changeText(firstNameInput, "titi")
        fireEvent.changeText(emailInput, "email@gmail.com")
        fireEvent.changeText(pseudoInput, "Isidors")
        fireEvent.changeText(passWordInput, "123456789")
        fireEvent.changeText(confirmPassWordInput, "123456789")
        fireEvent.press(sendButton)

        await waitFor(() => {
            const verifyCodePage = getByText('VerifyCode page')
            expect(verifyCodePage.children[0]).toEqual('VerifyCode page');
        })
    })
});

it('should return this mail already have a account', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 401,
            text: () => Promise.resolve("false")
        })
    )

    const { getByPlaceholderText, getByTestId } = render(<MockNavigation><RegisterScreen language={getLanguage()}></RegisterScreen></MockNavigation>)
    const lastNameInput = getByPlaceholderText('Nom de famille')
    const firstNameInput = getByPlaceholderText('Prénom')
    const emailInput = getByPlaceholderText('Adresse e-mail')
    const pseudoInput = getByPlaceholderText('Pseudo')
    const passWordInput = getByPlaceholderText('Mot de passe')
    const confirmPassWordInput = getByPlaceholderText('Confirmer mot de passe')
    const sendButton = getByTestId('RegiesterScreen:Send:Button')

    fireEvent.changeText(lastNameInput, "toto")
    fireEvent.changeText(firstNameInput, "titi")
    fireEvent.changeText(emailInput, "aleadyHaveAccout@gmail.com")
    fireEvent.changeText(pseudoInput, "Isidor's")
    fireEvent.changeText(passWordInput, "123456789")
    fireEvent.changeText(confirmPassWordInput, "123456789")
    fireEvent.press(sendButton)

    await waitFor(() => {
        expect(emailInput.props.placeholder).toEqual('Vous possèder déja un compte, si vous avez oublié le mot de passe, vous pouvez le reinitialisé');
    })
});

it('should return already have a account', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 402,
            text: () => Promise.resolve("false")
        })
    )

    const { getByPlaceholderText, getByTestId } = render(<MockNavigation><RegisterScreen language={getLanguage()}></RegisterScreen></MockNavigation>)
    const lastNameInput = getByPlaceholderText('Nom de famille')
    const firstNameInput = getByPlaceholderText('Prénom')
    const emailInput = getByPlaceholderText('Adresse e-mail')
    const pseudoInput = getByPlaceholderText('Pseudo')
    const passWordInput = getByPlaceholderText('Mot de passe')
    const confirmPassWordInput = getByPlaceholderText('Confirmer mot de passe')
    const sendButton = getByTestId('RegiesterScreen:Send:Button')

    fireEvent.changeText(lastNameInput, "toto")
    fireEvent.changeText(firstNameInput, "titi")
    fireEvent.changeText(emailInput, "email@gmail.com")
    fireEvent.changeText(pseudoInput, "alreadyExistePseudo")
    fireEvent.changeText(passWordInput, "123456789")
    fireEvent.changeText(confirmPassWordInput, "123456789")
    fireEvent.press(sendButton)

    await waitFor(() => {
        expect(pseudoInput.props.placeholder).toEqual("Ce nom d'utilisateur est déja pris");
    })
});

it('should return the two pass word is not matching', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            text: () => Promise.resolve("false")
        })
    )

    const { getByPlaceholderText, getByTestId } = render(<MockNavigation><RegisterScreen language={getLanguage()}></RegisterScreen></MockNavigation>)
    const lastNameInput = getByPlaceholderText('Nom de famille')
    const firstNameInput = getByPlaceholderText('Prénom')
    const emailInput = getByPlaceholderText('Adresse e-mail')
    const pseudoInput = getByPlaceholderText('Pseudo')
    const passWordInput = getByPlaceholderText('Mot de passe')
    const confirmPassWordInput = getByPlaceholderText('Confirmer mot de passe')
    const sendButton = getByTestId('RegiesterScreen:Send:Button')

    fireEvent.changeText(lastNameInput, "toto")
    fireEvent.changeText(firstNameInput, "titi")
    fireEvent.changeText(emailInput, "email@gmail.com")
    fireEvent.changeText(pseudoInput, "alreadyExistePseudo")
    fireEvent.changeText(passWordInput, "123456789")
    fireEvent.changeText(confirmPassWordInput, "NotCorrespondingPass")
    fireEvent.press(sendButton)

    await waitFor(() => {
        expect(confirmPassWordInput.props.placeholder).toEqual("Le mot de passe ne correspond pas");
    })
});