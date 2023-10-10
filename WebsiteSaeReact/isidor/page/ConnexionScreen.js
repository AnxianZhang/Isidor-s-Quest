import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions} from 'react-native';
import { useState, useEffect } from 'react';
import Seperator from '../component/Seperator';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ConnexionScreen = ()=>{    
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [errorPseudo, setErrorPseudo] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [disable, setDisable] =  useState(true);
    const navigation = useNavigation();
    useEffect(()=>{
        if(pseudo === "" || password === ""){
            setDisable(true);
        }
        else{
            setDisable(false);
        }
    })

    const sendDataToDatabase = async()=>{
        const data = {
            pseudo : pseudo,
            password : password
        }
        try {
            const response = await fetch('http://192.168.1.15:3005/connexion', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            const result = await response.status;
            const TextResponse = await response.text();
            if(result === 401){
                setPseudo("");
                setPassword("")
                setErrorPseudo(TextResponse);
                setErrorPassword(TextResponse);
            }
            else{
                setErrorPseudo("");
                setErrorPassword("");
            }
            if(result === 402){
                setPseudo("");
                setPassword("")
                setErrorPseudo(TextResponse);
                setErrorPassword(TextResponse);
            }
            else{
                setErrorPseudo("");
                setErrorPassword("");
            }
            console.log(result);
            if(result === 200){
                console.log("naviguer");
                setErrorPassword("");
                setErrorPseudo("");
                navigation.navigate("Home");
            }
        }
        catch(e){
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }
    return(
        <View style={styles.backcolor}>
          <Header style={styles.header} />
          <View style={styles.FormContainer}>
                <View style={styles.FormulaireBox}>
                    <View style={styles.ConnexionTitle}>
                        <Text style={styles.ConnexionText}>Connexion</Text>
                    </View>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[styles.fields, {borderColor : errorPseudo.length > 0 && "#E55839", borderWidh : errorPseudo.length > 0 && 1}]} placeholderTextColor={errorPseudo.length ? "#E55839" : "#000000"} placeholder={errorPseudo.length ? errorPseudo : 'Pseudo'} onChangeText={setPseudo} value={pseudo} secureTextEntry={false}/>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[styles.fields, {borderColor : errorPassword.length > 0 && "#E55839", borderWidh : errorPassword.length > 0 && 1}]} placeholderTextColor={errorPassword.length ? "#E55839" : "#000000"} placeholder={errorPassword.length ? errorPassword : 'Mot de passe'} onChangeText={setPassword} value={password} secureTextEntry={true}/>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={()=>sendDataToDatabase()} disabled={disable}>
                            <View style={[styles.ButtonConnectContainer, {backgroundColor : disable ? "#a9a9a9" : "#E55839"}]}>
                                <Text style={styles.ConnexionButtonText}>Se connecter</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>console.log("ok")}>
                    <View style={styles.forgetPassword}>
                        <Text style={styles.forgetPasswordText}>Mot de passe oublié ?</Text>
                    </View>
                    </TouchableOpacity>
                    <Seperator />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                            <View style={styles.NewAccountButtonConnectContainer}>
                                <Text style={styles.NewAccountButtonText}>Créer nouveau compte</Text>
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

export default ConnexionScreen;