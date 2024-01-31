import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import Header from '../component/Header';
import { useState, useEffect, useRef } from 'react';
import Field from '../component/Field';
import Seperator from '../component/Seperator';
import { useNavigation } from '@react-navigation/native';
import { getLanguage } from '../function/languageSelect';
import { GLOBAL_STYLES } from '../style/global';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import Footer from '../component/Footer';
import ReCAPTCHA from "react-google-recaptcha";

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
    const [error, setError] = useState("")
    const [errorCaptcha, setErrorCaptcha] = useState("")
    const captchaRef = useRef(null)
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
    

    const handleSubmit = () =>{
        sendDataCaptch(captchaRef.current.getValue());
        captchaRef.current.reset();
    }

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    const sendDataCaptch = async (token) => {
            const data = {
                token : token
            }
            console.log(token);
            try {
                const response = await fetch('http://localhost:3005/captchaResponse', {
                    method: 'POST',
                    credentials : "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = response.status;
                const text = await response.text();
                console.log(text);
                if(result === 200){
                    setErrorCaptcha("");
                    sendDataToDatabase();
                }
                else{
                    setErrorCaptcha(selectLanguage.Captcha.errorCaptcha);
                }
            }
            catch (error) {
                console.error('Erreur lors de l\'envoi des données au backend', error);
            }
    }

    const sendDataToDatabase = async () => {
        // if (password !== confirmPassword) {
        //     setConfirmPassword("");
        // }
        // else {
            setErrorConfirmPassword("")
            const data = {
                prenom: prenom,
                nomFamille: nomFamille,
                email: email,
                pseudo: pseudo,
                password: password,
                confirmPass: confirmPassword,
            }
            try {
                const response = await fetch('http://localhost:3005/SendCode', {
                    method: 'POST',
                    credentials : "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = response.status;
                if (result === 406){
                    setError(selectLanguage.lengthErr)
                    return
                }

                if (result === 408){
                    setError(selectLanguage.forbidenCarac)
                    return
                }
                
                setError("")
                if (result === 401) {
                    setEmail("");
                    setErrorEmail(selectLanguage.Register.haveAnAccount);
                }
                else {
                    setErrorEmail("");
                    if (result === 402) {
                        setPseudo("");
                        setErrorPseudo(selectLanguage.Register.pseudoAlreadyExist);
                    }
                    else if (result === 403){
                        setConfirmPassword('')
                        setErrorConfirmPassword(selectLanguage.Register.errorPasswordCaseOne);
                    }
                    else if (result === 405){
                        setConfirmPassword('')
                        setErrorConfirmPassword(selectLanguage.Register.regex)
                    }
                    else {
                        setErrorPseudo("");
                        if (result === 200) {
                            setErrorEmail("");
                            setError("")
                            setErrorPseudo("");
                            navigation.navigate("VerifyCode", { data: data });
                        }
                    }
                }
            }
            catch (error) {
                console.error('Erreur lors de l\'envoi des données au backend', error);
            }
        // }
    }

    const windowWidthByHook = useScreenWidthDimention()
    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"
    const textInputWidthStyle = windowWidthByHook > 500? 400 : "90%"


    return (
        <View style={GLOBAL_STYLES.backcolor}>
            <ScrollView>
                <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
                <View style={styles.FormContainer}>
                    <View style={StyleSheet.compose(styles.FormulaireBox, { width: formulaireBoxWidthStyle, })}>
                        <View style={GLOBAL_STYLES.form.title}>
                            <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.Register.register}</Text>
                        </View>
                        <Field fieldsViewStyle={[styles.InputStyle, { paddingTop: 40, }]} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputWidthStyle})} placeholder={selectLanguage.Register.familyName} onChangeText={setNomFamille} value={nomFamille} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputWidthStyle})} placeholder={selectLanguage.Register.name} onChangeText={setPrenom} value={prenom} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorEmail.length > 0 && "#E55839", borderWidth: errorEmail.length > 0 && 1, width: textInputWidthStyle })} placeholder={errorEmail.length > 0 ? errorEmail : selectLanguage.Register.email} placeholderTextColor={errorEmail.length ? "#E55839" : "#000000"} onChangeText={setEmail} value={email} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorPseudo.length > 0 && "#E55839", borderWidh: errorPseudo.length > 0 && 1, width: textInputWidthStyle })} placeholder={errorPseudo.length > 0 ? errorPseudo : selectLanguage.Register.pseudo} placeholderTextColor={errorPseudo.length ? "#E55839" : "#000000"} onChangeText={setPseudo} value={pseudo} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputWidthStyle})} placeholder={selectLanguage.Register.password} onChangeText={setPassword} value={password} secureTextEntry={true} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorConfirmPassword.length > 0 && "#E55839", borderWidth: errorConfirmPassword.length > 0 && 1, width: textInputWidthStyle })} placeholder={errorConfirmPassword.length > 0 ? errorConfirmPassword : selectLanguage.Register.confirmPassword} placeholderTextColor={errorConfirmPassword.length ? "#E55839" : "#000000"} onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry={true} />
                        <Text style = {{color: 'red', fontSize: 15, marginHorizontal: 50, textAlign: 'center'}}>{errorConfirmPassword || error ? errorConfirmPassword + error : ""}</Text>
                        <View style={styles.generalContidionBox}>
                            <Text style={styles.generalContidionText}>{selectLanguage.Register.generalCondition}</Text>
                        </View>
                        <Seperator />
                        {disable === false &&
                        <View style={styles.GoogleCaptchaContainer}>
                            <ReCAPTCHA
                            sitekey="6LdTH2IpAAAAAEhqPfCpvstQ7pgYvTrJ_5q_Vn7D" 
                            ref={captchaRef}
                            />
                            {errorCaptcha !== "" && <Text style={{fontSize: 15, marginVertical: 'auto', color: '#E55839', marginVertical: 20}}>{errorCaptcha}</Text>}
                        </View>
                        }
                        <View style={styles.ButtonContainer}>
                            <TouchableOpacity onPress={() => handleSubmit()} disabled={disable} testID='RegiesterScreen:Send:Button'>
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
        height: 800,
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
    GoogleCaptchaContainer : {
        paddingTop : 20,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom : 20
    }
});

export default RegisterScreen;