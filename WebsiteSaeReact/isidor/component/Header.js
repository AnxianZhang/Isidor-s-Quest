import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LogoSae from "../assets/LogoSae.png";
import World from "../assets/world.png"
import IconUser from "../assets/user.png"
import ButtonText from './ButtonText';
import ButtonImage from './ButtonImage';
import { useNavigation } from '@react-navigation/native';
import Play from "../assets/Play.png";
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import List from './List';
import UserList from './UserList';
import { getLanguage } from '../function/languageSelect';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { GLOBAL_STYLES } from '../style/global';
import { changeLanguage } from '../function/languageSelect';

const Header = (props) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [open, setOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const [isConnect, setIsConnect] = useState("false");
    const windowWidth = useScreenWidthDimention();
    useEffect(() => {
        getData()
    }, [isFocused])

    useEffect(()=>{
        props.setLanguage(getLanguage);
    })

    const getData = async () => {
        const response = await fetch('http://localhost:3005/user/connect', {
            method: 'GET',
            credentials : "include",
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
                const response = await fetch('http://localhost:3005/paiement/pay', {
                    method: 'GET',
                    credentials : "include",
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
            await fetch('http://localhost:3005/user/disconnection', {
                method: 'POST',
                credentials : "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setIsConnect("false");
            navigation.navigate("Home");
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }
    
    return (
        <View style={[props.style ? props.style : styles.header, {paddingHorizontal: windowWidth <= 450 ? 10 : 50}]}>
            <View style = {{flex: 1, flexDirection: "row", alignItems: 'center', /*backgroundColor: "cyan",*/ justifyContent: 'flex-start', gap: 50,}}>
                <View>
                    <ButtonImage onPress={() => navigation.navigate("Home")} source={{ uri: LogoSae }} style={GLOBAL_STYLES.projectLogo} />
                </View>
                {windowWidth > 750 && <View style={props.inProps? styles.containProposUnderLine : styles.containProps}>
                    <ButtonText onPress={() => navigation.navigate("APropos")} text={props.language.Header.about} styleText={styles.headerText} />
                </View>}
            </View>
            <View style={styles.headerLastElement}>
                <View>
                    {/* <ButtonImage onPress={() => setOpen(!open)} source={{ uri: World }} style={styles.worldPicture} /> */}
                    {/* {open && */}
                        {/* <View style={styles.listContainer}> */}
                            <List onSelect={(selectedItem) => { setOpen(!open); changeLanguage(selectedItem); }} setLanguage={props.setLanguage} language={props.language}/>
                        {/* </View> */}
                    {/* } */}
                </View>
                <View style={styles.containConnect}>
                    {/* <ButtonText onPress={() => { isConnect === "true" ? disconnection() : navigation.navigate("Connexion") }} text={isConnect === "true" ? props.language.Header.disconnect : props.language.Header.connect} styleText={styles.headerText} /> */}
                   
                    <View>
                        <UserList disconnection={disconnection} navigation={navigation} isConnect={isConnect} setUserOpen={setUserOpen} setLanguage={props.setLanguage} language={props.language}/>
                    </View>

                </View>
                <View>
                    <TouchableOpacity onPress={() => NavigationGestion()}>
                        <View style={styles.buttonContent}>
                            <Image source={{ uri: Play }} style={styles.playLogo} />
                            {windowWidth > 750 && <Text style={[styles.headerText, GLOBAL_STYLES.pixSanRegular]}>{props.language.Home.buttonPlay}</Text>}
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
        // justifyContent: 'space-between',
        alignItems: "center",
        paddingTop: 10,
        height: 100
    },
    // headerLogo: { // 
    //     // paddingLeft: 60,
    //     // paddingRight: 50
    // },
    // logoPicture: {
    //     width: 72,
    //     height: 64
    // },
    headerText: {
        fontSize: 24,
        color: "white",
    },
    headerLastElement: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end",
        // backgroundColor: "pink",
        // position: 'relative',
        flexDirection: "row",
        // justifyContent: "flex-end",
        // paddingRight: 60
    },
    worldPicture: {
        width: 31,
        height: 31
    },
    // containeWorldPicture: { //
    //     // paddingRight: 50,
    // },
    containConnect: {
        paddingHorizontal: 25,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EE8A45",
        gap: 15,
        // paddingTop: 5,
        // paddingBottom: 5,
        // paddingRight: 30,
        // paddingLeft: 30,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    playLogo: {
        width: 25,
        height: 33,
        // marginRight: 20
    },
    listContainer: {
        position: 'absolute',
        top : '100%'
    },

    containProposUnderLine:{
        borderBottomWidth: 5,
        borderBlockColor: "white",
    },
});

export default Header;