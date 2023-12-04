import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LogoSae from "../assets/LogoSae.png";
import World from "../assets/world.png"
import ButtonText from './ButtonText';
import ButtonImage from './ButtonImage';
import { useNavigation } from '@react-navigation/native';
import Play from "../assets/Play.png";
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import List from './List';
import { getLanguage } from '../function/languageSelect';

const Header = (props) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [open, setOpen] = useState(false);
    const [isConnect, setIsConnect] = useState("false");

    useEffect(() => {
        getData()
    }, [isFocused])

    useEffect(()=>{
        props.setLanguage(getLanguage);
    })

    const getData = async () => {
        const response = await fetch('http://localhost:3005/isConnect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const textResponse = await response.text();
        setIsConnect(textResponse);
    }

    const NavigationGestion = async () => {
        if (isConnect == "false") {
            navigation.navigate("Connexion");
        }
        if (isConnect == "true") {
            try {
                const response = await fetch('http://localhost:3005/isPay', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const textResponse = await response.text();
                console.log(textResponse);
                if(textResponse === "false"){
                    navigation.navigate("PaymentCard");
                }
                else{
                    navigation.navigate("Game");
                }
            }
            catch (error) {
                console.error('Erreur lors de l\'envoi des données au backend', error);
            }
        }
    }
    const disconnection = async () => {
        try {
            await fetch('http://localhost:3005/disconnection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setIsConnect("false");
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }
    return (
        <View style={props.style ? props.style : styles.header}>
            <View style={styles.headerLogo}>
                <ButtonImage onPress={() => navigation.navigate("Home")} source={{ uri: LogoSae }} style={styles.logoPicture} />
            </View>
            <View style={styles.containPropos}>
                <ButtonText onPress={() => console.log("toucher")} text={props.language.Header.about} styleText={styles.headerText} />
            </View>
            <View style={styles.headerLastElement}>
                <View style={styles.containeWorldPicture}>
                    <ButtonImage onPress={() => setOpen(!open)} source={{ uri: World }} style={styles.worldPicture} />
                    {open &&
                    <View style={styles.listContainer}><List /></View>
                    }
                </View>
                <View style={styles.containConnect}>
                    <ButtonText onPress={() => { isConnect === "true" ? disconnection() : navigation.navigate("Connexion") }} text={isConnect === "true" ? props.language.Header.disconnect : props.language.Header.connect} styleText={styles.headerText} />
                </View>
                <View>
                    <TouchableOpacity onPress={() => NavigationGestion()}>
                        <View style={styles.buttonContent}>
                            <Image source={{ uri: Play }} style={styles.playLogo} />
                            <Text style={styles.headerText}>{props.language.Home.buttonPlay}</Text>
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
        fontFamily: "regular",
        color: "white",
    },
    headerLastElement: {
        flex: 1,
        position: 'relative',
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
        backgroundColor: "#EE8A45",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 30,
        paddingLeft: 30,
        borderRadius: 10
    },
    playLogo: {
        width: 25,
        height: 33,
        marginRight: 20
    },
    listContainer: {
        position: 'absolute',
        top : '100%'
    },
    
});

export default Header;