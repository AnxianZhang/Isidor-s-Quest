import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions} from 'react-native';
import { useState, useEffect } from 'react';
import Seperator from '../component/Seperator';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLanguage } from '../function/languageSelect';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ContactUsScreen = ({language}) => {
    const [selectLanguage, setSelectLanguage] = useState(language); 
    const navigation = useNavigation();
    useEffect(()=>{
        setSelectLanguage(getLanguage);
    })

    return (
        <View style={styles.backcolor}>
            <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage}/>
            
        </View>
    );
};
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
export default ContactUsScreen;