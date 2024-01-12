import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { getPackageJson } from "expo/config";
import { Text } from "react-native";
import Header from "../component/Header";
import { changeLanguage, getLanguage } from "../function/languageSelect"

const Stack = createNativeStackNavigator();

const MockNavigation = ({ children }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main">{() => children}</Stack.Screen>
                <Stack.Screen name="Home">{() => <Text>Home page</Text>}</Stack.Screen>
                <Stack.Screen name="APropos">{() => <Text>A propos page</Text>}</Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mockSetLanguage = jest.fn()

afterEach(() => {
    jest.clearAllMocks();
})

describe('<Header>', () => {
    it('should go to the home page', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                text: () => Promise.resolve("false")
            })
        )

        const mockSetLanguage = jest.fn()

        const { getByTestId, getByText } = render(<MockNavigation><Header setLanguage={mockSetLanguage} language={getLanguage()}></Header></MockNavigation>)
        const homeButton = getByTestId('ButtonImage:Click')

        fireEvent.press(homeButton)

        await waitFor(() => {
            const homePageText = getByText("Home page")
            expect(homePageText.children[0]).toEqual("Home page");
        })
    });
});