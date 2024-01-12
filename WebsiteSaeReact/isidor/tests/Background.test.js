import renderer from 'react-test-renderer'
import BackgroundPicture from '../component/Background'

describe('<Backgroud>', () => {
    it('Has 1 child', () => {
        const tree= renderer.create(<BackgroundPicture />).toJSON()
        expect(tree.children.length).toBe(1)
    })

    it("renders correctly", ()=>{
        const tree = renderer.create(<BackgroundPicture/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})