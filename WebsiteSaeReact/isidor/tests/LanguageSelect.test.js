import { render } from "@testing-library/react-native"
import { changeLanguage, getLanguage } from "../function/languageSelect"
import Fr from "../language/fr.json"
import En from "../language/en.json"

afterAll(()=>{
    changeLanguage('Fr')
})

describe('Language Module', () => {
    it('should return French when there is a unknown value', () => {
        changeLanguage('no correct value');
        expect(getLanguage()).toBe(Fr);
    })

    it('should change language to French', () => {
        changeLanguage('Francais');
        expect(getLanguage()).toBe(Fr);
    })

    it('should change language to English', () => {
        changeLanguage('English');
        expect(getLanguage()).toBe(En);
    })
})