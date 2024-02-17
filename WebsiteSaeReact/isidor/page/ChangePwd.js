import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { GLOBAL_STYLES } from '../style/global';
import Header from '../component/Header';
import Field from '../component/Field';
import Footer from '../component/Footer';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { StyleSheet } from 'react-native-web';
import { getLanguage } from '../function/languageSelect';

const ChangePwd = ({ language }) => {
    const navigation = useNavigation()
    const route = useRoute()
    const [selectLanguage, setSelectLanguage] = useState(language)
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('')
    const [disable, setDisable] = useState(false)

    const windowWidthByHook = useScreenWidthDimention()


    useEffect(() => {
        setSelectLanguage(getLanguage)
    })

    useEffect(() => {
        setDisable(!(pass && confirmPass && pass === confirmPass))
    }, [pass, confirmPass])

    const handleSubmit = async () => {
        let datas
        try {
            datas = {
                email: route.params.data.email,
                pass: pass,
                confirmPass: confirmPass,
            }
        } catch (e) {
            setError(selectLanguage.changePwd.goToConnection)
            setPass('')
            setConfirmPass('')
            return
        }

        const result = await fetch('http://localhost:3005/user/resetPassword', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(datas),
        }).then(res => res.status)

        setPass('')
        setConfirmPass('')
        if (result === 401) {
            setError(selectLanguage.changePwd.notCorresponding)
            // setPass('')
            // setConfirmPass('')
        }
        else if (result === 408) {
            setError(selectLanguage.forbidenCarac)
        }
        else if (result === 406)
            setError(selectLanguage.lengthErr)
        else if (result === 402) {
            setError(selectLanguage.changePwd.timeOut)
            // setPass('')
            // setConfirmPass('')
        }
        else {
            // setPass('')
            // setConfirmPass('')
            setError('')
            navigation.navigate('ChangePwdSuccess', { data: datas })
        }
    }

    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"
    const textInputAndButtonWidthStyle = windowWidthByHook > 500 ? 400 : "100%"
    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage}></Header>
            <View style={[GLOBAL_STYLES.toCenter, { height: 522 }]}>
                <View style={[GLOBAL_STYLES.container, { width: formulaireBoxWidthStyle, flex: 1, marginVertical: 75 }]}>
                    <Text style={[GLOBAL_STYLES.form.text, GLOBAL_STYLES.form.title, { fontSize: windowWidthByHook < 750 ? 30 : 40 }]}>{selectLanguage.changePwd.title}</Text>
                    <View style={{ paddingTop: 30 }}>
                        <Field
                            TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputAndButtonWidthStyle })}
                            placeholderTextColor={error.length ? "#E55839" : "#000000"}
                            placeholder={selectLanguage.changePwd.newPass}
                            onChangeText={setPass}
                            value={pass}
                            secureTextEntry={true}
                        />
                        <Field
                            TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputAndButtonWidthStyle })}
                            fieldsViewStyle={styles.maringTop}
                            placeholderTextColor={error.length ? "#E55839" : "#000000"}
                            placeholder={selectLanguage.changePwd.confirmNewPass}
                            onChangeText={setConfirmPass}
                            value={confirmPass}
                            secureTextEntry={true}
                        />
                        {error.length ? <Text style={{ fontSize: 15, marginVertical: 'auto', color: '#E55839', marginVertical: 10 }}>{error}</Text> : <Text style={{ fontSize: 20, marginVertical: 5 }}> </Text>}
                        <View style={[styles.ButtonContainer]}>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={disable}
                                style={[StyleSheet.compose(styles.ButtonEnvoyerContainer, { backgroundColor: disable ? "#a9a9a9" : "#E55839", width: textInputAndButtonWidthStyle }), styles.marginTop]}
                            >
                                <Text style={styles.EnvoyerButtonText}>{selectLanguage.changePwd.change}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    ButtonEnvoyerContainer: {
        width: 400,
        height: 42,
        borderRadius: 20,
    },

    maringTop: {
        marginTop: 40,
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

export default ChangePwd;