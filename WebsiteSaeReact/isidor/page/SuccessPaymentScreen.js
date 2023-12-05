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

    useEffect(() => {
<<<<<<< HEAD
=======
        sendDataToDatabase();
>>>>>>> parent of 1a9da753 (Revert "Changement")
        setTimeout(() => navigation.navigate("Home"), 5000)
    }, [isFocused])

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    const sendDataToDatabase = async () => {
<<<<<<< HEAD
        const data = {
            name: nom,
            email: email
        }
        try {
            const response = await fetch('http://localhost:3005/charge', {
=======
        try {
            await fetch('http://localhost:3005/successPayment', {
>>>>>>> parent of 1a9da753 (Revert "Changement")
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
<<<<<<< HEAD
                body: JSON.stringify(data)
            });
            const status = await response.status;
            const TextResponse = await response.text();
            if (status === 200) {
                window.location = (JSON.parse(TextResponse).url);
                navigation.navigate("Home")
            }
=======
            });
>>>>>>> parent of 1a9da753 (Revert "Changement")
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }


    return (
        <View style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
            <View style={styles.container}>
                <Text style={GLOBAL_STYLES.form.text}>Paiement reussi</Text>
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
});

export default SucessPaymentScreen;