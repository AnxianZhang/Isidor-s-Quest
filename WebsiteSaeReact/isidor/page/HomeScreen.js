import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BackgroundPicture from '../component/Background';
import Header from '../component/Header';
import { Dimensions } from 'react-native';
import Play from "../assets/Play.png";
import Previous from "../assets/previous.png";
import ButtonImage from '../component/ButtonImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-web';
import BackgroundGame from "../assets/Background1.png"
import BackgrounGameSecond from "../assets/Background3.png"
import { getLanguage } from '../function/languageSelect';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';

const windowHeight = Dimensions.get('window').height;
const HomeScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [isConnect, setIsConnect] = useState(false);
    const firstItemRef = useRef(null);
    useEffect(() => {
        getData()
    }, [isFocused])

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    const getData = async () => {
        const response = await AsyncStorage.getItem("user");
        const responseJSON = JSON.parse(response);
        if (responseJSON !== null) {
            setIsConnect(responseJSON.isConnect);
        }
        console.log("connexion : " + isConnect);
    }

    const windowWidthByHook = useScreenWidthDimention()
    const gameTitleTextFontSizeStyle = windowWidthByHook > 1350 ? 70 : 50;
    const SecondPartContainerPaddingHorizontalStyle = windowWidthByHook > 1100 ? windowWidthByHook > 1400 ? windowWidthByHook > 1860 ? "24%" : "20%" : "15%" : 0
    const [gameDescriptionFontTitleSize, gameDescriptionTextFontSize] = windowWidthByHook > 750 ? windowWidthByHook > 1610 ? [45, 30] : [40, 25] : [35, 20]

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            <BackgroundPicture source={BackgroundGame} resize="cover" style={styles.image}>
                <ScrollView>
                    <Header setIsConnect={setIsConnect} setLanguage={setSelectLanguage} language={selectLanguage} />
                    <View style={styles.gameTitle}>
                        <Text style={StyleSheet.compose(styles.gameTitleText, { fontSize: gameTitleTextFontSizeStyle, })}>Isidor's Quest:{"\n"}Chasing the Glow</Text>
                    </View>
                    <View style={styles.containButtonPlay}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Contact") }}>
                            <View style={styles.buttonContent}>
                                <Image source={{ uri: Play }} style={styles.playLogo} />
                                <Text style={styles.headerText}>contact</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { isConnect ? navigation.navigate("Game") : navigation.navigate("Connexion") }}>
                            <View style={styles.buttonContent}>
                                <Image source={{ uri: Play }} style={styles.playLogo} />
                                <Text style={styles.headerText}>{selectLanguage.Home.buttonPlay}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("PaymentCard")}>
                            <View style={styles.buttonContent}>
                                <Image source={{ uri: Play }} style={styles.playLogo} />
                                <Text style={styles.headerText}>test</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Cancel")}>
                            <View style={styles.buttonContent}>
                                <Image source={{ uri: Play }} style={styles.playLogo} />
                                <Text style={styles.headerText}>testCancel</Text>
                            </View>
                        </TouchableOpacity>
                        <ButtonImage onPress={() => firstItemRef.current.scrollIntoView()} source={{ uri: Previous }} style={styles.previousLogo} />
                    </View>
                    <View style={StyleSheet.compose(styles.SecondPartContainer, { paddingHorizontal: SecondPartContainerPaddingHorizontalStyle, })}>
                        <View style={{ height: 725 }}></View> {/* empty box */}
                        <View style={styles.GameDescriptionContainer} ref={firstItemRef}>
                            <Text style={StyleSheet.compose(styles.gameDescriptionTitleText, { fontSize: gameDescriptionFontTitleSize })}>{selectLanguage.Home.gameTitle}</Text>
                            <Text style={StyleSheet.compose(styles.gameDescription, { fontSize: gameDescriptionTextFontSize })}>{selectLanguage.Home.gameDescPartOne}{"\n\n"}{selectLanguage.Home.gameDescPartTwo}</Text>
                        </View>
                    </View>
                </ScrollView>
            </BackgroundPicture>
            {/* <BackgroundPicture source={BackgrounGameSecond} resize="cover" style={styles.image}></BackgroundPicture> */}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: "#7094CB"
    },
    image: {
        width: '100%',
        minHeight: 2090,
        // height: "100%"
    },
    gameTitle: {
        flexDirection: 'column',
        alignItems: "flex-end",
        justifyContent: "center",
        // paddingRight: 40,
        marginHorizontal: 50,
        height: windowHeight * 0.60,
        marginVertical: 20
    },
    gameTitleText: {
        fontFamily: "Regular",
        color: "white",
        textAlign: 'center',
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
    containButtonPlay: {
        alignItems: "center",
        justifyContent: "center",
        height: windowHeight * 0.10,
    },
    previousLogo: {
        width: 25,
        height: 33,
    },
    GameDescriptionContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        marginHorizontal: 30,
        // marginTop: 500,
        // paddingHorizontal: "10%",
        // paddingTop: '40%',
        // marginLeft: '20%'
    },
    SecondPartContainer: {
        flex: 1,
        // paddingHorizontal: "24%",
    },
    gameDescriptionTitleText: {
        // fontSize: 45,
        fontFamily: "Bold",
        color: "#FFFFFF",
        marginVertical: 10
    },
    gameDescription: {
        // paddingTop: 20,
        // paddingBottom: 20,
        // fontSize: 30,
        fontFamily: "Light",
        color: "white",
        // marginHorizontal: "25%",
        marginVertical: 20
        // textAlign: "left",
        // paddingRight: 200,
        // paddingLeft: 200
    },
    headerText: {
        fontSize: 24,
        fontFamily: "regular",
        color: "white",
    },
});

export default HomeScreen;