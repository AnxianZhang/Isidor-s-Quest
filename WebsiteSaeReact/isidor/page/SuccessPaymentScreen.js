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
        sendDataToDatabase();
    }, [isFocused])

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    const sendDataToDatabase = async () => {
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
                window.open(text, '_blank');
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