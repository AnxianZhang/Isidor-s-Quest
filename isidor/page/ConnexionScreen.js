import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImageGame from "../assets/ImageGame.png"
import BackgroundPicture from '../component/Background';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions, TextInput } from 'react-native';
import { useState } from 'react';
import Seperator from '../component/Seperator';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ConnexionScreen = ()=>{    
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    return(
        <View style={styles.backcolor}>
          <Header style={styles.header} />
          <View style={styles.FormContainer}>
                <View style={styles.FormulaireBox}>
                    <View style={styles.ConnexionTitle}>
                        <Text style={styles.ConnexionText}>Connexion</Text>
                    </View>
                    <Field fieldsViewStyle={styles.PseudoInput} TextInputStyle={styles.fields} placeholder='Pseudo' onChangeText={setPseudo} value={pseudo} secureTextEntry={false}/>
                    <Field fieldsViewStyle={styles.PseudoInput} TextInputStyle={styles.fields} placeholder='Mot de passe' onChangeText={setPassword} value={password} secureTextEntry={true}/>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={()=>console.log("ok")}>
                            <View style={styles.ButtonConnectContainer}>
                                <Text style={styles.ConnexionButtonText}>Se connecter</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.forgetPassword}>
                        <Text style={styles.forgetPasswordText}>Mot de passe oublié ?</Text>
                    </View>
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
PseudoInput : {
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
    backgroundColor : "#E55839",
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