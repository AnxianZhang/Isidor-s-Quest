import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LogoSae from "../assets/LogoSae.png";
import World from "../assets/world.png"
import ButtonText from './ButtonText';
import ButtonImage from './ButtonImage';
import { useNavigation } from '@react-navigation/native';
import Play from "../assets/Play.png";

const Header = (props) => {
    const navigation = useNavigation();
    return (
        <View style={props.style ? props.style : styles.header}>
            <View style={styles.headerLogo}>
                <ButtonImage onPress={() => navigation.navigate("Home")} source={{ uri: LogoSae }} style={styles.logoPicture} />
            </View>
            <View style={styles.containPropos}>
                <ButtonText onPress={() => console.log("toucher")} text={"A propos"} styleText={styles.headerText} />
            </View>
            <View style={styles.headerLastElement}>
                <View style={styles.containeWorldPicture}>
                    <ButtonImage onPress={() => console.log("toucher")} source={{ uri: World }} style={styles.worldPicture} />
                </View>
                <View style={styles.containConnect}>
                    <ButtonText onPress={() => navigation.navigate("Connexion")} text={"Se connecter"} styleText={styles.headerText} />
                </View>
                <View>
                    <TouchableOpacity onPress={() => console.log("ok")}>
                        <View style={styles.buttonContent}>
                                <Image source={{ uri: Play }} style={styles.playLogo} />
                                <Text style={styles.headerText}>Jouer</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: "center",
        paddingTop: 10,
        height: 100
    },
    headerLogo: {
        paddingLeft: 60,
        paddingRight: 50
    },
    logoPicture: {
        width: 72,
        height: 64
    },
    headerText: {
        fontSize: 24,
        fontFamily:"regular",
        color: "white",
    },
    headerLastElement: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 60
    },
    worldPicture: {
        width: 31,
        height: 31
    },
    containeWorldPicture: {
        paddingRight: 50,
    },
    containConnect: {
        paddingRight: 50,
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
    
});

export default Header;