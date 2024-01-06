import { render, fireEvent, waitFor } from "@testing-library/react-native"
import renderer from 'react-test-renderer'
import Header from "../component/Header";
import { NavigationContainer } from "@react-navigation/native";

const MockHeader = (props) => {
    return (<NavigationContainer>
        <Header></Header>
    </NavigationContainer >
    )
}

describe('<Header>', () => {
    it('should render the component correctly', () => {
        const tree = renderer.create(<MockHeader />).toJSON()
        expect(tree).toMatchSnapshot()
    });
})
