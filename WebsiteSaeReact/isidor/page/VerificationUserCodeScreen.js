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
    const [code, setCode] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const [errorConfirmCode, setErrorConfirmCode] = useState("");
    const [disable, setDisable] = useState(true);
    const [err, setErr] = useState('')
    const navigation = useNavigation();
    const route = useRoute();
    //let number = /^(0|[1-9][0-9]*)$/
    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    useEffect(() => {
        if (!code || !confirmCode) {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    })

    const RegisterUser = async () => {
        console.log(route.params.data.bhirthday)
        const data = {
            prenom: route.params.data.prenom,
            nomFamille: route.params.data.nomFamille,
            email: route.params.data.email,
            pseudo: route.params.data.pseudo,
            password: route.params.data.password,
            bhirthday: route.params.data.bhirthday

        }
        try {
            const response = await fetch('http://localhost:3005/user/registration', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = response.status;
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
            setErrorConfirmCode(selectLanguage.Code.notSame);
        }
        else {
            setErrorConfirmCode("");
            const data = {
                email: route.params.data.email,
                code: code
            }
            try {
                const response = await fetch('http://localhost:3005/code/VerificationCode', {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = response.status;

                setErrorCode("");
                setErrorConfirmCode("");
                switch (result) {
                    case 406:
                        setErr(selectLanguage.lengthErr)
                        break;
                    case 408:
                        setErr(selectLanguage.forbidenCarac)
                        break;
                    case 401:
                        setErr(selectLanguage.Code.errorExpireDate);
                        break;
                    case 402:
                        setErr(selectLanguage.Code.errorCode);
                        break;
                    case 409:
                        setErr(selectLanguage.Code.block);
                        break;
                    case 200:
                        setErr("");
                        if (route.params.data.isForgotPass)
                            navigation.navigate("ChangePwd", { data: data })
                        else
                            RegisterUser();
                        break;

                    default:
                        break;
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
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[GLOBAL_STYLES.form.fields, { borderColor: errorConfirmCode.length > 0 && "#E55839", borderWidth: errorConfirmCode.length > 0 && 1 }]} placeholder={errorConfirmCode.length > 0 ? errorConfirmCode : selectLanguage.Code.codeText} placeholderTextColor={errorConfirmCode.length ? "#E55839" : "#000000"} onChangeText={setConfirmCode} value={confirmCode} secureTextEntry={false} />
                    </View>
                    {err.length ? <Text style={{ fontSize: 15, marginVertical: 'auto', color: '#E55839', marginVertical: 10, textAlign: 'center' }}>{err}</Text> : <Text style={{ fontSize: 20, marginVertical: 5 }}> </Text>}

                    <Seperator />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={() => sendDataToDatabase()} disabled={disable}>
                            <View style={[GLOBAL_STYLES.form.buttonContainer, { backgroundColor: disable ? "#a9a9a9" : "#5BD94C" }]}>
                                <Text style={GLOBAL_STYLES.form.buttonText}>{route.params.data.isForgotPass ? selectLanguage.Code.verifCodeChange : selectLanguage.Code.register}</Text>
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