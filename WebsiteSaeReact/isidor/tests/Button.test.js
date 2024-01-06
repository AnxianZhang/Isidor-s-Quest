import {render, fireEvent} from "@testing-library/react-native"
import ButtonImage from "../component/ButtonImage";
import ButtonText from "../component/ButtonText";
import { getAssetByID } from "react-native-web/dist/cjs/modules/AssetRegistry";

let mockOnPress = jest.fn() // create mock function whitch will be reinit after each test

describe("<ButtonImage>", ()=>{
    it("calls onPress function when the button is pressed", ()=>{
        const {getByTestId} = render(<ButtonImage onPress={mockOnPress}></ButtonImage>)

        const buttonImageElement = getByTestId('ButtonImage:Click')
        fireEvent.press(buttonImageElement)

        expect(mockOnPress).toHaveBeenCalled()
    })
})

describe("<ButtonText>", ()=>{
    it("should render same text passed into prop and calls onPress function when the button is pressed", ()=>{
        const {getByText} = render(<ButtonText onPress={mockOnPress} text="Button for test"></ButtonText>)

        const buttonTextElement = getByText(/Button for test/i)

        fireEvent.press(buttonTextElement)

        expect(mockOnPress).toHaveBeenCalled()
    })
})