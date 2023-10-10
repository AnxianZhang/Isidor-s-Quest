import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Dimensions} from 'react-native';
import Header from '../component/Header';
import { useState, useEffect } from 'react';
import Field from '../component/Field';
import Seperator from '../component/Seperator';
import { ScrollView } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const RegisterScreen = () => {
    const navigation = useNavigation();
    const [prenom, setPrenom] = useState("");
    const [nomFamille, setNomFamille] = useState("");
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPseudo, setErrorPseudo] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [disable, setDisable] = useState(true)
    useEffect(()=>{
        if(prenom === "" || nomFamille === "" || email === "" || pseudo === "" || password === "" || confirmPassword === ""){
            setDisable(true);
        }
        else{
            setDisable(false);
        }
    })

    const verifyForm = ()=>{
        if(!email.includes("@") && !email.includes(".")){
            setEmail("");
            setErrorEmail("Entrez un mail valide");
        }
        else{
            setErrorEmail("");
        }
        if(password !== confirmPassword){
            setConfirmPassword("");
            setErrorConfirmPassword("Le mot de passe ne correspond pas");
        }
        else{
            setErrorConfirmPassword("")
        }
        if(errorConfirmPassword === "" || errorEmail === ""){
            sendDataToDatabase();
        }
    }

    const sendDataToDatabase = async()=>{
        const data = {
            prenom : prenom,
            nomFamille : nomFamille,
            email : email,
            pseudo : pseudo,
            password : password
        }
        try {
            const response = await fetch('http://192.168.1.15:3005/inscription', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            const result = await response.status;
            const TextResponse = await response.text();
            if(result === 401){
                setEmail("");
                setErrorEmail(TextResponse);
            }
            else{
                setErrorEmail("");
            }
            if(result === 402){
                setPseudo("");
                setErrorPseudo(TextResponse);
            }
            else{
                setErrorPseudo("");
            }
            if(result === 200){
                console.log("naviguer");
                setErrorEmail("");
                setErrorPseudo("");
                navigation.navigate("Home");
            }
        }
        catch(e){
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }
    return (
        <View style={styles.backcolor}>
            <ScrollView>
            <Header style={styles.header} />
            <View style={styles.FormContainer}>
                <View style={styles.FormulaireBox}>
                    <View style={styles.InscriptionTitle}>
                        <Text style={styles.InscriptionText}>S'inscrire</Text>
                    </View>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={styles.fields} placeholder='Prénom' onChangeText={setPrenom} value={prenom} secureTextEntry={false}/>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={styles.fields} placeholder='Nom de famille' onChangeText={setNomFamille} value={nomFamille} secureTextEntry={false}/>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[styles.fields, {borderColor : errorEmail.length > 0 && "#E55839", borderWidth : errorEmail.length > 0 && 1}]} placeholder={errorEmail.length > 0 ? errorEmail : 'Adresse e-mail'} placeholderTextColor={errorEmail.length ? "#E55839" : "#000000"} onChangeText={setEmail} value={email} secureTextEntry={false}/>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[styles.fields, {borderColor : errorPseudo.length > 0 && "#E55839", borderWidh : errorPseudo.length > 0 && 1}]} placeholder={errorPseudo.length > 0 ? errorPseudo : 'Pseudo'} placeholderTextColor={errorPseudo.length ? "#E55839" : "#000000"} onChangeText={setPseudo} value={pseudo} secureTextEntry={false}/>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={styles.fields} placeholder='Mot de passe' onChangeText={setPassword} value={password} secureTextEntry={true}/>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[styles.fields,{borderColor : errorConfirmPassword.length > 0 && "#E55839", borderWidth : errorConfirmPassword.length > 0 && 1}]} placeholder={errorConfirmPassword.length > 0 ? errorConfirmPassword : 'Confirmer mot de passe'} placeholderTextColor={errorConfirmPassword.length ? "#E55839" : "#000000"} onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry={true}/>
                    <View style={styles.generalContidionBox}>
                        <Text style={styles.generalContidionText}>En cliquant sur S’inscrire, vous acceptez nos Conditions générales</Text>
                    </View>
                    <Seperator />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={()=>verifyForm()} disabled={disable}>
                            <View style={[styles.NewUserButtonConnectContainer, {backgroundColor : disable ? "#a9a9a9" : "#5BD94C"}]}>
                                <Text style={styles.NewUserButtonText}>S'inscrire</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    backcolor: {
        flex: 1,
        backgroundColor: "#7094CB"
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        paddingTop: 10,
        height: 100,
        backgroundColor: "#443955"
    },
    FormContainer : {
        alignItems: "center",
        justifyContent : "center",
        paddingTop : 40,
        paddingBottom : 40,
        height: windowHeight*0.90,
    },
    FormulaireBox : {
        height : windowHeight * 0.85,
        width : windowWidth * 0.5,
        borderRadius : 50,
        backgroundColor : "#443955"
    
    },
    InscriptionTitle : {
        alignItems : "center",
        paddingTop : 15
    },
    InscriptionText:{
        color:"white",
        fontSize:24,
        fontFamily:"ExtraBold"
    },
    InputStyle : {
        alignItems : "center",
        paddingTop : 20
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
    generalContidionBox : {
        alignItems : "center",
        paddingTop : 20
    },
    generalContidionText : {
        fontSize : 14,
        color : "#000000",
        fontFamily : "Light Italic",
        paddingBottom : 5,
    },
    ButtonContainer:{
        alignItems : "center",
        paddingTop : 20
    },
    NewUserButtonConnectContainer : {
        width : 310,
        height : 42,
        backgroundColor : "#5BD94C",
        borderRadius : 20
    },
    NewUserButtonText:{
        fontSize : 24,
        color : "#FFFFFF",
        fontFamily : "regular",
        textAlign : "center"
    }
});

export default RegisterScreen;