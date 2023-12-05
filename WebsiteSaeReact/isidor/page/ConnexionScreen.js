import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Seperator from '../component/Seperator';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLanguage } from '../function/languageSelect';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { GLOBAL_STYLES } from '../style/global';
import Footer from '../component/Footer';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ConnexionScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [errorPseudo, setErrorPseudo] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [disable, setDisable] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    useEffect(() => {
        if (pseudo === "" || password === "") {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    })

    const sendDataToDatabase = async () => {
        const data = {
            pseudo: pseudo,
            password: password
        }
        try {
            const response = await fetch('http://localhost:3005/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.status;
            if (result === 401) {
                setPseudo("");
                setPassword("")
                setErrorPseudo(selectLanguage.connexion.errorConnection);
                setErrorPassword(selectLanguage.connexion.errorConnection);
            }
            if (result === 402) {
                setPseudo("");
                setPassword("");
                setErrorPseudo(selectLanguage.connexion.errorConnection);
                setErrorPassword(selectLanguage.connexion.errorConnection);
            }
            if (result !== 401 && result !== 402) {
                setErrorPassword("");
                setErrorPseudo("");
            }
            console.log(result);
            if (result === 200) {
                console.log("naviguer");
                await AsyncStorage.setItem("user", JSON.stringify({ pseudo: pseudo, isConnect: true }));
                setErrorPassword("");
                setErrorPseudo("");
                navigation.navigate("Home");
            }
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
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
                        <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.connexion.connection}</Text>
                    </View>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorPseudo.length > 0 && "#E55839", borderWidh: errorPseudo.length > 0 && 1 })} placeholderTextColor={errorPseudo.length ? "#E55839" : "#000000"} placeholder={errorPseudo.length ? errorPseudo : selectLanguage.connexion.pseudo} onChangeText={setPseudo} value={pseudo} secureTextEntry={false} />
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorPassword.length > 0 && "#E55839", borderWidh: errorPassword.length > 0 && 1 })} placeholderTextColor={errorPassword.length ? "#E55839" : "#000000"} placeholder={errorPassword.length ? errorPassword : selectLanguage.connexion.password} onChangeText={setPassword} value={password} secureTextEntry={true} />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={() => sendDataToDatabase()} disabled={disable}>
                            <View style={StyleSheet.compose(styles.ButtonConnectContainer, { backgroundColor: disable ? "#a9a9a9" : "#E55839" })}>
                                <Text style={styles.ConnexionButtonText}>{selectLanguage.connexion.connect}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => console.log("ok")}>
                        <View style={styles.forgetPassword}>
                            <Text style={styles.forgetPasswordText}>{selectLanguage.connexion.forgotPassword}</Text>
                        </View>
                    </TouchableOpacity>
                    <Seperator />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <View style={GLOBAL_STYLES.form.buttonContainer}>
                                <Text style={GLOBAL_STYLES.form.buttonText}>{selectLanguage.connexion.createNewAccount}</Text>
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
        height: 750,
    },
    FormulaireBox: {
        height: windowHeight * 0.7,
        borderRadius: 50,
        backgroundColor: "#443955",
        flex: .75,
        alignItems: "center"
    },
    InputStyle: {
        paddingTop: 40
    },
    ButtonContainer: {
        alignItems: "center",
        paddingTop: 40,
    },
    ConnexionButtonText: {
        fontSize: 25,
        color: "#FFFFFF",
        fontFamily: "Light",
        margin: "auto",
    },
    ButtonConnectContainer: {
        width: 400,
        height: 42,
        borderRadius: 20,
    },
    forgetPassword: {
        alignItems: "center",
        paddingTop: 10
    },
    forgetPasswordText: {
        fontSize: 16,
        color: "#E55839",
        fontFamily: "regular",
        paddingBottom: 30,
    },
});

export default ConnexionScreen;