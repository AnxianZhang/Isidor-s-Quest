import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImageGame from "../assets/ImageGame.png"
import BackgroundPicture from '../component/Background';
import LogoSae from "../assets/LogoSae.png";
import Header from '../component/Header';
import {Dimensions} from 'react-native';
import Play from "../assets/Play.png";
import Previous from "../assets/previous.png";
import ButtonImage from '../component/ButtonImage';
const windowHeight = Dimensions.get('window').height;
const HomeScreen = ()=>{    
    return(
        <BackgroundPicture source={ImageGame} resize="cover" style={styles.image}>
            <Header />
            <View style={styles.gameTitle}>
                <Text style={styles.gameTitleText}>Isidor's Quest:</Text>
                <Text style={styles.gameTitleText}>Chasing the Glow</Text>
            </View>
            <View style={styles.containButtonPlay}>
                <TouchableOpacity onPress={() => console.log("ok")}>
                    <View style={styles.buttonContent}>
                        <Image source={{ uri: Play }} style={styles.playLogo} />
                            <Text style={styles.headerText}>Jouer</Text>
                    </View>
                </TouchableOpacity>
                <ButtonImage onPress={() => console.log("toucher")} source={{ uri: Previous }} style={styles.previousLogo} />
            </View>
        </BackgroundPicture>
    )
}
const styles = StyleSheet.create({
image : {
    flex: 1,
},
gameTitle : {
    flexDirection: 'column',
    alignItems: "flex-end",
    justifyContent : "center",
    paddingRight: 40,
    height: windowHeight*0.75,
},
gameTitleText:{
    fontSize: 70,
    fontFamily:"Regular",
    color: "white",
},
buttonContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor : "#EE8A45",
    paddingTop : 5,
    paddingBottom : 5,
    paddingRight : 30,
    paddingLeft : 30,
    borderRadius : 10

},
playLogo: {
    width: 25,
    height: 33,
    marginRight : 20
},
containButtonPlay: {
    alignItems: "center",
    justifyContent : "center",
    height: windowHeight*0.10,
},
previousLogo: {
    width: 25,
    height: 33,
},
});

export default HomeScreen;