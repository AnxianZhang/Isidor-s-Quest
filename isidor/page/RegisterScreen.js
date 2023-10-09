import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImageGame from "../assets/ImageGame.png"
import BackgroundPicture from '../component/Background';
import Header from '../component/Header';

const RegisterScreen = ()=>{    
    return(
        <View style={styles.backcolor}>
            <Header style={styles.header} />
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
});

export default RegisterScreen;