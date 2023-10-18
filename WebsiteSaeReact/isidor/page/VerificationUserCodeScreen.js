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
const VerificationScreen = ({language})=>{    
    const [selectLanguage, setSelectLanguage] = useState(language);
    const navigation = useNavigation();
    useEffect(()=>{
        setSelectLanguage(getLanguage);
    })

    return(
        <View style={styles.backcolor}>
          <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage}/>
          <View style={styles.FormContainer}>
                <View style={styles.FormulaireBox}>

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
});

export default VerificationScreen;