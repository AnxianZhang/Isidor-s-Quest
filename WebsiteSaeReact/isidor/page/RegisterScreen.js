import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import Header from '../component/Header';
import { useState, useEffect } from 'react';
import Field from '../component/Field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Seperator from '../component/Seperator';
import { useNavigation } from '@react-navigation/native';
import { getLanguage } from '../function/languageSelect';
import { GLOBAL_STYLES } from '../style/global';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import Footer from '../component/Footer';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const RegisterScreen = ({ language }) => {
    const navigation = useNavigation();
    const [prenom, setPrenom] = useState("");
    const [nomFamille, setNomFamille] = useState("");
    const [selectLanguage, setSelectLanguage] = useState(language);
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPseudo, setErrorPseudo] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [disable, setDisable] = useState(true)
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    useEffect(() => {
        if (prenom === "" || nomFamille === "" || email === "" || pseudo === "" || password === "" || confirmPassword === "" || reg.test(email) === false) {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    })

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    const sendDataToDatabase = async () => {
        if (password !== confirmPassword) {
            setConfirmPassword("");
            setErrorConfirmPassword(selectLanguage.Register.errorPasswordCaseOne);
        }
        else {
            setErrorConfirmPassword("")
            const data = {
                prenom: prenom,
                nomFamille: nomFamille,
                email: email,
                pseudo: pseudo,
                password: password
            }
            try {
                const response = await fetch('http://localhost:3005/SendCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.status;
                if (result === 401) {
                    setEmail("");
                    setErrorEmail(selectLanguage.Register.haveAnAccount);
                }
                else {
                    setErrorEmail("");
                }
                if (result === 402) {
                    setPseudo("");
                    setErrorPseudo(selectLanguage.Register.pseudoAlreadyExist);
                }
                else {
                    setErrorPseudo("");
                }
                if (result === 200) {
                    setErrorEmail("");
                    setErrorPseudo("");
                    navigation.navigate("VerifyCode", { data: data });
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
        <View style={GLOBAL_STYLES.backcolor}>
            <ScrollView>
                <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
                <View style={styles.FormContainer}>
                    <View style={StyleSheet.compose(styles.FormulaireBox, { width: formulaireBoxWidthStyle, })}>
                        <View style={GLOBAL_STYLES.form.title}>
                            <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.Register.register}</Text>
                        </View>
                        <Field fieldsViewStyle={[styles.InputStyle, { paddingTop: 40, }]} TextInputStyle={[GLOBAL_STYLES.form.fields]} placeholder={selectLanguage.Register.familyName} onChangeText={setNomFamille} value={nomFamille} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={GLOBAL_STYLES.form.fields} placeholder={selectLanguage.Register.name} onChangeText={setPrenom} value={prenom} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorEmail.length > 0 && "#E55839", borderWidth: errorEmail.length > 0 && 1 })} placeholder={errorEmail.length > 0 ? errorEmail : selectLanguage.Register.email} placeholderTextColor={errorEmail.length ? "#E55839" : "#000000"} onChangeText={setEmail} value={email} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorPseudo.length > 0 && "#E55839", borderWidh: errorPseudo.length > 0 && 1 })} placeholder={errorPseudo.length > 0 ? errorPseudo : selectLanguage.Register.pseudo} placeholderTextColor={errorPseudo.length ? "#E55839" : "#000000"} onChangeText={setPseudo} value={pseudo} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={GLOBAL_STYLES.form.fields} placeholder={selectLanguage.Register.password} onChangeText={setPassword} value={password} secureTextEntry={true} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorConfirmPassword.length > 0 && "#E55839", borderWidth: errorConfirmPassword.length > 0 && 1 })} placeholder={errorConfirmPassword.length > 0 ? errorConfirmPassword : selectLanguage.Register.confirmPassword} placeholderTextColor={errorConfirmPassword.length ? "#E55839" : "#000000"} onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry={true} />
                        <View style={styles.generalContidionBox}>
                            <Text style={styles.generalContidionText}>{selectLanguage.Register.generalCondition}</Text>
                        </View>
                        <Seperator />
                        <View style={styles.ButtonContainer}>
                            <TouchableOpacity onPress={() => sendDataToDatabase()} disabled={disable}>
                                <View style={StyleSheet.compose(GLOBAL_STYLES.form.buttonContainer, { backgroundColor: disable ? "#a9a9a9" : "#5BD94C" })}>
                                    <Text style={GLOBAL_STYLES.form.buttonText}>{selectLanguage.Register.next}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    FormContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 900,
    },
    FormulaireBox: {
        height: 700,
        borderRadius: 50,
        backgroundColor: "#443955"

    },
    InputStyle: {
        alignItems: "center",
        paddingTop: 20
    },
    generalContidionBox: {
        alignItems: "center",
        paddingTop: 20
    },
    generalContidionText: {
        fontSize: 14,
        color: "#EE8A45",
        fontFamily: "Light Italic",
        paddingBottom: 5,
        textAlign: "center"
    },
    ButtonContainer: {
        alignItems: "center",
        paddingTop: 20
    },
});

export default RegisterScreen;