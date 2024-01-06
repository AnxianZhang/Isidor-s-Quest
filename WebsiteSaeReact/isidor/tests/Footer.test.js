import { render, fireEvent, waitFor } from "@testing-library/react-native";

const MockNavigation = () => {
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="main" component={() => children} />
            <Stack.Screen name="AnotherPage" component={() => <Text>Another Page</Text>} />
        </Stack.Navigator>
    </NavigationContainer>
}