import React, { useEffect, useState } from 'react';
import { GLOBAL_STYLES } from '../style/global';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import Footer from '../component/Footer';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getLanguage } from '../function/languageSelect';
import Header from '../component/Header';
import Field from '../component/Field';
import { useNavigation } from '@react-navigation/native';

const ForgotPass = ({ language }) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const navigation = useNavigation()
    const [selectLanguage, setSelectLanguage] = useState(language)
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [disable, setDisable] = useState(false)
    const windowWidthByHook = useScreenWidthDimention()

    useEffect(() => {
        setSelectLanguage(getLanguage)
    })

    useEffect(()=>{
        setDisable(!(email && reg.test(email)))
    }, [email])

    const handleSubmit = async () => {
        const data = {
            email: email,
            isForgotPass: true,
        }

        let response = await fetch('http://localhost:3005/sendCodeForRetrivePass', {
            method: 'POST',
            credentials: 'include', // authentification datas, like cookies
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data),
        }).then(res => res.status)

        if (response === 200){
            setErrorEmail('')
            navigation.navigate('VerifyCode', {data: data})
        }
        else{
            setEmail('')
            setErrorEmail(selectLanguage.forgotPass.noAccount)
        }
    }

    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"
    const textInputAndButtonWidthStyle = windowWidthByHook > 500? 400 : "100%"
    
    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage}></Header>
            <View>
                <View style={{ height: 550 }}>
                    <View style={[GLOBAL_STYLES.container, {width: formulaireBoxWidthStyle, height: 300}]}>
                        <Text style={[GLOBAL_STYLES.form.text, GLOBAL_STYLES.form.title]}>{selectLanguage.forgotPass.title}</Text>
                        <View style={styles.InputStyle}>
                            <Field
                                TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputAndButtonWidthStyle})}
                                placeholderTextColor={errorEmail.length ? "#E55839" : "#000000"}
                                placeholder="Email"
                                onChangeText={setEmail}
                                value={email}
                                secureTextEntry={false}
                            />
                            {errorEmail ? <Text style={{fontSize: 15, marginVertical: 'auto', color: '#E55839', marginVertical: 20}}>{errorEmail}</Text> : <Text style={{fontSize: 20, marginVertical: 20}}> </Text>}
                            <View style={styles.ButtonContainer}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
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
    }
})

export default ForgotPass;