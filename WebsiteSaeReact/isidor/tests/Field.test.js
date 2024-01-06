import { render, fireEvent, waitFor } from "@testing-library/react-native"
import Field from "../component/Field";

describe('<Field>', () => {
    it('should render input element', () => {
        const {getByPlaceholderText} = render(<Field placeholder = "Holla SAE" value = ""/>)
        const fieldComponent = getByPlaceholderText(/Holla SAE/i)

        expect(fieldComponent).toBeTruthy()
    });

    it('should be able to type', async() => {
        const mockOnChange = jest.fn()

        const { getByPlaceholderText } = render(<Field placeholder="Holla SAE" value="" onChangeText={mockOnChange} />)
        const fieldComponent = getByPlaceholderText(/Holla SAE/i)

        await waitFor(() => {fireEvent.changeText(fieldComponent, "I love SAE")})
        //console.log(fieldComponent)
        // await waitFor(() => {
        // expect(mockOnChange).toHaveBeenCalled()
        expect(fieldComponent.props.value).toEqual("I love SAE");
        // })
    });
})