import React from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { changeLanguage, getLanguage } from "../function/languageSelect"
import Footer from "../component/Footer";
import {Text } from 'react-native';

const Stack = createNativeStackNavigator();

const MockNavigation = ({ children }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MainTest">{() => children}</Stack.Screen>
                <Stack.Screen name="Contact">{() => <Text>Page de contact</Text>}</Stack.Screen>
                <Stack.Screen name="APropos">{() => <Text>Page à Propos</Text>}</Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mockSetLanguage = jest.fn()
let consoleLogSpy

beforeAll(() =>{
    consoleLogSpy = jest.spyOn(console, 'log')
})

afterAll(()=>{
    consoleLogSpy.mockRestore()
})

describe('<Footer>', () => {
    it('should render the text of the page Contact', async () => {
        const { getByText } = render(<MockNavigation><Footer language={getLanguage()} setLanguage={mockSetLanguage}></Footer></MockNavigation>)
        const contactButton = getByText("Contact")

        await waitFor(() => {
            fireEvent.press(contactButton)
        })

        const contactPageTextComponent = getByText("Page de contact")
        expect(contactPageTextComponent.children[0]).toEqual("Page de contact")
    });

    it('should render the text of the page AProppos', async () => {
        changeLanguage('English')
        const {getByText} = render(<MockNavigation><Footer language={getLanguage()} setLanguage={mockSetLanguage}></Footer></MockNavigation>)
        const aboutUsButton = getByText("About us")

        await waitFor(() =>{
            fireEvent.press(aboutUsButton)
        })

        const aboutUsPageTextComponent = getByText("Page à Propos")
        expect(aboutUsPageTextComponent.children[0]).toEqual("Page à Propos");
    });

    it('should return CGU & Mensions légales when the button GCU is press', async () => {
        const {getByText} = render(<MockNavigation><Footer language={getLanguage()} setLanguage={mockSetLanguage}></Footer></MockNavigation>)
        const GCUButton = getByText("Terms & Conditions")

        await waitFor(() =>{
            fireEvent.press(GCUButton)
        })

        expect(consoleLogSpy).toHaveBeenCalledWith("CGU & Mentions légales");
    });

    it('should return Twitter when the button twitter is press', async () => {
        const {getByText} = render(<MockNavigation><Footer language={getLanguage()} setLanguage = {mockSetLanguage}></Footer></MockNavigation>)
        const TwitterButton = getByText("Twitter")

        await waitFor(() =>{
            fireEvent.press(TwitterButton)
        })

        expect(consoleLogSpy).toHaveBeenCalledWith("Twitter")
    });

    it('should return Instagram when the button Instagram is press', async () => {
        const {getByText} = render(<MockNavigation><Footer language={getLanguage()} setLanguage = {mockSetLanguage}></Footer></MockNavigation>)
        const InstagramButton = getByText("Instagram")

        await waitFor(() =>{
            fireEvent.press(InstagramButton)
        })

        expect(consoleLogSpy).toHaveBeenCalledWith("Instagram")
    });

    it('should return Discord when the button Discord is press', async () => {
        const {getByText} = render(<MockNavigation><Footer language={getLanguage()} setLanguage = {mockSetLanguage}></Footer></MockNavigation>)
        const DiscordButton = getByText("Discord")

        await waitFor(() =>{
            fireEvent.press(DiscordButton)
        })

        expect(consoleLogSpy).toHaveBeenCalledWith("Discord")
    });
});