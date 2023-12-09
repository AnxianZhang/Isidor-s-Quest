import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getLanguage } from '../function/languageSelect';
import { GLOBAL_STYLES } from '../style/global';
const windowHeight = Dimensions.get('window').height;

const SucessPaymentScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [factureLink, setFactureLink] = useState("");
    useEffect(() => {
        sendDataToDatabase();
    }, [isFocused])

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    const sendDataToDatabase = async () => {
        let executeFunction;
        getData().then(async function(result) {
        if(result == "true"){
        try {
            const res = await fetch('http://localhost:3005/successPayment', {
                method: 'POST',
                credentials : "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const status = await res.status;
            if (status == 200){
                const text = await res.text();
                setFactureLink(text);
            }
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
        }
        else{
            navigation.navigate("Home");
        }
    });
    }

    const getData = async()=>{
        try {
            const res = await fetch('http://localhost:3005/verifyPayment', {
                method: 'GET',
                credentials : "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const status = await res.status;
            if (status == 200){
                const text = await res.text();
                return text;
            }
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }


    return (
        <View style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
            <View style={styles.container}>
                {factureLink != "" ?
                    <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.Payment.SuccessCBPayment}</Text>
                : 
                    <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.Payment.SuccessPaypalPayment}</Text>
                }
                {factureLink != "" &&
                <View style={styles.buttonContain}> 
                <TouchableOpacity onPress={() => { window.open(factureLink, '_blank'); }}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.headerText}>{selectLanguage.Payment.factureLinkChargement}</Text>
                    </View>
                </TouchableOpacity>
                </View>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: windowHeight * 0.85,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EE8A45",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 50,
        paddingLeft: 50,
        borderRadius: 10
    },
    headerText: {
        fontSize: 24,
        fontFamily: "regular",
        color: "white",
    },
    buttonContain : {
        paddingTop : 10,
    }
});

export default SucessPaymentScreen;