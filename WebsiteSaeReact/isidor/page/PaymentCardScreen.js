import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions} from 'react-native';
import { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { getLanguage } from '../function/languageSelect';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const PaymentCardScreen = ({language})=>{    
    const [selectLanguage, setSelectLanguage] = useState(language); 
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [disable, setDisable] =  useState(true);
    const navigation = useNavigation();

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
            }
    }
    catch(error){
        console.error('Erreur lors de l\'envoi des données au backend', error);
    }
    }

     const Payer = async ()=>{
        try {
            const response = await fetch('http://localhost:3005/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.status;
            const TextResponse = await response.text();
            window.location = JSON.parse(TextResponse).forwardLink;
        }
        catch (error){

        }
    }
    return(
        <View style={styles.backcolor}>
          <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage}/>
          <View style={styles.FormContainer}>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={()=>Payer()}>
                            <View style={[styles.ButtonPaymentContainer, {backgroundColor : "#E55839"}]}>
                                <Text style={styles.PaymentButtonText}>Payer par paypal</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={()=>sendDataToDatabase()}>
                            <View style={[styles.ButtonPaymentContainer, {backgroundColor : "#E55839"}]}>
                                <Text style={styles.PaymentButtonText}>Payer par carte bancaire</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
ButtonContainer:{
    alignItems : "center",
    paddingTop : 40
},
PaymentButtonText : {
    fontSize : 28,
    color : "#FFFFFF",
    fontFamily : "Light",
    textAlign : "center"
},
ButtonPaymentContainer : {
    width : 450,
    height : 42,
    borderRadius : 20
},
});

export default PaymentCardScreen;