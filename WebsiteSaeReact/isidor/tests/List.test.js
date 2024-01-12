import { render, fireEvent, waitFor } from "@testing-library/react-native";
import List from '../component/List';
import { changeLanguage, getLanguage } from "../function/languageSelect"
import Fr from "../language/fr.json"
import En from "../language/en.json"

const mockSetLanguage = jest.fn()

describe('<List>', () => {
    it('should return Fr with the default given language', async () => {
        const { getByText } = render(
            <List
                language={Fr}
                setLanguage={mockSetLanguage}
                onSelect={() => changeLanguage(getLanguage)}
            />
        );

        const button = getByText('Fr');

        expect(button.props.children).toEqual('Fr');
    });

    it('should return En with the default given language', async () => {
        const { getByText } = render(
            <List
                language={En}
                setLanguage={mockSetLanguage}
                onSelect={() => changeLanguage(getLanguage)}
            />
        );

        const button = getByText('En');

        expect(button.props.children).toEqual('En');
    });
});