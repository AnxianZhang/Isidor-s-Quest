import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import Seperator from '../component/Seperator';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getLanguage } from '../function/languageSelect';
import { GLOBAL_STYLES } from '../style/global';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import Footer from '../component/Footer';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const VerificationScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const [code, setCode] = useState();
    const [confirmCode, setConfirmCode] = useState();
    const [errorCode, setErrorCode] = useState("");
    const [errorConfirmCode, setErrorConfirmCode] = useState("");
    const [disable, setDisable] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    let number = /^(0|[1-9][0-9]*)$/
    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    useEffect(() => {
        if (!code || !confirmCode || !number.test(code) || !number.test(confirmCode)) {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    })

    const RegisterUser = async () => {
        const data = {
            prenom: route.params.data.prenom,
            nomFamille: route.params.data.nomFamille,
            email: route.params.data.email,
            pseudo: route.params.data.pseudo,
            password: route.params.data.password

       }
        try {
            const response = await fetch('http://localhost:3005/inscription', {
                method: 'POST',
                credentials : "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.status;
            if (result === 200) {
                navigation.navigate("Home");
            }
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }

    const sendDataToDatabase = async () => {
        if (code !== confirmCode) {
            setConfirmCode("");
            setErrorConfirmCode(selectLanguage.Code.errorCodeCaseOne);
        }
        else {
            setErrorConfirmCode("");
            const data = {
                email: route.params.data.email,
                code: parseInt(code)
            }
            try {
                const response = await fetch('http://localhost:3005/VerifyCode', {
                    method: 'POST',
                    credentials : "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.status;
                if (result === 401) {
                    setCode("");
                    setConfirmCode("");
                    setErrorCode(selectLanguage.Code.errorExpireDate);
                    setErrorConfirmCode(selectLanguage.Code.errorExpireDate)
                }
                else {
                    setErrorCode("");
                    setErrorConfirmCode("");
                }
                if (result === 402) {
                    setCode("");
                    setConfirmCode("");
                    setErrorCode(selectLanguage.Code.errorCode);
                    setErrorConfirmCode(selectLanguage.Code.errorCode);

                }
                else {
                    setErrorCode("");
                    setErrorConfirmCode("");
                }
                if (result === 200) {
                    setErrorCode("");
                    setErrorConfirmCode("");
                    RegisterUser();
                }
            }
            catch (error) {
                console.error('Erreur lors de l\'envoi des données au backend', error);
            }
        }
    }

    const windowWidthByHook = useScreenWidthDimention()
    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"

    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
            <View style={styles.FormContainer}>
                <View style={StyleSheet.compose(styles.FormulaireBox, { width: formulaireBoxWidthStyle })}>
                    <View style={GLOBAL_STYLES.form.title}>
                        <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.Code.codeVerification}</Text>
                    </View>
                    <View style={styles.ContainField}>
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[GLOBAL_STYLES.form.fields, { borderColor: errorCode.length > 0 && "#E55839", borderWidth: errorCode.length > 0 && 1 }]} placeholder={errorCode.length > 0 ? errorCode : selectLanguage.Code.codeText} placeholderTextColor={errorCode.length ? "#E55839" : "#000000"} onChangeText={setCode} value={code} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[GLOBAL_STYLES.form.fields, { borderColor: errorConfirmCode.length > 0 && "#E55839", borderWidh: errorConfirmCode.length > 0 && 1 }]} placeholder={errorConfirmCode.length > 0 ? errorConfirmCode : selectLanguage.Code.confirmCodeText} placeholderTextColor={errorConfirmCode.length ? "#E55839" : "#000000"} onChangeText={setConfirmCode} value={confirmCode} secureTextEntry={false} />
                    </View>
                    <Seperator />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={() => sendDataToDatabase()} disabled={disable}>
                            <View style={[GLOBAL_STYLES.form.buttonContainer, { backgroundColor: disable ? "#a9a9a9" : "#5BD94C" }]}>
                                <Text style={GLOBAL_STYLES.form.buttonText}>{selectLanguage.Code.register}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    FormContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 522,
    },
    FormulaireBox: {
        height: 400,
        borderRadius: 50,
        backgroundColor: "#443955"
    },
    InputStyle: {
        alignItems: "center",
        paddingTop: 40
    },
    ContainField: {
        paddingBottom: 20,
    },
    ButtonContainer: {
        alignItems: "center",
        paddingTop: 20
    },
});

export default VerificationScreen;