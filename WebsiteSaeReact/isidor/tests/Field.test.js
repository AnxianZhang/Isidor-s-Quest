import { render, fireEvent, waitFor } from "@testing-library/react-native"
import Field from "../component/Field";
import { useState } from "react";


import React from 'react';

const MockFiled = () => {
    const [val, setVal] = useState('')
    return (
        <Field placeholder="Holla SAE" value={val} onChangeText={setVal} />
    );
};

describe('<Field>', () => {
    it('should render input element', () => {
        const {getByPlaceholderText} = render(<Field placeholder = "Holla SAE" value = ""/>)
        const fieldComponent = getByPlaceholderText(/Holla SAE/i)

        expect(fieldComponent).toBeTruthy()
    });

    it('should be able to type', async() => {
        const mockOnChange = jest.fn()

        // const { getByPlaceholderText } = render(<Field placeholder="Holla SAE" value="" onChangeText={mockOnChange} />)
        const { getByPlaceholderText } = render(<MockFiled/>)
        // const fieldComponent = getByPlaceholderText(/Holla SAE/i)
        const fieldComponent = getByPlaceholderText("Holla SAE")

        await waitFor(() => {fireEvent.changeText(fieldComponent, "I love SAE")})
        //console.log(fieldComponent)
        // await waitFor(() => {
        // expect(mockOnChange).toHaveBeenCalled()
        expect(fieldComponent.props.value).toEqual("I love SAE");
        // })
    });
})