import React, { useEffect, useState, useRef } from 'react';
import { GLOBAL_STYLES } from '../style/global';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import Footer from '../component/Footer';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getLanguage } from '../function/languageSelect';
import Header from '../component/Header';
import Field from '../component/Field';
import { useNavigation } from '@react-navigation/native';
import ReCAPTCHA from "react-google-recaptcha";
import MyWebDatePicker from '../component/DatePicker';
const ForgotPass = ({ language }) => {

    const navigation = useNavigation()
    const [selectLanguage, setSelectLanguage] = useState(language)
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState("")
    const windowWidthByHook = useScreenWidthDimention()
    const [errorCaptcha, setErrorCaptcha] = useState("")
    const captchaRef = useRef(null)
    const [date, setDate] =useState(new Date(Date.now()))
    useEffect(() => {
        setSelectLanguage(getLanguage)
    })

    const handleSubmitCaptcha = () => {
        sendDataCaptch(captchaRef.current.getValue());
        captchaRef.current.reset();
    }

    const sendDataCaptch = async (token) => {
        const data = {
            token: token
        }
        console.log(token);
        try {
            const response = await fetch('http://localhost:3005/google/captcha', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = response.status;
            const text = await response.text();
            console.log(text);
            if (result === 200) {
                setErrorCaptcha("");
                handleSubmit();
            }
            else {
                setErrorCaptcha(selectLanguage.Captcha.errorCaptcha);
            }
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }

    // useEffect(()=>{
    //     // setDisable(!(email && reg.test(email)))
    // }, [email])

    const handleSubmit = async () => {
        const data = {
            email: email,
            birthday : date,
            isForgotPass: true,
        }

        let response = await fetch('http://localhost:3005/code/reset', {
            method: 'POST',
            credentials: 'include', // authentification datas, like cookies
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data),
        }).then(res => res.status)

        if (response === 406) {
            setError(selectLanguage.lengthErr)
            return
        }
        if (response === 405) {
            setError(selectLanguage.unvalidEmail)
            return
        }
        if (response === 408) {
            setError(selectLanguage.forbidenCarac)
            return
        }
        if(response === 409){
            setError(selectLanguage.unvalidBirthday)
            return
        }

        setError('')
        if (response === 200) {
            // setErrorEmail('')
            navigation.navigate('VerifyCode', { data: data })
        }
        else {
            setEmail('')
            setError(selectLanguage.forgotPass.noAccount)
        }
    }

    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"
    const textInputAndButtonWidthStyle = windowWidthByHook > 500 ? 400 : "100%"

    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage}></Header>
            <View>
                <View style={{ height: 700 }}>
                    <View style={[GLOBAL_STYLES.container, { width: formulaireBoxWidthStyle, height: 500 }]}>
                        <Text style={[GLOBAL_STYLES.form.text, GLOBAL_STYLES.form.title]}>{selectLanguage.forgotPass.title}</Text>
                        <View style={styles.InputStyle}>
                            <Field
                                TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputAndButtonWidthStyle })}
                                placeholderTextColor={error.length ? "#E55839" : "#000000"}
                                placeholder="Email"
                                onChangeText={setEmail}
                                value={email}
                                secureTextEntry={false}
                            />
                            <View style={styles.InputStyle}>
                            <MyWebDatePicker date={date} setDate={setDate} errorDate={error}/>
                            </View>
                            {error !== "" && <Text style={{ fontSize: 15, marginVertical: 'auto', color: '#E55839', marginVertical: 20 }}>{error}</Text>}
                            <View style={styles.GoogleCaptchaContainer}>
                                <ReCAPTCHA
                                    sitekey="6LdTH2IpAAAAAEhqPfCpvstQ7pgYvTrJ_5q_Vn7D"
                                    ref={captchaRef}
                                />
                                {errorCaptcha !== "" && <Text style={{ fontSize: 15, marginVertical: 'auto', color: '#E55839', marginVertical: 10 }}>{errorCaptcha}</Text>}
                            </View>
                            <View style={styles.ButtonContainer}>
                                <TouchableOpacity
                                    onPress={handleSubmitCaptcha}
                                    disabled={disable}
                                    style={StyleSheet.compose(styles.ButtonEnvoyerContainer, { backgroundColor: disable ? "#a9a9a9" : "#E55839", width: textInputAndButtonWidthStyle })}
                                >
                                    <Text style={styles.EnvoyerButtonText}>{selectLanguage.forgotPass.getCodeButton}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    InputStyle: {
        paddingTop: 30
    },

    ButtonContainer: {
        alignItems: "center",
        paddingTop: 10
        // marginTop: 10,
    },

    EnvoyerButtonText: {
        fontSize: 25,
        color: "#FFFFFF",
        fontFamily: "Light",
        margin: "auto",
    },

    ButtonEnvoyerContainer: {
        width: 400,
        height: 42,
        borderRadius: 20,
    },

    GoogleCaptchaContainer: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20
    }
})

export default ForgotPass;