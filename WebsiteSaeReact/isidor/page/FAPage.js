import React, { useEffect, useState } from 'react';
import { getLanguage } from '../function/languageSelect';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { GLOBAL_STYLES } from '../style/global';
import Field from '../component/Field';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import Seperator from '../component/Seperator';
import { useNavigation, useRoute } from '@react-navigation/native';

const FAPage = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const [qrCode, setQrcode] = useState("")
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const navigation = useNavigation()
    const route = useRoute()

    const windowWidthByHook = useScreenWidthDimention()

    const makeRequestTo = async (data, url) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response
    }

    const get2FAQRcode = async () => {
        const data = {
            pseudo: route.params && route.params.pseudo,
        }

        try {
            /* il ne faut pas qu'il y ait d'erreur dans le 1er requtes, sinon, la 2eme (lors de la connexion) il ne va repu le qrcode */
            const response = await makeRequestTo(data, 'http://localhost:3005/qrCode')
            if (response.status === 401)
                navigation.navigate("Connexion")
            else
                setQrcode((await response.json()).qrCode)
            console.log(qrCode)
        } catch (err) {
            console.log("error when making request in qrCode with: " + err)
        }
    }

    useEffect(() => {
        get2FAQRcode()
    }, [])

    useEffect(() => {
        setSelectLanguage(getLanguage)
    })

    const verifCode = async () => {

    }

    const textInputAndButtonWidthStyle = windowWidthByHook > 500 ? 400 : "100%"

    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
            <View style={[styles.FormContainer]}>
                <View style={[GLOBAL_STYLES.container, { padding: 20 }]}>
                    <Text style={[GLOBAL_STYLES.form.title, GLOBAL_STYLES.form.text]}>{selectLanguage.scanQR.title}</Text>
                    <Image source={{ uri: qrCode }} style={styles.qrCode} />
                    <Field
                        TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputAndButtonWidthStyle })}
                        placeholderTextColor={error.length ? "#E55839" : "#000000"}
                        placeholder="Code"
                        onChangeText={setCode}
                        value={code}
                        secureTextEntry={false}
                    />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={() => verifCode()}>
                            <View style={GLOBAL_STYLES.form.buttonContainer}>
                                <Text style={GLOBAL_STYLES.form.buttonText}>{selectLanguage.Code.verifCodeChange}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    qrCode: {
        width: 300,
        height: 300,
        borderRadius: 25,
        marginVertical: 50
    },
    FormContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 750,
    },
    ButtonContainer: {
        alignItems: "center",
        paddingTop: 40,
    },
})

export default FAPage;