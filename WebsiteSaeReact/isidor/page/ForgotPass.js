import React, { useEffect, useState } from 'react';
import { GLOBAL_STYLES } from '../style/global';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import Footer from '../component/Footer';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getLanguage } from '../function/languageSelect';
import Header from '../component/Header';
import Field from '../component/Field';

const ForgotPass = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language)
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [disable, setDisable] = useState(false)
    const windowWidthByHook = useScreenWidthDimention()

    useEffect(() => {
        setSelectLanguage(getLanguage)
    })

    const handleSubmit = async () => {
        console.log("back-end")
    }

    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"

    return (
        <View style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage}></Header>
            <View style={GLOBAL_STYLES.toCenter}>
                <View style={{ height: 700 }}>
                    <View style={[styles.container, {width: formulaireBoxWidthStyle}]}>
                        <Text style={[GLOBAL_STYLES.form.text, GLOBAL_STYLES.form.title]}>Saisissez votre mail: </Text>
                        <View style={styles.InputStyle}>
                            <Field
                                TextInputStyle={GLOBAL_STYLES.form.fields}
                                placeholderTextColor={errorEmail.length ? "#E55839" : "#000000"}
                                placeholder={errorEmail.length ? errorEmail : "Email"}
                                onChangeText={setEmail}
                                value={email}
                                secureTextEntry={false}
                            />
                            <View style={styles.ButtonContainer}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    disabled={disable}
                                    style={StyleSheet.compose(styles.ButtonEnvoyerContainer, { backgroundColor: disable ? "#a9a9a9" : "#E55839" })}
                                >
                                    <Text style={styles.EnvoyerButtonText}>Retrieve password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        backgroundColor: "#443955",
        height: 300,
        marginVertical: 100,
        marginHorizontal: "auto",
        alignItems: 'center',
    },

    InputStyle: {
        paddingTop: 40
    },

    ButtonContainer: {
        alignItems: "center",
        paddingTop: 40,
    },

    ButtonContainer: {
        alignItems: "center",
        paddingTop: 40,
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
    }
})

export default ForgotPass;