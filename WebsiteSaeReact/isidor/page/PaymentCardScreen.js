import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { getLanguage } from '../function/languageSelect';
import { GLOBAL_STYLES } from '../style/global';
import Footer from '../component/Footer';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const PaymentCardScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [disable, setDisable] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    const sendDataToDatabase = async () => {
        const data = {
            name: nom,
            email: email
        }
        try {
            const response = await fetch('http://localhost:3005/charge', {
                method: 'POST',
                credentials : "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const status = await response.status;
            const TextResponse = await response.text();
            if (status === 200) {
                window.location = (JSON.parse(TextResponse).url);
            }
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }

    const Payer = async () => {
        try {
            const response = await fetch('http://localhost:3005/pay', {
                method: 'POST',
                credentials : "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.status;
            const TextResponse = await response.text();
            window.location = JSON.parse(TextResponse).forwardLink;
        }
        catch (error) {

        }
    }
    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
            <View style={styles.FormContainer}>
                <View style={styles.ButtonContainer}>
                    <TouchableOpacity onPress={() => Payer()}>
                        <View style={[GLOBAL_STYLES.form.buttonContainer, { backgroundColor: "#EE8A45" }]}>
                            <Text style={GLOBAL_STYLES.form.buttonText}>Payer par paypal</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.ButtonContainer}>
                    <TouchableOpacity onPress={() => sendDataToDatabase()}>
                        <View style={[GLOBAL_STYLES.form.buttonContainer, { backgroundColor: "#EE8A45" }]}>
                            <Text style={GLOBAL_STYLES.form.buttonText}>Payer par carte bancaire</Text>
                        </View>
                    </TouchableOpacity>
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
        height: windowHeight * 0.85,
    },
    ButtonContainer: {
        alignItems: "center",
        paddingTop: 40
    },
});

export default PaymentCardScreen;