import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Seperator from '../component/Seperator';
import { useNavigation } from '@react-navigation/native';
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
    const [disable, setDisable] = useState(true);
    const [error, setError] = useState("")
    const navigation = useNavigation();

    useEffect(() => {
        setSelectLanguage(getLanguage);

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
            const response = await fetch('http://localhost:3005/user/connexion', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = response.status;

            setPseudo("");
            setPassword("")

            switch (result) {
                case 406:
                    setError(selectLanguage.lengthErr)
                    break;
                case 408:
                    setError(selectLanguage.forbidenCarac)
                    break
                case 401:
                    setError(selectLanguage.connexion.errorConnection)
                    break;

                default:
                    setError("")
                    navigation.navigate("2FA", { pseudo: pseudo });
                    break;
            }
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }

    const windowWidthByHook = useScreenWidthDimention()
    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"
    const textInputWidthStyle = windowWidthByHook > 500 ? 400 : "90%"
    const buttonWidthStyle = windowWidthByHook > 500 ? 400 : "200%"
    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
            <View style={[styles.FormContainer]}>
                <View style={StyleSheet.compose(styles.FormulaireBox, { width: formulaireBoxWidthStyle })}>
                    <View style={GLOBAL_STYLES.form.title}>
                        <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.connexion.connection}</Text>
                    </View>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields)} placeholderTextColor="#000000" placeholder={selectLanguage.connexion.pseudo} onChangeText={setPseudo} value={pseudo} secureTextEntry={false} />
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields)} placeholderTextColor="#000000" placeholder={selectLanguage.connexion.password} onChangeText={setPassword} value={password} secureTextEntry={true} />
                    <Text style={{ color: 'red', fontSize: 15, marginHorizontal: 50, textAlign: 'center' }}>{error && error}</Text>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={() => sendDataToDatabase()} disabled={disable} testID='ConnexionScreen:Send:Button'>
                            <View style={StyleSheet.compose(styles.ButtonConnectContainer, { backgroundColor: disable ? "#a9a9a9" : "#E55839" })}>
                                <Text style={styles.ConnexionButtonText}>{selectLanguage.connexion.connect}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
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
    qrCode: {
        position: 'absolute',
        backgroundColor: "#443955",
        borderRadius: 25,
    },
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
        paddingTop: 40,
        alignItems: "center"
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
        alignSelf: "center"
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