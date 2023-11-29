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
                <View style={styles.FormulaireBox}>
                    <View style={styles.ConnexionTitle}>
                        <Text style={styles.ConnexionText}>Payment par carte</Text>
                    </View>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={styles.fields} placeholderTextColor="#000000" placeholder="Nom : " onChangeText={setNom} value={nom} secureTextEntry={false}/>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={styles.fields} placeholderTextColor="#000000" placeholder="Mail : " onChangeText={setEmail} value={email} secureTextEntry={false}/>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={()=>sendDataToDatabase()}>
                            <View style={[styles.ButtonConnectContainer, {backgroundColor : "#E55839"}]}>
                                <Text style={styles.ConnexionButtonText}>Payer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
FormulaireBox : {
    height : windowHeight * 0.7,
    width : windowWidth * 0.6,
    borderRadius : 50,
    backgroundColor : "#443955"
},
ConnexionTitle : {
    alignItems : "center",
    paddingTop : 15
},
ConnexionText:{
    color:"white",
    fontSize:24,
    fontFamily:"ExtraBold"
},
InputStyle : {
    alignItems : "center",
    paddingTop : 40
},
fields : {
    backgroundColor : "white",
    width : 450,
    height : 55,
    borderRadius : 20,
    padding : 20,
    fontSize : 20,
    color : "#000000"
},
ButtonContainer:{
    alignItems : "center",
    paddingTop : 40
},
ConnexionButtonText : {
    fontSize : 28,
    color : "#FFFFFF",
    fontFamily : "Light",
    textAlign : "center"
},
ButtonConnectContainer : {
    width : 450,
    height : 42,
    borderRadius : 20
},
forgetPassword : {
    alignItems : "center",
    paddingTop : 10
},
forgetPasswordText : {
    fontSize : 16,
    color : "#E55839",
    fontFamily : "regular",
    paddingBottom : 30,
},
NewAccountButtonConnectContainer : {
    width : 310,
    height : 42,
    backgroundColor : "#5BD94C",
    borderRadius : 20
},
NewAccountButtonText:{
    fontSize : 24,
    color : "#FFFFFF",
    fontFamily : "regular",
    textAlign : "center"
}
});

export default PaymentCardScreen;