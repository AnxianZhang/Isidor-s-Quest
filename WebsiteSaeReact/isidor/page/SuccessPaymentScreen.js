import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getLanguage } from '../function/languageSelect';
const windowHeight = Dimensions.get('window').height;

const SucessPaymentScreen = ({language})=>{    
    const [selectLanguage, setSelectLanguage] = useState(language); 
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        setTimeout(() => navigation.navigate("Home"), 5000)
    }, [isFocused])
    
    useEffect(()=>{
        setSelectLanguage(getLanguage);
    })

    const sendDataToDatabase = async()=>{
        const data = {
            name : nom,
            email: email
        }
        try {
            const response = await fetch('http://localhost:3005/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const status = await response.status;
            const TextResponse = await response.text();
            if(status === 200){
                window.location = (JSON.parse(TextResponse).url);
                navigation.navigate("Home")
            }
    }
    catch(error){
        console.error('Erreur lors de l\'envoi des données au backend', error);
    }
    }

    
    return(
        <View style={styles.backcolor}>
          <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage}/>
          <View style={styles.FormContainer}>
                    <Text style={styles.SuccessText}>Paiement reussi</Text>
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
backcolor : {
    flex: 1,
    backgroundColor : "#7094CB"
},
header: {
    flexDirection: 'row',
    alignItems: "center",
    paddingTop: 10,
    height: 100,
    backgroundColor : "#443955"
},
FormContainer : {
    alignItems: "center",
    justifyContent : "center",
    height: windowHeight*0.85,
},
SuccessText : {
    fontSize : 40,
    fontWeight: 'bold',
    color : "#08f26e"
}
});

export default SucessPaymentScreen;